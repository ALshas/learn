class ECStack {
    constructor() {
        this.contexts = [];
    }
    push(EC) {
        this.contexts.push(EC);
    }
    get current() {
        return this.contexts[this.contexts.length - 1];
    }
    pop() {
        this.contexts.pop();
    }
}
module.exports = new ECStack();