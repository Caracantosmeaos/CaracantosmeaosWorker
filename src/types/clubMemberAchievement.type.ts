import { IClubMember } from "../interfaces/clubMember.interface";

export interface ClubMemberAchievement {
    player: IClubMember
    type: "played" | "goals" | "assists" | "redcards" | "passes" | "motm"
    reached: number
}