const Commande = require("../models/Commande");
const amqplib = require('amqplib/callback_api');
const queue = 'commandes';
const exchange = 'commandeExchange'
const exchangeType = 'fanout'

exports.commande_get_post = (req, res) => {
    Commande.find({}, (err, commandes) => {
        if(!err){
          res.status(200);
          res.send(commandes);
        }
        else{
          res.status(400);
          res.send({"error": "No commande found", "message": err.message})
        }
      });
}


exports.commande_create_post = (req, res) => {
    console.log(req.body)

    Commande.create({
        name: req.body.name,
        flag: 'commande en cours',
    }, (err,data) => {
      console.log(data)
        if(!err){
            res.status(200);
            res.send("Commande successfully created");
          }
          else{
            res.status(400);
            res.send({"error": "Error", "message": err.message})
          }
    

      //AMQP : Add to queue
      amqplib.connect(process.env.AMQP_URL, (err, conn) => {
        if (err) throw err;
        console.log("Connected to rabbitmq");


        conn.createChannel(async(err, ch) => {
          if (err) throw err;

          await ch.assertExchange(exchange, exchangeType, { durable: true, autoDelete: false })
      
          await ch.assertQueue(queue, {durable: true});

          await ch.bindQueue(queue, exchange, '')

          ch.publish(exchange, '#', Buffer.from(data._id))
      
          // ch.sendToQueue(queue, Buffer.from(data._id))
          console.log("Commande Status : en cours");

        });
      })

    })//.create()

}


