import rollupPluginBuildState from "../plugins/rollup-plugin-build-state"
import { InlineConfig } from "vite"
import vue from '@vitejs/plugin-vue';
import { babel } from '@rollup/plugin-babel';
const rollupPluginWrite = require("../plugins/rollup-plugin-write")
const { build } = require('vite')
const path = require("path")

/* 仅对构建阶段有意义的插件，置于 rollupOptions.plugins 中 */
const buildPhasePlugins = [
    rollupPluginWrite(),
    babel({ 
      babelHelpers: 'bundled',
      exclude:"node_module/**"
    }),
    rollupPluginBuildState(),
  ]

const tinyCliBuildConfig:InlineConfig = {
    configFile:false,
    root:process.cwd(),
    base: './',
    plugins: [
        vue()
    ],
    build: {
      assetsInlineLimit:60 * 1024,
      rollupOptions: {
        plugins:buildPhasePlugins
      }
    },
    resolve:{
        alias: {
          "@": path.resolve(process.cwd(), "src"),
        },
      },
}
module.exports = async () => {

    // process.cwd  current workplace dir
    // __dirname  current runtime module dir
    console.log("\n✨ 编译开始...")
    const server = await build(tinyCliBuildConfig)
    console.log("✅ 编译完成")
}