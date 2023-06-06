import mongoose from 'mongoose';

let isConnected = false;  // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);  // set to avoid getting warnings in console

    if(isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}