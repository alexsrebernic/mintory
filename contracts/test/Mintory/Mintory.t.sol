// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../shared/Fixture.t.sol";
import "../shared/mocks/MockERC721.sol";

contract MintoryTest is Fixture {
    address public user = address(0x1234);
    address public user2 = address(0x5678);

    function testCreateNFTAndPair() public {
        vm.startPrank(user);
        (address nftAddress, address pairAddress) = m.createNFTAndPair(
            "Test NFT",
            "TNFT",
            "https://example.com/",
            1000,
            address(usd),
            bytes32(0)
        );
        vm.stopPrank();

        assertFalse(nftAddress == address(0), "NFT address should not be zero");
        assertFalse(pairAddress == address(0), "PairContract address should not be zero");

        MockNFT721 createdNFT = MockNFT721(nftAddress);
        assertEq(createdNFT.name(), "Test NFT");
        assertEq(createdNFT.symbol(), "TNFT");
        assertEq(createdNFT.maxSupply(), 1000);
        assertEq(createdNFT.owner(), user);

        Pair createdPair = Pair(pairAddress);
        assertEq(address(createdPair.nft()), nftAddress);
        assertEq(address(createdPair.baseToken()), address(usd));
    }

    // ... rest of your test functions ...
}