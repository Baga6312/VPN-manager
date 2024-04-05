const {Router} = require("express")
const {getuser , postuser , updatestate } = require("../controllers/controllerApi")
const router = Router()

router.get('/' , getuser)
router.post('/' , postuser)
router.put('/' , updatestate)


module.exports = router 
