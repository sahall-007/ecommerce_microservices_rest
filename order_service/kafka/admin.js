import kafka from './kafka.js'
import { EVENT_TOPICS } from '../constants/event.topics.js'

const admin = kafka.admin({
    retry: {
        retries: 5
    }
})

export const createTopic = async () => {
    await admin.connect()

    await admin.createTopics({
        topics: [
            {
                topic: EVENT_TOPICS.ORDER_TOPIC,
                numPartitions: 1,
                replicationFactor: 1
            },
            {
                topic: EVENT_TOPICS.CART_TOPIC,
                numPartitions: 1,
                replicationFactor: 1
            },
            {
                topic: EVENT_TOPICS.PRODUCT_TOPIC,
                numPartitions: 1,
                replicationFactor: 1
            }
        ]
    })

    await admin.disconnect()
}