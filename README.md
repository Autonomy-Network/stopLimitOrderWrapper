# StopLimitOrderWrapper

## Deploy
```
npx hardhat --network avalanche run scripts/deploy.js
```

## Test with mainnet fork

```
npx hardhat node --show-accounts --no-deploy
npx hardhat --network localhost test ./test/chainlinkOracleV1.js
```

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
