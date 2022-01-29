import mongoose from "mongoose";
const connectDB = async () => {
	// Use connect method to connect to the Server
	try {
		await mongoose.connect(process.env.CONNECTION_STRING || "");
		console.log("Your have connected to the database successfully.");
	} catch (e) {
		throw e;
	}
};

export default connectDB;