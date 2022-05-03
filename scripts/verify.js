require("dotenv").config();
const { ethers, run } = require("hardhat");

async function main() {
    console.log("Verifying contract ...");
    try {
        await run("verify:verify", {
          address: process.env.DEPLOYED_ADDRESS,
          contract: "contracts/StopLimitOrderWrapper.sol:StopLimitOrderWrapper",
          constructorArguments: [
            process.env.REGISTRY_ADDRESS,
            process.env.GAS_FEE_FORWARDER_ADDRESS,
            process.env.BENTO_BOX_ADDRESS,
            process.env.STOP_LIMIT_ORDER_CONTRACT_ADDRESS,
            process.env.WETH_ADDRESS,
            process.env.UNI_V2_ROUTER_ADDRESS
          ]
        });
    } catch (e) {
        console.log("Error while verifying contract: ", e)
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
