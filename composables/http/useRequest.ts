/**
 * @description  useFetch请求封装
 * */
import {FetchContext} from "ofetch";
import {_AsyncData} from "#app/composables/asyncData";

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

export interface RequestInterface<params>{
    url:string,
    method?: MethodEnum,
    params?: params
}

/**
 * @method useRequest useFetch请求封装
 * @param requestPar {RequestInterface} 请求参数
 * */

const useRequest = async <params,responseData>(requestPar:RequestInterface<params>):Promise<responseData>=>{
    const requestResult:_AsyncData<any, any> = await useFetch(requestPar.url,{
        method:requestPar.method || MethodEnum.Post,
        params:requestPar.params || {},
        //请求拦截
        onRequest(requestOption:FetchContext):void {
            // options.headers = options.headers || {}
        },
        //错误请求拦截
        onRequestError(RequestErrorOption:FetchContext):void {
            // throw createError({
            //     statusCode: 500,
            //     statusMessage: reqUrl,
            //     message: '自己后端接口的报错信息',
            // })
        },
        //响应拦截
        onResponse(ResponseOption:FetchContext):void {
        },
        //响应错误拦截
        onResponseError(responseErrorOption:FetchContext):void {
            // throw createError({
            //     statusCode: 500,
            //     statusMessage: reqUrl,
            //     message: '自己后端接口的报错信息',
            // })
        }
    });

    return requestResult.data.value as responseData;
}

export default useRequest;
