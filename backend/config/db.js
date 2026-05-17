import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL env var is missing. Check backend/.env");
  }

  try {
    await mongoose.connect(mongoUrl, {
      // Atlas SRV connection friendliness
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      w: "majority",
    });

    console.log("database connected");
  } catch (error) {
    console.error("error in connecting database:");
    console.error(`name: ${error?.name}`);
    console.error(`message: ${error?.message}`);
    throw error;
  }
};
