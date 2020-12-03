const mongoose = require("mongoose");
const { Schema } = mongoose;

const dayPlanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  day: String,
  date: String,
  plan: {
    breakfast: [{ type: Schema.Types.Mixed, ref: "Recepie" }],
    lunch: [{ type: Schema.Types.Mixed, ref: "Recepie" }],
    dinner: [{ type: Schema.Types.Mixed, ref: "Recepie" }],
    snacks: [{ type: Schema.Types.Mixed, ref: "Recepie" }],
  },
  userId: { type: String, ref: "User" },
});

module.exports = mongoose.model("DayPlan", dayPlanSchema);
