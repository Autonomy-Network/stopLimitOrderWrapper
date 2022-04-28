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
                "350000000000000000",
                "14000000000000000000",
                "0x7f16D5c969380E3420E17B4c3456A3844745A578",
                "1651078797",
                "9007199254740991",
                "0",
                "0x0000000000000000000000000000000000000000",
                "0x00000000000000000000000000000000000000000000000000000000000000",
                "350000000000000000",
                "28",
                "0x5dd809f1a9917384bf9ab1f022ad8acfbc85a751ee67f353a1db6d1965c2f07b",
                "0x5ee7c432b2c73732e2f449ec993f4ce9211aa5bcb17d33184394fd5808537fdd"
            ],
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76",
        )
        console.log("\n\nVerify response: ", JSON.stringify(resp))

        // check limit-order
        tx = await stopLimitOrderContract.fillOrder(
            [ 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578",
                "350000000000000000",
                "14000000000000000000",
                "0x7f16D5c969380E3420E17B4c3456A3844745A578",
                "1651078797",
                "9007199254740991",
                "0",
                "0x0000000000000000000000000000000000000000",
                "0x00000000000000000000000000000000000000000000000000000000000000",
                "350000000000000000",
                "28",
                "0x5dd809f1a9917384bf9ab1f022ad8acfbc85a751ee67f353a1db6d1965c2f07b",
                "0x5ee7c432b2c73732e2f449ec993f4ce9211aa5bcb17d33184394fd5808537fdd"
            ],
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76",
            "0x802290173908ed30A9642D6872e252Ef4f6e59A2",
            "0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000003e2c284391c0000000000000000000000000000849f9303ac8fb345e3d07c78a6795d1989d9ce1600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c700000000000000000000000037b608519f91f70f2eeb0e5ed9af4061722e4f76"
        )
        resp = await tx.wait()
        console.log("Response: ", JSON.stringify(resp))
    })

    it("Should fill stop limit order with stopPrice, oracleAddress and oracleData", async () => {
        // check signature verification
        resp = await digestTester.checkDigest(
            [ 
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", // maker
                "350000000000000000",   // amountIn
                "14000000000000000000", // amountOut
                "0x7f16D5c969380E3420E17B4c3456A3844745A578",   // recipient
                "1651074037",   // startTime
                "9007199254740991", // endTime
                "10000000000000000",    // stopPrice
                "0x232d595594585613F48aaE9c85861E4aB06CE3E5",   // oracle address
                "0x000000000000000000000000ebe676ee90fe1112671f19b6b7459bc678b67e8a0000000000000000000000000a77230d17318075983913bc2145db16c73661560000000000000000000000000000000000000000000000000de0b6b3a7640000", // oracle data
                "350000000000000000",   // amountFill
                "27", // v
                "0x535cc7a3e154a2868def8c8b173c62b7b55716a833b1bf51a1c429800a71f450", // r
                "0x6253f1472cf26c9412badfa8e5ba53f1a006589a74cb920ed6f0a77373a7234d" //s
            ],
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            "0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76",
        )
        console.log("Response: ", JSON.stringify(resp))

        // check stop-limit-order
        tx = await stopLimitOrderContract.fillOrder(
            [
                "0x7f16D5c969380E3420E17B4c3456A3844745A578", // maker
                "350000000000000000",   // amountIn
                "14000000000000000000", // amountOut
                "0x7f16D5c969380E3420E17B4c3456A3844745A578",   // recipient
                "1651074037",   // startTime
                "9007199254740991", // endTime
                "10000000000000000",    // stopPrice
                "0x232d595594585613F48aaE9c85861E4aB06CE3E5",   // oracle address
                "0x000000000000000000000000ebe676ee90fe1112671f19b6b7459bc678b67e8a0000000000000000000000000a77230d17318075983913bc2145db16c73661560000000000000000000000000000000000000000000000000de0b6b3a7640000", // oracle data
                "350000000000000000",   // amountFill
                "27", // v
                "0x535cc7a3e154a2868def8c8b173c62b7b55716a833b1bf51a1c429800a71f450", // r
                "0x6253f1472cf26c9412badfa8e5ba53f1a006589a74cb920ed6f0a77373a7234d" //s
            ],
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",   // tokenIn
            "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",   // tokenOut
            "0x802290173908ed30A9642D6872e252Ef4f6e59A2",    // stopLimitOrderReceiver
            "0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000003e2c284391c0000000000000000000000000000849f9303ac8fb345e3d07c78a6795d1989d9ce1600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000b31f66aa3c1e785363f0875a1b74e27b85fd66c7000000000000000000000000c7198437980c041c805a1edcba50c1ce5db95118" // data
        )
    })
});
