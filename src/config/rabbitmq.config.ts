import amqp from "amqplib";

import dotenv from "dotenv"
dotenv.config()

const EXCHANGE_NAME = 'events';

export async function createConnection() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });

    return { connection, channel };
}

export {EXCHANGE_NAME}