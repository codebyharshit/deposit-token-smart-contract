//SPDX-License-Identifier:MIT

pragma solidity 0.8.7;

import "./Father.sol";

contract Son is Father{
    address public sonAddress ;
    uint deleteToken = 200;

    function checkSon() public returns(bool){
        require(sonAddress==msg.sender,"As son can only withdraw tokens");
        _withdraw(deleteToken);
        return true;
    }

    function _withdraw(uint _token) internal returns(uint){
        require(tokenBalance>1000,"1000token account balance to be maintain ");
        tokenBalance = tokenBalance -_token;
        return tokenBalance;
    }


}
