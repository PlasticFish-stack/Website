import {createStore} from "vuex"
const Store = createStore({
    state : {
        windowWidth: '',
        windowHeight: '',
    },
    mutations: {
        Obtain(state, payload){
            console.log(payload, 'payload');
            state.windowWidth = payload.width;
            state.windowHeight = payload.height;
        }
    }
})
export default Store