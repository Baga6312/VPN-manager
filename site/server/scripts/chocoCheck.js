const { exec } = require("child_process");
const { os } = require("os");

const Install_chocolaty = () => {
  // automating the Execution policy for the user
  // getting the state of the Execution policy
  const checkPolicies = "ExecutionPolicy";
  exec(`Get-${checkPolicies}`, { shell: "powershell.exe" }, (err, stdout) => {
    err
      ? console.log(Error: ${err})
      : stdout == "AllSigned"
      ? null
      : exec(
          //  setting the execution policys to set AllSigne as a admin user
          //  user will be prompted with UAC
          `powershell -WindowStyle Hidden -command "start-process cmd -verb runas -argumentlist '/c powershell -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy AllSigned -Force -Scope CurrentUser"'"`,
          { shell: "powershell.exe" },
          (error, sttdout) => {
            error ? console.error(Error: ${error.message}) : null;
            exec(
              `Get-${checkPolicies}`,
              { shell: "powershell.exe" },
              (err, stttdout, stderr) => {
                err
                  ? console.log(Error :${err})
                  : stderr
                  ? console.log(Standard Error: ${stderr})
                  : console.log(Execution Policy set to ${stttdout} );
              }
            );
          }
        );
  });
  // installing chocloty for real this time
  // TODOS : install the fucking script first with curl or http idk u do  then executing it
  // change the below idiot
  exec(
    `[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`,
    { shell: "powershell.exe" },
    (err, stdout, stderr) => {
      err ? console.log(Err ${err}) : stderr ? console.log(stderr) : null;
    }
  );
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

Check_Chocolaty();
