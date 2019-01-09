pragma solidity ^0.4.23;

import "../../node_modules/openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";

contract Main is Escrow {
    uint256 public userTracker = 1;
    uint256 public requestTracker = 1;
    uint256 public replyTracker = 1;

    mapping (uint256 => address) userIdToAddress;

    struct User  {uint256 userId; address userAddress; }
    struct Request { uint256 requestId; uint256 customerId; string status; }
    struct Reply { uint256 replyId; uint256 requestId;  uint256 stylistId; string status; }

    User[] public users;
    Request[] public requests;
    Reply[] public replies;

    event Authenticated(uint256 userId, address indexed userAddress);

    function auth() public returns (uint256 _userId, address _userAddress) {
        address userAddress = msg.sender;
        for(uint i = 0; i < users.length; i++) {
            if(users[i].userAddress == userAddress) {
                emit Authenticated(users[i].userId, users[i].userAddress);
                return (users[i].userId, users[i].userAddress);
            }
        }
        uint256 userId = userTracker;
        users.push(User(userId, userAddress));
        userIdToAddress[userId] = userAddress;
        userTracker = userTracker + 1;
        emit Authenticated(userId, userAddress);
        return (userId, userAddress);
    }

    function newRequest(uint256 _customerId) public returns(uint256 _requestId) {
        uint256 requestId = requestTracker;
        requests.push(Request(requestId, _customerId, "open"));
        requestTracker = requestTracker + 1;
        return requestId;
    }

    function newReply(uint256 _stylistId, uint256 _requestId) public returns(uint256 _replyId) {
        uint256 replyId = replyTracker;
        replies.push(Reply(replyId, _requestId, _stylistId, "open"));
        replyTracker = replyTracker + 1;
        return replyId;
    }

    function closeRequest(uint256 _requestId, uint256 _acceptedReplyId) public {
        for(uint i = 0; i < requests.length; i++) {
            if(requests[i].requestId == _requestId) {
                requests[i].status = "closed";
            }
        }
        for(uint j = 0; j < replies.length; j++) {
            if(replies[j].requestId == _requestId) {
                if(replies[j].replyId == _acceptedReplyId) {
                    replies[j].status = "accepted";
                } else {
                    replies[j].status = "rejected";
                }
            }
        }
    }

    function payTip(uint256 _stylistId) public {
        address stylistAddress;
        for(uint i = 0; i < users.length; i++) {
            if(users[i].userId == _stylistId) {
                stylistAddress = users[i].userAddress;
            }
        }
        deposit(stylistAddress);
    }

    function getBalance(uint256 _stylistId) public view returns(uint256 _totalDeposits) {
        address stylistAddress;
        for(uint i = 0; i < users.length; i++) {
            if(users[i].userId == _stylistId) {
                stylistAddress = users[i].userAddress;
            }
        }
        uint256 totalDeposits = depositsOf(stylistAddress);
        return totalDeposits;
    }

    function withdrawTips(uint256 _stylistId) public {
        address stylistAddress;
        for(uint i = 0; i < users.length; i++) {
            if(users[i].userId == _stylistId) {
                stylistAddress = users[i].userAddress;
            }
        }
        withdraw(stylistAddress);
    }

}
