const db = require('../app/models');

const Requests = db.requests;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const seedRequests = [
  {
    title: 'Only 120kg of PET Bottles',
    description: 'description of 120kg of PET Bottles',
    scrap_category: '6428561159b04335f8d8e71e',
    scrap_subcategory: '6428561159b04335f8d8e732',
    quantity_required: 200,
    amount_per_unit: 700,
    collection_center: '642dcfab6ac76c2e7a2633ff',
    company: '642dcf9cda01b4cdf1749f41',
    location: '642dcf8d8232f6c535dee4fd',
  }
];

const seedDB = async () => {
  await Requests.deleteMany({});
  await Requests.insertMany(seedRequests);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
