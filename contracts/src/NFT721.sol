// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "openzeppelin/token/ERC721/ERC721.sol";
import "openzeppelin/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin/access/Ownable.sol";
import "openzeppelin/utils/Counters.sol";

contract NFT721 is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string private _baseTokenURI;
    uint256 public immutable maxSupply;

    constructor(string memory name, string memory symbol, string memory baseTokenURI, uint256 _maxSupply) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
        maxSupply = _maxSupply == 0 ? type(uint256).max : _maxSupply;
    }

    function safeMint(address to, string memory uri) public onlyOwner returns (uint256) {
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }


    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory newBaseTokenURI) public onlyOwner {
        _baseTokenURI = newBaseTokenURI;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}