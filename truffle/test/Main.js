const Main = artifacts.require('../contracts/Main.sol')

contract('Main', accounts => {
  it('Should initialize with replyTracker and userTracker', async () => {
    const main = await Main.deployed()
    const replyTracker = await main.replyTracker.call()
    const userTracker = await main.userTracker.call()
    assert.equal(replyTracker, 0, "Client was not stored correctly")
    assert.equal(userTracker, 0, "Client was not stored correctly")
  })

  it('Should create a new ID for a new user', async () => {
    const main = await Main.deployed()
    const res = await main.auth.call({from: accounts[0]})
    assert.equal(res[0].toNumber(), 1, "New userId was not created correctly")
  })

  it('Should return an existing ID if a user already exists', async () => {
    const main = await Main.deployed()
    const newRes = await main.auth.call({from: accounts[1]})
    const existingRes = await main.auth.call({from: accounts[1]})
    assert.equal(existingRes[0].toNumber(), newRes[0].toNumber(), "Existing userId was not retrieved correctly")
  })

  it('Should return a new replyId when a new reply is posted', async () => {
    const main = await Main.deployed()
    const newId = await main.newReply.call(1, 2)
    assert.equal(newId.toNumber(), 1, "New replyId was not created correctly")
  })

  it('Should return the correct transaction information', async () => {
    const main = await Main.deployed()
    const resStylist = await main.auth.call({from: accounts[1]})
    console.log('stylist', resStylist)
    const resCustomer = await main.auth.call({from: accounts[0]})
    console.log('customer', resCustomer)
    const reply = await main.newReply.call(resStylist[0], resCustomer[0])
    const res = await main.getTransactionData.call(reply)
    console.log(res)
    assert.equal(res[0], accounts[1], "Transaction data was not retrieved correctly")
  })

})
