require('dotenv').config();
const { ethers } = require("hardhat");
const { defaultAbiCoder } = require('@ethersproject/abi')

const ChainLinkV1Address = process.env.CHAINLINK_ORACLE_V1_ADDRESS
const testOracleData = "0x000000000000000000000000ebe676ee90fe1112671f19b6b7459bc678b67e8a0000000000000000000000000a77230d17318075983913bc2145db16c73661560000000000000000000000000000000000000000000000000de0b6b3a7640000"

describe("Oracle peek()", function () {
    it("Should return valid price feed", async () => {
        provider = await ethers.getDefaultProvider("http://localhost:8545");
        chainlinkV1Contract= await ethers.getContractAt("IChainLinkPriceOracle", ChainLinkV1Address)

        oracleData = defaultAbiCoder.encode(
            ['address', 'address', 'uint256'], // multiply, divide, decimals
            [
                '0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a',
                '0x0A77230d17318075983913bC2145DB16C7366156',
                '1000000000'
            ]
        )
        oracleReturnData = await chainlinkV1Contract.peek(oracleData)
    
        console.log(JSON.stringify(oracleReturnData))
        console.log("success: ", oracleReturnData[0])
        console.log("Rate: ", oracleReturnData[1].toString())
    })
});
