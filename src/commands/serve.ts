
const command = "serve"
const mode = "development"
import { InlineConfig } from "vite"
// import vue from "@vitejs/plugin-vue"
// import { babel } from "@rollup/plugin-babel"
const { createServer,createLogger } = require("vite")

// const path = require("path")
// const userConfig = require(`${process.cwd()}/tiny.config`)
// const target = typeof userConfig === 'function' ? userConfig(command,mode) : userConfig
// console.log("初始化完成")
const tinyCliConfig:InlineConfig = {
    /** 
     *  当前命令工作目录作为根目录，根目录下必须要有 index.html，
     *  并在html中指定了entry js
     * */
    // configFile: tiny.config.js //
    root:process.cwd(),
    // plugins: [
    //     //vue(),
    //     // babel({
    //     //   babelHelpers: "bundled",
    //     //   exclude: "node_module/**"
    //     // })
    //   ],
    // resolve:{
    //     alias: {
    //       "@": path.resolve(process.cwd(), "src"),
    //     },
    //   }
}
// const finalConfig:InlineConfig = {
//     ...userConfig,
//     ...tinyCliConfig
// }
//console.log(finalConfig)
module.exports = async () => {
    // process.cwd  current workplace dir
    // __dirname  current runtime module dir
    const server = await createServer(tinyCliConfig)
    await server.listen()
}