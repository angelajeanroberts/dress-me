const PayTip = artifacts.require('../contracts/PayTip.sol')

contract('PayTip', accounts => {
  it('Should store the deployer address as the client', async () => {
    const payTip = await PayTip.deployed()
    const client = await payTip.client.call()
    assert.equal(client, accounts[0], "Client was not stored correctly")
  })

  it('Should store the tip amount', async () => {
    const payTip = await PayTip.deployed()
    const address = accounts[1]
    await payTip.setTip(address, {value: 1e18, from: accounts[0]})
    const storedTip = await payTip.tip.call()
    assert.equal(storedTip, 1e18, "Tip was not stored correctly")
  })

  it('Should store the stylist address', async () => {
    const payTip = await PayTip.deployed()
    const address = accounts[1]
    await payTip.setTip(address, {value: 1e18, from: accounts[0]})
    const storedStylist = await payTip.stylist.call()
    await payTip.finishPayment()
    assert.equal(storedStylist, accounts[1], "Tip was not stored correctly")
  })

//   it('Should transfer the value of the contract to the stylist', async () => {
//     const payTip = await PayTip.deployed()
//     const address = accounts[1]
//     await payTip.setTip(address, {value: 1e18, from: accounts[0]})
//     const contractPreBalance = await payTip.contractBalance
//     await payTip.finishPayment()
//     const contractBalance = await payTip.contractBalance
//     assert.equal(contractPreBalance, 1e18, "Value was not transferred correctly")
//   })
})
