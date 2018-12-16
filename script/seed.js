'use strict'

const db = require('../server/db')
const {User, Inquiry, Reply, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Test',
      email: 'cody@email.com', 
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Test',
      email: 'murphy@email.com', 
      password: '123',
      isAdmin: false
    })
  ])

  const inquiries = await Promise.all([
    Inquiry.create({
      title: 'Looking for a winter coat',
      productType: 'Coat',
      occasion: 'Day-to-day',
      maxPrice: 100000,
      minPrice: 30000,
      status: 'Open',
      description: 'Would prefer a longer coat in a dark color, preferably black or green. Open on the type of fabric.',
      userId: 1
    }),
    Inquiry.create({
      title: 'Looking for a new pair of work shoes',
      productType: 'Shoes',
      occasion: 'Work',
      minPrice: 15000,
      maxPrice: 30000,
      status: 'Closed',
      description: 'Looking for a new pair of brown work shoes. I prefer simple over fashionable. Must hold up well against walking and weather',
      userId: 2
    })
  ])

  const replies = await Promise.all([
    Reply.create({
      title: 'Wool dress coat, black',
      productUrl: 'https://www.bloomingdales.com/shop/product/ted-baker-squish-shearling-collar-overcoat?ID=3011321&CategoryID=3864#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D33%26cm_kws%3Dwool%20coat%20mens%20black%26spp%3D13%26pn%3D1%7C1%7C13%7C33%26rsid%3Dundefined%26smp%3DexactMultiMatch',
      imageUrl: 'https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/9996110_fpx.tif?op_sharpen=1&wid=500&fit=fit,1&$filtersm$',
      description: 'A little dressy for day-to-day, but a great option for work and special occasions',
      status: 'Posted',
      inquiryId: 1,
      userId: 2
    }),
    Reply.create({
      title:'Dark green down parka',
      productUrl:'https://www.bloomingdales.com/shop/product/canada-goose-chilliwack-fur-trimmed-down-bomber-jacket?ID=3067922&CategoryID=3864#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D38%26cm_kws%3Dwinter%20coat%20mens%20green%26spp%3D16%26pn%3D1%7C1%7C16%7C38%26rsid%3Dundefined%26smp%3DexactMultiMatch',
      imageUrl: 'https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/9995360_fpx.tif?op_sharpen=1&wid=500&fit=fit,1&$filtersm$',
      description: 'Great for day-to-day and low temperatures',
      status: 'Posted',
      inquiryId: 1,
      userId: 2
    }),
    Reply.create({
      title: 'Brown dress shoes with buckle detail',
      productUrl: 'https://www.bloomingdales.com/shop/product/kenneth-cole-mens-capital-leather-monk-strap-cap-toe-loafers?ID=3074048&CategoryID=3864#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D52%26cm_kws%3Dbrown%20dress%20shoe%20men%26spp%3D22%26rsid%3Dundefined%26smp%3DexactMultiMatch',
      imageUrl: 'https://images.bloomingdalesassets.com/is/image/BLM/products/2/optimized/10010402_fpx.tif?op_sharpen=1&wid=500&fit=fit,1&$filtersm$',
      description: 'Great work shoe that features a buckle instead of laces',
      status: 'Posted',
      inquiryId: 2,
      userId: 1
    }),
    Reply.create({
      title: 'Great for work and commuting',
      productUrl: 'https://www.bloomingdales.com/shop/product/boss-mens-highline-cap-toe-oxfords-100-exclusive?ID=2424949&CategoryID=3864#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D52%26cm_kws%3Dbrown%20dress%20shoe%20men%26spp%3D2%26pn%3D1%7C1%7C2%7C52%26rsid%3Dundefined%26smp%3DexactMultiMatch',
      imageUrl: 'https://images.bloomingdalesassets.com/is/image/BLM/products/0/optimized/9338810_fpx.tif?op_sharpen=1&wid=500&fit=fit,1&$filtersm$',
      description: 'Great for day-to-day and will hold up against rain and snow',
      status: 'Accepted',
      tip: 1500,
      inquiryId: 2,
      userId: 1
    })
  ])

  const transactions = await Promise.all([
    Transaction.create({
      type: 'Debit',
      amount: 1500,
      description: 'Tip for fulfilling request',
      replyId: 4,
      inquiryId: 2,
      userId: 1
    }),
    Transaction.create({
      type: 'Credit',
      amount: 1500,
      description: 'Tip for fulfilling request',
      replyId: 4,
      inquiryId: 2,
      userId: 2
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${inquiries.length} inquiries`)
  console.log(`seeded ${replies.length} replies`)
  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
