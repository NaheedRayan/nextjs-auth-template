import mongoose from "mongoose";

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!);

        //for debugging
        mongoose.set("debug", true);

        const connection = mongoose.connection;

        connection.on("error", (error) => {
            console.log("Error connecting to database");
            console.log(error);
        });

        connection.on("error", () => {
            console.log("Connected to database");
            process.exit(0);
        });

    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
    }
}