const { ethers } = require("hardhat");

describe("StopLimitOrderWrapper", function() {
    before(async function () {
        [deployer, registry, gasFF, bentoBox, stopLimitOrder] = await ethers.getSigners();
        StopLimitOrderWrapper = await ethers.getContractFactory("StopLimitOrderWrapper");
        stopLimitOderWrapper = await StopLimitOrderWrapper.deploy(
            registry,
            gasFF,
            bentoBox,
            stopLimitOrder,
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        );
    });

    it("Should deploy correctly", async function () {

    });
});
