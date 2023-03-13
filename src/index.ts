const child_process = require("child_process");
const { NodeSSH } = require("node-ssh");
const path = require("path");

type Config = {
  host: string;
  username: string;
  password: string;
  port: number;
  remotePath: string;
};
type CommandsType = string[] | string;

function execCommand(commands: CommandsType) {
  (Array.isArray(commands) ? commands : [commands]).forEach((c) => {
    try {
      console.log(`start: ${c}...`);
      console.log(child_process.execSync(c).toString("utf8"));
    } catch (error: any) {
      console.log("\x1B[31m%s\x1B[0m", error.stdout.toString());
      process.exit(1);
    }
  });
}

const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

async function uploadToServer(config: Config) {
  const server = {
    host: config.host,
    username: config.username,
    password: config.password,
    port: config.port
  };

  const remotePath = config.remotePath;
  const localPath = path.join(path.dirname(__dirname), "dist");

  console.log(localPath);

  const ssh = new NodeSSH();
  try {
    await ssh.connect(server);
    console.log("连接服务器成功");
    await ssh.putDirectory(localPath, remotePath, {
      recursive: true,
      concurrency: 10,
      validate: (itemPath: string) => {
        const baseName = path.basename(itemPath);
        return (
          baseName.substr(0, 1) !== "." &&
          baseName !== "node_modules" &&
          baseName !== ".git"
        );
      }
    });
    console.log("上传完成，当前时间：", getTimestamp());
  } catch (err: any) {
    console.error(`连接服务器失败：${err.message}`);
  } finally {
    ssh.dispose();
  }
}

async function uploadTools({
  commands,
  config
}: {
  commands: CommandsType;
  config: Config;
}) {
  execCommand(commands);
  await uploadToServer(config);
}

module.exports = uploadTools;
