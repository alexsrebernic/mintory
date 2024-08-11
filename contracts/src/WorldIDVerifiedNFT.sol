// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "openzeppelin/token/ERC721/ERC721.sol";
import "solmate/auth/Owned.sol";
import "worldcoin/interfaces/IWorldID.sol";

// Custom library for hashing
library ByteHasher {
    function hashToField(bytes memory value) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(value))) >> 8;
    }
}

contract WorldIDVerifiedNFT is ERC721, Owned {
    using ByteHasher for bytes;

    IWorldID public immutable worldId;
    uint256 public immutable externalNullifierHash;
    uint256 public immutable groupId = 1;
    mapping(uint256 => bool) internal nullifierHashes;

    uint256 private _tokenIds;

    error InvalidNullifier();

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _action,
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Owned(msg.sender) {
        worldId = _worldId;
        externalNullifierHash = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _action)
            .hashToField();
    }

    function verifyAndMint(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // Verify the nullifier hasn't been used
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // Verify the World ID proof
        worldId.verifyProof(
            root,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifierHash,
            proof
        );

        // Mark the nullifier as usedis that
        nullifierHashes[nullifierHash] = true;

        // Mint the NFT
        _tokenIds++;
        _safeMint(signal, _tokenIds);
    }

    function isVerified(address user) public view returns (bool) {
        return balanceOf(user) > 0;
    }
}