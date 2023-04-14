<script setup>
import {reactive} from 'vue';
const searchBarProps = defineProps({
    type: Boolean
});
const page = reactive([
    {
        title: '雅江首页'
    },{
        title: '关于雅江',
        context: [{
            name: '企业简介',
            url: '',
        }, {
            name: '企业文化',
            url: '',
        }, {
            name: '企业环境',
            url: '',
        }, {
            name: '荣誉资质',
            url: ''
        }]
    },{
        title: '线上展厅'
    },{
        title: '产品中心',
        context: [{
            name: '舞台灯光',
            url: '',
        }, {
            name: '建筑照明',
            url: '',
        }]
    },{
        title: '视频中心',
        context: [{
            name: '舞台灯光',
            url: '',
        }, {
            name: '建筑照明',
            url: '',
        }, {
            name: '灯光秀',
            url: '',
        }, {
            name: '活动视频',
            url: '',
        }]
    },{
        title: '工程案例',
        context: [{
            name: '舞台灯光',
            url: '',
        }, {
            name: '建筑照明',
            url: '',
        }]
    },{
        title: '新闻动态',
        context: [{
            name: '雅江动态',
            url: '',
        }, {
            name: '媒体报道',
            url: '',
        }, {
            name: '雅江公益',
            url: '',
        }, {
            name: '展会资讯',
            url: '',
        }]
    },{
        title: '创意光科技',
        context:[{
                name: '雅江杯',
                url: '',
            },{
                name: '高峰论坛',
                url: '',
            }
        ]
    },{
        title: '联系我们',
        context: [{
            name: '联系我们',
            url: '',
        }, {
            name: '售后服务',
            url: '',
        }, {
            name: '人才招聘',
            url: '',
        }]
    }
])
</script>

<template>
    <el-menu mode="horizontal" v-if="searchBarProps.type" class="menu" text-color="white" background-color="black" active-text-color="#95d475">
        <img style="width: 230px; height: 50px" src="/src/assets/png/card.png" fit="contain" />
        <div class="flex-grow" />
        <template v-for="item,index in page" :key="index">
            <el-menu-item :index="index+''" v-if="!item.context">{{item.title}}</el-menu-item>
            <el-sub-menu :index="index+''"  v-if="item.context" :popper-append-to-body="fasle" :popper-offset="12">
                <template #title>{{ item.title }}</template>
                <el-menu-item v-for="team, teammate in item.context" :index="index+ '-' + teammate">
                    {{ team.name }}
                </el-menu-item>
            </el-sub-menu>
        </template>
        <div id="placeholder" />
    </el-menu>


</template>

<style lang="scss" scoped>
#placeholder{
    margin-right: 20px;
}
.menu {
    height: 5rem;
    width: 100%;
    margin: 0;
    border-bottom: 0px;
    align-items: center;
}
:global(.el-menu--popup){
    min-width: 0px;
    width: 120px;
}
:global(.el-popper.is-light){
    border: 0px
}
:global(.el-menu--horizontal){
    border-bottom: 0px;
}
:global(.el-menu-item){
    justify-content: center;
}
.flex-grow {
    flex-grow: 1;
}

#bottomBar {
    height: 16rem;
    width: 100%;
    background-color: black;
    color: white;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;

}


#www {
    align-items: center;

}

#w>ul {
    margin-top: 0px;
}

#w {
    margin-right: 3%;
    width: 25rem;
    height: 80%;
    background-color: black;
    color: white;
    display: flex;
    justify-content: right;
    align-items: flex-start;
    flex-wrap: nowrap;
}

#w>ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-right: 10%;
    flex-shrink: 0;
}

#w>ul>li {
    list-style: none;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: right;

}

#w>ul>li>button {
    background-color: #7bc725;
    color: rgba(255, 255, 255, 0.9);
    border-radius: 25px;
    font-size: 15px;
    width: 120px;

}

#w>ul>li>span {
    font-size: 26px;
    display: block;
    margin-left: 4px;
    color: #9EEB47;
}

#p {
    margin-left: 3%;
    display: flex;
    position: relative;
}

#pages {
    display: flex;
    flex-direction: column;
    width: 100px;
    margin-right: 10px;
}

#pages>ul {
    padding: 0px;
}

#pages>ul>li {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    list-style: none;
    margin-top: 12px;
}





img {
    margin-left: 6%;
    float: left;
}
</style>