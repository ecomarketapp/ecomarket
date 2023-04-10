const db = require('../app/models');

const Requests = db.requests;
const Company = db.companies;
const Category = db.categories;
const CollectionCenter = db.collectioncenter;

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

// get one particular company
const company = await Company.findOne({
  name: 'OladimejiInc'
}).lean().exec();

// get random collection center, and get its location
const collection_center = await CollectionCenter.findOne().populate({
  path: `location`
}).lean().exec();

// get plastic category, and one of it's subcategories
const sub_category = await Category.findOne({
  name: 'PET'
}).lean().exec();
const parent_category = category.parent;

const seedRequests = [
  {
    title: '200kg of PET Bottles',
    description: `We'd like 200kg of PET Bottles to be delivered at our delivery center in Nairobi. See request for more details!`,
    scrap_category: sub_category._id,
    scrap_subcategory: parent_category._id,
    unit: 'kg',
    quantity_required: 200,
    amount_per_unit: 1000,
    total_amount: 200000,
    collection_center: collection_center._id,
    location: collection_center.location._id,
    company: company._id,
  }
];

const seedDB = async () => {
  await Requests.deleteMany({});
  await Requests.insertMany(seedRequests);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
