module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      // TODO: create hook that auto-generates title
      title: {
        type: String,
        required: [true, 'Request title is required.']
      },
      scrap_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        requred: true,
      },
      scrap_subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        requred: true,
      },
      description: {
        type: String,
        required: true
      },
      unit: {
        type: String,
        enum: ['kg']
      },
      quantity_required: {
        type: Number,
        required: [true]
      },
      amount_per_unit: {
        type: Number,
        required: true
      },
      total_amount: {
        type: Number
      },
      request_expires_at: {
        type: Date,
        required: true
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
      },
      collection_center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollectionCenter',
        required: true,
      },
      location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
      },
      deliveries: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Delivery',
        },
      ],
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Request = mongoose.model('request', schema);
  return Request;
};
