import {Schema, model} from "mongoose"
import { IClubMember } from "@interfaces/clubMember.interface"

const clubMemberSchema = new Schema<IClubMember>(
    {
        playerName: {
            type: String,
            required: true,
            unique: true
        },
        proName: {
            type: String,
            required: true
        },
        proPos:{
            type: Number,
            required: true
        },
        proHeight:{
            type: Number,
            required: true
        },
        proOverall:{
            type: Number,
            required: true
        },
        manOfTheMatch:{
            type: Number,
            required: true
        },
        favoritePosition:{
            type: String,
            enum: ["midfielder" , "forward" , "defender" , "goalkeeper"],
            required: true
        },
        gamesPlayed:{
            type: Number,
            required: true
        },
        winRate:{
            type: Number,
            required: true
        },
        goals:{
            type: Number,
            required: true
        },
        assists:{
            type: Number,
            required: true
        },
        cleanSheetsDef:{
            type: Number,
            required: true
        },
        cleanSheetsGK:{
            type: Number,
            required: true
        },
        shots:{
            type: Number,
            required: true
        },
        passesMade:{
            type: Number,
            required: true
        },
        passesSuccess:{
            type: Number,
            required: true
        },
        ratingAve:{
            type: Number,
            required: true
        },
        tacklesMade:{
            type: Number,
            required: true
        },
        tacklesSuccess:{
            type: Number,
            required: true
        },
        redCards:{
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ClubMemberModel = model("members", clubMemberSchema)
export default ClubMemberModel