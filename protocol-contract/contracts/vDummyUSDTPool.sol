// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./DummyUSDT.sol";

contract vDummyUSDTPool is ERC20, ERC20Burnable, Ownable, ReentrancyGuard {
    // variables
    DummyUSDT dusdt;
    address BiopsHub;

    // errors

    // modifiers
    modifier onlyBiops(address _user) {
        require(_user == BiopsHub);
        _;
    } 

    // events
    event Deposit(address indexed _user, uint256 _amountDusdt, uint256 _amountVdusdt);
    event Withdraw(address indexed _user, uint256 _amountDusdt, uint256 _amountVdusdt);

    // constructor
    constructor(address _biops, address _dusdt) ERC20("vDummyUSDT", "vDUSDT") Ownable(msg.sender) {
        BiopsHub = _biops;
        dusdt = DummyUSDT(_dusdt);
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function deposit(uint256 _amount) external nonReentrant() {
        require(dusdt.balanceOf(msg.sender) >= _amount);
        uint256 amountOut;
        if(dusdt.balanceOf(address(this)) == 0) {
            amountOut = _amount;
        } else {
            amountOut = calculatedAmountOutFromDusdt(_amount);
        }
        dusdt.transferFrom(msg.sender, address(this), _amount);
        _mint(msg.sender, amountOut);
        emit Deposit(msg.sender, _amount, amountOut);
    }

    function withdraw(
        uint256 _balanceVusdt
    ) external nonReentrant() {
        require(balanceOf(msg.sender) >= _balanceVusdt);
        uint256 amountOut = calculatedAmountOutFromVdusdt(_balanceVusdt);
    
        // transferFrom(msg.sender, address(this), _balanceVusdt);
        burnFrom(msg.sender, _balanceVusdt);
        dusdt.transfer(msg.sender, amountOut);
        emit Withdraw(msg.sender, amountOut, _balanceVusdt);
    }

    function transferToBiops(
        uint256 _amount,
        address _user
    ) external onlyBiops(msg.sender) {
        dusdt.transfer(_user, _amount);
    }

    // helper
    function calculatedAmountOutFromVdusdt(
        uint256 _balanceVusdt
    ) public view returns(uint256) {
        return (dusdt.balanceOf(address(this)) * _balanceVusdt) / totalSupply();
    }

    function calculatedAmountOutFromDusdt(
        uint256 _balanceUsdt
    ) public view returns(uint256) {
        return (totalSupply() * _balanceUsdt) / dusdt.balanceOf(address(this));
    }

    function changeBiopsAddress(
        address _biops
    ) external onlyOwner() {
        BiopsHub = _biops;
    }
}
