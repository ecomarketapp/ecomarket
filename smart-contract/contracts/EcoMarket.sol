// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EcoMarket is Pausable, Ownable, ReentrancyGuard {

    using ECDSA for bytes32;

    //Track used msgHashes to prevent replay
    mapping(bytes => bool) public msgHashes;

    mapping(address => uint256) private balances;

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

        address signer = msgHash.toEthSignedMessageHash()
        .recover(signature);
        
        require(signer == company, "Unauthorized!");

        msgHashes[signature] = true;
        balances[company] -= amount;

        require(payable(msg.sender).send(amount), "Error");
    }

    function addToEscrow() public payable whenNotPaused {
        require(msg.value > 0, "Invalid amount");

        balances[msg.sender] += msg.value;
    }

    function removeFromEscrow(uint256 amount) public whenNotPaused {
        require(amount > balances[msg.sender], "Invalid amount");
        require(address(this).balance > amount, "Insufficient balance!");

        balances[msg.sender] -= amount;

        require(payable(msg.sender).send(amount), "Error");
    }

    function _getHash(uint256 amount, uint256 nonce, address company) private view returns (bytes32) {
        return keccak256(abi.encodePacked(msg.sender, amount, nonce, company));
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