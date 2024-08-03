// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../../src/Mintory.sol";
import {Caviar as CaviarContract} from "../../src/Caviar.sol";
import {Pair as PairContract} from "../../src/Pair.sol";
import "../shared/mocks/MockERC20.sol";
import {NFT721 as MockERC721} from "../../src/NFT721.sol";

contract MintoryTest is Test {
    Mintory public mintory;
    CaviarContract public caviar;
    MockERC20 public mockERC20;
    MockERC721 public mockERC721;
    address public user;
    address public user2;

    function setUp() public {
        caviar = new CaviarContract(address(0)); // We're not using a StolenNftFilterOracle for simplicity
        mintory = new Mintory(address(caviar));
        mockERC20 = new MockERC20("Mock Token", "MTK", 18);
        mockERC721 = new MockERC721("Mock NFT", "MNFT", "https://example.com/", 1000);
        user = address(0x1234);
        user2 = address(0x5678);

        vm.label(address(mintory), "Mintory");
        vm.label(address(caviar), "CaviarContract");
        vm.label(address(mockERC20), "MockERC20");
        vm.label(address(mockERC721), "MockERC721");
        vm.label(user, "User");
        vm.label(user2, "User 2");
    }

    function testApproveToken() public {
        vm.startPrank(user);
        mintory.approveToken(address(mockERC20), 1000);
        assertTrue(mintory.isTokenApproved(user, address(mockERC20)));
        vm.stopPrank();
    }

    function testApproveNFT() public {
        vm.startPrank(user);
        mintory.approveNFT(address(mockERC721));
        assertTrue(mintory.isTokenApproved(user, address(mockERC721)));
        vm.stopPrank();
    }

    function testCreateNFTAndPair() public {
        vm.startPrank(user);
        (address nftAddress, address pairAddress) = mintory.createNFTAndPair(
            "Test NFT",
            "TNFT",
            "https://example.com/",
            1000,
            address(mockERC20),
            bytes32(0)
        );
        vm.stopPrank();

        assertFalse(nftAddress == address(0), "NFT address should not be zero");
        assertFalse(pairAddress == address(0), "PairContract address should not be zero");

        MockERC721 createdNFT = MockERC721(nftAddress);
        assertEq(createdNFT.name(), "Test NFT");
        assertEq(createdNFT.symbol(), "TNFT");
        assertEq(createdNFT.maxSupply(), 1000);
        assertEq(createdNFT.owner(), user);

        PairContract createdPair = PairContract(pairAddress);
        assertEq(address(createdPair.nft()), nftAddress);
        assertEq(address(createdPair.baseToken()), address(mockERC20));
    }


    function testAddLiquidityWithNFT() public {
        vm.startPrank(user);
        (address nftAddress, address pairAddress) = mintory.createNFTAndPair(
            "Test NFT",
            "TNFT",
            "https://example.com/",
            1000,
            address(mockERC20),
            bytes32(0)
        );

        MockERC721 createdNFT = MockERC721(nftAddress);
        for (uint256 i = 0; i < 5; i++) {
            createdNFT.safeMint(user, "https://example.com/");
        }
        createdNFT.setApprovalForAll(address(mintory), true);

        uint256 baseTokenAmount = 1000 * 10**18;
        mockERC20.mint(user, baseTokenAmount);

        // Approve tokens for the Mintory contract
        mockERC20.approve(address(mintory), type(uint256).max);
        mintory.approveToken(address(mockERC20), type(uint256).max);
        mintory.approveNFT(nftAddress);

        console.log("User balance before transfer:", mockERC20.balanceOf(user));
        console.log("Mintory allowance before transfer:", mockERC20.allowance(user, address(mintory)));

        uint256[] memory tokenIds = new uint256[](3);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        tokenIds[2] = 2;

        uint256 lpTokenAmount = mintory.addLiquidityWithNFT(
            pairAddress,
            baseTokenAmount,
            tokenIds,
            1,
            0,
            type(uint256).max,
            block.timestamp + 1 hours,
            new bytes32[][](3),
            new ReservoirOracle.Message[](3)
        );

        vm.stopPrank();

        assertGt(lpTokenAmount, 0, "Should have received LP tokens");
        PairContract pair = PairContract(pairAddress);
        assertEq(pair.fractionalTokenReserves(), 3 * 10**18, "Should have 3 fractional tokens in reserves");
        assertEq(mockERC20.balanceOf(address(pair)), baseTokenAmount, "Pair should have received base tokens");
    }

    function testAddLiquidityWithETH() public {
        vm.startPrank(user);
        (address nftAddress, address pairAddress) = mintory.createNFTAndPair(
            "Test NFT",
            "TNFT",
            "https://example.com/",
            5,
            address(0),
            bytes32(0)
        );

        MockERC721 createdNFT = MockERC721(nftAddress);
        for (uint256 i = 0; i < 5; i++) {
            createdNFT.safeMint(user,  "https://example.com/");
        }
        createdNFT.setApprovalForAll(address(mintory), true);
        mintory.approveNFT(nftAddress);
        require(createdNFT.isApprovedForAll(user, address(mintory)), "NFT not approved");

        uint256 ethAmount = 1 ether;
        uint256[] memory tokenIds = new uint256[](3);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        tokenIds[2] = 2;

        console.log("User ETH balance before transfer:", address(user).balance);
        
        // Fund the user with ETH
        vm.deal(user, ethAmount);

        uint256 lpTokenAmount = mintory.addLiquidityWithNFT{value: ethAmount}(
            pairAddress,
            ethAmount,
            tokenIds,
            1,
            0,
            type(uint256).max,
            block.timestamp + 1 hours,
            new bytes32[][](3),
            new ReservoirOracle.Message[](3)
        );

        vm.stopPrank();

        assertGt(lpTokenAmount, 0, "Should have received LP tokens");
        PairContract pair = PairContract(pairAddress);
        assertEq(pair.fractionalTokenReserves(), 3 * 10**18, "Should have 3 fractional tokens in reserves");
        assertEq(address(pair).balance, ethAmount, "Pair should have received ETH");
    }

    receive() external payable {}
}