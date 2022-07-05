//SPDX-License-Identifier:MIT

pragma solidity 0.8.7;

contract Father{
    
    uint tokenBalance;
    address public fatherAddress;
    uint addToken = 2000;

    constructor() {
        fatherAddress = msg.sender;
    }

    function checkFather() public returns(bool){
        require(fatherAddress == msg.sender,"As father can only deposit tokens");
        _deposit(addToken);
        return true;
    }

    function _deposit(uint _token) internal returns(uint){
        tokenBalance = tokenBalance + _token;
        return tokenBalance;
    }
    function checkBalance() public view returns(uint){
        return tokenBalance;

    }

}
