import { Channel } from 'amqplib';
import { EXCHANGE_NAME } from '@config/rabbitmq.config';
import { IClubMemberAchievement } from 'srcinterfaces/clubMemberAchievement.interface';


export class PlayerAchievementEvent {
    constructor(private channel: Channel) {}

    async publish(ach:IClubMemberAchievement) {
        await this.channel.publish(EXCHANGE_NAME, 'player.achievement', Buffer.from(JSON.stringify(ach)), {
            persistent: true,
        });
        console.info("[Event System] 'player.achievement' event published into rabbitmq exchange")
    }
}
