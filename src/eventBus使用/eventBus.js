const eventBus = {
    names:[],
    map:[],
    init(){
        let repeatName = this.names.filter((name,index)=>this.names.indexOf(name)!=index)
        if(repeatName.length){
             throw new Error(`存在重复事件${repeatName.join(',')}`)
        }
    },
    on(event){
        if(!this.names.includes(event)){
            throw new Error('设置的事件未初始化')
        }
    },
    emit(event,...args){
        if(!this.map[event]) return 
        this.map[event].forEach(sign=>{
            sign.func(...args)
        })
    }
}

export default {
    install(Vue){
        eventBus.init()
        Vue.prototype.$listenEvent = (event,func)=>{
            eventBus.on(event,func,this)
        }
        Vue.proptotype.$emitEvent = (rest)=>{
            eventBus.emit(fun,...rest)
        }
    }
}