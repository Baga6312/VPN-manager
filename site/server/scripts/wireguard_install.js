const { exec, spawn } = require("child_process");
const { os } = require("os");
const https = require("https");
const fs = require("fs");

const Install_chocolaty = () => {
  // automating the Execution policy for the user
  // getting the state of the Execution policy
  const checkPolicies = "ExecutionPolicy";
  exec(Get-${checkPolicies}, { shell: "powershell.exe" }, (err, stdout) => {
    err
      ? console.log(Error: ${err})
      : stdout == "AllSigned"
      ? null
      : exec(
          //  setting the execution policys to set AllSigne as a admin user
          //  user will be prompted with UAC
          powershell -WindowStyle Hidden -command "start-process cmd -verb runas -argumentlist '/c powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy RemoteSigned -Force -Scope CurrentUser"'",
          { shell: "powershell.exe" },
          (error, sttdout) => {
            error ? console.error(Error: ${error.message}) : null;
            exec(
              Get-${checkPolicies},
              { shell: "powershell.exe" },
              (err, stttdout, stderr) => {
                err
                  ? console.log(Error :${err})
                  : stderr
                  ? console.log(Standard Error: ${stderr})
                  : console.log(Execution Policy set to ${stttdout});
              }
            );
          }
        );
  });
  // installing chocloty for real this time
  // TODOS : install the fucking script first with curl or http idk u do  then executing it
  // change the below idiot
  //  https://community.chocolatey.org/install.ps1
  // also fix this
  exec(`
    C:\Users\\${os.userInfo()}\AppData\Local\Temp\chocolatey\chocoInstall\\tools\\chocolateyInstall.ps1
  `);
};
const Check_Chocolaty = () => {
  // checking if chocolaty exists
  exec("choco -v", (error, stdout) => {
    error ? Install_chocolaty() : null;
  });
};
const install_script = () => {
  // downlaod the script for chocolaty
  const url = "https://community.chocolatey.org/install.ps1";
  https.get(url, (res) => {
    const path = ${__dirname}/install.ps1;
    const file_path = fs.createWriteStream(path);
    res.pipe(file_path);
    file_path.on("finish", () => {
      file_path.close();
      console.log("download Complete");
    });
  });

  // installing the script with admin privi
  exec(
    powershell -WindowStyle Hidden -command "start-process cmd -verb runas -argumentlist '/c powershell C:\\Users\\asma123\\Desktop\\check\\install.ps1 '",
    { shell: "powershell.exe" },
    (err, stdout) => {
      err ? console.log(err) : stdout ? console.log(stdout) : null;
    }
  );
};

const script = () => {
  const lsProcess = spawn(
    "powershell -ExecutionPolicy bypass -File C:\\Users\\asma123\\Desktop\\check\\install.ps1"
    // [
    //   ,
    //   "-ExecutionPolicy bypass ",
    //   "-File C:\\Users\\asma123\\Desktop\\check\\install.ps1 ",
    // ]
  );
  lsProcess.stdout.on("data", (data) => {
    console.log(stdout:\n${data});
  });
  lsProcess.stderr.on("data", (data) => {
    console.log(stdout: ${data});
  });
  lsProcess.on("exit", (code) => {
    console.log(Process ended with ${code});
  });
};

script();
