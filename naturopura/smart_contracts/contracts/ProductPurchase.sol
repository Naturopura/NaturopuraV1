// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductPurchase {
    address public owner;
    mapping(string => uint256) public productPrices;
    mapping(string => bool) public purchasedProducts;
    mapping(address => mapping(string => bool)) public userPurchases;
    mapping(address => mapping(string => uint256)) public purchaseTimestamps;

    event ProductPurchased(address indexed buyer, string productId, uint256 amount);
    event ProductPriceSet(string productId, uint256 price);
    event ProductRefunded(address indexed buyer, string productId, uint256 amount);
    event PurchaseCancelled(address indexed buyer, string productId);
    event Withdrawal(uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setProductPrice(string memory productId, uint256 price) external onlyOwner {
        productPrices[productId] = price;
        emit ProductPriceSet(productId, price);
    }

    function purchaseProduct(string memory productId) external payable {
        uint256 price = productPrices[productId];
        require(price > 0, "Product price not set");
        require(msg.value >= price, "Insufficient payment");
        require(!userPurchases[msg.sender][productId], "Product already purchased");

        userPurchases[msg.sender][productId] = true;
        purchasedProducts[productId] = true;
        purchaseTimestamps[msg.sender][productId] = block.timestamp;

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit ProductPurchased(msg.sender, productId, msg.value);
    }

    function hasPurchasedProduct(string memory productId) external view returns (bool) {
        return userPurchases[msg.sender][productId];
    }

    function getPurchaseTimestamp(address buyer, string memory productId) external view returns (uint256) {
        return purchaseTimestamps[buyer][productId];
    }

    function refundPurchase(address buyer, string memory productId) external onlyOwner {
        require(userPurchases[buyer][productId], "Purchase not found");
        uint256 price = productPrices[productId];
        require(price > 0, "Product price not set");

        userPurchases[buyer][productId] = false;
        purchasedProducts[productId] = false;
        purchaseTimestamps[buyer][productId] = 0;

        (bool success, ) = buyer.call{value: price}("");
        require(success, "Refund transfer failed");

        emit ProductRefunded(buyer, productId, price);
    }

    function cancelPurchase(string memory productId) external {
        require(userPurchases[msg.sender][productId], "Purchase not found");

        userPurchases[msg.sender][productId] = false;
        purchasedProducts[productId] = false;
        purchaseTimestamps[msg.sender][productId] = 0;

        emit PurchaseCancelled(msg.sender, productId);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit Withdrawal(balance);
    }
}
