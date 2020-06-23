import { getEnv, types } from 'mobx-state-tree';
import  getConfig from '../../app/config';
import LocalStorage from '../../app/services/LocalStorage';
import getApiRequests from '../../app/services/apiRequestes';
import UserStore from "../../app/pages/auth/stores/UserStore";
// Root store for all stores and models

const RootStore = types
    .model('RootStore', {
        userStore: types.optional(UserStore, {}),
        // e.g :  userStore: types.optional(UserStore, {}),
        title: ""
    }).views(self => ({
        // views for root store
        get apiRequests() {
            return getEnv(self).apiRequests;
        },
        get localStorage() {
            return getEnv(self).localStorage;
        },
        get config() {
            return getEnv(self).config;
        },
        get logger() {
            return getEnv(self).logger;
        },
    }));


const localStorage = new LocalStorage(window.localStorage);
const config = getConfig();
const apiRequests = getApiRequests(localStorage, config);

const store = RootStore.create(
    {},
    {
        apiRequests,
        localStorage,
        config,
        // TODO - add a true logging service, or remove if not needed.
        logger: console,
    },
);

export default store;
