import {createStore} from "vuex"
const Store = createStore({
    state : {
        windowWidth: '1',
    },
    mutations: {
        widthObtain(){
            window.onresize = () => {
                state.windowWidth = window.innerWidth + 'px'
            }
        }
    }
})
export default Store