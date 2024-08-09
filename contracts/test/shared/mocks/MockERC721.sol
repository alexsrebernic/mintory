// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "solmate/tokens/ERC721.sol";
import "openzeppelin/utils/Counters.sol";
import "openzeppelin/access/Ownable.sol";

contract MockNFT721 is ERC721, Ownable {
    using Counters for Counters.Counter;
    event AttemptingMint(address to, uint256 tokenId);
    event MintSuccessful(address to, uint256 tokenId);
    event MintFailed(address to, uint256 tokenId, string reason);

    Counters.Counter private _tokenIdCounter;
    string private _baseTokenURI;
    uint256 public immutable maxSupply;

    constructor(string memory name_, string memory symbol_, string memory baseTokenURI_, uint256 _maxSupply) 
        ERC721(name_, symbol_) 
    {
        _baseTokenURI = baseTokenURI_;
        maxSupply = _maxSupply == 0 ? type(uint256).max : _maxSupply;
    }

    function mint(address to, uint256 id) public {
        _mint(to, id);
    }

  
    function safeMint(address to) public onlyOwner() returns (uint256)  {
        uint256 tokenId = _tokenIdCounter.current();
        emit AttemptingMint(to, tokenId);
        if (_tokenIdCounter.current() >= maxSupply) {
            emit MintFailed(to, tokenId, "Max supply reached");
            revert("Max supply reached");
        }       

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit MintSuccessful(to, tokenId);
        return tokenId;
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory newBaseTokenURI) public {
        _baseTokenURI = newBaseTokenURI;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
