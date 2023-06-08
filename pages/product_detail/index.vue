<template>
    <div class="detail_container">
        <div class="left_info">
            <div class="title">
                <h1>{{ productInfo.productName }}</h1>
                <div class="createAt">
                    {{ productInfo.createAt }}
                </div>
            </div>
            <div class="content" v-html="productInfo['description']">

            </div>
            <div class="backPage" @click="backPage">
                <el-icon>
                    <Back />
                </el-icon>
                <span>返回</span>
            </div>
        </div>
        <div class="right_info">
            <div class="right_one">
                <img class="product_img" :src="covertHttp(productInfo['img'])" />
                <div class="product_info">
                    <span>名称：</span>
                    <span>{{ productInfo.productName }}</span>
                </div>
                <div class="product_info">
                    <span>价格：</span>
                    <span>{{ productInfo.price }}</span>
                </div>
                <div class="product_info">
                    <span>数量：</span>
                    <span>{{ productInfo.number }}</span>
                </div>
                <div class="product_info">
                    <span class="">联系方式：</span>
                    <span class="product_contact">
                        <i class="iconfont icon-dianhualianxifangshi"></i>
                        {{ productInfo.contact }}</span>
                </div>
            </div>
            <div class="right_two">
                <div class="proList_header">
                    <span>相似商品</span>
                    <i class="iconfont icon-gengduo" @click="toProductList"></i>
                </div>
                <div class="pro_list">
                    <div class="pro_item" v-for="item in cateProList" :key="item['id']" @click="checkDetail(item['id'])">
                        <div class="item_name">
                            {{ item.productName }}
                        </div>
                        <div class="item_time">
                            {{ item.createAt.split(' ')[0] }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="ellipsis">
                <span>是否热销：</span>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import Http from '@/utils/request'
useHead({
    title: '首页',
    meta: [
        { name: 'description', content: 'snow-desc' },
        { name: 'keywords', content: 'snow-kw' }
    ]
})
const route = useRoute()
const router = useRouter()
const type = route.query.type
const id = route.query.id
const content = ref({});
const productInfo = ref({})
// 产品详情
if (type == '4') {
    Http.get(`/pro/info/${id}`).then((res: any) => {
        productInfo.value = res.data
    })
}
const getDetail = (params:number)=>{
    Http.get(`/pro/info/${params}`).then((res: any) => {
        productInfo.value = res.data
    })
}
// 图片拼接
const { public: { VITE_PREFFIX } } = useRuntimeConfig()
const covertHttp = (url: string) => {
    return VITE_PREFFIX + url
}
// 初始化数据
const cateProList = ref([])
const initData = () => {
    Http.get(`/pro/page/1/18`, {
        cateId: ''
    }).then((res: any) => {
        cateProList.value = res.data.list
    })
}
initData()
// 查看详情
const checkDetail = (id: number) => {
    getDetail(id)
}
// 返回上一页
const backPage = () => {
    router.go(-1)
}
const toProductList = () => {
    router.push('/product')
}
</script>
  
<style lang="scss" scoped>
.detail_container {
    margin: 10px 0;
    display: flex;

    .left_info {
        width: calc(100% - 300px);
        margin-right: 20px;
        box-sizing: border-box;

        .title {
            padding: 20px;

            .createAt {
                color: #aaa;
                margin: 10px 0;
            }
        }

        .content {
            padding: 20px;
            background-color: #fff;
            min-height: 500px;
        }
    }

    .right_info {
        width: 300px;
        box-sizing: border-box;

        .right_one {
            background-color: #fff;
            padding: 10px;

            .product_img {
                width: 280px;
                height: 165px;
            }

            .product_info {
                margin-top: 10px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .product_contact {
                color: #fff;
                background-color: #67C23A;
                box-sizing: border-box;
                padding: 0 20px;
                border-radius: 10px;
            }
        }

        .right_two {
            margin-top: 10px;
            background-color: #fff;
            padding: 10px;

            .proList_header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 16px;
            }

            .pro_list {
                font-size: 14px;

                .pro_item {
                    cursor: pointer;
                    margin: 10px 0;
                    display: flex;
                    justify-content: space-between;

                    .item_name {
                        width: 170px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .item_time {
                        color: #aaa;
                    }

                    &:hover {
                        color: $baseColor;
                        transition: 0.5s;
                    }
                }
            }
        }

    }

    .margin-top-20 {
        margin-top: 20px;
    }

    .download {
        color: #337ecc;
        margin-right: 10px;
        cursor: pointer;
        margin-bottom: 5px;

        // display: block;
        &:hover {
            outline: 1;
        }
    }
}

.backPage {
    margin-top: 10px;
    width: 100px;
    height: 40px;
    background-color: $baseColor;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
}
.icon-gengduo{
    cursor: pointer;
}
</style>