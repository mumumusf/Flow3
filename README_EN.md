简体中文 | [English](README_EN.md)

## 1. Register Flow3 Account

1. Visit [Flow3 Dashboard](https://dashboard.flow3.tech?ref=SPDeYCQto)
2. Complete registration process and obtain your account private key

## 2. VPS Environment Setup

### 2.1 Install NVM (Node Version Manager)

```bash
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Choose one of the following commands based on your shell
source ~/.bashrc   # for bash
source ~/.zshrc    # for zsh
```

### 2.2 Install Node.js 22

```bash
# Install Node.js 22
nvm install 22

# View installed Node.js versions
nvm list

# Use Node.js 22
nvm use 22

# Set default version to 22
nvm alias default 22
```

### 2.3 Verify Installation

```bash
# Check Node.js version
node -v   # Expected output: v22.13.1
nvm current # Expected output: v22.13.1

# Check npm version
npm -v    # Expected output: 10.9.2
```

## 3. Download and Configure Project

### 3.1 Clone Project

```bash
# Clone project locally
git clone https://github.com/mumumusf/Flow3.git
cd Flow3

# Install dependencies
npm install
```

### 3.2 Configure Accounts and Proxies

1. Create `accounts.txt` file and add your private keys:
```bash
nano accounts.txt
```
One private key per line.

2. Create `proxy.txt` file and add proxies (optional):
```bash
nano proxy.txt
```
One proxy per line, format:
```
http://username:password@ip:port
```

## 4. Run Program Using Screen

### 4.1 Install Screen

```bash
# Ubuntu/Debian
sudo apt-get install screen

# CentOS
sudo yum install screen
```

### 4.2 Create New Screen Session

```bash
# Create new screen session
screen -S flow3

# Run program in screen session
node src/index.js
```

### 4.3 Common Screen Commands

- Detach current session: Press `Ctrl + A` then `D`
- Reattach to session: `screen -r flow3`
- List all sessions: `screen -ls`
- End session: Type `exit` or press `Ctrl + D` in session

## 5. Program Usage Instructions

1. On first run, program will prompt for account private key and proxy information
2. Configuration will be automatically saved to `accounts.txt` and `proxy.txt` files
3. Program will automatically execute bandwidth sharing task every minute
4. You can stop the program at any time by pressing `Ctrl + C`

## 6. Important Notes

1. Ensure your VPS can access Flow3 platform normally
2. Using proxies is recommended to avoid IP restrictions
3. Keep your account private keys secure and never share them
4. Check program output logs if you encounter any issues

## 7. Common Issues

1. `bigint` related warnings can be ignored, they don't affect program operation
2. If proxy connection fails, program will automatically use default IP
3. If login fails, verify private key is correct

## 📞 Contact Information

For questions or suggestions, contact the author through:

- Twitter: [@YOYOMYOYOA](https://x.com/YOYOMYOYOA)
- Telegram: [@YOYOZKS](https://t.me/YOYOZKS)

## ⚖️ Disclaimer

1. This program is for learning and exchange purposes only
2. Commercial use is prohibited
3. Users assume all responsibility for any consequences of using this program

---
Made with ❤️ by [@YOYOMYOYOA](https://x.com/YOYOMYOYOA)