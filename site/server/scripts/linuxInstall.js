const {exec} = require("child_process");

 
const Download_the_linux_shit = () => {

    if (getDist() == "Arch Linux") { 
          exec("sudo pacman -S linux-headers base-devel pkg-config" , (error, stdout, stderr) => {

          console.log(`stdout: ${stdout}`)})

          exec("sudo pacman -S --noconfirm  wireguard", (error, stdout, stderr) => {

          if (stderr) {

             console.log(`stderr: ${stderr}`)
             return;

          } else { 

             console.log(`stdout: ${stdout}`)

          })
          
    } else if (getDist() == "Ubuntu") {

          exec("sudo apt-get install libelf-dev linux-headers-$(uname -r) build-essential pkg-config" , (error, stdout, stderr) => {

          console.log(`stdout: ${stdout}`)})

          exec("sudo apt install -y wireguard", (error, stdout, stderr) => {

          if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
          } else {
            console.log(`stdout: ${stdout}`)
          }
    })
}

  // the only way is to compile from source and use the executable 
  // TODO : scripts 
  // checkDistro()
  // checkWireguard()
  // Compile_from_source() 

