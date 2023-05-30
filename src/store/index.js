import {createStore} from "vuex"
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import menu from './modules/menu'

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules:{
        menu
    }
})