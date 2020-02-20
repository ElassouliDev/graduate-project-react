
const unSerialize = (payload) => {
    if (typeof payload === 'undefined') return null;
    return JSON.parse(payload);
};

class LocalStorage {
    constructor(localStorage) {
        this.localStorage = localStorage;
    }

    get(key) {
        const stored = this.localStorage.getItem(key);
        if (!stored) return stored;
        try {
            return unSerialize(stored);
        } catch (err) {
            return null;
        }
    }

    set(key, value) {
     // set in localStorage
    }

    clear() {
        this.localStorage.clear();
    }
}

export default LocalStorage;
