const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTVault", function () {
    let NFT, nft, NFTVault, vault, owner, addr1, addr2;
    let tokenIds = [1, 2, 3];

    beforeEach(async function () {
        NFT = await ethers.getContractFactory("MockERC721");
        [owner, addr1, addr2, _] = await ethers.getSigners();
        nft = await NFT.deploy();
        for (let i = 0; i < tokenIds.length; i++) {
            await nft.mint(owner.address, tokenIds[i]);
        }
        NFTVault = await ethers.getContractFactory("NFTVault");
        vault = await NFTVault.deploy(nft.target);
    });

    describe("Deposit NFTs", function () {
        it("Should deposit multiple NFTs and mint corresponding tokens", async function () {
            for (let i = 0; i < tokenIds.length; i++) {
                await nft.connect(owner).approve(vault.target, tokenIds[i]);
            }
            await vault.connect(owner).depositNFTs(tokenIds);
            for (let i = 0; i < tokenIds.length; i++) {
                expect(await nft.ownerOf(tokenIds[i])).to.equal(vault.target);
            }
            const expectedBalance = ethers.parseUnits(tokenIds.length.toString(), 18);
            expect(await vault.balanceOf(owner.address)).to.equal(expectedBalance);
        });

        it("Should fail to deposit NFTs not owned by the caller", async function () {
            for (let i = 0; i < tokenIds.length; i++) {
                await nft.connect(owner).approve(vault.target, tokenIds[i]);
            }
            await expect(vault.connect(addr1).depositNFTs(tokenIds)).to.be.revertedWith("You don't own this NFT");
        });
    });

    describe("Reclaim NFTs", function () {
        it("Should allow reclaiming multiple NFTs", async function () {
            for (let i = 0; i < tokenIds.length; i++) {
                await nft.connect(owner).approve(vault.target, tokenIds[i]);
            }
            await vault.connect(owner).depositNFTs(tokenIds);
            await vault.connect(owner).reclaimNFTs(tokenIds);
            for (let i = 0; i < tokenIds.length; i++) {
                expect(await nft.ownerOf(tokenIds[i])).to.equal(owner.address);
            }
            const expectedBalance = ethers.parseUnits("0", 18);
            expect(await vault.balanceOf(owner.address)).to.equal(expectedBalance);
        });

        it("Should fail to reclaim NFTs without enough tokens", async function () {
            for (let i = 0; i < tokenIds.length; i++) {
                await nft.connect(owner).approve(vault.target, tokenIds[i]);
            }
            await vault.connect(owner).depositNFTs(tokenIds);
            await vault.connect(owner).transfer(addr1.address, ethers.parseUnits("3", 18));
            await expect(vault.connect(owner).reclaimNFTs(tokenIds)).to.be.revertedWith("Insufficient tokens");
        });
    });
});
