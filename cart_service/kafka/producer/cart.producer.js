import kafka from '../kafka.js'
import { EVENTS } from '../../constants/event.constants.js'
import { EVENT_TOPICS } from '../../constants/event.topics.js'

const producer = kafka.producer()

export const connectProducer = async () => {
    await producer.connect()
    console.log('Kafka producer connected')
}

export const publishCartDeleted = async (productIds) => {
    await producer.send({
        topic: EVENT_TOPICS.CART_TOPIC,
        messages: [
            {
                value: JSON.stringify({
                    eventType: EVENTS.CART_DELETED,
                    data: {
                        productIds: productIds
                    }
                })
            }
        ]
    })
}