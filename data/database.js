import mongoose from "mongoose";

export const datadb = () => mongoose.connect("process.env.mongo_uri",{
    dbName: "backendapi",
}).then(() => console.log("database connected")).catch((e) => console.log(e))
