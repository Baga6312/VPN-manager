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
      : exec(
          //  setting the execution policys to set AllSigne as a admin user
          //  user will be prompted with UAC
          `powershell -WindowStyle Hidden -command "start-process cmd -verb runas -argumentlist '/c powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy RemoteSigned -Force -Scope CurrentUser"'"`,
          { shell: "powershell.exe" },
          (error, sttdout) => {
            error ? console.error(`Error: ${error.message}`) : null;
            exec(
              `Get-${checkPolicies}`,
              { shell: "powershell.exe" },
              (err, stttdout, stderr) => {
                err
                  ? console.log(`Error :${err}`)
                  : stderr
                  ? console.log(`Standard Error: ${stderr}`)
                  : console.log(`Execution Policy set to ${stttdout}`);
              }
            );
          }
        );
  });
};
const Check_Chocolaty = () => {
  // checking if chocolaty exists
  exec("choco -v", (error, stdout) => {
    error 
      ? ( false ) 
      : (true) ; 
  });
};
const install_script = () => {
  // downlaod the script for chocolaty
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
    // "-WindowStyle Hidden",
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
const Clone_repo = () => { 
exec('git clone https://github.com/WireGuard/wireguard-tools ' , {shell : "powershell.exe"} , (stderr , err , stdout)=> { if (stdout) => console.log(stdout)})
exec('cd wireguard-tools && cd src ') 
exec('make ')
}
