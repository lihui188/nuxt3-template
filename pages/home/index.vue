<template>
    <div class="home_content">
        <el-carousel :interval="5000" arrow="hover">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="container1">
        <div class="con_left">
            <div class="con_head">
                <span>新闻中心</span>
                <span class="gengduo">更多 <i class="iconfont icon-gengduo"></i></span>
            </div>
            <div class="con_list">
                
                <div class="con_item" v-for="(item,index) in 9" :key="index">
                    <div class="title_name">
                        <span class="item_tag">热点 |</span><span> 头条|抗震支吊架基础课（全网独家）头条|抗震支吊架基础课（全网独家）头条|抗震支吊架基础课（全网独家）</span>
                    </div>
                    <span>2023-01-12</span>
                </div>
                
            </div>

        </div>
        <div class="con_right">
            <div class="con_head">
                <span>资料下载</span>
                <span class="gengduo">更多 <i class="iconfont icon-gengduo"></i></span>
            </div>
        </div>
    </div>
    <div class="container1">
        <div class="con_left">
            <div class="con_head">
                <span>人才招聘</span>
                <span class="gengduo">更多 <i class="iconfont icon-gengduo"></i></span>
            </div>
        </div>
        <div class="con_right">
            <div class="con_head">
                <span>网站留言</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Http from '@/utils/request'
useHead({
    title: '首页 | 广州库平信息技术有限公司',
    meta: [
        { name: 'description', content: 'snow-desc' },
        { name: 'keywords', content: 'snow-kw' }
    ]
})
// let str:any =  await useFetch('/api/nihao',{method:'post'})
// console.log(str.data._rawValue)
// console.log(Http.post('/m-staff-center/api/v1/getName', { obj: 1 }))
Http.post('/m-staff-center/api/v1/getName', { obj: 1 }).then((res: any) => {
    console.log('27', res)
}).catch((err: any) => {
    console.log('29', err)
})
// await axios.post("http://localhost:3000/api/apiName",{ test: 'axios' })
</script>
  
<style lang="scss" src="./scss/index.scss"></style>