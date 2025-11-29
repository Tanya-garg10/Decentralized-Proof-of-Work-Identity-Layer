const { ethers } = require('ethers');
const fs = require('fs');
const User = require('../models/User');

const provider = new ethers.JsonRpcProvider('<POLYGON_TESTNET_RPC>');
const wallet = new ethers.Wallet('<PRIVATE_KEY>', provider);

const abi = JSON.parse(fs.readFileSync('./blockchain/Identity_sol_Identity.abi', 'utf8'));
const contractAddress = '<DEPLOYED_CONTRACT_ADDRESS>';
const contract = new ethers.Contract(contractAddress, abi, wallet);

async function storeProofOnChain(username, proofHash) {
    const tx = await contract.storeProof(username, proofHash);
    await tx.wait();
    return tx.hash;
}

async function getProofFromChain(username) {
    return await contract.getProof(username);
}

module.exports = { storeProofOnChain, getProofFromChain };