# NFT Projesi

Bu proje, Ethereum blok zinciri üzerinde ERC-721 standardını kullanarak NFT (Non-Fungible Token) oluşturmak için bir başlangıç noktasıdır.

## Özellikler

- ERC-721 standardını kullanan akıllı sözleşme
- Maksimum 10,000 NFT basılabilir
- Ayarlanabilir mint fiyatı (varsayılan: 0.05 ETH)
- Sözleşme sahibi için para çekme fonksiyonu
- Kapsamlı test dosyaları

## Gereksinimler

- Node.js (v14 veya üstü)
- npm veya yarn
- Metamask cüzdanı

## Kurulum

1. Proje bağımlılıklarını yükleyin:

```bash
npm install
```

veya

```bash
yarn install
```

2. Akıllı sözleşmeleri derleyin:

```bash
npx hardhat compile
```

3. Testleri çalıştırın:

```bash
npx hardhat test
```

## Dağıtım

1. Yerel geliştirme ağını başlatın:

```bash
npx hardhat node
```

2. Sözleşmeyi yerel ağa dağıtın:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Gerçek bir ağa dağıtmak için (örneğin Rinkeby test ağı), hardhat.config.js dosyasını düzenleyin ve özel anahtarınızı ve RPC URL'nizi ekleyin.

## NFT Metadata

NFT'ler için metadata, IPFS gibi merkezi olmayan bir depolama çözümünde saklanmalıdır. Her NFT için metadata dosyası şu formatta olmalıdır:

```json
{
  "name": "NFT Adı #1",
  "description": "Bu NFT hakkında açıklama",
  "image": "ipfs://YOUR_CID_HERE/1.png",
  "attributes": [
    {
      "trait_type": "Özellik 1",
      "value": "Değer 1"
    },
    {
      "trait_type": "Özellik 2",
      "value": "Değer 2"
    }
  ]
}
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
