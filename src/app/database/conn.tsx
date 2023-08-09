import mongoose from "mongoose";

const connectMongo = async (): Promise<boolean> => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URL ?? '');

        if (connection.readyState === 1) {
            return true;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

    return false;
};

export default connectMongo;