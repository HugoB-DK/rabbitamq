const Commande = require("../models/Commande");
const amqplib = require('amqplib/callback_api');
const queue = 'commandes';

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
        console.log("Connection rabbitmq");


        conn.createChannel((err, ch) => {
          if (err) throw err;
          console.log("Channel created");
      
          ch.assertQueue(queue, {durable: true});
      
          ch.sendToQueue(queue, Buffer.from(data._id))
          console.log("Commande Status : en cours");

        });
      })

      worker();

    })//.create()

}


//
// WORKER AMQP : Execute la queue RabbitMQ
//

function worker(){
  amqplib.connect(process.env.AMQP_URL, (err, conn) => {
    if (err) throw err;
    console.log("Connection rabbitmq");


    conn.createChannel((err, ch) => {
      if (err) throw err;
      console.log("Channel created");
  
      ch.assertQueue(queue, {durable: true});

      ch.consume(queue, (msg) => {
          if(msg !== null){
      
            console.log("Message :", msg.content.toString());
              Commande.findByIdAndUpdate(msg.content.toString() , {'flag': 'commande terminée'}, {upsert: true}, () => {
                if (err) throw err;
                console.log("Commande updated");
              })
          }
      })

    });
  })
}