const db = require('../app/models');

const Company = db.companies;
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

const seedCompanies = [
  {
    name: 'Darabong Plastics Co.',
    contact_person: 'Darabong E.',
    contact_email: 'darabong_e@gmail.com',
    contact_phone: '+23055053879',
    wallet_address: '1234567890abc',
    wallet_provider: `tronlink`,
    verified_at: '2022-10-12',
  },
  {
    name: 'ChainBuilder Bottling Co.',
    contact_person: 'ChainBuilder PO',
    contact_email: 'habibidev@proton.me',
    contact_phone: '+23055053879',
    wallet_address: 'abc1234567890abc',
    wallet_provider: `tronlink`,
    verified_at: '2022-10-12',
  },
];

const seedDB = async () => {
  await Company.deleteMany({});
  await Company.insertMany(seedCompanies);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
