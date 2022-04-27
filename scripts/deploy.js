require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account: ", deployer.address);

    const StopLimitOrderWrapper = await ethers.getContractFactory("StopLimitOrderWrapper");
    const stopLimitOrderWrapper = await StopLimitOrderWrapper.deploy(
      process.env.REGISTRY_ADDRESS,
      process.env.GAS_FEE_FORWARDER_ADDRESS,
      process.env.BENTO_BOX_ADDRESS,
      process.env.STOP_LIMIT_ORDER_CONTRACT_ADDRESS,
      process.env.WETH_ADDRESS
    );

    console.log("Deployed `stopLimitOrderWrapper` at: ", stopLimitOrderWrapper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
