import kafka  from '../kafka.js'
import { EVENTS } from '../../constants/event.constants.js'
import { EVENT_TOPICS } from '../../constants/event.topics.js'

const producer = kafka.producer()

export const connectProducer = async () => {
    await producer.connect()
    console.log('Kafka producer connected')
}

export const publishOrderCreated = async (order) => {
    producer.send({
        topic: EVENT_TOPICS.ORDER_TOPIC,
        messages: [
            {
                value: JSON.stringify({
                    eventType: EVENTS.ORDER_CREATED,
                    data: {
                        orderId: order._id,
                        userId: order.userId,
                        totalAmount: order.payableAmount
                    }
                })
            }
        ]
    })
}