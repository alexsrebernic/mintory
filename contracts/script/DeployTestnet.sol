// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import "../src/Caviar.sol";
import "../src/StolenNftFilterOracle.sol";
import {Mintory as RouterMintory} from "../src/Mintory.sol";

contract DeployScript is Script {
    using stdJson for string;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address UNISWAP_FACTORY = vm.envAddress("UNISWAP_FACTORY_TEST");
        address UNISWAP_ROUTER = vm.envAddress("UNISWAP_ROUTER_TEST");
        address UNISWAP_POSITION_MANAGER = vm.envAddress("UNISWAP_POSITION_MANAGER_TEST");
        address WETH = vm.envAddress("WETH_TEST");
        address PRICEFEED = vm.envAddress("PRICEFEED_ETH_USD_TEST");

        StolenNftFilterOracle s = new StolenNftFilterOracle();
        Caviar c = new Caviar(address(s));
        RouterMintory b = new RouterMintory(
            address(c)
        );

        console.log("caviar:", address(c));
        console.log("stolen nft filter oracle:", address(s));
        console.log("mintory:", address(b));
    }
}
