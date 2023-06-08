<template>
    <div class="news_container">
        <div class="news_header">
            <span class="news_title">产品列表</span>
        </div>
        <div class="select_cate">
            <div class="cate_left">分类：</div>
            <div class="cate_right">
                <span :class="['cateName', cateActive == '' ? 'cate_active' : '']" @click="changeCate('')">全部</span>
                <span :class="['cateName', cateActive == item['id'] ? 'cate_active' : '']" v-for="item in cateList"
                    :key="item['id']" @click="changeCate(item['id'])">{{
                        item['cateName'] }}</span>
            </div>
        </div>
        <div class="newsList">
            <div class="news_item" v-for="item in cateProList" :key="item['id']" @click="toDetail(4, item['id'])">
                <div class="pro_img">
                    <img class="coverImg" :src="covertHttp(item['img'])" />
                    <i v-if="item['isHot']" class="iconfont icon-remenhot"></i>
                </div>
                <div class="text_content">
                    <div class="title">{{ item['productName'] }}</div>
                    <div class="createAt">
                        <span class="price">{{ item['price'] }}￥</span>
                        <span>数量：{{ item['number'] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <el-pagination :hide-on-single-page="true" background layout="prev, pager, next" :total="totalElement"
                @current-change="handleCurrentChange" v-model:current-page="page" v-model:page-size="size" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import Http from '@/utils/request'
useHead({
    title: '产品介绍',
    meta: [
        { name: 'description', content: '产品介绍' },
        { name: 'keywords', content: '产品介绍' }
    ]
})
// 图片拼接
const { public: { VITE_PREFFIX } } = useRuntimeConfig()
const covertHttp = (url: string) => {
    return VITE_PREFFIX + url
}
// type:1新闻，2人才招聘,3,资料下载
const router = useRouter()
const toDetail = (type: number, id: number) => {
    router.push({
        path: '/product_detail',
        query: {
            type,
            id
        }
    })
}
// 获取分类
const cateList = ref([]);
const getAllCate = () => {
    Http.get('/home/cate/info').then((res: any) => {
        let data = res.data
        cateList.value = data
    })
}
getAllCate()
// 分页
const page = ref(1)
const size = ref(12)
const totalElement = ref(0)
const handleCurrentChange = (val: number) => {
    initData(val)
}
const cateProList = ref([])
const cateActive = ref('')
// 初始化数据
const initData = (page?: number) => {
    Http.get(`/pro/page/${page}/${size.value}`, {
        cateId: cateActive.value
    }).then((res: any) => {
        totalElement.value = res.data.total
        cateProList.value = res.data.list
    })
}
initData(1)
// 选择分类
const changeCate = (params: any) => {
    cateActive.value = params
    initData(1)
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

    .select_cate {
        margin-top: 20px;
        display: flex;

        .cate_left {
            width: 70px;
            padding: 5px 10px;
            text-align: center;
            border-top-left-radius: 6px;
            border-bottom-right-radius: 6px;
            color: #fff;
            background-color: #ccc;
        }

        .cate_right {
            width: calc(100% - 70px);
            padding: 5px 10px;

            .cateName {
                padding: 5px 10px;
                cursor: pointer;
                margin-right: 20px;

                &:hover {
                    background-color: $baseColor;
                    color: #fff;
                    border-top-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
            }

            .cate_active {
                background-color: $baseColor;
                color: #fff;
                border-top-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }

        }
    }

    .pagination {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .newsList {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;

        .news_item {
            width: 290px;
            cursor: pointer;
            // height: 180px;
            margin-bottom: 10px;
            transition: 0.5s;
            // display: flex;
            // align-items: center;
            padding: 15px;
            box-sizing: border-box;
            // border: 1px solid $baseColor;
            border-radius: 5px;

            .pro_img {
                width: 260px;
                height: 150px;
                position: relative;

                .coverImg {
                    width: 260px;
                    height: 150px;
                }

                .icon-remenhot {
                    color: #ff0033;
                    font-size: 40px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }


            &:hover {
                transition: 0.5s;
                box-shadow: 0 0 5px rgba($color: #f07031, $alpha: .5);
            }

            .text_content {
                // width: calc(1130px - 260px);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                // padding: 0 20px;
                // height: 100%;
                box-sizing: border-box;

                .title {
                    margin: 5px 0;
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
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .price {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>
  
  