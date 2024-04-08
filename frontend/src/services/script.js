import exec  from 'child_process'


const runcmd = (command) => { 

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(error.message);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send({ stdout, stderr });
  });
    
} 


export default runcmd 