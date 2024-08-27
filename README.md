# NFTvault
#### ERC721 > ERC20 Token Vault

NFTVault is a Solidity smart contract that allows users to deposit their ERC721 NFTs into a vault in exchange for ERC20 tokens. For each NFT they deposit they get one token. These tokens can later be used to reclaim the NFTs. The contract is built using the OpenZeppelin library for ERC20 and ERC721 standards.

It was inspired by the CryptoKitties WG0 token contract and I just wanted to create a modern version.

## Features

- **Deposit Multiple NFTs**: Users can deposit multiple ERC721 NFTs in a single transaction. Upon depositing NFTs, the contract mints an equivalent number of ERC20 tokens (1 token per NFT).
- **Reclaim NFTs**: Users can reclaim their NFTs by burning the corresponding number of ERC20 tokens.
- **Events**: The contract emits events when NFTs are deposited and reclaimed.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Hardhat**: A development environment for Ethereum.

Install the necessary dependencies:

```bash
npm install
npx hardhat test
```

## Disclaimer

This code has not been security audited and is provided for educational purposes only. It may contain bugs or vulnerabilities that could lead to the loss of assets. This contract is not intended for production use, especially in environments where financial assets are involved. Use at your own risk.

## License

This project is licensed under the MIT License 

## Links

- [Website](https://jamesbachini.com)
- [YouTube](https://www.youtube.com/c/JamesBachini?sub_confirmation=1)
- [Substack](https://bachini.substack.com)
- [Podcast](https://podcasters.spotify.com/pod/show/jamesbachini)
- [Spotify](https://open.spotify.com/show/2N0D9nvdxoe9rY3jxE4nOZ)
- [Twitter](https://twitter.com/james_bachini)
- [LinkedIn](https://www.linkedin.com/in/james-bachini/)
- [GitHub](https://github.com/jamesbachini)
