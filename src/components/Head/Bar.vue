<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
const barProps = defineProps(['type']);
let barType = true
onBeforeMount(() => {
    if(barProps.type === 'head'){
    }else if(barProps.type === 'foot'){
        barType = false
    }else{
        throw new Error('type只能传入head或foot')
    }
})


const page = reactive(['雅江首页', '关于雅江', '线上展厅', '产品中心', '视频中心', '工程案例', '新闻动态', '创意光科技', '联系我们'])
const pages = reactive([
    {
        title: '关于雅江',
        context: [{
            name: '企业简介',
            url: '',
        },{
            name: '企业文化',
            url: '',
        },{
            name: '企业环境',
            url: '',
        }]
    },{
        title: '产品中心',
        context: [{
            name: '舞台灯光',
            url: '',
        },{
            name: '建筑照明',
            url: '',
        }]
    },{
        title: '视频中心',
        context: [{
            name: '舞台灯光',
            url: '',
        },{
            name: '建筑照明',
            url: '',
        },{
            name: '灯光秀',
            url: '',
        },{
            name: '活动视频',
            url: '',
        }]
    },{
        title: '工程案例',
        context: [{
            name: '舞台灯光',
            url: '',
        },{
            name: '建筑照明',
            url: '',
        }]
    },{
        title: '新闻动态',
        context: [{
            name: '雅江动态',
            url: '',
        },{
            name: '媒体报道',
            url: '',
        },{
            name: '雅江公益',
            url: '',
        },{
            name: '展会资讯',
            url: '',
        }]
    },{
        title: '联系我们',
        context: [{
            name: '联系我们',
            url: '',
        },{
            name: '售后服务',
            url: '',
        },{
            name: '人才招聘',
            url: '',
        }]
    }
])
</script>

<template>
  <div id="head" v-if="barType">
    <img style="width: 300px; height: 60px" src="/src/assets/png/card.png" fit="contain"/>
    <ul>
        <li v-for="item in page">
            <div>{{item}}</div>
        </li>
    </ul>
    
  </div>
  <div id="foot" v-if="!barType">
    <img style="width: 300px; height: 60px" src="/src/assets/png/card.png" fit="contain"/>
    <div id="p">
        <div id="pages" v-for="item in pages">
        {{ item.title }}
       <ul>
        <li v-for="i in item.context">
            {{ i.name }}
        </li>
       </ul>
    </div>
    </div>
    <div id="w">
        <ul>
            <li>全国服务热线</li>
            <li><svg t="1680711595271" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2778" width="28" height="28"><path d="M704 640c-64 64-64 128-128 128s-128-64-192-128-128-128-128-192 64-64 128-128S256 64 192 64 0 256 0 256c0 128 131.488 387.488 256 512s384 256 512 256c0 0 192-128 192-192S768 576 704 640z" fill="#9EEB47" p-id="2779"></path></svg>
                <span>020-86947788</span></li>
            <li><button>在线客服</button></li>
        </ul>
        <div style="height:120px; width:120px; background:white">
            
        </div>
    </div>
        
  </div>
</template>

<style scoped>
#w{
    margin-right: 3%;
    width: 25rem;
    height: 80%;
    background-color: black;
    color: white;
    display: flex;
    justify-content: right;
    flex-wrap: nowrap;
}
#w>ul{
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-right: 15%;
    flex-shrink: 0;
}
#w>ul>li{
    list-style: none;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: right;

}
#w>ul>li>span{
    font-size: 28px;
    display: block;
    margin-left: 10px;
    color: #9EEB47;
}
#p{
    display: flex; 
    position: relative;
}
#pages{
   display: flex;
   flex-direction: column;
   width: 100px;
   margin-right: 40px;
}
#pages>ul{
    padding: 0px;
}
#pages>ul>li{
    color: rgba(255, 255, 255,  0.7);
    list-style: none;
    margin-top: 12px;
}
#foot{
    height: 16rem;
    width: 100%;
    background-color: black;
    color: white;
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    padding-top: 40px;
}
#head{
    height: 5rem;
    width: 100%;
    background-color: black;
    color: black;
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-between;
    align-items: center;
    margin-top: 48px;
}
img{
    margin-left: 8%;
    float: left;
}
#head>ul{
    margin-right: 10%;
    flex-wrap: nowrap;
    display: flex;
}
#head>ul>li{
    margin-left: 0.5rem;
    list-style: none;
    float: left;
}
#head>ul>li>div{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: 100px;
    color: white;
}

</style>