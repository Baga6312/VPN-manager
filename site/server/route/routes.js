const { Router } = require("express") 
const { changeIp } = require("../controllers/controller")

const route = Router()
router.get('/test', changeIp) 


module.exports = router 

