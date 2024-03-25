const os = require("os")
const fs = require("fs") 
const http = require("http") 


const user = os.userInfo().username
 
const download_the_linux_shit = () => { 
const url = 'http://localhost:4444/the_me_image.jpeg'; 
  
  http.get(url,(res) => { 
    // Image will be stored at this path 
    const path = `${__dirname}/files/img.jpeg`;  
    const filePath = fs.createWriteStream(path); 
    res.pipe(filePath); 
    filePath.on('finish',() => { 
        filePath.close(); 
        console.log('Download Completed');  
    }) 
  })
}

const changeIp = () => { 
 // (os.platform() == 'linux') 
 // ? download_the_linux_shit()
 // : console.log("sex")
}

//changeIp()
 download_the_linux_shit()
