<template>
    <div class="layout_container">
        <div class="layout">
            <div class="layout_header">
                <div class="home_header">
                    <img style="display: block;" v-for="item in advertsList" :src="covertHttp(item['img'])" />
                </div>
                <div class="content_head">
                    <!-- <img class="logos" src="@/assets/images/home/logos.png" /> -->
                    <img class="logos" src="@/assets/images/home/logo2.jpg" />
                    <div class="nav_menu">
                        <div :class="['nav_item', fullPath === '/' ? 'nav_active' : '']" @click="toHome">
                            首页
                        </div>
                        <div :class="['nav_item', fullPath === '/news' ? 'nav_active' : '']" @click="toNews">
                            新闻中心
                        </div>
                        <div :class="['nav_item', fullPath === '/download' ? 'nav_active' : '']" @click="toDownload">
                            资料下载
                        </div>
                        <div :class="['nav_item', fullPath === '/recruit' ? 'nav_active' : '']" @click="toRecruit">
                            人才招聘
                        </div>
                        <div :class="['nav_item', fullPath === '/about' ? 'nav_active' : '']" @click="toAboutUs">
                            关于我们
                        </div>
                    </div>
                </div>
            </div>
            <div class="layout_content">
                <slot />
            </div>
        </div>
        <div class="layout_footer">
            <div class="footer_content">
                <div class="foot_left">
                    <!-- <div><span>关于我们</span><span class="margin-lr-10">|</span><span>权利申明</span></div> -->
                    <div class="margin-tb-10">（www.kpitc.com）由广州库平信息技术有限公司承办.</div>
                    <div><span style="cursor: pointer;" @click="toAboutUs">关于我们</span></div>
                    <!-- <div class="margin-tb-10">全国统一客服热线：xxxxxxx</div> -->
                    <div class="margin-tb-10">公司电话：xxxxxx</div>
                    <div class="margin-tb-10">联系地址：广州市黄埔区科研路3号A5栋306房（仅限办公）</div>
                </div>
                <div class="foot_right">
                    <!-- <div class="margin-tb-10">抗震支架网（www.kzzjw.com）由抗震支架行业协会主办、浙江步云信息技术有限公司承办.　Copyright © 2018-2020　All Rights Reserved.</div> -->
                </div>
            </div>
            <div class="footer_bottom">
                ©2023 广州库平信息技术有限公司 <a class="toBeian" href="https://beian.miit.gov.cn/">粤ICP备17030347号-1</a>
            </div>
        </div>

    </div>
    <el-backtop :right="100" :bottom="100" />
</template>
 
<script setup lang="ts">
import Http from '@/utils/request'
import { useRouter } from 'vue-router'
let router = useRouter()
const fullPath = ref('')
fullPath.value = router.currentRoute.value.fullPath
watch(
    () => router.currentRoute.value.fullPath,
    (newVal, oldVal) => {
        fullPath.value = newVal
    }
);
const toAboutUs = () => {
    router.push({
        path: "/about"
    })
}
const toHome = () => {
    router.push({
        path: "/"
    })
}
const toNews = () => {
    router.push({
        path: "/news"
    })
}
const toDownload = () => {
    router.push({
        path: "/download"
    })
}
const toRecruit = () => {
    router.push({
        path: "/recruit"
    })
}
// 图片拼接
const { public: { VITE_PREFFIX } } = useRuntimeConfig()
const covertHttp = (url: string) => {
    return VITE_PREFFIX + url
}
// 获取轮播图
const advertsList = ref([]);
Http.get('/home/advertising/info').then((res: any) => {
    let data = res.data
    advertsList.value = data
})

</script>
 
<style lang="scss" scoped>
.nav_active {
    color: #f07031;
}

.layout_container {
    background-color: #eee;

    .layout {
        width: 1200px;
        margin: 0 auto;

        .layout_content {
            min-height: 100vh;
        }
    }

    .layout_footer {
        width: 100%;
        // height: 250px;
        background-color: #000;
        color: #fff;

        .footer_content {
            width: 1200px;
            // background-color: #ccc;
            margin: 0 auto;
            padding: 20px 0;
            display: flex;

            .foot_left {
                flex: 6;
            }

            .foot_right {
                flex: 4;
            }
        }

        .footer_bottom {
            text-align: center;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            background-color: #070D2B;
            color: #fff;
            z-index: 1;
        }
    }


}

.toBeian {
    color: #fff;
}

.margin-tb-10 {
    margin: 10px 0;
}

.margin-lr-10 {
    margin: 0px 10px;
}

.home_header {
    img {
        width:1200px;
        margin-bottom:5px;
    }
}

.content_head {
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logos {
        width: auto;
        height: 80px;
    }

    .nav_menu {
        display: flex;

        .nav_item {
            font-size: 16px;
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

            &:hover {
                color: #f07031;
            }
        }
    }

    .search-border {
        width: 400px;
        position: relative;

        .search {
            width: 400px;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid #ff0033;
            outline: 0;
            border-radius: 20px;
            padding: 0 10px;
        }

        .icon-search {
            position: absolute;
            top: 12px;
            right: 15px;
            cursor: pointer;
        }
    }

}
</style>