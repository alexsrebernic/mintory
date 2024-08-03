// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "solmate/tokens/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_, decimals_) {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
    uint256 currentAllowance = allowance[from][msg.sender];
    require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");

    unchecked {
        allowance[from][msg.sender] = currentAllowance - amount;
    }

    return transfer(from, to, amount);
}

function transfer(address from, address to, uint256 amount) public returns (bool) {
    require(balanceOf[from] >= amount, "ERC20: transfer amount exceeds balance");

    unchecked {
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
    }

    emit Transfer(from, to, amount);
    return true;
}
}