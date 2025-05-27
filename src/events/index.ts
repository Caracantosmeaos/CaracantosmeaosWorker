import { createConnection } from '@config/rabbitmq.config';
import { NewMatchEvent } from '@events/newMatchEvent.producer';
import { PlayerAchievementEvent } from '@events/playerAchievementEvent.producer';

let matchProducer: NewMatchEvent
let achievementProducer: PlayerAchievementEvent

export async function setupRabbitmqProducers() {
    const { channel } = await createConnection()

    matchProducer = new NewMatchEvent(channel)
    achievementProducer = new PlayerAchievementEvent(channel)
}

export function getMatchProducer() {
    if (!matchProducer) throw new Error('Producer not initialized');
    return matchProducer;
}

export function getAchievementProducer() {
    if (!achievementProducer) throw new Error('Producer not initialized');
    return achievementProducer;
}
