// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/interfaces/IERC4906.sol";

contract ModernNFT is ERC721Enumerable, Ownable, IERC4906 {
    using Strings for uint256;

    // Maximum number of NFTs that can be minted
    uint256 public constant MAX_SUPPLY = 10000;
    
    // Mint price in ETH
    uint256 public mintPrice = 0.05 ether;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Mapping to track if an address is whitelisted
    mapping(address => bool) public whitelisted;
    
    // Sale state
    enum SaleState { Paused, Whitelist, Public }
    SaleState public saleState = SaleState.Paused;
    
    // Events
    event MintPriceChanged(uint256 newPrice);
    event SaleStateChanged(SaleState newState);
    event BaseURIChanged(string newBaseURI);

    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) {
        _baseTokenURI = baseURI;
    }

    // Mint function
    function mint(uint256 quantity) external payable {
        require(saleState != SaleState.Paused, "Sale is paused");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Would exceed max supply");
        require(msg.value >= mintPrice * quantity, "Insufficient payment");
        
        if (saleState == SaleState.Whitelist) {
            require(whitelisted[msg.sender], "Not whitelisted");
        }
        
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = totalSupply() + 1;
            _safeMint(msg.sender, tokenId);
        }
    }
    
    // Owner functions
    
    // Set mint price
    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
        emit MintPriceChanged(_mintPrice);
    }
    
    // Set sale state
    function setSaleState(SaleState _saleState) external onlyOwner {
        saleState = _saleState;
        emit SaleStateChanged(_saleState);
    }
    
    // Set base URI
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
        emit BaseURIChanged(baseURI);
        emit BatchMetadataUpdate(1, MAX_SUPPLY);
    }
    
    // Add addresses to whitelist
    function addToWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelisted[addresses[i]] = true;
        }
    }
    
    // Remove addresses from whitelist
    function removeFromWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelisted[addresses[i]] = false;
        }
    }
    
    // Withdraw funds
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // Override functions
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }
    
    // ERC-4906 implementation
    function updateTokenMetadata(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "URI query for nonexistent token");
        emit MetadataUpdate(tokenId);
    }
}
