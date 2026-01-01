const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  userid:{
      require:true,
      type:String
    },,
  to: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

emailSchema.index({ sentAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('Email', emailSchema);
