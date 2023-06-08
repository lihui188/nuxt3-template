<template>
    <div class="news_container">
        <div class="news_header">
            <span class="news_title">资料下载</span>
        </div>
        <div class="newsList">
            <div class="news_item" v-for="item in newsList" :key="item['id']" @click="toDetail(3,item['id'])">
                <img style="width:260px;height:150px;" :src="covertHttp(item['img'])" />
                <div class="text_content">
                    <div>
                        <div class="title">{{ item['title'] }}</div>
                        <div class="description">{{ item['description'] }}</div>
                    </div>
                    <div class="createAt">{{ item['createAt'] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Http from '@/utils/request'
useHead({
    title: '资料下载',
    meta: [
        { name: 'description', content: '资料下载' },
        { name: 'keywords', content: '资料下载' }
    ]
})
// 图片拼接
const { public: { VITE_PREFFIX } } = useRuntimeConfig()
const covertHttp = (url: string) => {
    return VITE_PREFFIX + url
}
// 获取新闻列表
const newsList = ref([]);
Http.get('/home/news/info').then((res: any) => {
    let data = res.data
    newsList.value = data.slice(0, 8)
})
// type:1新闻，2人才招聘,3,资料下载
const router = useRouter()
const toDetail = (type:number,id:number)=>{
    router.push({
        path:'/detail',
        query:{
            type,
            id
        }
    })
}
</script>
  
<style lang="scss" scoped>
.news_container {
    margin: 10px 0;
    padding: 20px;
    background-color: #fff;
    min-height: 700px;

    .news_header {

        .news_title {
            font-size: 18px;
            color: $baseColor;
            padding-bottom: 5px;
            border-bottom: 2px solid $baseColor;
        }
    }
   

    .newsList {
        margin-top: 20px;

        .news_item {
            width: 100%;
            cursor: pointer;
            height: 180px;
            margin-bottom: 10px;
            transition: 0.5s;
            display: flex;
            align-items: center;
            padding: 15px;
            box-sizing: border-box;
            // border: 1px solid $baseColor;
            border-radius: 5px;

            &:hover {
                transition: 0.5s;
                box-shadow: 0 0 5px rgba($color: #f07031, $alpha: .5);
            }

            .text_content {
                width: calc(1130px - 260px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 20px;
                height: 100%;
                box-sizing: border-box;
                .title {
                    font-size: 18px;
                    font-weight: bold;
                    overflow: hidden; //溢出内容隐藏
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .description {
                    font-size: 16px;
                    margin-top: 10px;
                    color: #606266;
                    overflow: hidden; //溢出内容隐藏
                    text-overflow: ellipsis; //文本溢出部分用省略号表示
                    display: -webkit-box; //特别显示模式
                    -webkit-line-clamp: 2; //行数
                    line-clamp: 2;
                    -webkit-box-orient: vertical; //盒子中内容竖直排列
                }

                .createAt {
                    color: #606266;
                }
            }
        }
    }
}
</style>
  
  