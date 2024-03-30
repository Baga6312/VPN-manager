import psList from "ps-list";

import { exec, spawn } from "child_process";
import https from "https";
import fs from "fs";
import os from "os";

// make a fking script to run as a admin contains all the dependecis check
// Exec_script()

const execScript = async () => {
  //     start-process powershell -verb runas -argumentlist '/c powershell -ExecutionPolicy Bypass -File C:\\Users\\asma123\\Desktop\\check\\install.ps1',
  const scriptPath = "C:\\Users\\asma123\\Desktop\\check\\install.ps1";
  exec(
    `Start-Process powershell -ArgumentList "-ExecutionPolicy Bypass", "-File", "${scriptPath}" -Verb RunAs`,
    { shell: "powershell.exe" },
    (error, stdout, stderr) => {
      if (error) {
        console.error(exec error: ${error});
        return;
      }
      console.log(stdout: ${stdout});
      console.error(stderr: ${stderr});
    }
  );
};

const clone_repo = (directoryPath) => {
  const wireguardProcess = spawn("powershell", [
    "git",
    "clone",
    "https://github.com/WireGuard/wireguard-tools",
    ${directoryPath},
  ]);

  wireguardProcess.stdout.on("data", (data) => {
    console.log(${data});
  });

  wireguardProcess.stderr.on("data", (data) => {
    console.log(stderr:\n${data}); // Use "stderr" for error output
  });

  wireguardProcess.on("exit", (code) => {
    console.log(Process ended with ${code});
  });
};

const Exec_script = async () => {
  // creating directory on appdata
  const appdataPath = ${os.homedir()}\\AppData\\Roaming;
  const newDirName = "urmom";
  const directoryPath = ${appdataPath}\\${newDirName};
  const url = "https://community.chocolatey.org/install.ps1";

  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
      console.log(Directory created successfully: ${directoryPath});
    } else {
      console.log(Directory already exists: ${directoryPath});
    }
  } catch (err) {
    console.error("Error creating directory:", err);
  }

  // downloading the file on appdata
  let path;
  https.get(url, (res) => {
    path = ${directoryPath}\\install.ps1;
    const file_path = fs.createWriteStream(path);

    res.pipe(file_path);
    file_path.on("finish", () => {
      file_path.close();
      console.log("download Complete");
    });
  });

  try {
    execScript(directoryPath);
  } catch (err) {
    console.log(err);
  }
};

Exec_script().then(() => {
  clone_repo();
});
