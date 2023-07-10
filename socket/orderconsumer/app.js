const amqp = require('amqplib')
const config = require('./config')
const http = require('http');
const socketio = require('socket.io');
const express = require('express')

const app = express();

async function consumeOrderData() {
    const connection = await amqp.connect(config.rabbitMQ.url)
    const channel = await connection.createChannel();

    await channel.assertExchange(config.rabbitMQ.exchangeName, 'direct')

    const q = await channel.assertQueue('OrderQueue');
    console.log(q.queue)
    await channel.bindQueue(q.queue, config.rabbitMQ.exchangeName, 'Order')

    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content)
        const { users, orderIds, status } = data.data.message

        // console.log('LOOOPINGGG')
        for(userId of Object.keys(connectedUsers)) {
          
          const userIncluded = users.find(u => u === userId);
          
          if(userIncluded) {
            let socket = connectedUsers[userId]
            socket.emit(`orderChannel-${userId}`, {i: orderIds, status});
          }
        }
        io.emit('message', data)
        channel.ack(msg)
    })
}

const server = http.createServer(app);
const io = socketio(server, { cors: {
  origin: "*",
  methods: ["GET", "POST"],
  optionsSuccessStatus: 204
}});

const clients = {}; // Store socket instances for connected clients
const connectedUsers = {}

io.on('connection', (socket) => {
  console.log('Frontend connected');

  socket.on('registerUserID', id => {
    console.log("user registered to socket ",id)
    connectedUsers[id] = socket;
  })

  socket.on('deregisterUserID', id => {
    delete connectedUsers[id]
  })

  // Store the socket instance for the connected client
  clients[socket.id] = socket;

  socket.on('disconnect', () => {
    console.log('Frontend disconnected');
    // Remove the socket instance for the disconnected client
    delete clients[socket.id];
  });
});

consumeOrderData().catch(console.error)

server.listen(5002, () => {
  console.log('Server listening on port 5002');
});
