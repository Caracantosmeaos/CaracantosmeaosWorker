import { Channel } from 'amqplib';
import { EXCHANGE_NAME } from '@config/rabbitmq.config';
import { IMatch } from 'srcinterfaces/match.interface';

export class NewMatchEvent {
    constructor(private channel: Channel) {}

    async publish(match:IMatch) {
        await this.channel.publish(EXCHANGE_NAME, 'match.new', Buffer.from(JSON.stringify(match)), {
            persistent: true,
        });
        console.info("[Event System] 'match.new' event published into rabbitmq exchange")
    }
}
