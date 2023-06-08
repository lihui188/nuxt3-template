import { ElMessage } from 'element-plus'
 
const fetch = (url: string, options?: any): Promise<any>  => {
    const token = useCookie("token");
    const headers = { // headers信息
        'Authorization' : `Bearer ${token.value}`
    }
    const { public: { VITE_BASEURL } } = useRuntimeConfig()
    const reqUrl = VITE_BASEURL + url

    return new Promise((resolve, reject) => {
        useFetch(reqUrl, { ...options, headers }).then(({ data }: any) => {
            const value = data.value
            if (!data._rawValue) {
                // 这里处理错误回调
                reject(value)
            }else if(data._rawValue.code !== 200){
                ElMessage({
                    message: "网络或服务器出错，请等待修复",
                    type: 'error',
                })
            } else {
                resolve(value)
            }
        }).catch((err: any) => {
            reject(err)
        })
    })
}
 
export default new class Http {
 
    get(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'get', params })
    }
 
    post(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'post', body })
    }
 
    put(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'put', body })
    }
 
    delete(url: string, body?: any): Promise<any>  {
        return fetch(url, { method: 'delete', body })
    }
}