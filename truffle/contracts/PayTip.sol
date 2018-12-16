pragma solidity ^0.4.24;

contract PayTip {
    address public client;
    address public stylist;
    uint public tip;
    
    function setTip (address to) public payable {
        client = msg.sender;
        tip = msg.value;
        stylist = to;
    }

    event Sent(address from, address to, uint amount);
    event Cancelled(address to, uint amount);
    
    function finishPayment() public {
        stylist.transfer(address(this).balance);
        emit Sent(client, stylist, tip);
    }

    function undoPayment() public {
        client.transfer(address(this).balance);
        emit Cancelled(client, tip);
    }    
}