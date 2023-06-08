<template>
    <div class="detail_container">
        <div class="title">
            <h1>{{ content.title }}</h1>
            <div class="createAt">
                {{ content.createAt }}
            </div>
        </div>
        <div class="content" v-html="content.content">
        </div>
        <div class="margin-top-20">
            <span v-for="(item, index) in urlList" :key="index" class="download" @click="downloadFile(item)">附件下载{{ index + 1
            }}
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Http from '@/utils/request'
useHead({
    title: '首页',
    meta: [
        { name: 'description', content: 'snow-desc' },
        { name: 'keywords', content: 'snow-kw' }
    ]
})
const route = useRoute()
const type = route.query.type
const id = route.query.id
const content = ref({});
const urlList = ref<string[]>([])
if (type == '1') {
    Http.get(`/inp/info/${id}`).then((res: any) => {
        content.value = res.data
    })
}
if (type == '2') {
    Http.get(`/hir/info/${id}`).then((res: any) => {
        content.value = res.data
    })
}
if (type == '3') {
    Http.get(`/news/info/${id}`).then((res: any) => {
        content.value = res.data
        // console.log(res.data.infoUrl)
        urlList.value = res.data.infoUrl.split('|')
    })
}
const downloadFile = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    // a.download = 'clz.doc'
    a.click()
}
</script>
  
<style lang="scss" scoped>
.detail_container {
    margin: 10px 0;
    min-height: 600px;
    padding: 20px;
    background-color: #fff;

    .title {
        text-align: center;
        border-bottom: 1px dashed #ccc;

        .createAt {
            color: #aaa;
            margin: 10px 0;
        }
    }

    .content {
        padding-top: 20px;
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
</style>