/**
 * 日志工具模块
 * 作者：小林
 * 提供格式化的日志输出功能
 */
const chalk = require("chalk");

/**
 * 输出格式化的日志消息
 * @param {number|null} currentNum - 当前处理的账户编号
 * @param {number|null} total - 账户总数
 * @param {string} message - 日志消息内容
 * @param {string} messageType - 消息类型: 'success', 'error', 'process', 'debug', 'info'
 */
function logMessage(
  currentNum = null,
  total = null,
  message = "",
  messageType = "info"
) {
  // 获取当前时间并格式化为 'YYYY-MM-DD HH:MM:SS' 格式
  const now = new Date();
  const timestamp = now
    .toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\./g, ":")
    .replace(/, /g, " ");
  
  // 如果提供了账户编号和总数，则显示进度信息
  const accountStatus = currentNum && total ? `[${currentNum}/${total}] ` : "";

  // 根据消息类型设置不同的颜色和前缀图标
  let logText;
  switch (messageType) {
    case "success":
      logText = chalk.green(`[✓] ${message}`); // 成功消息，绿色，对勾图标
      break;
    case "error":
      logText = chalk.red(`[-] ${message}`); // 错误消息，红色，减号图标
      break;
    case "process":
      logText = chalk.yellow(`[!] ${message}`); // 处理中消息，黄色，感叹号图标
      break;
    case "debug":
      logText = chalk.blue(`[~] ${message}`); // 调试消息，蓝色，波浪号图标
      break;
    default:
      logText = chalk.white(`[?] ${message}`); // 普通信息，白色，问号图标
  }

  // 输出完整的日志信息，包含时间戳、账户状态和格式化的消息
  console.log(
    `${chalk.white("[")}${chalk.dim(timestamp)}${chalk.white(
      "]"
    )} ${accountStatus}${logText}`
  );
}

module.exports = {
  logMessage,
};
