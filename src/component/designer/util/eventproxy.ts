export class EventProxy {
    static onObj: string[] = [];
    static oneObj: string[] = [];
    static on(key: string, fn: (...args) => void) {
        if (this.onObj[key] === undefined) {
            this.onObj[key] = [];
        }
        this
            .onObj[key]
            .push(fn);
    }
    static one(key: string, fn: (...args) => void) {
        if (this.oneObj[key] === undefined) {
            this.oneObj[key] = [];
        }
        this
            .oneObj[key]
            .push(fn);
    }
    static off(key: string) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    }
    static clear() {
        this.onObj = [];
        this.oneObj = [];
    }
    static trigger(key: string, ...args) {
        args = [].concat(Array.prototype.slice.call(arguments, 1));

        if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
            for (let i in this.onObj[key]) {
                this
                    .onObj[key][i]
                    .apply(null, args);
            }
        }
        if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
            for (let i in this.oneObj[key]) {
                this
                    .oneObj[key][i]
                    .apply(null, args);
                this.oneObj[key][i] = undefined;
            }
            this.oneObj[key] = [];
        }
    }
};
