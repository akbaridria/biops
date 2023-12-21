// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./DummyUSDT.sol";
import "./Types.sol";
import "./pyth/IPyth.sol";
import "./pyth/PythStructs.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./vDummyUSDTPool.sol";

contract BiopsHub is ReentrancyGuard {
    // variable
    DummyUSDT dusdt;
    vDummyUSDTPool vdusdt;
    IPyth pyth;

    mapping(uint256 => Types.Trade) public tradeTracker;
    mapping(address => uint256[]) public userTradeTracker;
    uint256 tradeId;
    uint32 private MINIMUM_TIME = 5 * 60;
    uint256 totalUnrealizedProfit;
    address public owner;
    mapping(string => bytes32) public markets;

    // modifiers
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier tradeExist(uint256 _tradeId) {
        require(tradeTracker[_tradeId].isExist);
        _;
    }

    // events
    event TradeCreated(
        uint256 indexed tradeId,
        address indexed user,
        uint256 amount,
        Types.Direction direction
    );

    event Claimed(
        uint256 indexed tradeId,
        address indexed user,
        uint256 amount
    );

    event UpdateStatusTrade(
        uint256 indexed tradeId,
        Types.Status status
    );

    // constructor
    constructor(address _token, address _pyth) {
        dusdt = DummyUSDT(_token);
        owner = msg.sender;
        pyth = IPyth(_pyth);
    }

    // users functions
    function trade(
        address _user,
        uint256 _amount,
        uint8 _direction,
        uint256 _time,
        string memory _market,
        bytes[] calldata _priceUpdateData
    ) external nonReentrant() payable returns (uint256) {
        // 1. validation
        require(dusdt.balanceOf(_user) >= _amount);
        require(_time >= MINIMUM_TIME);
        require(_direction <= 1);
        
        uint256 limit = getTradeLimit();
        if(_amount > limit) {
            revert();
        }

        // 2. send payment
        dusdt.transferFrom(_user, address(this), _amount);

        // 3. get price
        updateDataPrice(_priceUpdateData);
        bytes32 market = markets[_market];
        PythStructs.Price memory price = pyth.getPrice(market);

        // 4. store data
        userTradeTracker[_user].push(tradeId);
        tradeTracker[tradeId] = Types.Trade({
            isExist: true,
            tradeId: tradeId,
            trader: _user,
            amount: _amount,
            direction: Types.Direction(_direction),
            startPrice: price.price,
            markPrice: 0,
            status: Types.Status(0),
            expireTime: block.timestamp + _time,
            market: _market
        });
        totalUnrealizedProfit += _amount * 2;

        // 5. emit event
        emit TradeCreated(tradeId, _user, _amount, Types.Direction(_direction));
        tradeId++;
        return tradeId;
    }

    function resolveTrade(
        uint256 _tradeId,
        bytes[] calldata _priceUpdateData
    ) public nonReentrant() payable tradeExist(_tradeId) {
        require(
            tradeTracker[_tradeId].status == Types.Status.ACTIVE &&
                block.timestamp >= tradeTracker[_tradeId].expireTime
        );

        updateDataPrice(_priceUpdateData);
        bytes32 oracle = markets[tradeTracker[_tradeId].market];
        PythStructs.Price memory price = pyth.getPrice(oracle);
        tradeTracker[_tradeId].markPrice = price.price;
        if (tradeTracker[_tradeId].direction == Types.Direction.UP) {
            if (price.price > tradeTracker[_tradeId].startPrice) {
                updateStatus(_tradeId, 2);
                vdusdt.transferToBiops(tradeTracker[_tradeId].amount, address(this));
            } else {
                tradeTracker[_tradeId].status = Types.Status(1);
                updateStatus(_tradeId, 1);
                dusdt.transfer(address(vdusdt), tradeTracker[_tradeId].amount);
                totalUnrealizedProfit -= tradeTracker[_tradeId].amount *2;
            }
        } else {
            if (price.price < tradeTracker[_tradeId].startPrice) {
                updateStatus(_tradeId, 2);
                vdusdt.transferToBiops(tradeTracker[_tradeId].amount, address(this));
            } else {
                tradeTracker[_tradeId].status = Types.Status(1);
                updateStatus(_tradeId, 1);
                dusdt.transfer(address(vdusdt), tradeTracker[_tradeId].amount);
                totalUnrealizedProfit -= tradeTracker[_tradeId].amount *2;
            }
        }
    }

    function claim(uint256 _tradeId) external nonReentrant() tradeExist(_tradeId) {
        require(tradeTracker[_tradeId].status == Types.Status.WIN);
        dusdt.transfer(tradeTracker[_tradeId].trader, tradeTracker[_tradeId].amount * 2);
        totalUnrealizedProfit = totalUnrealizedProfit - (tradeTracker[_tradeId].amount * 2);
        tradeTracker[_tradeId].status = Types.Status(3);
        updateStatus(_tradeId, 3);
        emit Claimed(_tradeId, tradeTracker[_tradeId].trader, tradeTracker[_tradeId].amount * 2);
    }

    // helper function
    function updateDataPrice(bytes[] calldata _priceUpdateData) internal {
        uint fee = pyth.getUpdateFee(_priceUpdateData);
        pyth.updatePriceFeeds{value: fee}(_priceUpdateData);
    }

    function updateStatus(
        uint256 _tradeId,
        uint8 _status
    ) internal {
        tradeTracker[_tradeId].status = Types.Status(_status);
        emit UpdateStatusTrade(_tradeId, Types.Status(_status));
    }

    function getUserFullInfo(
        address _trader
    ) external view returns (Types.Trade[] memory) {
        Types.Trade[] memory trades = new Types.Trade[](userTradeTracker[_trader].length);
        for(uint256 i = 0; i < userTradeTracker[_trader].length; i++) {
            trades[i] = tradeTracker[userTradeTracker[_trader][i]];
        }
        return trades;
    }

    function getTradeLimit() public view returns (uint256) {
        return (dusdt.balanceOf(address(vdusdt)) - totalUnrealizedProfit) / 2;
    }

    // admin functions
    function addMarket(
        string memory _market,
        bytes32 _priceId
    ) external onlyOwner {
        markets[_market] = _priceId;
    }

    function removeMarket(string memory _market) external onlyOwner() {
        delete markets[_market];
    }

    function changeVdummyUSDTPool(address _pool) external onlyOwner() {
        vdusdt = vDummyUSDTPool(_pool);
    }
}
