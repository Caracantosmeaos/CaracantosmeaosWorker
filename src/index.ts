import express, {Express} from "express"
import database from "./database/mongo"
import { startWorker as startNewMatchesFinderWorker } from "./utils/NewMatchesFinder"
import dotenv from "dotenv"
dotenv.config()

const PORT = Number(process.env.PORT || 80)

//const app:Express = express();


database().then(()=> {
    console.log("Connection to database: OK")

    startNewMatchesFinderWorker()
})
.catch((e)=> console.log("An error ocurred while trying to connect to database:  "+e))

//app.set('trust proxy', true);
//app.listen(PORT, '0.0.0.0');
//console.log("Listening on port "+PORT);