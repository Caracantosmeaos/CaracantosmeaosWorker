import {IClubMember} from "@interfaces/clubMember.interface"
import MemberModel from "@models/clubMember.model"


const updateOne = async (member: IClubMember) => {
    //var model = new MemberModel(member)
    const response = await MemberModel.updateOne({playerName: member.playerName}, member, {upsert: true})
    return response
}


export {updateOne}