const os = require("os")
const fs = require("fs") 
const {exec} = require("child_process");


module.exports.getDist = () => { 
  const fileContent =  fs.readFileSync('/etc/os-release' , 'utf-8'  )
  return fileContent.split('\n')[0].split('"')[1]
}
 
module.exports.download_the_linux_shit = () => {
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
        }
        console.log(`stdout: ${stdout}`)})
        
        } else if (getDist() == "Ubuntu")

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
          }
        else console.log(`stdout: ${stdout}`)})
}


module.exports.download_wingay_shit = () => { 
  // the only way is to compile from source and use the executable 
  // TODO : 
  // download the github repo 
  // building 
  // find a way to use make without downloading it 
}

