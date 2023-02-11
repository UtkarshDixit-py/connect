const express = require('express')
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/',homeController.home)

module.exports = router;console.log("router file is loaded")