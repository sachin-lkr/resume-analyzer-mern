import app from "./src/app.js"
import connectToDB from "./src/config/database.js";
import "dotenv/config";
const PORT =process.env.PORT


connectToDB()

app.listen(PORT,()=>{
    console.log(`server listen on prot no ${PORT}`)
})