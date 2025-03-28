/**
 * 配置管理模块
 * 作者：小林
 * 提供配置管理和用户交互功能
 */

const fs = require('fs');
const readline = require('readline');
const { logMessage } = require('./logger');

/**
 * 创建读取控制台输入的接口
 * @returns {readline.Interface} readline接口对象
 */
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * 格式化代理字符串
 * @param {string} proxy - 代理字符串，支持多种格式
 * @returns {string} 格式化后的代理URL
 */
function formatProxy(proxy) {
  if (!proxy || proxy.trim() === '') {
    return null;
  }
  
  // 移除空格
  proxy = proxy.trim();
  
  // 已经是完整URL格式的代理
  if (proxy.startsWith('http://') || proxy.startsWith('https://') || proxy.startsWith('socks://') || proxy.startsWith('socks4://') || proxy.startsWith('socks5://')) {
    return proxy;
  }
  
  // 解析格式: ip:port:username:password
  const parts = proxy.split(':');
  
  if (parts.length === 2) {
    // 仅IP和端口
    return `http://${parts[0]}:${parts[1]}`;
  } else if (parts.length >= 4) {
    // 带用户名和密码
    const ip = parts[0];
    const port = parts[1];
    const username = parts[2];
    const password = parts[3];
    return `http://${username}:${password}@${ip}:${port}`;
  } else if (parts.length === 3) {
    // 可能是 ip:port:password 或者错误格式
    logMessage(null, null, `警告: 代理格式 "${proxy}" 不标准，尝试解析为 ip:port:password`, "warning");
    return `http://${parts[0]}:${parts[2]}@${parts[0]}:${parts[1]}`;
  }
  
  // 默认返回原始字符串，假设为ip:port
  return `http://${proxy}`;
}

/**
 * 从控制台读取私钥
 * @returns {Promise<string>} 用户输入的私钥
 */
async function readPrivateKey() {
  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question('请输入账户私钥: ', (privateKey) => {
      rl.close();
      resolve(privateKey.trim());
    });
  });
}

/**
 * 从控制台读取代理
 * @returns {Promise<string|null>} 用户输入的代理或null表示不使用代理
 */
async function readProxy() {
  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question('请输入代理(格式如 ip:port 或 ip:port:username:password，直接回车为不使用代理): ', (proxy) => {
      rl.close();
      if (!proxy || proxy.trim() === '') {
        resolve(null);
      } else {
        resolve(formatProxy(proxy));
      }
    });
  });
}

/**
 * 询问用户是否要继续添加账户
 * @returns {Promise<boolean>} 是否继续添加
 */
async function askContinue() {
  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question('是否继续添加账户? (y/n): ', (answer) => {
      rl.close();
      const shouldContinue = answer.trim().toLowerCase() === 'y';
      resolve(shouldContinue);
    });
  });
}

/**
 * 读取账户和代理配置
 * @returns {Promise<{accounts: string[], proxies: (string|null)[]}>} 账户和代理列表
 */
async function readOrCreateConfig() {
  try {
    // 尝试读取现有账户文件
    let accounts = [];
    let proxies = [];
    
    if (fs.existsSync('accounts.txt')) {
      accounts = fs.readFileSync('accounts.txt', 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
      
      if (accounts.length > 0) {
        // 读取代理文件
        if (fs.existsSync('proxy.txt')) {
          proxies = fs.readFileSync('proxy.txt', 'utf8')
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .map(proxy => formatProxy(proxy));
        }
        
        // 确保代理列表长度与账户列表相同
        while (proxies.length < accounts.length) {
          proxies.push(null);
        }
        
        logMessage(null, null, `成功加载了${accounts.length}个账户和${proxies.filter(p => p !== null).length}个代理`, "success");
        return { accounts, proxies };
      }
    }
    
    // 文件不存在或为空，从控制台输入
    logMessage(null, null, "账户文件不存在或为空，请添加账户和代理", "process");
    
    let continueAdding = true;
    let count = 0;
    
    while (continueAdding) {
      count++;
      // 输入私钥
      logMessage(null, null, `正在添加第${count}个账户`, "process");
      const privateKey = await readPrivateKey();
      
      if (!privateKey || privateKey.trim() === '') {
        logMessage(null, null, "私钥不能为空，请重新输入", "error");
        continue;
      }
      
      accounts.push(privateKey);
      
      // 立即为当前账号输入代理
      logMessage(null, null, `为第${count}个账户添加代理`, "process");
      const proxy = await readProxy();
      proxies.push(proxy);
      
      // 询问是否继续添加
      continueAdding = await askContinue();
    }
    
    if (accounts.length === 0) {
      throw new Error("未添加任何账户");
    }
    
    // 保存到文件
    fs.writeFileSync('accounts.txt', accounts.join('\n'));
    
    // 保存有效代理到文件
    const validProxies = proxies.filter(p => p !== null);
    if (validProxies.length > 0) {
      fs.writeFileSync('proxy.txt', validProxies.join('\n'));
    }
    
    return { accounts, proxies };
  } catch (error) {
    logMessage(null, null, `配置加载失败: ${error.message}`, "error");
    
    // 出错时确保至少有一个账户和代理
    logMessage(null, null, "请至少添加一个账户", "process");
    const privateKey = await readPrivateKey();
    logMessage(null, null, "请为该账户添加代理", "process");
    const proxy = await readProxy();
    
    // 保存到文件
    fs.writeFileSync('accounts.txt', privateKey);
    if (proxy) {
      fs.writeFileSync('proxy.txt', proxy);
    }
    
    return { 
      accounts: [privateKey], 
      proxies: [proxy] 
    };
  }
}

module.exports = {
  readOrCreateConfig,
  formatProxy
}; 