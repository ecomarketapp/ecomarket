const db = require('../app/models');

const Locations = db.locations;
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

const seedLocations = [
  {
    name: 'Adams Arcade',
    state: 'Nairobi City',
    country: `Kenya`
  },
  {
    name: 'Airport North',
    state: 'Nairobi City',
    country: `Kenya`
  },
  {
    name: 'Airport View',
    state: 'Nairobi City',
    country: `Kenya`
  },
  {
    name: `Akiba South 'C'`,
    state: 'Nairobi City',
    country: `Kenya`
  },
  {
    name: 'Amboseli',
    state: 'Nairobi City',
    country: `Kenya`
  },
  {
    name: 'Ongata Rongai',
    state: 'Nairobi City',
    country: `Kenya`
  },
  {
    name: 'Outer Ring Road',
    state: 'Nairobi City',
    country: `Kenya`
  },
];

const seedDB = async () => {
  await Locations.deleteMany({});
  await Locations.insertMany(seedLocations);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
