import { Kafka } from 'kafkajs'
import { config } from 'dotenv'

config()

const kafka = new Kafka({
    clientId: 'cart_service',
    brokers: [process.env.KAFKA_BROKER]
})

export default kafka