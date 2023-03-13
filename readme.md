# 介绍
做一个自动上传服务器的脚本工具 🔧

[仓库地址](https://github.com/ThinkerWing/upload-tools)


[npm地址](https://www.npmjs.com/package/upload-tools)

Config 服务器的配置(账号/密码/端口/存放地址)

CommandsType 命令数组或者字符串(```['yarn lint:prettier', 'yarn build'] | 'yarn build'```)
```
type Config = {
  host: string;
  username: string;
  password: string;
  port: number;
  remotePath: string;
};
type CommandsType = string[] | string;
```

# 示例代码

```
const uploadTools = require('upload-tools');

const config = {
    host: '127.0.0.1', # ip 地址
    username: 'root', # 用户名
    password: '', # 服务器密码
    port: '22',
    remotePath: '/www/wwwroot/xxlb.site'  # 目标地址
  };

const commands = ['yarn lint:prettier', 'yarn build'];

uploadTools({ commands, config });

```


![](public/1.png)



# 实现效果
```
thinkerwing@ThinkerdeMacBook-Pro bin % node test.js
start: yarn lint:prettier...
yarn run v1.22.19
$ prettier -c --write "src/**/*" --end-of-line auto
Checking formatting...
All matched files use Prettier code style!
Done in 3.42s.

start: yarn build...
Browserslist: caniuse-lite is outdated. Please run:

...

Done in 7.34s.

/Users/thinkerwing/Desktop/demo/dist
连接服务器成功
上传完成，当前时间： 2023-3-13 16:16:47

```

# 使用指南🧭
```
npm i upload-tools -D
```
按照示例代码填写配置项

通过 node test.js 或者 在 packeage.json 中配置
```
 "scripts": {
    "release": "node ./bin/release.js ",
  }
```
通过 ```yarn release``` 实现