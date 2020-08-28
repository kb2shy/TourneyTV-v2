// const ampq = require('amqplib/callback_api');

// // Create AMQP connection
// ampq.connect('amqp://localhost', (connError, connection) => {
//     if (connError) {
//         throw connError;
//     }

//     // Create Channel
//     connection.createChannel((channelError, channel) => {
//         if (channelError) {
//             throw channelError;
//         }

//         // Assert Queue
//         const QUEUE = "test";
//         channel.assertQueue(QUEUE);

//         // Receive messages
//         channel.consume(QUEUE, (msg) => {
//             console.log(`Message received: ${msg.content}`)
//         }, {
//             noAck: true
//         })

//     })
// })

const amqp = require('amqplib');

const connect = async () => {

    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("test");
        channel.consume("test", msg => {
            console.log(`Message recieved: ${msg.content}`);
        }, {
            noAck: true,
        })
    } catch (error) {
        console.log(error);
    }
}

connect();