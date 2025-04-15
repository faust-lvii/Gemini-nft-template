const hre = require("hardhat");

async function main() {
  // Collection details
  const name = "Modern NFT Collection";
  const symbol = "MNFT";
  const baseURI = "ipfs://YOUR_CID_HERE/";

  // Deploy the contract
  const ModernNFT = await hre.ethers.getContractFactory("ModernNFT");
  const modernNFT = await ModernNFT.deploy(name, symbol, baseURI);

  await modernNFT.deployed();

  console.log(`ModernNFT deployed to: ${modernNFT.address}`);
  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Base URI: ${baseURI}`);
  
  // Verify contract on Etherscan if not on localhost
  if (network.name !== "localhost" && network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    // Wait for 6 block confirmations
    await modernNFT.deployTransaction.wait(6);
    
    // Verify the contract
    console.log("Verifying contract...");
    try {
      await hre.run("verify:verify", {
        address: modernNFT.address,
        constructorArguments: [name, symbol, baseURI],
      });
      console.log("Contract verified on Etherscan");
    } catch (error) {
      console.error("Error verifying contract:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
