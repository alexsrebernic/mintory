// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract MockSwapRouter is ISwapRouter {
    uint256 public amountOut;

    function setAmountOut(uint256 _amountOut) external {
        amountOut = _amountOut;
    }

    function exactInputSingle(ExactInputSingleParams calldata params) external payable override returns (uint256) {
        return amountOut;
    }

    function exactInput(ExactInputParams calldata params) external payable override returns (uint256) {
        return amountOut;
    }

    function exactOutputSingle(ExactOutputSingleParams calldata params) external payable override returns (uint256) {
        return params.amountInMaximum;
    }

    function exactOutput(ExactOutputParams calldata params) external payable override returns (uint256) {
        return params.amountInMaximum;
    }
}