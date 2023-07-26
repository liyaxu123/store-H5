import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

// 当前工作目录路径
const root: string = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 环境变量
  const env = loadEnv(mode, root, '')

  return {
    plugins: [
      vue(), // 注入模板数据
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || 'false',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '^/api': {
          target: env.VITE_PROXY_API,
          changeOrigin: true, //允许跨域
          rewrite: (path) => path.replace(/^\/api/, ''), // 去掉请求路径中的 '/api' 前缀
        },
      },
    },
  }
})
