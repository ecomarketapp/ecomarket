module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ['deposit', 'withdrawal'],
          required: true,
        },
        from_wallet_address: {
            type: String,
            required: true
        },
        to_wallet_address: {
          type: String,
          required: true
        },
        blockchain_url: {
            type: String,
            required: true
        },
        collector: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Collector',
        },
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Company',
        },
      },
      { timestamps: true }
    );
  
    schema.method('toJSON', function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Transaction = mongoose.model('transaction', schema);
    return Transaction;
  };
  