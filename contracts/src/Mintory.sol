// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./NFT721.sol";
import {Caviar as CaviarContract} from "./Caviar.sol";
import {Pair as PairContract} from "./Pair.sol";
import "openzeppelin/token/ERC20/IERC20.sol";
import "reservoir-oracle/ReservoirOracle.sol";

contract Mintory {
    CaviarContract public immutable caviar;
    address public immutable uniswapFactory;
    address public immutable swapRouter;
    address public immutable nonfungiblePositionManager;
    address public immutable WETH9;
    mapping(address => mapping(address => bool)) private _tokenApprovals;

    constructor(
        address _caviar,
        address _uniswapFactory,
        address _swapRouter,
        address _nonfungiblePositionManager,
        address _WETH9
    ) {
        caviar = CaviarContract(_caviar);
        uniswapFactory = _uniswapFactory;
        swapRouter = _swapRouter;
        nonfungiblePositionManager = _nonfungiblePositionManager;
        WETH9 = _WETH9;
    }

    function approveToken(address token, uint256 amount) public {
        require(IERC20(token).approve(address(this), amount), "Token approval failed");
        _tokenApprovals[msg.sender][token] = true;
    }

    function approveNFT(address nft) public {
        _tokenApprovals[msg.sender][nft] = true;
    }
    function isTokenApproved(address user, address token) public view returns (bool) {
        return _tokenApprovals[user][token];
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
            merkleRoot,
            uniswapFactory,
            swapRouter,
            nonfungiblePositionManager,
            WETH9,
            priceFeed
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

    function addLiquidityWithNFT(
        address pair,
        uint256 baseTokenAmount,
        uint256[] calldata tokenIds,
        uint256 minLpTokenAmount,
        uint256 minPrice,
        uint256 maxPrice,
        uint256 deadline,
        bytes32[][] calldata proofs,
        ReservoirOracle.Message[] calldata messages
    ) public payable returns (uint256) {
        _validateAndTransferTokens(pair, baseTokenAmount, tokenIds);
        return _addLiquidity(pair, baseTokenAmount, tokenIds, minLpTokenAmount, minPrice, maxPrice, deadline, proofs, messages);
    }

    function _validateAndTransferTokens(address pair, uint256 baseTokenAmount, uint256[] calldata tokenIds) private {
        address nft = PairContract(pair).nft();
        address baseToken = PairContract(pair).baseToken();

        require(isTokenApproved(msg.sender, nft), "NFT not approved");

        if (baseToken != address(0)) {
            require(isTokenApproved(msg.sender, baseToken), "Base token not approved");
            require(IERC20(baseToken).transferFrom(msg.sender, address(this), baseTokenAmount), "Base token transfer failed");
        }

        for (uint256 i = 0; i < tokenIds.length; i++) {
            IERC721(nft).safeTransferFrom(msg.sender, address(this), tokenIds[i]);
        }
        
        IERC721(nft).setApprovalForAll(pair, true);

        if (baseToken != address(0)) {
            IERC20(baseToken).approve(pair, baseTokenAmount);
        }
    }

    function _addLiquidity(
        address pair,
        uint256 baseTokenAmount,
        uint256[] calldata tokenIds,
        uint256 minLpTokenAmount,
        uint256 minPrice,
        uint256 maxPrice,
        uint256 deadline,
        bytes32[][] calldata proofs,
        ReservoirOracle.Message[] calldata messages
    ) private returns (uint256) {
        return PairContract(pair).nftAdd{value: msg.value}(
            baseTokenAmount,
            tokenIds,
            minLpTokenAmount,
            minPrice,
            maxPrice,
            deadline,
            proofs,
            messages
        );
    }


    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }
}