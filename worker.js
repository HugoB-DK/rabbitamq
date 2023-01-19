const Commande = require("./models/Commande");
const amqplib = require('amqplib/callback_api');
require("./db")
const queue = 'commandes';


//
// WORKER AMQP : Execute la queue RabbitMQ
//

amqplib.connect("amqp://admin:password@ampq_rabbitmq:5672", (err, conn) => {
    if (err) throw err;
    console.log("Connected to rabbitmq");


    conn.createChannel((err, ch) => {
    if (err) throw err;

    ch.assertQueue(queue, {durable: true});

    ch.consume(queue, (msg) => {
        if(msg !== null){

            Commande.findByIdAndUpdate(msg.content.toString() , {'flag': 'commande terminée'}, {upsert: true}, () => {
                if (err) throw err;
                console.log("Commande updated");
                ch.ack(msg);
            })
        }
    })

    });
})