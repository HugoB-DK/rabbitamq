const express = require("express")
const router = express.Router()


const commande_controller = require("../controllers/commandeController")

router.get("/commande", commande_controller.commande_get_post)

router.post("/commande", commande_controller.commande_create_post)

module.exports = router

