import { app } from "./app.js";
import { datadb } from "./data/database.js";

//function for data base connection
datadb();


app.listen(process.env.port,()=>{
    console.log(`server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`  );
})