 ** # Flow3 自动化工具使用教程

## 1. 注册 Flow3 账户

1. 访问 [Flow3 Dashboard](https://dashboard.flow3.tech?ref=SPDeYCQto)
2. 完成注册流程，获取账户私钥

## 2. VPS 环境配置

### 2.1 安装 NVM (Node Version Manager)

```bash
# 下载并安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 根据您使用的 shell 选择以下命令之一
source ~/.bashrc   # 如果使用 bash
source ~/.zshrc    # 如果使用 zsh
```

### 2.2 安装 Node.js 22

```bash
# 安装 Node.js 22
nvm install 22

# 查看已安装的 Node.js 版本
nvm list

# 使用 Node.js 22
nvm use 22

# 设置默认版本为 22
nvm alias default 22
```

### 2.3 验证安装

```bash
# 检查 Node.js 版本
node -v   # 预期输出: v22.13.1
nvm current # 预期输出: v22.13.1

# 检查 npm 版本
npm -v    # 预期输出: 10.9.2
```

## 3. 下载并配置项目

### 3.1 克隆项目

```bash
# 克隆项目到本地
git clone https://github.com/mumumusf/Flow3.git
cd Flow3

# 安装依赖
npm install
```

### 3.2 配置账户和代理

1. 创建 `accounts.txt` 文件并添加您的私钥：
```bash
nano accounts.txt
```
每行一个私钥。

2. 创建 `proxy.txt` 文件并添加代理（可选）：
```bash
nano proxy.txt
```
每行一个代理，格式：
```
http://username:password@ip:port
```

## 4. 使用 Screen 运行程序

### 4.1 安装 Screen

```bash
# Ubuntu/Debian
sudo apt-get install screen

# CentOS
sudo yum install screen
```

### 4.2 创建新的 Screen 会话

```bash
# 创建新的 screen 会话
screen -S flow3

# 在 screen 会话中运行程序
node src/index.js
```

### 4.3 Screen 常用命令

- 分离当前会话：按 `Ctrl + A` 然后按 `D`
- 重新连接到会话：`screen -r flow3`
- 查看所有会话：`screen -ls`
- 结束会话：在会话中输入 `exit` 或按 `Ctrl + D`

## 5. 程序使用说明

1. 首次运行时，程序会提示您输入账户私钥和代理信息
2. 程序会自动保存配置到 `accounts.txt` 和 `proxy.txt` 文件中
3. 程序会每分钟自动执行一次带宽共享任务
4. 您可以在任何时候按 `Ctrl + C` 停止程序

## 6. 注意事项

1. 请确保您的 VPS 能够正常访问 Flow3 平台
2. 建议使用代理以避免 IP 限制
3. 请妥善保管您的账户私钥，不要泄露给他人
4. 如果遇到问题，可以查看程序输出的日志信息

## 7. 常见问题

1. 如果遇到 `bigint` 相关警告，可以忽略，不影响程序运行
2. 如果代理连接失败，程序会自动使用默认 IP
3. 如果登录失败，请检查私钥是否正确

我来帮您编写一个详细的新手使用教学 README.md：


```markdown:README.md
# Flow3 自动化工具使用教程

## 1. 注册 Flow3 账户

1. 访问 [Flow3 Dashboard](https://dashboard.flow3.tech?ref=SPDeYCQto)
2. 完成注册流程，获取账户私钥

## 2. VPS 环境配置

### 2.1 安装 NVM (Node Version Manager)

```bash
# 下载并安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 根据您使用的 shell 选择以下命令之一
source ~/.bashrc   # 如果使用 bash
source ~/.zshrc    # 如果使用 zsh
```

### 2.2 安装 Node.js 22

```bash
# 安装 Node.js 22
nvm install 22

# 查看已安装的 Node.js 版本
nvm list

# 使用 Node.js 22
nvm use 22

# 设置默认版本为 22
nvm alias default 22
```

### 2.3 验证安装

```bash
# 检查 Node.js 版本
node -v   # 预期输出: v22.13.1
nvm current # 预期输出: v22.13.1

# 检查 npm 版本
npm -v    # 预期输出: 10.9.2
```

## 3. 下载并配置项目

### 3.1 克隆项目

```bash
# 克隆项目到本地
git clone https://github.com/mumumusf/Flow3.git
cd Flow3

# 安装依赖
npm install
```

### 3.2 配置账户和代理

1. 创建 `accounts.txt` 文件并添加您的私钥：
```bash
nano accounts.txt
```
每行一个私钥。

2. 创建 `proxy.txt` 文件并添加代理（可选）：
```bash
nano proxy.txt
```
每行一个代理，格式：
```
http://username:password@ip:port
```

## 4. 使用 Screen 运行程序

### 4.1 安装 Screen

```bash
# Ubuntu/Debian
sudo apt-get install screen

# CentOS
sudo yum install screen
```

### 4.2 创建新的 Screen 会话

```bash
# 创建新的 screen 会话
screen -S flow3

# 在 screen 会话中运行程序
node src/index.js
```

### 4.3 Screen 常用命令

- 分离当前会话：按 `Ctrl + A` 然后按 `D`
- 重新连接到会话：`screen -r flow3`
- 查看所有会话：`screen -ls`
- 结束会话：在会话中输入 `exit` 或按 `Ctrl + D`

## 5. 程序使用说明

1. 首次运行时，程序会提示您输入账户私钥和代理信息
2. 程序会自动保存配置到 `accounts.txt` 和 `proxy.txt` 文件中
3. 程序会每分钟自动执行一次带宽共享任务
4. 您可以在任何时候按 `Ctrl + C` 停止程序

## 6. 注意事项

1. 请确保您的 VPS 能够正常访问 Flow3 平台
2. 建议使用代理以避免 IP 限制
3. 请妥善保管您的账户私钥，不要泄露给他人
4. 如果遇到问题，可以查看程序输出的日志信息

## 7. 常见问题

1. 如果遇到 `bigint` 相关警告，可以忽略，不影响程序运行
2. 如果代理连接失败，程序会自动使用默认 IP
3. 如果登录失败，请检查私钥是否正确

我来帮您编写一个详细的新手使用教学 README.md：


```markdown:README.md
# Flow3 自动化工具使用教程

## 1. 注册 Flow3 账户

1. 访问 [Flow3 Dashboard](https://dashboard.flow3.tech?ref=SPDeYCQto)
2. 完成注册流程，获取账户私钥

## 2. VPS 环境配置

### 2.1 安装 NVM (Node Version Manager)

```bash
# 下载并安装 NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 根据您使用的 shell 选择以下命令之一
source ~/.bashrc   # 如果使用 bash
source ~/.zshrc    # 如果使用 zsh
```

### 2.2 安装 Node.js 22

```bash
# 安装 Node.js 22
nvm install 22

# 查看已安装的 Node.js 版本
nvm list

# 使用 Node.js 22
nvm use 22

# 设置默认版本为 22
nvm alias default 22
```

### 2.3 验证安装

```bash
# 检查 Node.js 版本
node -v   # 预期输出: v22.13.1
nvm current # 预期输出: v22.13.1

# 检查 npm 版本
npm -v    # 预期输出: 10.9.2
```

## 3. 下载并配置项目

### 3.1 克隆项目

```bash
# 克隆项目到本地
git clone https://github.com/mumumusf/Flow3.git
cd Flow3

# 安装依赖
npm install
```

### 3.2 配置账户和代理

1. 创建 `accounts.txt` 文件并添加您的私钥：
```bash
nano accounts.txt
```
每行一个私钥。

2. 创建 `proxy.txt` 文件并添加代理（可选）：
```bash
nano proxy.txt
```
每行一个代理，格式：
```
http://username:password@ip:port
```

## 4. 使用 Screen 运行程序

### 4.1 安装 Screen

```bash
# Ubuntu/Debian
sudo apt-get install screen

# CentOS
sudo yum install screen
```

### 4.2 创建新的 Screen 会话

```bash
# 创建新的 screen 会话
screen -S flow3

# 在 screen 会话中运行程序
node src/index.js
```

### 4.3 Screen 常用命令

- 分离当前会话：按 `Ctrl + A` 然后按 `D`
- 重新连接到会话：`screen -r flow3`
- 查看所有会话：`screen -ls`
- 结束会话：在会话中输入 `exit` 或按 `Ctrl + D`

## 5. 程序使用说明

1. 首次运行时，程序会提示您输入账户私钥和代理信息
2. 程序会自动保存配置到 `accounts.txt` 和 `proxy.txt` 文件中
3. 程序会每分钟自动执行一次带宽共享任务
4. 您可以在任何时候按 `Ctrl + C` 停止程序

## 6. 注意事项

1. 请确保您的 VPS 能够正常访问 Flow3 平台
2. 建议使用代理以避免 IP 限制
3. 请妥善保管您的账户私钥，不要泄露给他人
4. 如果遇到问题，可以查看程序输出的日志信息

## 7. 常见问题

1. 如果遇到 `bigint` 相关警告，可以忽略，不影响程序运行
2. 如果代理连接失败，程序会自动使用默认 IP
3. 如果登录失败，请检查私钥是否正确

## 📞 联系方式

如有任何问题或建议，欢迎通过以下方式联系作者:

- Twitter：[@YOYOMYOYOA](https://x.com/YOYOMYOYOA)
- Telegram：[@YOYOZKS](https://t.me/YOYOZKS)

## ⚖️ 免责声明

1. 本程序仅供学习交流使用
2. 禁止用于商业用途
3. 使用本程序产生的任何后果由用户自行承担

---
Made with ❤️ by [@YOYOMYOYOA](https://x.com/YOYOMYOYOA)**
