import { EVENT_TOPICS } from '../../constants/event.topics.js'
import kafka from '../kafka.js'
import { handleCartEvent } from '../../services/productService.js'

const consumer = kafka.consumer({
    groupId: 'product_service_group'
})

export const startCartConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({
        topic: EVENT_TOPICS.CART_TOPIC,
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value.toString())

            await handleCartEvent(event)
        }
    })
}