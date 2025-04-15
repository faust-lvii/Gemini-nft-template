const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ModernNFT", function () {
  let ModernNFT;
  let modernNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const name = "Modern NFT Collection";
  const symbol = "MNFT";
  const baseURI = "ipfs://test-cid/";
  const mintPrice = ethers.utils.parseEther("0.05");

  beforeEach(async function () {
    // Get contract factory and signers
    ModernNFT = await ethers.getContractFactory("ModernNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy contract
    modernNFT = await ModernNFT.deploy(name, symbol, baseURI);
    await modernNFT.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await modernNFT.owner()).to.equal(owner.address);
    });

    it("Should set the correct name and symbol", async function () {
      expect(await modernNFT.name()).to.equal(name);
      expect(await modernNFT.symbol()).to.equal(symbol);
    });

    it("Should have the correct base URI", async function () {
      // Set sale state to public to allow minting
      await modernNFT.setSaleState(2); // 2 = Public
      
      // Mint a token to check URI
      await modernNFT.mint(1, { value: mintPrice });
      
      // Check token URI
      expect(await modernNFT.tokenURI(1)).to.equal(`${baseURI}1.json`);
    });
  });

  describe("Minting", function () {
    beforeEach(async function () {
      // Set sale state to public
      await modernNFT.setSaleState(2); // 2 = Public
    });

    it("Should allow minting when sale is active", async function () {
      await modernNFT.mint(1, { value: mintPrice });
      expect(await modernNFT.balanceOf(owner.address)).to.equal(1);
      expect(await modernNFT.ownerOf(1)).to.equal(owner.address);
    });

    it("Should not allow minting when sale is paused", async function () {
      // Pause the sale
      await modernNFT.setSaleState(0); // 0 = Paused
      
      await expect(
        modernNFT.mint(1, { value: mintPrice })
      ).to.be.revertedWith("Sale is paused");
    });

    it("Should require correct payment", async function () {
      const lowPrice = ethers.utils.parseEther("0.04");
      
      await expect(
        modernNFT.mint(1, { value: lowPrice })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should enforce whitelist when in whitelist mode", async function () {
      // Set to whitelist mode
      await modernNFT.setSaleState(1); // 1 = Whitelist
      
      // Try to mint without being whitelisted
      await expect(
        modernNFT.connect(addr1).mint(1, { value: mintPrice })
      ).to.be.revertedWith("Not whitelisted");
      
      // Add addr1 to whitelist
      await modernNFT.addToWhitelist([addr1.address]);
      
      // Now addr1 should be able to mint
      await modernNFT.connect(addr1).mint(1, { value: mintPrice });
      expect(await modernNFT.balanceOf(addr1.address)).to.equal(1);
    });
  });

  describe("Owner functions", function () {
    it("Should allow owner to change mint price", async function () {
      const newPrice = ethers.utils.parseEther("0.1");
      await modernNFT.setMintPrice(newPrice);
      expect(await modernNFT.mintPrice()).to.equal(newPrice);
    });

    it("Should allow owner to change sale state", async function () {
      await modernNFT.setSaleState(1); // 1 = Whitelist
      expect(await modernNFT.saleState()).to.equal(1);
    });

    it("Should allow owner to change base URI", async function () {
      const newBaseURI = "ipfs://new-cid/";
      await modernNFT.setBaseURI(newBaseURI);
      
      // Set sale state to public to allow minting
      await modernNFT.setSaleState(2); // 2 = Public
      
      // Mint a token to check URI
      await modernNFT.mint(1, { value: mintPrice });
      
      // Check token URI
      expect(await modernNFT.tokenURI(1)).to.equal(`${newBaseURI}1.json`);
    });

    it("Should allow owner to withdraw funds", async function () {
      // Set sale state to public
      await modernNFT.setSaleState(2); // 2 = Public
      
      // Mint some tokens to add funds to contract
      await modernNFT.connect(addr1).mint(2, { value: mintPrice.mul(2) });
      
      const initialBalance = await ethers.provider.getBalance(owner.address);
      
      // Withdraw funds
      await modernNFT.withdraw();
      
      const finalBalance = await ethers.provider.getBalance(owner.address);
      
      // Owner's balance should have increased (minus gas costs)
      expect(finalBalance.gt(initialBalance)).to.be.true;
    });
  });
});
