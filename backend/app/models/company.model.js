const { isEmail } = require('validator');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Company name is required.'],
      },
      contact_person: {
        tpe: String
      },
      contact_email: {
        type: String,
        required: [true, 'Company email is required.'],
        validate: [isEmail, 'Provided email is invalid.']
      },
      contact_phone: {
        type: String
      },
      wallet_address: {
        type: String,
        required: [true, 'Wallet Address is required for company'],
        unique: [true, 'Wallet address is unique for each copmpany']
      },
      wallet_provider: {
        type: String,
        enum: ['tronlink', 'metamask', 'trustwallet'],
        default: 'tronlink',
        required: [true, 'Wallet Provider is required for each company'],
      },
      verified_status: {
        type: Boolean,
        default: true
      },
      verified_at: Date,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Company = mongoose.model('company', schema);
  return Company;
};
