pragma solidity ^0.4.23;

contract Main {
    uint public replyTracker = 0;
    uint public userTracker = 0;
    mapping (uint => address) userIdToAddress;
    struct User  {uint userId; address userAddress; }
    struct Reply { uint replyId; uint stylistId; uint customerId; string status; }

    User[] public users;
    Reply[] public replies;

    function auth() public returns (uint _userId, address _userAddress) {
        address userAddress = msg.sender;
        for(uint i = 0; i < users.length; i++) {
            if(users[i].userAddress == userAddress) {
                return (users[i].userId, users[i].userAddress);
            }
        }
        userTracker = userTracker + 1;
        uint userId = userTracker;
        users.push(User(userId, userAddress));
        userIdToAddress[userId] = userAddress;
        return (userId, userAddress);
    }

    function newReply(uint _stylistId, uint _customerId) public returns(uint _replyId) {
        replyTracker = replyTracker + 1;
        uint replyId = replyTracker;
        replies.push(Reply(replyId, _stylistId, _customerId, "open"));
        return replyId;
    }

    function getTransactionData(uint _replyId) public view returns (uint _stylistId, uint _customerId) {
    // function getTransactionData(uint _replyId) public view returns (address _stylist, address _customer) {
        uint stylistId;
        uint customerId;
        address stylistAddress;
        address customerAddress;
        for (uint i = 0; i < replies.length; i++) {
            if(replies[i].replyId == _replyId) {
                stylistId = replies[i].stylistId;
                customerId = replies[i].customerId;
            }
        }

        for(uint j = 0; j < users.length; j++) {
            if(users[j].userId == stylistId) {
                stylistAddress = users[j].userAddress;
            }
            if(users[j].userId == customerId) {
                customerAddress = users[j].userAddress;
            }
        }
        return (stylistId, customerId);
        // return (stylistAddress, customerAddress);
    }

}
