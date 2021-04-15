
export function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[data][key]; // vm._Data.a
        },
        set(newValue) {
            vm[data][key] = newValue
        }
    })
}
export function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
        enumerable: false,
        configurable: false,
        value
    });
}