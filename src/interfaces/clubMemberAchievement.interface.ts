import { IClubMember } from "./clubMember.interface";

export interface IClubMemberAchievement {
    player?: IClubMember
    type: "played" | "goals" | "assists" | "redcards" | "passes" | "motm"
    reached: number
}