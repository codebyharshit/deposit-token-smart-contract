// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract EtherTransfer {

    address payable father;
    address payable son;
    uint allowance; 
    
    constructor (address payable _father, address payable _son) {
        father = _father;
        son = _son;
    }

    modifier onlyFather() {
        require(father == msg.sender, "Only Father deposit the amount");
        _;
    }

    //receive() external payable {}

    function deposit() external payable onlyFather {}

    function approveAllowance(uint _sonLimit) public {
        require(father == msg.sender, "Only Father approve the allowance");
        allowance = _sonLimit;
    }

    function withdraw(uint _amt) external payable {
        require(son == msg.sender, "only son withdraw the amount");
        require(address(this).balance >= _amt, "Insufficient Balance");
        require(allowance >= _amt, "Allowance limit exhausted");
        son.transfer(_amt);
        allowance -= _amt;
    }

    function getAllowance() public view returns (uint) {
        return allowance;
    }

    function getBalances() public view returns (uint, uint, uint) {
        return (address(this).balance, father.balance, son.balance);
    }

}
