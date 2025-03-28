/**
 * Flow3 自动化机器人
 * 作者：小林
 * 基于 El Puqus Airdrop 项目修改，支持多账号多代理
 */

const flow3Bot = require("./main/flow3bot");
const chalk = require("chalk");
const { readOrCreateConfig } = require("./utils/configManager");
const { logMessage } = require("./utils/logger");

async function main() {
  // 打印项目标题和作者信息
  console.log(`
██╗ ██╗██╗ █████╗ ██████╗ ██╗ ██╗███╗   ██╗
╚██╗██╔╝██║██╔══██╗██╔═══██╗██║ ██║████╗  ██║
 ╚███╔╝ ██║███████║██║   ██║██║ ██║██╔██╗ ██║
 ██╔██╗ ██║██╔══██║██║   ██║██║ ██║██║╚██╗██║
██╔╝ ██╗██║██║  ██║╚██████╔╝███████║██║ ╚████║
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝

    === Flow3 自动化工具 ===
** ====================================== **
*         此脚本仅供免费使用              *
*         禁止出售或用于盈利              *
** ====================================== **


* 作者: @YOYOMYOYOA
* 空投玩家 | 现货玩家 | meme收藏
* Github: github.com/mumumusf

** ====================================== **
*            免责声明                      *
* 此脚本仅供学习交流使用                  *
* 使用本脚本所产生的任何后果由用户自行承担 *
* 如果因使用本脚本造成任何损失，作者概不负责*
** ====================================== **
`);

  try {
    // 读取或创建账户和代理文件
    logMessage(null, null, "正在加载配置...", "process");
    const { accounts, proxies } = await readOrCreateConfig();
    const count = accounts.length;
    
    // 记录有效代理数量
    const validProxies = proxies.filter(p => p !== null).length;
    logMessage(null, null, `成功加载了${count}个账户和${validProxies}个代理，${count - validProxies}个账户将使用默认IP`, "success");

    // 为每个账户创建机器人实例
    const botInstances = [];
    for (let i = 0; i < count; i++) {
      botInstances.push(new flow3Bot(accounts[i], proxies[i], i + 1, count));
    }

    // 主循环：持续执行保活和带宽共享任务
    while (true) {
      logMessage(null, null, "开始新的处理流程，请稍候...", "process");

      try {
        // 并发处理所有账户
        const results = await Promise.all(
          botInstances.map(async (flow) => {
            try {
              console.log(chalk.white("-".repeat(85)));
              const data = await flow.processKeepAlive();
              return {
                currentNum: flow.currentNum,
                points: {
                  total: data.points.total || 0,
                  today: data.points.today || 0,
                },
                keepAlive: data.keepAlive || false,
                proxy: flow.proxy || "N/A",
              };
            } catch (error) {
              logMessage(
                flow.currentNum,
                flow.total,
                `账户处理失败: ${error.message}`,
                "error"
              );
              return {
                currentNum: flow.currentNum,
                points: {
                  total: 0,
                  today: 0,
                },
                keepAlive: false,
                proxy: flow.proxy || "N/A",
              };
            }
          })
        );

        // 输出处理结果
        console.log("\n" + "═".repeat(70));
        results.forEach((result) => {
          console.log(chalk.yellow(`账户 ${result.currentNum}/${count} 的状态:`));
          logMessage(
            null,
            null,
            `今日积分: ${result.points.today}`,
            "success"
          );
          logMessage(
            null,
            null,
            `总积分: ${result.points.total}`,
            "success"
          );
          const keepAliveStatus = result.keepAlive
            ? chalk.green("✔ 带宽共享成功")
            : chalk.red("✖ 带宽共享失败");
          logMessage(
            null,
            null,
            `带宽共享状态: ${keepAliveStatus}`,
            "success"
          );
          logMessage(null, null, `代理IP: ${result.proxy}`, "success");
          console.log("─".repeat(70));
        });

        logMessage(
          null,
          null,
          "处理完成，等待1分钟后开始新的带宽共享任务",
          "success"
        );

        // 等待1分钟后继续下一轮
        await new Promise((resolve) => setTimeout(resolve, 60000));
      } catch (error) {
        logMessage(
          null,
          null,
          `主进程失败: ${error.message}`,
          "error"
        );
      }
    }
  } catch (error) {
    logMessage(null, null, `主进程失败: ${error.message}`, "error");
  }
}

main();
