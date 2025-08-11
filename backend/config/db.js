import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB CONNECTED'))
    .catch((err) => {
        console.error('DB CONNECTION ERROR:', err.message);
        process.exit(1); // Exit process with failure
    });
}
