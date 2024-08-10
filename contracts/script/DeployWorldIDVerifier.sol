// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/WorldIDVerifiedNFT.sol"; // Make sure this path is correct

contract DeployWorldIDVerifiedNFT is Script {
    function run() external {
        // Retrieve the private key from the environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the WorldIDVerifiedNFT contract
        WorldIDVerifiedNFT nft = new WorldIDVerifiedNFT(
            IWorldID(vm.envAddress("WORLD_ID_ADDRESS")),
            vm.envString("ACTION_ID"),
            "WorldID Verified NFT",
            "WIDNFT"
        );

        console.log("WorldIDVerifiedNFT deployed at:", address(nft));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}