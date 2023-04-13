const FEE = 2.5;

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      delivery_size: {
        type: Number,
      },
      delivery_amount: {
        type: Number,
        // only collected after delivery status is completed
      },
      delivery_proof: {
        // IPFS URL - uploaded file that indicates
        type: mongoose.Schema.Types.Mixed,
      },
      delivery_status: {
        type: String,
        enum: ['AWAITING_APPROVAL', 'APPROVED', 'EXPIRED', 'DELIVERED', 'DISPUTED', 'REWARD_CLAIMED'],
        required: [true, 'Delivery status is required']
      },
      started_at: {
        type: Date,
      },
      approved_at: {
        type: Date,
      },
      expired_at: {
        type: Date,
      },
      delivered_at: {
        type: Date,
      },
      disputed_at: {
        type: Date,
      },
      claimed_at: {
        type: Date,
      },
      approver_signature: {
        type: String
      },
      approver_wallet_address: {
        type: String
      },
      collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collector',
        required: true,
      },
      request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Delivery = mongoose.model('delivery', schema);
  return Delivery;
};
