import {Schema, Types, model} from "mongoose"
import { IMatch } from "@interfaces/match.interface"

const matchSchema = new Schema(
    {
        _id: Number,
        matchId: {
            type: Number,
            required: true
        },
        matchType:{
            type: String,
            enum: ["league", "playoff"],
            required: true
        },
        timestamp: {
            type: Number,
            required: true
        },
        result: {
            type: String,
            enum: ["loose", "tie", "win"],
            required: true
        },
        winnerByDnf: {
            type: Boolean,
            required: true
        },
        winnerByPen: {
            type: Boolean,
            required: true
        },
        ownClub: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            matchStats: {
                goals: {
                    type: Number,
                    required: true
                },
                shots: {
                    type: Number,
                    required: true
                },
                passesMade: {
                    type: Number,
                    required: true
                },
                passesSuccess: {
                    type: Number,
                    required: true
                },
                redCards: {
                    type: Number,
                    required: true
                },
                tacklesMade: {
                    type: Number,
                    required: true
                },
                tackleSuccess: {
                    type: Number,
                    required: true
                }
            },
            players: {
                type: Array,
                required: true
            }
        },
        opponentClub: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            matchStats: {
                goals: {
                    type: Number,
                    required: true
                },
                shots: {
                    type: Number,
                    required: true
                },
                passesMade: {
                    type: Number,
                    required: true
                },
                passesSuccess: {
                    type: Number,
                    required: true
                },
                redCards: {
                    type: Number,
                    required: true
                },
                tacklesMade: {
                    type: Number,
                    required: true
                },
                tackleSuccess: {
                    type: Number,
                    required: true
                }
            },
            players: {
                type: Array,
                required: true
            }
        }
    },
    {
        _id: false,
        timestamps: true,
        versionKey: false
    }
)

const MatchModel = model("matches", matchSchema)
export default MatchModel