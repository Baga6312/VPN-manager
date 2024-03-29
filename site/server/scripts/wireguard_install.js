const os = require("os")
const fs = require("fs") 
const {exec} = require("child_process");


const Get_Dist = () => { 
  const fileContent =  fs.readFileSync('/etc/os-release' , 'utf-8'  )
  return fileContent.split('\n')[0].split('"')[1]
}
 
const Download_the_linux_shit = () => {

    if (getDist() == "Arch Linux") { 
       exec("sudo pacman -S linux-headers base-devel pkg-config" , (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`)
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
          }
        console.log(`stdout: ${stdout}`)})

        exec("sudo pacman -S --noconfirm  wireguard", (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`)
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
          }else { 
          console.log(`stdout: ${stdout}`)})
        
    } else if (getDist() == "Ubuntu") {

        exec("sudo apt-get install libelf-dev linux-headers-$(uname -r) build-essential pkg-config" , (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`)
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
          }
          else console.log(`stdout: ${stdout}`)})
        exec("sudo apt install -y wireguard", (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`)
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)
          return;
        } else {
          console.log(`stdout: ${stdout}`)
        }
      })
}

const Check_Chocolaty = () => { 
  exec("" ,  (error , stdout)=> { 
    if (error) { 
      console.log(`Error: ${error.message}`)
      return ; 
    } 
    if (stdout) { 
        console.log(stdout)
        return  ; 
    }
  })
}
  // the only way is to compile from source and use the executable 
  // TODO : scripts 
  // download the github repo 
  // building 
  // find a way to use make without downloading it 
  //   functions to be made  : 
  //        checkChocolaty()
  //        checkMake()
  //        checkGit()

Check_Chocolaty()
  // const Download_wingay_shit = () => { 
  // }
