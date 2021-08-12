import {
  Executor,
  LoadingMsg,
  RepoName,
  TagName,
  AppName,
  FileActionsResult,
  InquirerPromptResult,
  FileActions,
} from "../types";
import Metalsmith from "metalsmith";
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const ora = require("ora");
const Inquirer = require("inquirer");
const chalk = require("chalk");
const MetalSmith: (directory: string) => Metalsmith = require("metalsmith"); // 遍历文件夹 找需不需要渲染
const { promisify } = require("util");
const downloadGitRepo = promisify(require("download-git-repo"));
const { downloadDirectory } = require("../constants");
const { render } = promisify(require("consolidate").ejs);
/**
 * create的所有逻辑 haya create <app-name>
 * 拉取仓库所有项目，列出让用户选 安装哪个项目 haya create <app-name>
 * 选完后 在显示所有的版本号 1.0
 * 可能还需要用户配置一些数据 来结合生成 app 模板
 * */

// 1.获取项目列表
const fetchRepoList = async (): Promise<Array<any>> => {
  const { data } = await axios.get(
    "https://api.github.com/orgs/Tiny-CLI-Template/repos"
  );
  return data;
};
// 2.获取项目的tag列表
const fetchTagList = async (repo: string) => {
  const { data } = await axios.get(
    `https://api.github.com/repos/Tiny-CLI-Template/${repo}/tags`
  );
  return data;
};
// 3.封装执行函数时的loading效果
const waitFnloading =
  (fn: Executor, message: LoadingMsg) =>
  async (...args: Array<any>) => {
    const spinner = ora(message);
    spinner.start();
    let result;
    try {
      result = await fn(...args);
    } catch (e) {
      console.error("\n", chalk.red(e));
      throw new Error(e);
    } finally {
      spinner.succeed();
    }
    return result;
  };

// 执行下载模板，将模板下载到临时目录中，并将存放模板的目录返回
const download = async (repo: RepoName, tag?: TagName) => {
  let api = `Tiny-CLI-Template/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  const dest = `${downloadDirectory}/${repo}`;
  await downloadGitRepo(api, dest);
  return dest;
};
// 前置目录检查
const beforeCreate = async (
  projectName: AppName
): Promise<FileActionsResult> => {
  return new Promise(async (resolve) => {
    if (!projectName) {
      console.error(
        chalk.red("  Missing required argument"),
        chalk.yellow("<app-name>")
      );
      resolve({ exit: true });
      return;
    }
    if (fs.pathExistsSync(projectName)) {
      const { CREATE_ACTION } = (await Inquirer.prompt({
        name: "CREATE_ACTION", // 获取选择后的结果
        type: "list",
        message: `Target directory ${chalk.red(
          `${path.resolve()}/${projectName}`
        )} already exists. Pick an action`,
        choices: ["Overwrite", "Merge", "Cancel"],
      })) as InquirerPromptResult;

      const ACTIONS: FileActions = {
        Overwrite: () => {
          fs.removeSync(projectName);
          resolve({ exit: false });
        },
        Merge: () => {
          resolve({ exit: false });
        },
        Cancel: () => {
          resolve({ exit: true });
        },
      };
      ACTIONS[CREATE_ACTION]();
    } else {
      resolve({ exit: false });
    }
  });
};
module.exports = async (projectName: AppName) => {
  const res = await beforeCreate(projectName);
  if (res.exit) {
    return;
  }

  // 1. 获取项目的模版
  let repos = await waitFnloading(fetchRepoList, "Fetching template ....")();
  repos = repos.map((item: any) => item.name);
  const { repo } = await Inquirer.prompt({
    name: "repo", // 获取选择后的结果
    type: "list", // 什么方式显示在命令行
    message: `请选择一个${chalk.red("模板")}创建项目`,
    choices: repos,
  });
  // 2. 获取对应的版本号,通过当前选择的项目 拉去对应的版本
  let tags = await waitFnloading(fetchTagList, "Fetching tags ....")(repo);
  tags = tags.map((item: any) => item.name);

  const { tag = "" } = await Inquirer.prompt({
    name: "tag",
    type: "list",
    message: `请选择模板${chalk.red("版本号")}[tag]`,
    choices: tags,
  });
  // 3. 把模版放到一个临时目录里存好,以备后期使用(使用 download-git-repo)
  const result = await waitFnloading(download, "download template...")(
    repo,
    tag
  );

  // 4. 拷贝操作，若模板目录中带有 ask.js文件则为复杂模板渲染
  if (!fs.pathExistsSync(path.join(result, "ask.js"))) {
    await fs.copy(result, path.resolve(projectName));
  } else {
    // 复杂的需要模版渲染，渲染后再拷贝
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname) // render后生成位置
        .source(result) //源文件目录
        .destination(path.resolve(projectName))
        /* 拿用户输入信息 */
        .use(async (files: any, metal: any, done: any) => {
          const args: Array<any> = require(path.join(result, "ask.js"));
          const obj = await Inquirer.prompt(args);
          const meta = metal.metadata();
          Object.assign(meta, obj);
          delete files["ask.js"];
          done();
        })
        /* 拿用户输入信息做渲染 */
        .use((files: any, metal: any, done: any) => {
          const obj = metal.metadata();
          Reflect.ownKeys(files).forEach(async (file: any) => {
            // 这个是要处理的后缀，此处仅处理 package.json
            if (file.endsWith(".json") || file.endsWith(".html")) {
              let content = files[file].contents.toString(); // 文件内容
              if (content.includes("<%=") && content.includes("%>")) {
                content = await render(content, obj);
                files[file].contents = Buffer.from(content); // 渲染
              }
            }
          });
          done();
        })
        .build((err: any) => {
          if (err) {
            reject();
          } else {
            resolve("");
          }
        });
    });
  }
};
