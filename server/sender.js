// const amqp = require('amqplib/callback_api');

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
//         const QUEUE = 'test'
//         channel.assertQueue(QUEUE);

//         // Send message to queue
//         channel.sendToQueue(QUEUE, Buffer.from('hello from sender'));
//         console.log( `Message sent ${QUEUE}`);
//     })
// })

const amqp = require('amqplib');

const msg = { message: "test test" }

const connect = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("test");
        channel.sendToQueue("test", Buffer.from(JSON.stringify(msg)));
        console.log(`Message sent ${msg.message}`);

    } catch (error) {
        console.log(error)
    }
}

connect();