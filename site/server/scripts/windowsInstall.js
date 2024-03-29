const { exec, spawn } = require("child_process");
const https = require("https");
const fs = require("fs");

const Install_chocolaty = () => {
  // automating the Execution policy for the user
  // getting the state of the Execution policy
  const checkPolicies = "ExecutionPolicy";
  exec(`Get-${checkPolicies}`, { shell: "powershell.exe" }, (err, stdout) => {
    err
      ? console.log(`Error: ${err}`)
      : stdout == "AllSigned"
      ? null
      : (
        const url = "https://community.chocolatey.org/install.ps1";
        https.get(url, (res) => {
        const path = `${__dirname}/install.ps1`;
        const file_path = fs.createWriteStream(path);
        res.pipe(file_path);
        file_path.on("finish", () => {
          file_path.close();
          console.log("download Complete");
      });
    });
    // installing the script with admin privi as a process
    
        const lsProcess = spawn("powershell", [
          "-command",
          `start-process cmd -verb runas -WindowStyle Hidden -argumentlist '/c powershell C:\\Users\\asma123\\Desktop\\check\\install.ps1' `,
        ]);
  
        lsProcess.stdout.on("data", (data) => {
          console.log(`${data}`);
        });
  
        lsProcess.stderr.on("data", (data) => {
          console.log(`stderr:\n${data}`); // Use "stderr" for error output
        });
  
        lsProcess.on("exit", (code) => {
          console.log(`Process ended with ${code}`);
        });
      )
    });
  };

const Check_Chocolaty = () => {
  // checking if chocolaty exists
    exec("choco -v", (error, stdout) => {
    error 
      ? (false) 
      : (true) ; 
    });
    Install_chocolaty()
  };


const Check_Install_Git = () => { 
  exec("git --version" , (stderr , err , stdout ) => { 
    (stderr)
    ?exec( `powershell -command "start-process cmd -verb runas -WindowStyle Hidden -argumentlist '/c choco install git -y"' `)
    : null ; 
  })
}

const Check_Install_Make = () => { 
  exec("make -v" , (stderr , stdout)=> { 
    (stderr)
    ?exec( `powershell -command "start-process cmd -verb runas -WindowStyle Hidden -argumentlist '/c choco install make -y"' `)
    :null ; 
    console.log(stdout)
  })


// clone the wireguard repo here 
const Install_wireguard = () => { 
exec('git clone https://github.com/WireGuard/wireguard-tools ' , {shell : "powershell.exe"} , (stderr , err , stdout)=> { if (stdout) => console.log(stdout)})
exec('cd wireguard-tools && cd src ') 
exec('make ')
}

const Install_dep = () => {
  Check_Install_Git()
  Check_Install_Make()
  Install_wireguard()
}
// the main fking script bitch 

module.exports.main = () => { 
  // first check if dependecis exists 
  Check_Chocolaty()
  ? Install_dep()
  : (Check_Chocolaty() ; Install_dep();)
}

