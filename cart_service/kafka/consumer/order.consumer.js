import kafka from '../kafka.js'
import { handleOrderEvent } from '../../services/cartService.js'
import { EVENT_TOPICS } from '../../constants/event.topics.js'

const consumer = kafka.consumer({
    groupId: 'cart_service_group'
})

export const startOrderConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: EVENT_TOPICS.ORDER_TOPIC,
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({message}) => {
            const event = JSON.parse(message.value.toString())

            await handleOrderEvent(event)
        }
    })

}