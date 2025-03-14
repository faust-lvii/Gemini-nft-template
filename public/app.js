// NFT Sözleşme ABI'si (Hardhat derleme çıktısından alınacak)
// Bu sadece bir örnek ABI, gerçek ABI sözleşme derlendikten sonra artifacts klasöründen alınmalıdır
const contractABI = [
  "function mintNFT(address recipient, string memory tokenURI) public payable returns (uint256)",
  "function totalSupply() public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function mintPrice() public view returns (uint256)"
];

// Sözleşme adresi (deploy edildikten sonra güncellenecek)
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Örnek NFT verileri
const sampleNFTs = [
  {
    id: 1,
    name: "Antik Mısır NFT #1",
    description: "Firavunlar Diyarı - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_a62l4sa62l4sa62l.jpeg",
    price: "0.05"
  },
  {
    id: 2,
    name: "Antik Mısır NFT #2",
    description: "Piramitler ve Sfenks - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_e9r9ooe9r9ooe9r9.jpeg",
    price: "0.05"
  },
  {
    id: 3,
    name: "Antik Mısır NFT #3",
    description: "Hiyeroglifler - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_h5ofb8h5ofb8h5of.jpeg",
    price: "0.05"
  },
  {
    id: 4,
    name: "Antik Mısır NFT #4",
    description: "Tanrılar ve Mitoloji - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_iaa3tgiaa3tgiaa3.jpeg",
    price: "0.05"
  },
  {
    id: 5,
    name: "Antik Mısır NFT #5",
    description: "Nil Nehri - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_mf0jnsmf0jnsmf0j.jpeg",
    price: "0.05"
  },
  {
    id: 6,
    name: "Antik Mısır NFT #6",
    description: "Firavun Hazinesi - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_yd53rtyd53rtyd53.jpeg",
    price: "0.05"
  },
  {
    id: 7,
    name: "Antik Mısır NFT #7",
    description: "Antik Tapınaklar - Antik Mısır Koleksiyonu",
    image: "images_egypt/Gemini_Generated_Image_ywu01jywu01jywu0.jpeg",
    price: "0.05"
  }
];

// Global değişkenler
let provider;
let signer;
let contract;
let userAddress;

// Sayfa yüklendiğinde
window.addEventListener('DOMContentLoaded', async () => {
  // NFT örneklerini göster
  displaySampleNFTs();
  
  // Cüzdan bağlantı butonunu ayarla
  document.getElementById('connectWallet').addEventListener('click', connectWallet);
  
  // Mint butonunu ayarla
  document.getElementById('mintNFT').addEventListener('click', mintNewNFT);
  
  // Ethereum sağlayıcısını kontrol et
  checkIfWalletIsConnected();
});

// Örnek NFT'leri göster
function displaySampleNFTs() {
  // Statik kartlar zaten HTML'de olduğu için dinamik kart oluşturmaya gerek yok
  // Bu fonksiyon sadece butonların işlevselliğini ayarlar
  
  // Örnek NFT mint butonlarını ayarla
  document.querySelectorAll('.mint-sample').forEach(button => {
    button.addEventListener('click', (e) => {
      const nftId = e.target.getAttribute('data-id');
      const nft = sampleNFTs.find(n => n.id == nftId);
      
      document.getElementById('nftTokenURI').value = `metadata/${nftId}`;
      document.getElementById('mintNFT').click();
    });
  });
}

// Cüzdan bağlantısını kontrol et
async function checkIfWalletIsConnected() {
  try {
    // Modern tarayıcılarda Ethereum sağlayıcısını kontrol et
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Kullanıcı zaten bağlı mı kontrol et
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        await connectWallet();
      }
    } else {
      console.log("Ethereum sağlayıcısı bulunamadı. MetaMask yüklü mü?");
    }
  } catch (error) {
    console.error("Cüzdan bağlantısı kontrol edilirken hata:", error);
  }
}

// Cüzdanı bağla
async function connectWallet() {
  try {
    if (!window.ethereum) {
      alert("Lütfen MetaMask yükleyin!");
      return;
    }
    
    // Kullanıcıdan cüzdan erişimi iste
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    
    // Sözleşme bağlantısını oluştur
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    // Cüzdan bilgilerini göster
    document.getElementById('walletAddress').textContent = shortenAddress(userAddress);
    
    // Bakiyeyi göster
    const balance = await provider.getBalance(userAddress);
    document.getElementById('walletBalance').textContent = ethers.utils.formatEther(balance).substring(0, 6);
    
    // Cüzdan bilgi alanını göster
    document.getElementById('walletInfo').style.display = 'block';
    
    // Bağlantı butonunu güncelle
    document.getElementById('connectWallet').textContent = 'Bağlandı';
    document.getElementById('connectWallet').disabled = true;
    
    // Alıcı adresini otomatik doldur
    document.getElementById('nftRecipient').value = userAddress;
    
    console.log("Cüzdan bağlandı:", userAddress);
  } catch (error) {
    console.error("Cüzdan bağlanırken hata:", error);
  }
}

// Yeni NFT mint et
async function mintNewNFT() {
  try {
    if (!contract) {
      alert("Lütfen önce cüzdanınızı bağlayın!");
      return;
    }
    
    const recipient = document.getElementById('nftRecipient').value;
    const tokenURI = document.getElementById('nftTokenURI').value;
    
    if (!recipient || !tokenURI) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    
    if (!ethers.utils.isAddress(recipient)) {
      alert("Geçerli bir Ethereum adresi girin!");
      return;
    }
    
    // Mint fiyatını al
    const mintPrice = await contract.mintPrice();
    
    // Mint işlemini başlat
    const mintStatus = document.getElementById('mintStatus');
    mintStatus.innerHTML = '<div class="alert alert-info">NFT mint ediliyor, lütfen bekleyin...</div>';
    
    const tx = await contract.mintNFT(recipient, tokenURI, {
      value: mintPrice
    });
    
    mintStatus.innerHTML = '<div class="alert alert-warning">İşlem onaylanıyor...</div>';
    
    // İşlem onayını bekle
    const receipt = await tx.wait();
    
    mintStatus.innerHTML = '<div class="alert alert-success">NFT başarıyla mint edildi!</div>';
    console.log("NFT mint edildi:", receipt);
    
    // 3 saniye sonra durumu temizle
    setTimeout(() => {
      mintStatus.innerHTML = '';
    }, 3000);
  } catch (error) {
    console.error("NFT mint edilirken hata:", error);
    document.getElementById('mintStatus').innerHTML = `<div class="alert alert-danger">Hata: ${error.message}</div>`;
  }
}

// Adresi kısalt
function shortenAddress(address) {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}
