require('dotenv').config();
const { ethers } = require("hardhat");
const { defaultAbiCoder } = require('@ethersproject/abi')

const StopLimitOrderAddress = process.env.STOP_LIMIT_ORDER_CONTRACT_ADDRESS

describe("fillOrder()", function () {
    before(async () => {
        [user1] = await ethers.getSigners()
        provider = await ethers.getDefaultProvider("http://localhost:8545");
        console.log("Executor address: ", user1.address)

        const DigestTester = await ethers.getContractFactory("DigestTester");
        digestTester = await DigestTester.deploy()
        console.log('Deployed digestTester at: ', digestTester.address)

        stopLimitOrderContract= await ethers.getContractAt("IStopLimitOrder", StopLimitOrderAddress)
    })

    it("Should fill limit order", async () => {
        // check signature verification
        resp = await digestTester.checkDigest(
            [ 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "12000000", 
                "120000000000000000", 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "1651131698", 
                "9007199254740991", 
                "0", 
                "0x0000000000000000000000000000000000000000", 
                "0x00000000000000000000000000000000000000000000000000000000000000", 
                "12000000", 
                "28", 
                "0xa541c55aead3ed355b1068b047c5ba2f7cdf24f745e16cfa27c987c13d3d174e", 
                "0x23e14f97c93a4efce91b3853682d021bcab593743b72b3f29814c0c81678d2eb" 
            ],
            "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        )
        console.log("\n\nVerify Response: ", JSON.stringify(resp))

        // check limit-order
        tx = await stopLimitOrderContract.fillOrder(
            [ 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "12000000", 
                "120000000000000000", 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "1651131698", 
                "9007199254740991", 
                "0", 
                "0x0000000000000000000000000000000000000000", 
                "0x00000000000000000000000000000000000000000000000000000000000000", 
                "12000000", 
                "28", 
                "0xa541c55aead3ed355b1068b047c5ba2f7cdf24f745e16cfa27c987c13d3d174e", 
                "0x23e14f97c93a4efce91b3853682d021bcab593743b72b3f29814c0c81678d2eb" 
            ],
            "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "0x802290173908ed30A9642D6872e252Ef4f6e59A2",
            "0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000001ff973cafa80000000000000000000000000000849f9303ac8fb345e3d07c78a6795d1989d9ce1600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c7198437980c041c805a1edcba50c1ce5db95118000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c7"
        )
        resp = await tx.wait()
        console.log("Limit Order Response: ", JSON.stringify(resp))
    })

    it("Should fill stop limit order with stopPrice, oracleAddress and oracleData", async () => {
        // check signature verification
        resp = await digestTester.checkDigest(
            [ 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "12000000", 
                "120000000000000000", 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "1651134326", 
                "9007199254740991", 
                "90909090909090900000", 
                "0x232d595594585613F48aaE9c85861E4aB06CE3E5", 
                "0x0000000000000000000000000a77230d17318075983913bc2145db16c7366156000000000000000000000000ebe676ee90fe1112671f19b6b7459bc678b67e8a0000000000000000000000000000000000000000000000000de0b6b3a7640000",
                "12000000",
                "28",
                "0x0ffd78b73c93b807a483d682b864e748584ac725d644e9e5e444907863ae8497", 
                "0x366207715c7ea186315559a3d716e0550c07182c61495358a991b2943b994f45"
            ],
            "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        )
        console.log("Verify Response: ", JSON.stringify(resp))

        // check stop-limit-order
        tx = await stopLimitOrderContract.fillOrder(
            [ 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "12000000", 
                "120000000000000000", 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", 
                "1651134326", 
                "9007199254740991", 
                "90909090909090900000", 
                "0x232d595594585613F48aaE9c85861E4aB06CE3E5", 
                "0x0000000000000000000000000a77230d17318075983913bc2145db16c7366156000000000000000000000000ebe676ee90fe1112671f19b6b7459bc678b67e8a0000000000000000000000000000000000000000000000000de0b6b3a7640000",
                "12000000",
                "28",
                "0x0ffd78b73c93b807a483d682b864e748584ac725d644e9e5e444907863ae8497", 
                "0x366207715c7ea186315559a3d716e0550c07182c61495358a991b2943b994f45"
            ],
            "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "0x802290173908ed30A9642D6872e252Ef4f6e59A2",    // stopLimitOrderReceiver
            "0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000001ff973cafa80000000000000000000000000000849f9303ac8fb345e3d07c78a6795d1989d9ce1600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c7198437980c041c805a1edcba50c1ce5db95118000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c7" // data
        )
    })
});
