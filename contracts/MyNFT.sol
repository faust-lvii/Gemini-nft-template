// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Maksimum NFT sayısı
    uint256 public constant MAX_SUPPLY = 10000;
    
    // NFT'nin fiyatı (wei cinsinden)
    uint256 public mintPrice = 0.05 ether;
    
    // Base URI
    string private _baseTokenURI;
    
    constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
    }
    
    function mintNFT(address recipient, string memory tokenURI) public payable returns (uint256) {
        require(_tokenIds.current() < MAX_SUPPLY, "Max NFT limit exceeded");
        
        if (msg.sender != owner()) {
            require(msg.value >= mintPrice, "Insufficient funds to mint");
        }
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        return newItemId;
    }
    
    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
