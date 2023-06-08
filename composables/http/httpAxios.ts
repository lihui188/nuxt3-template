/**
 * @description axios公共请求封装
 * */
import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";

/**
 * @description 定义相关接口或者枚举
 * */

//请求枚举
export enum MethodEnum {
    Get='GET',
    Post='POST'
}

//返回结果
export interface ResponseResultInterface<Body> {
    Header:{},
    Body: Body
}

//请求参数
export interface RequestInterface<params> {
    url:string,
    params?:params,
    method?:MethodEnum
}

/**
 * 封装axios
 * */

// 添加请求拦截器
axios.interceptors.request.use( (config:InternalAxiosRequestConfig)=>{
    return config;
}, (error)=>{
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use( (response:AxiosResponse) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

/**
 * @method useAxiosRequest axios请求封装
 * @param requestPar { RequestInterface } 请求url
 * @return Promise
 * */
const useAxiosRequest= async <params,responseData>(requestPar:RequestInterface<params>):Promise<responseData> => {
    const requestResult:AxiosResponse = await axios({
        method: requestPar.method || MethodEnum.Post,
        url: requestPar.url,
        data: requestPar.params
    });
    return requestResult.data as responseData;
};


export default useAxiosRequest;

