import express, {Express} from "express"
import database from "@config/mongodb.config"
import { startWorker as startNewMatchesFinderWorker } from "./utils/NewMatchesFinder"
import { setupRabbitmqProducers } from "@events/index"

import dotenv from "dotenv"
dotenv.config()

database().then(()=> {
    console.log("Connection to database: OK")
    setupRabbitmqProducers().then(()=>{
        console.log("Connection to rabbitmq: OK")
        startNewMatchesFinderWorker()
    }).catch((er)=> console.log("An error ocurred while trying to connect to rabbitmq:  "+er))

})
.catch((e)=> console.log("An error ocurred while trying to connect to database:  "+e))
