// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DummyUSDT is ERC20, Ownable {
    constructor() ERC20("DummyUSDT", "dUSDT") Ownable(msg.sender) {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function faucet(address _user) external {
        _mint(_user, 200 * 10 ** decimals());
    }
}
