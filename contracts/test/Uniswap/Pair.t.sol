pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../../src/Pair.sol";
import "uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import {MockV3Aggregator as MockV3AggregatorContract} from "chainlink/contracts/src/v0.8/tests/MockV3Aggregator.sol";
import "../shared/Fixture.t.sol";

contract PairTest is Test, Fixture {
    Pair pair;


    function setUp() public {
        super.setUp(); // This will call the Fixture constructor
    }

    function testInitialState() public {
        assertEq(pair.uniswapIntegrated(), false);
        assertEq(pair.getMarketCapInUSD(), 0);
    }

    function testThresholdNotReached() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29000e18); // 29,000 tokens, just below threshold

        assertFalse(pair.isThresholdReached());
    }

    function testThresholdReached() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29500e18); // 29,500 tokens

        assertTrue(pair.isThresholdReached());
    }

    function testIntegrateWithUniswap() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29500e18); // 29,500 tokens

        pair.integrateWithUniswap();

        assertTrue(pair.uniswapIntegrated());
        assertApproxEqAbs(pair.totalSupply(), 29500e18 - 3000e18, 1e15); // 3000 tokens should be burned (6000 USD worth)
    }

    function testCannotIntegrateBeforeThreshold() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29000e18); // 29,000 tokens, just below threshold

        vm.expectRevert("Threshold not reached");
        pair.integrateWithUniswap();
    }

    function testCannotIntegrateTwice() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29500e18); // 29,500 tokens

        pair.integrateWithUniswap();

        vm.expectRevert("Already integrated with Uniswap");
        pair.integrateWithUniswap();
    }

    function testBuyBeforeIntegration() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 20000e18); // 20,000 tokens

        uint256 buyAmount = 1000e18;
        uint256 maxInput = 2100e18; // Slightly higher than expected
        pair.buy(buyAmount, maxInput, block.timestamp + 1 hours);

        assertEq(pair.balanceOf(address(this)), 21000e18);
    }

    function testBuyAfterIntegration() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29500e18); // 29,500 tokens

        pair.integrateWithUniswap();

        uint256 buyAmount = 1000e18;
        uint256 maxInput = 2100e18; // Slightly higher than expected
        pair.buy(buyAmount, maxInput, block.timestamp + 1 hours);

        assertEq(pair.balanceOf(address(this)), 27500e18); // 29500 - 3000 (burned) + 1000 (bought)
    }

    function testSellBeforeIntegration() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 20000e18); // 20,000 tokens

        uint256 sellAmount = 1000e18;
        uint256 minOutput = 1900e18; // Slightly lower than expected
        pair.sell(sellAmount, minOutput, block.timestamp + 1 hours);

        assertEq(pair.balanceOf(address(this)), 19000e18);
    }

    function testSellAfterIntegration() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29500e18); // 29,500 tokens

        pair.integrateWithUniswap();

        uint256 sellAmount = 1000e18;
        uint256 minOutput = 1900e18; // Slightly lower than expected
        pair.sell(sellAmount, minOutput, block.timestamp + 1 hours);

        assertEq(pair.balanceOf(address(this)), 25500e18); // 29500 - 3000 (burned) - 1000 (sold)
    }

    function testMarketCapCalculation() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 10000e18); // 10,000 tokens

        assertEq(pair.getMarketCapInUSD(), 20000000 * 10**18); // $20,000,000
    }

    function testPriceChangeEffect() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 10000e18); // 10,000 tokens

        assertEq(pair.getMarketCapInUSD(), 20000000 * 10**18); // $20,000,000

        mockPriceFeed.updateAnswer(2500 * 10**8); // Price increases to $2500 per token

        assertEq(pair.getMarketCapInUSD(), 25000000 * 10**18); // $25,000,000
    }

    function testIntegrationWithPriceChange() public {
        mockPriceFeed.updateAnswer(2000 * 10**8); // $2000 per token
        pair.mint(address(this), 29500e18); // 29,500 tokens

        mockPriceFeed.updateAnswer(2500 * 10**8); // Price increases to $2500 per token

        pair.integrateWithUniswap();

        // 6000 USD worth of tokens should be burned, which is now 2400 tokens (6000 / 2500)
        assertApproxEqAbs(pair.totalSupply(), 29500e18 - 2400e18, 1e15);
    }

    // Add more tests...
}
