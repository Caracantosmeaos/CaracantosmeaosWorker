import express, {Express} from "express"
import database from "@config/mongodb.config"
import { startWorker as startNewMatchesFinderWorker } from "./utils/NewMatchesFinder"
import dotenv from "dotenv"
dotenv.config()

database().then(()=> {
    console.log("Connection to database: OK")

    startNewMatchesFinderWorker()
})
.catch((e)=> console.log("An error ocurred while trying to connect to database:  "+e))
