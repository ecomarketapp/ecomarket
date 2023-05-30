// SPDX-License-Identifier: GPL-3.0

import "./IERC20.sol";
import "./Pausable.sol";
import "./Ownable.sol";
import "./ReentrancyGuard.sol";
import "./ECDSA.sol";

pragma solidity ^0.8.7;

contract EcoMarket is Pausable, Ownable, ReentrancyGuard {

    using ECDSA for bytes32;

    //Track used msgHashes to prevent replay
    mapping(bytes => bool) public msgHashes;

    mapping(address => uint256) public balances;

    function redeemPaymentFromEscrow(
        uint256 amount,
        uint256 nonce,
        address company,
        bytes memory signature
    ) public whenNotPaused nonReentrant {
        require(address(this).balance > amount, "Insufficient balance!");
        require(msg.sender != company, "Not allowed!");
        require(msgHashes[signature] == false, "Invalid!");

        bytes32 msgHash = _getHash(amount, nonce, company);

        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);
        address signer = VerifyTRXMessage(msgHash, v, r, s);
        
        require(signer == company, "Unauthorized!");

        msgHashes[signature] = true;
        balances[company] -= amount;

        balances[msg.sender] += amount;
        balances[company] += amount;
    }

    function addToEscrow() public payable whenNotPaused {
        require(msg.value > 0, "Invalid amount");

        balances[msg.sender] += msg.value;
    }

    function removeFromEscrow(uint256 amount) public whenNotPaused {
        require(amount < balances[msg.sender], "Invalid amount");
        require(address(this).balance > amount, "Insufficient balance!");

        balances[msg.sender] -= amount;

        require(payable(msg.sender).send(amount), "Error");
    }

    function _getHash(uint256 amount, uint256 nonce, address company) public view returns (bytes32) {
        return keccak256(abi.encodePacked(msg.sender, amount, nonce, company));
    }

    function VerifyTRXMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        bytes memory prefix = "\x19TRON Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }
    
    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            /*
            First 32 bytes stores the length of the signature

            add(sig, 32) = pointer of sig + 32
            effectively, skips first 32 bytes of signature

            mload(p) loads next 32 bytes starting at the memory address p into memory
            */

            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }

        return (r, s, v);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdrawTRX(
        uint256 amount,
        address payable to
    ) public onlyOwner whenNotPaused nonReentrant {
        require(amount > 0, "EcoMarket: Invalid amount");
        require(to.send(amount), "EcoMarket: Not enough balance");
    }

    function withdrawTRC20(
        address tokenAdress,
        uint256 amount,
        address to
    ) public onlyOwner whenNotPaused nonReentrant {
        require(amount > 0, "EcoMarket: Invalid amount");
            IERC20(tokenAdress).transfer(to, amount);
    }

    receive() external payable {}
}