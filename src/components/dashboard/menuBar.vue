<script setup>
import { Phone } from '@element-plus/icons-vue'
const searchBarProps = defineProps({
    type: Boolean
});
let state = [
    {
        title: '雅江首页'
    }, {
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
    }, {
        title: '线上展厅'
    }, {
        title: '产品中心',
        context: [{
            name: '舞台灯光',
            url: '',
        }, {
            name: '建筑照明',
            url: '',
        }]
    }, {
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
    }, {
        title: '工程案例',
        context: [{
            name: '舞台灯光',
            url: '',
        }, {
            name: '建筑照明',
            url: '',
        }]
    }, {
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
    }, {
        title: '创意光科技',
        context: [{
            name: '雅江杯',
            url: '',
        }, {
            name: '高峰论坛',
            url: '',
        }
        ]
    }, {
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
]
if (!searchBarProps.type) {
    state = state.filter((item, index) => {
        if (item.context) {
            return item
        }
    })
}
</script>

<template>
    <div>
        <el-menu mode="horizontal" v-if="searchBarProps.type" class="menu" text-color="white" background-color="#000000"
            active-text-color="#95d475">
            <img style="width: 230px; height: 50px" src="/src/assets/card.png" fit="contain" />
            <div class="flex-grow" />
            <template v-for="item, index in state" :key="index">
                <el-menu-item :index="index + ''" v-if="!item.context">{{ item.title }}</el-menu-item>
                <el-sub-menu :index="index + ''" v-if="item.context" :popper-offset="12">
                    <template #title>{{ item.title }}</template>
                    <el-menu-item v-for="team, teammate in item.context" :index="index + '-' + teammate">
                        {{ team.name }}
                    </el-menu-item>
                </el-sub-menu>
            </template>
            <div id="placeholder" />
        </el-menu>
        <div v-if="!searchBarProps.type" id="bottomMenu">
            <div>
                <img style="width: 230px; height: 50px" src="/src/assets/card.png" fit="contain" />
            </div>
            <div id="main">
                <ul v-for="item, index in state" :key="index">
                    {{ item.title }}
                    <li v-for="content in item.context" :key="content">
                        {{ content.name }}
                    </li>
                </ul>
            </div>
            <div id="contact">
                <span>全国服务热线:</span>
                <div>
                    <el-icon :size="30" color="#95d475">
                        <Phone />
                    </el-icon>
                    <span style="color: #95d475;">020-86947788</span>
                </div>
                <span>官方微信:</span>
                <div>
                    <img src="@/assets/qrcode.jpg" alt="" style="width: 100px; height: 100px" >
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    height: 5rem;
    width: 100%;
    margin: 0;
    border-bottom: 0px;
    align-items: center;
    padding-right: 50px;

    img {
        margin-left: 6%;
        float: left;
    }

    .flex-grow {
        flex-grow: 1;
    }


}

#bottomMenu {
    height: 17rem;
    width: 100%;
    background-color: #000000;
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    #main {
        width: 50vw;
    }

    img {
        margin-left: 100px
    }

    div {
        width: 15vw;
        display: flex;
        justify-content: center;

        ul {
            flex-direction: column;
            margin-left: 50px;
            font-weight: 600;
            font-size: large;

            li {
                margin-top: 20px;
                font-weight: 400;
                font-size: medium;
            }
        }
    }



}

#contact {
    display: flex;
    font-size: 20px;
    flex-direction: column;
    align-items:flex-end;
    margin-right: 30px;
    margin-top: -40px;
    div{
        text-indent: 10px;
        align-items: center;
        font-size: 28px;
        justify-content: flex-end;
        padding-top: 18px;
        padding-bottom: 18px;
    }
}

:global(.el-menu--popup) {
    min-width: 0px;
    width: 120px;
}

:global(.el-popper.is-light) {
    border: 0px
}

:global(.el-menu--horizontal) {
    border-bottom: 0px;
}

:global(.el-menu-item) {
    justify-content: center;
}</style>