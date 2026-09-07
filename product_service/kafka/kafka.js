import { Kafka } from 'kafkajs'
import { config } from 'dotenv'

config()

const kafka = new Kafka({
    clientId: 'product_service',
    brokers: [process.env.KAFKA_BROKER],
    retry: {
        retries: 5
    }
})

export default kafka