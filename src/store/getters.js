export default{
    menubar(state){
        let miu = JSON.parse(JSON.stringify(state.menu));
        delete miu.home;
        delete miu.contact;
        return miu
    }
}