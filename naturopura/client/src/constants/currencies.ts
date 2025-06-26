const SUPPORTED_CURRENCIES = [

    {
        name: "ETHEREUM",
        symbol: "ETH",
        coingeckoId: "ethereum",
        imageUrl: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        networks: [
            {
                name: "SEPOLIA",
                imageUrl: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
                chainId: "11155111",
                contractAddress: import.meta.env.VITE_PAYMENT_CONTRACT_ADDRESS_SEPOLIA,
            },
        ],
    },
    {
        name: "POLYGON",
        symbol: "POL",
        coingeckoId: "matic-network",
        imageUrl: "https://assets.coingecko.com/coins/images/32440/standard/polygon.png?1698233684",
        networks: [
            {
                name: "POLYGON",
                imageUrl: "https://assets.coingecko.com/coins/images/32440/standard/polygon.png?1698233684",
                chainId: "80002",
                contractAddress: import.meta.env.VITE_PAYMENT_CONTRACT_ADDRESS_AMOY,
            },
        ],
    },
    {
        name: "BNB",
        symbol: "BNB",
        coingeckoId: "binancecoin",
        imageUrl: "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970",
        networks: [
            {
                name: "bscTestnet",
                imageUrl: "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970",
                chainId: "97",
                contractAddress: import.meta.env.VITE_PAYMENT_CONTRACT_ADDRESS_BNB,
            },
        ],
    },
];

export default SUPPORTED_CURRENCIES;