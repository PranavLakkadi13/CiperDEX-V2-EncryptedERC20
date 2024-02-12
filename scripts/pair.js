const { fhenixjs } = require("fhenixjs");
const { deployments,ethers } = require("hardhat");

async function PairTest() {
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    await deployments.fixture(["all"]);

    const MockBTC = await ethers.getContractAt("EncryptedERC20",signer);
    const MockETH = await ethers.getContractAt("EncryptedERC20",signer);

    const x = await MockBTC.name();
    const y = await MockETH.name()

    console.log("The name is ", x);
    console.log("The name is ", y);
}

PairTest().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});