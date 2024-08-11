# 👻 Mintory
![New Cover](https://github.com/user-attachments/assets/056ba516-2df8-4b4b-afec-e9493e5fb265)

## 📌 Overview

Mintory.fun was not developed as a solution to any specific problem. Instead, it aims to foster interest, fun, and the extensive use of NFTs, encouraging their use over traditional tokens within the web3 ecosystem.

Pump.fun is a platform within the existing Solana ecosystem that allows anyone to create meme tokens, potentially experience rug pulls, and list tokens on DEXs. This platform enables users to experience both malicious and legitimate activities within the web3 ecosystem, but it is limited to ERC-20 tokens.

In contrast, Mintory.fun prioritizes the Optimism ecosystem while also leveraging various ecosystems using the OP Stack, and it also supports the Base ecosystem with a focus on ERC-721 NFTs. We aim to recognize NFTs as assets with ownership value, creating a vibrant and liquid NFT ecosystem. Therefore, our services are designed to enhance NFT engagement and liquidity, allowing general users to explore and become familiar with web3 through fun, interest, and creativity, thereby gaining extensive experience.

Twitter: https://x.com/mintorydotfun

---
## 🎡 Architecture
![image](https://github.com/user-attachments/assets/ca06a14f-f145-431c-9324-cfd2aa53dd64)

1. **Web3 Login**
    - Users log in to web3 by connecting their wallet (MetaMask, Coinbase, etc.).
2. **NFT Creation**
    - Creators use the "Create" feature to generate their own NFTs.
3. **Authentication and Exposure**
    - If creators want their NFTs displayed at the top of the main screen, they authenticate their credibility using World ID.
4. **NFT Purchase**
    - General users select and purchase the created NFTs.
5. **NFT Resale**
    - If they wish to sell the NFTs, they can list them for resale on the platform.
6. **Automatic Listing**
    - When the generated NFTs reach the set trading threshold within the platform, they are automatically listed on an NFT DEX like Uniswap for trading.

---
## 🔑 Key Points
- **Easy NFT Creation and Trading**:
    - Users can easily create and trade ERC-721 NFTs, learning about NFT creation and trading processes.
- **Liquidity Pools with Stablecoins**:
    - We provide liquidity pools pairing NFTs with USDT or USDC (e.g., NFT 1 : USDT 1), allowing users to buy and sell NFTs at measured prices.
- **Automatic NFT DEX Listing**:
    - NFTs are automatically listed on NFT DEX (e.g., Uniswap) when trading volume reaches a certain level, benefiting NFT creators with better experience and earnings.
- **User Verification Benefits**:
    - Verified users receive special benefits, such as their NFTs being displayed prominently at the top of listings. Unverified users can still use the platform but without these benefits.

---
## 🛠️ Deployments

### How it's Made
We leverage the Optimism network and provide the OP Stack ecosystem along with the Base ecosystem, offering a variety of networks. Additionally, we support Coinbase smart wallets on Base, allowing users to use a broader range of wallets.

**Base**:
Credibility is provided through user authentication using the verification function. Verified creators have their NFTs displayed at the top, allowing for more advertising exposure and providing various benefits. Provides convenience to users of the Base ecosystem by using Coinbase’s dedicated smart wallet.

**Optimism**:
Provides the ability to create and trade NFTs simply by utilizing the Base Network and Optimism Network.

**Block Scout**:
Through Block Scout, users can view their transaction history, on-chain transaction history, and recent and last transactions of specific NFTs in graphical form. This allows users to see real-time on-chain transaction details within the Mintory platform.

**World ID**:
Using World ID, creators can authenticate themselves to enhance their credibility and the value of their NFTs. This allows them to gain benefits and wider exposure. General users can then select and trade safe NFTs, reducing the risk of rug pulls.

### Smart Contract
- caviar: [0xe6370db02a8Fa089F96a81d9F418621795de9630](https://sepolia.basescan.org/address/0xe6370db02a8Fa089F96a81d9F418621795de9630)
- stolen nft filter oracle: [0x9bB1ab47493e28eeaC93d33F98e4E81dBB01b507](https://sepolia.basescan.org/address/0x9bB1ab47493e28eeaC93d33F98e4E81dBB01b507)
- mintory: [0xC5BfcA5E017be91868a719605FDda3eBD6dfb7EC](https://sepolia.basescan.org/address/0xC5BfcA5E017be91868a719605FDda3eBD6dfb7EC)
