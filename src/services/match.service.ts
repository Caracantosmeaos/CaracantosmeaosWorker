import {IMatch} from "@interfaces/match.interface"
import MatchModel from "@models/match.model"

const insertOne = async (match: IMatch) => {
    var model = new MatchModel(match)
    model._id = match.matchId
    const response = await MatchModel.create(model)
    return response
}

const getLatest = async () => {
    const response = await MatchModel.find().sort({timestamp: -1}).limit(1)
    return response
}

export {insertOne, getLatest}