require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.6",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      saveDeployments: true,
    },
    hardhat: {
      forking: {
        url: process.env.AVAX_RPC_PROVIDER_URI,
        // blockNumber: 12802046,
      },
      mining: {
        auto: true,
        // interval: 0,
      },
      timeout: 200000000
    },
    ethereum: {
      url: process.env.ETHEREUM_RPC_PROVIDER_URI, 
      chainId: 1,
      gasPrice: "auto",
      accounts: [process.env.PRIVATE_KEY]
    },
    fantom: {
      url: process.env.FANTOM_RPC_PROVIDER_URI, 
      chainId: 250,
      gasPrice: "auto",
      accounts: [process.env.PRIVATE_KEY]
    },
    avalanche: {
      url: process.env.AVAX_RPC_PROVIDER_URI, 
      chainId: 43114,
      gasPrice: "auto",
      accounts: [process.env.PRIVATE_KEY]
    },
    polygon: {
      url: process.env.POLYGON_RPC_PROVIDER_URI, 
      chainId: 137,
      gasPrice: "auto",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
