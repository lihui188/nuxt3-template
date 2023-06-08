// https://nuxt.com/docs/api/configuration/nuxt-config
import { loadEnv } from 'vite'

interface VITE_ENV_CONFIG {
    VITE_BASEURL: string
    VITE_API_PREFFIX: string
    VITE_PACK_ENV: string
}
const envScript = (process.env as any).npm_lifecycle_script.split(' ')
const envName = envScript[envScript.length - 1] // 通过启动命令区分环境
const envData = loadEnv(envName, 'env') as unknown as VITE_ENV_CONFIG
console.log('当前环境：', envData)
export default defineNuxtConfig({
    runtimeConfig: {
        public: envData // 把env放入这个里面，通过useRuntimeConfig获取
    },
    css: [
        'element-plus/dist/index.css',
    ],
    vite: {
        envDir: '~/env', // 指定env文件夹
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/default.scss" as *;'	// 注意文件路径要配成自己的
                }
            }
        }
    },
    app: {
        baseURL:'/',
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link:[
                {
                    rel:"icon",href:"/logo.png",type:'image/x-icon'
                }
            ]
        }
    }
})
