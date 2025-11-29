// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    mapping(string => string) public proofs;

    function storeProof(string memory username, string memory proofHash) public {
        proofs[username] = proofHash;
    }

    function getProof(string memory username) public view returns (string memory) {
        return proofs[username];
    }
}
