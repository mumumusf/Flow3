/**
 * 代理服务管理模块
 * 作者：小林
 * 提供HTTP和SOCKS代理服务的处理功能
 */
const { HttpsProxyAgent } = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");
const { logMessage } = require("../utils/logger");
const { formatProxy } = require("../utils/configManager");

/**
 * 根据代理URL创建对应的代理代理
 * @param {string} proxyUrl - 代理服务器URL
 * @param {number} index - 当前处理的账户编号
 * @param {number} total - 账户总数
 * @param {object} options - 代理agent选项
 * @returns {HttpsProxyAgent|SocksProxyAgent|null} - 返回对应的代理agent或null
 */
function getProxyAgent(proxyUrl, index, total, options = {}) {
  if (!proxyUrl) {
    return null;
  }
  
  try {
    // 首先格式化代理URL
    proxyUrl = formatProxy(proxyUrl);
    
    // 判断是否为SOCKS代理
    const isSocks = proxyUrl.toLowerCase().startsWith("socks");
    const agentOptions = {
      rejectUnauthorized: false, // 不验证SSL证书
      ...options,
    };

    // 根据代理类型创建对应的agent
    if (isSocks) {
      return new SocksProxyAgent(proxyUrl, agentOptions);
    }

    // 创建HTTP代理agent，确保URL以http开头
    return new HttpsProxyAgent(
      proxyUrl.startsWith("http") ? proxyUrl : `http://${proxyUrl}`,
      agentOptions
    );
  } catch (error) {
    logMessage(
      index,
      total,
      `创建代理agent失败: ${error.message}`,
      "error"
    );
    return null;
  }
}

module.exports = {
  getProxyAgent
};
