const hre = require("hardhat");

async function main() {
  // NFT koleksiyonumuzun adı ve sembolü
  const name = "MyAwesomeNFT";
  const symbol = "MANFT";
  
  // NFT metadata'ları için base URI
  // Gerçek bir projede, bu IPFS veya başka bir depolama çözümüne işaret edecektir
  const baseTokenURI = "https://ipfs.io/ipfs/YOUR_CID_HERE/";
  
  // Sözleşmeyi dağıtma
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy(name, symbol, baseTokenURI);
  
  await myNFT.deployed();
  
  console.log("MyNFT deployed to:", myNFT.address);
}

// Hata yönetimi
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
