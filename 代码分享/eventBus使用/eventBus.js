const eventBus = {
    names: [],
    map: [],
    init() {
        let repeatName = this.names.filter((name, index) => this.names.indexOf(name) != index)
        if (repeatName.length) {
            throw new Error(`存在重复事件${repeatName.join(',')}`)
        }
    },
    on(event, func, vue) {
        if (!this.names.includes(event)) {
            throw new Error('设置的事件未初始化，请前往eventBus.js记录事件并说明其用途')
        }

        let sign = { func, vue }

        if (this.map[event]) {
            this.map[event].push(sign)
        } else {
            this.map[event] = [sign]
        }
        vue.$once('hook:beforeDestroy', () => {
            this.map[event].splice(this.map[event].indexOf(sign), 1)
        })

    },
    emit(event, ...args) {
        if (!this.map[event]) return;
        this.map[event].forEach(sign => {
            sign.func(...args)
        })
    }
}

export default {
    install(Vue) {
        eventBus.init()
        Vue.prototype.$listenEvent = (event, func) => {
            eventBus.on(event, func, this)
        }
        Vue.proptotype.$emitEvent = (rest) => {
            eventBus.emit(fun, ...rest)
        }
    }
}