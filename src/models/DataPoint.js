import mongoose from "mongoose";

const { Schema } = mongoose;

const dataPointSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    time_stamp: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    station_id: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    wind_speed: {
      type: Number,
      required: true,
    },
    wind_direction: {
      type: String,
      required: true,
    },
    rainfall: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.DataPoint ||
  mongoose.model("DataPoint", dataPointSchema);
