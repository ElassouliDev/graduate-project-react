import { getEnv, types } from 'mobx-state-tree';
import getConfig from '../../app/config';
import LocalStorage from '../../app/services/LocalStorage';
import getApiRequests from '../../app/services/apiRequestes';
import UserStore from "../../app/pages/auth/stores/UserStore";
import LoginStore from "../../app/pages/auth/stores/LoginStore";
import ClassRoomStore from "../../app/pages/courses-dashboard-page/stores/ClassRoomStore";
import { classRoom } from "../../app/pages/courses-dashboard-page/stores/ClassRoomStore";
import MaterialStores, { material } from "../../app/pages/material/stores"
// Root store for all stores and models
const courseArray = [
    classRoom.create({
        id: 1,
        title: "course 1",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg",
   Materials: types.optional(MaterialStores, {}),

    }),
    classRoom.create({
        id: 2,
        title: "course 2",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg"
    }),
    classRoom.create({
        id: 3,
        title: "course 3",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg"
    }),
    classRoom.create({
        id: 4,
        title: "course 4",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg"
    }),
    classRoom.create({
        id: 5,
        title: "course 5",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg"
    }),
    classRoom.create({
        id: 6,
        title: "course 6",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg"
    }),
]
const RootStore = types
    .model('RootStore', {
        UserStore: types.optional(UserStore, {}),
        LoginStore: types.optional(LoginStore, {}),
        ClassRoomStore: types.optional(ClassRoomStore, {
            classRooms: courseArray,
        }),

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
