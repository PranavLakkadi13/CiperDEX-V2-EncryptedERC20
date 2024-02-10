const { ethers } = require('hardhat');
const { fhenixjs } = require("fhenixjs");
const axios = require('axios');
require('dotenv').config();

async function mnemonicToAddress() {
    let words = process.env.MNEMONIC;

    // const mnemonic = ethers.Mnemonic.fromPhrase(words);
    // if (!mnemonic) {
    //     throw new Error("No MNEMONIC in .env file")
    // }
    const wallet = ethers.utils.HDNode.fromMnemonic(words, `m/44'/60'/0'/0/0`);
    // const wallet = ethers.utils.HDNode.fromMnemonic

    console.log("Ethereum address: " + wallet.address);

    await fhenixjs.getFunds(wallet.address);
    return wallet.address;
    // let x = 0x0319069ca5e383e40d6d19fb3e76e8b22b91cf4b0df661850c8e1de01624ab1d10
    // return x
}

async function callFaucet(address) {
    const response = await axios.get(`http://localhost:42000/faucet?address=${address}`);
    await fhenixjs.getFunds("your_wallet_address");
    const data = await response.data;
    console.log(`Success!: ${JSON.stringify(data)}`);
}

mnemonicToAddress()
    .then(address => callFaucet(address))
    .catch(e => console.error(e));