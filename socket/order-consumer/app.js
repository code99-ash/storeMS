const amqp = require('amqplib')
const config = require('./config')

async function consumePoductData() {
    const connection = await amqp.connect(config.rabbitMQ.url)
    const channel = await connection.createChannel();

    await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct')

    const q = await channel.assertQueue('ProductQueue');
    console.log(q.queue)
    await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, 'Product')

    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content);
        console.log(q.queue, data)
        // channel.ack(msg)
    })
}

consumePoductData()