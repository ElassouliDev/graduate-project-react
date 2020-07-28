import { getEnv, types } from 'mobx-state-tree';
import getConfig from '../../app/config';
import LocalStorage from '../../app/services/LocalStorage';
import getApiRequests from '../../app/services/apiRequestes';
import UserStore from "../../app/pages/auth/stores/UserStore";
import User from "../../app/pages/auth/stores/User";
import ClassRoomStore from "../../app/pages/courses-dashboard-page/stores/ClassRoomStore";
import { classRoom } from "../../app/pages/courses-dashboard-page/stores/ClassRoomStore";
import materialStore, { material } from "../../app/pages/material/stores"
import classroom_tasks_info, { task } from "../../app/pages/task_list/stores"
import File from "../../shared/store/File"
import PostStore from '../../app/pages/participation/stores';
// Root store for all stores and models
const courseArray = [
    classRoom.create({
        id: 1,
        title: "course 1",
        description: "course description 1",
        background_img: "./assets/images/backgrounds/header_classroom_default.png",
        logo_img: "./assets/images/backgrounds/informationSec.jpg",
        material: materialStore.create({
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
        classroom_tasks_info: classroom_tasks_info.create({
            tasks: [
                task.create({
                    id: 1,
                    taskFile: File.create({
                        id: 1,
                        file_name: "file task",
                        file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
                        created_at: User.create({
                            id: 1,
                            username: "yahia qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        })
                    }),
                    SubmittedSolutions: [File.create({
                        id: 2,
                        file_name: "file task",
                        file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
                        created_at: User.create({
                            id: 2,
                            username: "mohammed qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        })
                    })],
                    created_at: "12-12-2020",
                    title: "Task Test 1",
                    description: "Lizards are a widespread groups of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
                    vaildUntill: "12-01-2020",
                    is_closed: false,
                    teacher: User.create({
                        id: 1,
                        username: "yahia qumboz",
                        image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                    }),
                    student_objects: [
                        User.create({
                            id: 2,
                            username: "mohammed qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        }),
                        User.create({
                            id: 3,
                            username: "alaa qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        }),
                        User.create({
                            id: 4,
                            username: "ezat qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        })
                    ]
                })
            ]
        }),
        PostStore: PostStore.create({
            Posts: [
                {
                    id: 1,
                    createdBy: User.create({
                        id: 1,
                        username: "yahia qumboz",
                        image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                    }),
                    content: "React is a great tech devloped by Facebook",
                    created_at: "2020-04-18",
                    comments: [{
                        id: 1,
                        created_at: "2020-04-18 20:20",
                        createdBy: User.create({
                            id: 2,
                            username: "mohammed qumboz",
                            image: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
                        }),
                        content: "Indeed 😁"
                    }]
                },
            ]
        })

    }),
]
const RootStore = types
    .model('RootStore', {
        UserStore: types.optional(UserStore, {}),
        User: types.optional(User, {}),
        ClassRoomStore: types.optional(ClassRoomStore, {
            // classRooms: courseArray,
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
