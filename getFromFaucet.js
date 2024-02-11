const { ethers } = require('hardhat');
const { getFunds,fhenixjs } = require("fhenix-hardhat-plugin");
const axios = require('axios');
require('dotenv').config();

async function mnemonicToAddress() {
    let words = process.env.MNEMONIC;

    // const mnemonic = ethers.Mnemonic.fromPhrase(words);
    // const mnemonic = ethers.Wallet.fromMnemonic(words)
    // if (!mnemonic) {
    //     throw new Error("No MNEMONIC in .env file")
    // }
    const wallet = ethers.utils.HDNode.fromMnemonic(words, `m/44'/60'/0'/0/0`);
    // const wallet = ethers.utils.HDNode.fromMnemonic

    console.log("Ethereum address: " + wallet.address);

    // await fhenixjs.getFunds(wallet.address);
    return wallet.address;
    // let x = 0x0319069ca5e383e40d6d19fb3e76e8b22b91cf4b0df661850c8e1de01624ab1d10
    // return x
}

async function callFaucet(address) {
    const response = await axios.get(`http://localhost:42000/faucet?address=${"0xd7702EB6Ca4C101C918f7d4eaBeDc36e36260482"}`);
    // await fhenixjs.getFunds(address);
    const data = await response.data;
    console.log(`Success!: ${JSON.stringify(data)}`);
}

mnemonicToAddress()
    .then(address => callFaucet(address))
    .catch(e => console.error(e));