import { IClubMember } from "@interfaces/clubMember.interface";
import { IClubMemberAchievement } from "@interfaces/clubMemberAchievement.interface";
import { emitMemberAchievement } from "./WeebhookEmitter";

export const checkMemberAchievements = async (member: IClubMember) => {
    const actualAchievements:IClubMemberAchievement[] = member.achievements || []
    
    let newAchievements:IClubMemberAchievement[] = []

    const achievementTypes: { type: "played" | "goals" | "assists" | "redcards" | "passes" | "motm"; step: number; current: number }[] = [
        { type: "played", step: 50, current: member.gamesPlayed },
        { type: "goals", step: 25, current: member.goals },
        { type: "assists", step: 25, current: member.assists },
        { type: "redcards", step: 10, current: member.redCards },
        { type: "passes", step: 500, current: member.passesMade },
        { type: "motm", step: 10, current: member.manOfTheMatch }
    ];

    for (const { type, step, current } of achievementTypes) {
        /**Thanks Chat GPT for the logic clue :D */
        const lastAchievs = actualAchievements.filter(a => a.type === type);
        const lastReached = lastAchievs.length > 0 ? Math.max(...lastAchievs.map(a => a.reached)) : 0;

        if (current >= (lastReached + step)) {
            const newAch:IClubMemberAchievement = {
                player: member,
                type: type,
                reached: Math.floor(current / step) * step
            }
            /** WEBHOOK EMIT **/
            await emitMemberAchievement(newAch)

            newAchievements.push(newAch)
        }
    }

    return newAchievements
}