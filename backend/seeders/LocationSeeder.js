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
    name: 'Alimosho',
    state: 'Lagos',
  },
  {
    name: 'Ajeromi-Ifelodun',
    state: 'Lagos',
  },
  {
    name: 'Mushin',
    state: 'Lagos',
  },
  {
    name: 'Oshodi-Isolo',
    state: 'Lagos',
  },
  {
    name: 'Ojo',
    state: 'Lagos',
  },
];

const seedDB = async () => {
  await Locations.deleteMany({});
  await Locations.insertMany(seedLocations);
};

seedDB().then(() => {
  db.mongoose.connection.close();
});
