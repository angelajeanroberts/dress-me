const Main = artifacts.require("../contracts/Main.sol");
const expectEvent = require("../../node_modules/openzeppelin-solidity/test/helpers/expectEvent");

contract("Main", accounts => {
  it("Should initialize with replyTracker, requestTracker, and userTracker", async () => {
    const main = await Main.deployed();
    const replyTracker = await main.replyTracker.call();
    const requestTracker = await main.requestTracker.call();
    const userTracker = await main.userTracker.call();
    assert.equal(replyTracker, 1, "Reply tracker was not initialized at 1");
    assert.equal(requestTracker, 1, "Request tracker was not initialized at 1");
    assert.equal(userTracker, 1, "User tracker was not initialized at 1");
  });

  it("Should create a new ID for a new user", async () => {
    const main = await Main.deployed();
    const userOne = await main.auth({ from: accounts[0] });
    const userTwo = await main.auth({ from: accounts[1] });
    assert.equal(
      userOne.logs[0].args.userId.toNumber(),
      1,
      "First new userId was not created correctly"
    );
    assert.equal(
      userTwo.logs[0].args.userId.toNumber(),
      2,
      "Second new userId was not created correctly"
    );
  });

  it("Should return an existing ID if a user already exists", async () => {
    const main = await Main.deployed();
    const newUser = await main.auth({ from: accounts[1] });
    const existingUser = await main.auth({ from: accounts[1] });
    assert.equal(
      existingUser.logs[0].args.userId.toNumber(),
      newUser.logs[0].args.userId.toNumber(),
      "Existing userId was not retrieved correctly"
    );
  });

  it("Emits an authenticated event when a user connects to the app", async () => {
    const main = await Main.deployed();
    const { logs } = await main.auth({ from: accounts[0] });
    expectEvent.inLogs(logs, "Authenticated", {
      userId: 1,
      userAddress: accounts[0]
    });
  });

  //need to revise
  it("Should return a new replyId when a new reply is posted", async () => {
    const main = await Main.deployed();
    const newId = await main.newReply.call(1, 2);
    assert.equal(newId.toNumber(), 1, "New replyId was not created correctly");
  });
});
