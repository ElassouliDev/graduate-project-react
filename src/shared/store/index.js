import { getEnv, types } from 'mobx-state-tree';
import getConfig from '../../app/config';
import LocalStorage from '../../app/services/LocalStorage';
import getApiRequests from '../../app/services/apiRequestes';
import UserStore from "../../app/pages/auth/stores/UserStore";
import LoginStore from "../../app/pages/auth/stores/LoginStore";
import ClassRoomStore from "../../app/pages/courses-dashboard-page/stores/ClassRoomStore";
import { classRoom } from "../../app/pages/courses-dashboard-page/stores/ClassRoomStore";
import MaterialStore, { material } from "../../app/pages/material/stores"
import TaskStore, { task } from "../../app/pages/task_list/stores"
import File from "../../shared/store/File"
// Root store for all stores and models
const courseArray = [
    classRoom.create({
        id: 1,
        title: "course 1",
        description: "course description 1",
        coverImage: "./assets/images/backgrounds/header_classroom_default.png",
        thumbnail: "./assets/images/backgrounds/informationSec.jpg",
        MaterialStore: MaterialStore.create({
            materials: [
                material.create({
                    id: 0,
                    url: "https://drive.google.com/file/d/1SRt0aQBO2moUzvMKXH3K8RqYmYXdEEOu/view?fbclid=IwAR3Y8zoV0VyDYiRhNMedW9P7MpGveH7kBUS4TfKYgCzr98tkM4OJXFok9Dg",
                    uploadedAt: new Date().toString(),
                    title: "material title",
                    description: "material description"
                }),
                material.create({
                    id: 1,
                    url: "https://drive.google.com/file/d/1SRt0aQBO2moUzvMKXH3K8RqYmYXdEEOu/view?fbclid=IwAR3Y8zoV0VyDYiRhNMedW9P7MpGveH7kBUS4TfKYgCzr98tkM4OJXFok9Dg",
                    uploadedAt: new Date().toString(),
                    title: "material title",
                    description: "material description"
                }),
                material.create({
                    id: 2,
                    url: "https://drive.google.com/file/d/1SRt0aQBO2moUzvMKXH3K8RqYmYXdEEOu/view?fbclid=IwAR3Y8zoV0VyDYiRhNMedW9P7MpGveH7kBUS4TfKYgCzr98tkM4OJXFok9Dg",
                    uploadedAt: new Date().toString(),
                    title: "material title",
                    description: "material description"
                }),
            ]
        }),
        TaskStore: TaskStore.create({
            tasks: [
                task.create({
                    id: 1,
                    taskFile: File.create({
                        id: 1,
                        file_name: "file task",
                        file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
                        uploadedBy: LoginStore.create({
                            id: 1,
                            username: "yahia qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        })
                    }),
                    SubmittedSolutions: [File.create({
                        id: 2,
                        file_name: "file task",
                        file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
                        uploadedBy: LoginStore.create({
                            id: 2,
                            username: "mohammed qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        })
                    })],
                    created_at: "12-12-2020",
                    title: "Task Test 1",
                    description: "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
                    status: "notSended",
                    is_closed: false,
                    teacher: LoginStore.create({
                        id: 1,
                        username: "yahia qumboz",
                        image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                    }),
                    students: [
                        LoginStore.create({
                            id: 2,
                            username: "mohammed qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        }),
                        LoginStore.create({
                            id: 3,
                            username: "alaa qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        }),
                        LoginStore.create({
                            id: 4,
                            username: "ezat qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        })
                    ]
                })
            ]
        })

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
