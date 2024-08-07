// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

contract MockNonfungiblePositionManager is INonfungiblePositionManager {
    uint256 public tokenId;

    function setTokenId(uint256 _tokenId) external {
        tokenId = _tokenId;
    }

    function mint(MintParams calldata params) external payable override returns (
        uint256 _tokenId,
        uint128 liquidity,
        uint256 amount0,
        uint256 amount1
    ) {
        return (tokenId, 1000, params.amount0Desired, params.amount1Desired);
    }

    // Implement other functions from INonfungiblePositionManager with empty bodies or mock logic as needed
    function positions(uint256) external pure override returns (
        uint96, address, address, address, uint24, int24, int24, uint128, uint256, uint256, uint128, uint128
    ) {
        return (0, address(0), address(0), address(0), 0, 0, 0, 0, 0, 0, 0, 0);
    }

    function increaseLiquidity(IncreaseLiquidityParams calldata) external payable override returns (uint128, uint256, uint256) {
        return (0, 0, 0);
    }

    function decreaseLiquidity(DecreaseLiquidityParams calldata) external payable override returns (uint256, uint256) {
        return (0, 0);
    }

    function collect(CollectParams calldata) external payable override returns (uint256, uint256) {
        return (0, 0);
    }

    function burn(uint256) external payable override {}

    function createAndInitializePoolIfNecessary(address, address, uint24, uint160) external payable override returns (address) {
        return address(0);
    }
}