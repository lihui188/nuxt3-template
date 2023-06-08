<template>
    <client-only>
        <!-- <div class="home_content">
            <el-carousel :interval="5000" arrow="hover">
                <el-carousel-item v-for="item in swiperList" :key="item">
                    <img style="width:1200px;height:500px;" :src="covertHttp(item['img'])" />
                </el-carousel-item>
            </el-carousel>
        </div> -->
        <div class="hasProduct">
            <div class="product_class">
                <div class="product_title">类别</div>
                <el-scrollbar max-height="360px">
                    <div class="cate_list">
                        <div :class="['cate_item', selectCateId == item['id'] ? 'cate_active' : '']"
                            v-for="item in cateList" :key="item['id']" @click="changeCate(item)">
                            {{ item['cateName'] }}
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="product_list">
                <el-carousel height="400px" :interval="5000" arrow="hover">
                    <el-carousel-item v-for="item in swiperList" :key="item">
                        <img :src="covertHttp(item['img'])" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="show_product" v-show="isShowList">
                <el-scrollbar max-height="400px" @mouseover="handleOver" @mouseleave="handleOut">
                    <div class="cateName">
                        <span> {{ selectCateName }}</span>
                        <span class="gengduo" @click="toOtherPage('/product')">更多 <i
                                class="iconfont icon-gengduo"></i></span>
                    </div>
                    <div class="cateProduct">
                        <div class="catePro" v-for="item in cateProList" :key="item['id']">
                            <div class="pro_img">
                                <img class="homeImg" :src="covertHttp(item['img'])" />
                                <i v-if="item['isHot']" class="iconfont icon-remenhot"></i>
                            </div>
                            <div class="pro_info">
                                <span class="price">{{ item['price'] }}元</span>
                                <span class="number">数量：{{ item['number'] }}</span>
                            </div>
                            <div class="pro_name">
                                {{ item['productName'] }}
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="container1">
            <div class="con_head">
                <span>新闻中心</span>
                <span class="gengduo" @click="toOtherPage('/news')">更多 <i class="iconfont icon-gengduo"></i></span>
            </div>
            <div class="con_list">
                <div class="con_item" v-for="(item) in newsList" :key="item['id']" @click="toDetail(1, item['id'])">
                    <div>
                        <img style="width:100%;height:150px;" :src="covertHttp(item['img'])" />
                    </div>
                    <div class="title_name line_height">
                        {{ item['title'] }}
                    </div>
                    <span>{{ item['createAt'] }}</span>
                </div>
            </div>
        </div>
        <div class="container2">
            <div class="con_head">
                <span>人才招聘</span>
                <span class="gengduo" @click="toOtherPage('/recruit')">更多 <i class="iconfont icon-gengduo"></i></span>
            </div>
            <div class="con_layout b_list">
                <div class="con_list">
                    <div class="con_item" v-for="(item) in invitesList" :key="item['id']" @click="toDetail(2, item['id'])">
                        <div>
                            <img style="width:100%;height:150px;" :src="covertHttp(item['img'])" />
                        </div>
                        <div class="title_name line_height">
                            {{ item['title'] }}
                        </div>
                        <span>{{ item['createAt'] }}</span>
                    </div>
                </div>
                <div class="con_scroll b_scroll">
                    <div class="con_item2 " v-for="(item) in invitesList2" :key="item['id']"
                        @click="toDetail(2, item['id'])">
                        <div class="title_name line_height">
                            {{ item['title'] }}
                        </div>
                        <span>{{ item['createAt'].split(' ')[0] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container1">
            <div class="con_head">
                <span>网站留言</span>
            </div>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize">
                    <el-row style="margin-top:10px">
                        <el-col :span="12">
                            <el-form-item class="margin-bottom-10" label="姓 名" prop="name">
                                <el-input v-model="ruleForm.name" />
                            </el-form-item>
                            <el-row style="margin-top:10px">
                                <el-col :span="12">
                                    <el-form-item class="margin-bottom-10" label="性 别" prop="sex">
                                        <el-select v-model="ruleForm.sex" placeholder="请选择">
                                            <el-option label="先生" value="先生" />
                                            <el-option label="女士" value="女士" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item class="margin-bottom-10" label="类 别" prop="category">
                                        <el-select v-model="ruleForm.category" placeholder="请选择">
                                            <el-option label="合作" value="合作" />
                                            <el-option label="留言" value="留言" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item class="margin-bottom-10" label="联系方式" prop="contact">
                                <el-input v-model="ruleForm.contact" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item class="margin-bottom-10" label="内容" prop="context">
                                <el-input v-model="ruleForm.context" type="textarea" :rows="3" />
                            </el-form-item>
                            <el-row>
                                <el-col :span="24" style="display:flex;justify-content:flex-end;">
                                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                                        发 送
                                    </el-button></el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </client-only>
</template>
<script lang="ts" setup>
import Http from '@/utils/request'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
useHead({
    title: '首页',
    meta: [
        { name: 'description', content: 'snow-desc' },
        { name: 'keywords', content: 'snow-kw' }
    ]
})
const router = useRouter()
// 图片拼接
const { public: { VITE_PREFFIX } } = useRuntimeConfig()
const covertHttp = (url: string) => {
    return VITE_PREFFIX + url
}

// 获取轮播图
const swiperList = ref([]);
Http.get('/home/carousel/info').then((res: any) => {
    let data = res.data
    swiperList.value = data
})
// 获取新闻列表
const newsList = ref([]);
Http.get('/home/inp/info').then((res: any) => {
    let data = res.data
    newsList.value = data.slice(0, 8)
})
// 获取招聘信息
const invitesList = ref([]);
const invitesList2 = ref([]);
Http.get('/home/hiring/info').then((res: any) => {
    let data = res.data
    invitesList.value = data.slice(0, 3)
    invitesList2.value = data
})
// 获取分类类别
const cateList = ref([]);
Http.get('/home/cate/info').then((res: any) => {
    let data = res.data
    cateList.value = data
})
// 跳转详情页
// type:1新闻，2人才招聘，3资料下载
const toDetail = (type: number, id: number) => {
    router.push({
        path: '/detail',
        query: {
            type,
            id
        }
    })
}
const toOtherPage = (path: string) => {
    router.push({
        path
    })
}
// 网站留言
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    category: '留言',
    contact: '',
    context: '',
    sex: '先生',
})
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    context: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    contact: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    category: [
        {
            required: true,
            message: '请选择',
            trigger: 'change',
        },
    ],
    sex: [
        {
            required: true,
            message: '请选择',
            trigger: 'change',
        },
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            Http.post('/mes/info', { ...ruleForm }).then((res: any) => {
                ElMessage({
                    message: "留言成功",
                    type: 'success',
                })
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 悬浮分类显示
const isShowList = ref(false)
const handleOver = (id?: number) => {
    // console.log(id)
    isShowList.value = true
}
const handleOut = () => {
    isShowList.value = false
    selectCateId.value = ''
    selectCateName.value = ''
}
// 
const selectCateId = ref('')
const selectCateName = ref('')
const cateProList = ref([])
const changeCate = (item: any) => {
    selectCateId.value = item.id
    selectCateName.value = item.cateName
    isShowList.value = true
    Http.get(`/pro/cate/${item.id}`).then((res: any) => {
        cateProList.value = res.data.slice(0, 10)
    })
}

</script>
  
<style lang="scss" scoped>
.home_header {
    img {
        margin: 3px 0px;
    }
}

.home_content {
    margin: 10px 0;
}

.margin-bottom-10 {
    margin-bottom: 10px;
}

.container1 {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;

    .con_head {
        color: #f07031;
        font-weight: bold;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
    }

    .con_list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;

        .con_item {
            cursor: pointer;
            width: 260px;
            margin: 10px 5px;
            padding: 10px;
            border-radius: 5px;
            transition: 0.5s;
            text-overflow: -o-ellipsis-lastline;

            .line_height {
                // width: 200px;
            }

            .title_name {
                overflow: hidden; //溢出内容隐藏
                text-overflow: ellipsis; //文本溢出部分用省略号表示
                display: -webkit-box; //特别显示模式
                -webkit-line-clamp: 2; //行数
                line-clamp: 2;
                -webkit-box-orient: vertical; //盒子中内容竖直排列
                margin: 5px 0;
            }

            &:hover {
                transition: 0.5s;
                transform: scale(1.1);
                box-shadow: 0 0 10px rgba(0, 0, 0, .3);
            }
        }
    }
}

.container2 {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;

    .con_head {
        color: #f07031;
        font-weight: bold;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
    }

    .con_layout {
        display: flex;

        .con_list {
            // width: 100%;
            width: 870px;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;

            .con_item {
                cursor: pointer;
                width: 260px;
                margin: 10px 5px;
                padding: 10px;
                border-radius: 5px;
                transition: 0.5s;
                text-overflow: -o-ellipsis-lastline;

                .line_height {
                    // width: 200px;
                }

                .title_name {
                    overflow: hidden; //溢出内容隐藏
                    text-overflow: ellipsis; //文本溢出部分用省略号表示
                    display: -webkit-box; //特别显示模式
                    -webkit-line-clamp: 2; //行数
                    line-clamp: 2;
                    -webkit-box-orient: vertical; //盒子中内容竖直排列
                    margin: 5px 0;
                }

                &:hover {
                    transition: 0.5s;
                    transform: scale(1.1);
                    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
                }
            }
        }

        .con_scroll {
            width: 260px;
            margin: 10px 5px;
            padding: 10px;

            .con_item2 {
                display: flex;
                justify-content: space-between;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                font-size: 14px;

                .title_name {
                    width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }


    }
}

@keyframes scrollTop {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    100% {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
}

.b_list {
    height: 215px;
    overflow: hidden;
}

.b_scroll {
    -webkit-animation: 10s scrollTop linear infinite normal;
    animation: 10s scrollTop linear infinite normal;
}

.gengduo {
    cursor: pointer;
}

.el-select-dropdown__item {
    padding: 0 32px 0 20px !important;
}

.el-button {
    padding: 8px 15px !important;
}

.hasProduct {
    margin: 20px 0;
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    display: flex;
    position: relative;

    .product_class {
        width: 250px;
        background-color: $bgColor2;

        // overflow-y: scroll;
        .product_title {
            height: 40px;
            color: #fff;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $baseColor;
        }

        .cate_list {
            width: 250px;

            .cate_item {
                width: inherit;
                padding: 0 20px;
                box-sizing: border-box;
                overflow: hidden; //溢出隐藏
                text-overflow: ellipsis; //溢出部分显示为省略号
                white-space: nowrap; //不换行
                height: 30px;
                color: #fff;
                line-height: 30px;
                text-align: center;
                background-color: $bgColor2;
                cursor: pointer;

                &:hover {
                    background-color: $bgColor;
                    color: $baseColor;
                }
            }

            .cate_active {
                background-color: $bgColor;
                color: $baseColor;
            }
        }

    }

    .product_list {
        width: calc(100% - 250px);
        background-color: #000;
    }

    .show_product {
        position: absolute;
        left: 249px;
        width: calc(100% - 249px);
        height: 400px;
        background-color: rgba(255, 255, 255, .9);
        box-sizing: border-box;
        padding: 20px;

        .cateName {
            color: #000;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
        }

        .cateProduct {
            display: flex;
            flex-wrap: wrap;

            .catePro {
                margin: 10px 10px 10px 0;
                font-size: 12px;
                cursor: pointer;
                background-color: #fff;
                padding: 10px;

                .pro_img {
                    width: 150px;
                    height: 80px;
                    position: relative;

                    .homeImg {
                        width: 150px;
                        height: 80px;
                    }

                    .icon-remenhot {
                        color: #ff0033;
                        font-size: 30px;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }

                .pro_info {
                    margin: 5px 0;

                    .price {
                        color: #ff0033;
                        font-size: 16px;
                        font-weight: bold;
                        margin-right: 10px;
                    }
                }

                .pro_name {
                    width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

            }
        }
    }
}
</style>
  
  