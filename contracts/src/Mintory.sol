// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./NFT721.sol";
import {Caviar as CaviarContract} from "./Caviar.sol";
import "openzeppelin/token/ERC20/IERC20.sol";
import "reservoir-oracle/ReservoirOracle.sol";

contract Mintory {
    CaviarContract public immutable caviar;

    mapping(address => mapping(address => bool)) private _tokenApprovals;

    constructor(
        address _caviar
    ) {
        caviar = CaviarContract(_caviar);
    }

    function _createNFT(
        string memory _name,
        string memory _symbol,
        string memory baseURI,
        uint256 _maxSupply
    ) internal returns (address) {
        NFT721 newNFT = new NFT721(_name, _symbol, baseURI, _maxSupply);
        newNFT.transferOwnership(msg.sender);
        return address(newNFT);
    }

    function _createPair(
        address nft,
        address baseToken,
        bytes32 merkleRoot
    ) internal returns (address) {
        return address(caviar.create(
            nft,
            baseToken,
            merkleRoot
        ));
    }
    function createNFTAndPair(
        string memory _name,
        string memory _symbol,
        string memory baseURI,
        uint256 _maxSupply,
        address baseToken,
        bytes32 merkleRoot
    ) public returns (address nftAddress, address pairAddress) {
        nftAddress = _createNFT(_name, _symbol, baseURI, _maxSupply);
        pairAddress = _createPair(nftAddress, baseToken, merkleRoot);
    }

}