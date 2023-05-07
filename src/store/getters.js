export default{
    menubar(state){
        let miu = state.menu;
        delete miu.home;
        delete miu.contact;
        return miu
    }
}