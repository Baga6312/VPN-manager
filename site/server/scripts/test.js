const {exec} = require("child_process")

module.exports.test = () => { 
  exec("sudo pacman -Syu --noconfirm " , (stderr,err, stdout )=> { 
    if (stderr){ 
      console.log(stderr)
    }else if (err) { 
      console.log(err)
    }else { 
      console.log(stdout)
    }
    }
  )}



