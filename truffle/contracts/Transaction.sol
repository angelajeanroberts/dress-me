pragma solidity ^0.4.23;

import "./Main.sol"; 

contract Transaction is Main {
    address stylistAddress;
    address customerAddress;
    uint amount;

    // function payTip(uint _replyId) public payable {
    //     amount = msg.value;
    //     // (stylistAddress, customerAddress) = getTransactionData(_replyId);
    // }

    function confirmPayment(address _newAddress) public payable {
        if(msg.sender == stylistAddress) {
            if(_newAddress != stylistAddress) {
                _newAddress.transfer(address(this).balance);
            } else {
                stylistAddress.transfer(address(this).balance);
            }
        }
    }
}