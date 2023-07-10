const amqp = require('amqplib')
const config = require('./config/rabbitmq')

class Producer {
    channel;

    async createChannel() {
        const connection = await amqp.connect(config.url);
        this.channel = await connection.createChannel()
    }

    async sendMessage(routingKey, data) {
        if(!this.channel) {
            await this.createChannel()
        }

        const { exchangeName } = config;
        await this.channel.assertExchange(exchangeName, 'direct')

        const details = {
            queueType: routingKey,
            data: data
        }

        await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(details)))

        console.log(`The new '${routingKey}' log is sent to exchange ${exchangeName}`)

    }
}

module.exports = Producer