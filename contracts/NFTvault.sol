// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NFTVault is ERC20, IERC721Receiver {
    IERC721 public nftContract;

    event NFTDeposited(address indexed depositor, uint256[] tokenIds);
    event NFTReclaimed(address indexed claimant, uint256[] tokenIds);

    constructor(address _nftContract) ERC20("NFT Vault Token", "NVT") {
        nftContract = IERC721(_nftContract);
    }

    function depositNFTs(uint256[] calldata tokenIds) external {
        uint256 length = tokenIds.length;
        require(length > 0, "No NFTs provided");
        for (uint256 i = 0; i < length; i++) {
            uint256 tokenId = tokenIds[i];
            require(nftContract.ownerOf(tokenId) == msg.sender, "You don't own this NFT");
            nftContract.safeTransferFrom(msg.sender, address(this), tokenId);
        }
        _mint(msg.sender, length * 10**decimals());
        emit NFTDeposited(msg.sender, tokenIds);
    }

    function reclaimNFTs(uint256[] calldata tokenIds) external {
        uint256 tokensToBurn = tokenIds.length * 10**decimals();
        require(balanceOf(msg.sender) >= tokensToBurn, "Insufficient tokens");
        _burn(msg.sender, tokensToBurn);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            require(nftContract.ownerOf(tokenId) == address(this), "NFT not in vault");
            nftContract.safeTransferFrom(address(this), msg.sender, tokenId);
        }
        emit NFTReclaimed(msg.sender, tokenIds);
    }

    function onERC721Received(
        address, address, uint256, bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
