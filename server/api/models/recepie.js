const mongoose = require("mongoose");
const { Schema } = mongoose;

const recepieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  category: [{ type: String, required: true }],
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  preparation: [{ type: Schema.Types.Mixed, required: true }],
  // extra: {
  //   time: { type: String, required: false },
  //   servings: { type: String, required: false },
  //   info: { type: String, required: false },
  // },
  recepieImage: { type: String, required: false },
  userId: { type: String, ref: "User" },
});

module.exports = mongoose.model("Recepie", recepieSchema);
