import axios from 'axios';
import makeCancelable from 'axios-cancelable';

import _ from 'lodash';
import LocalStorage from "../LocalStorage";
import getConfig from "../../config";

makeCancelable(axios, { debug: true });
const handleError = error => {
    let errorToThrow = null;
    if (error.response) {
        if (['400', '401', 400, 401].includes(error.response.status)) {
            window.history.pushState({}, '', "/auth/login")
        }
        // TODO: check error status (error.response.status)
        if (error.response.status && error.response.data) {
            if (error.response.data.message === 'The incoming token has expired') {
                error.response.data.message = 'Session Expired';
            }
            errorToThrow = error.response.data;
        } else if (error.response.body && error.response.body.errors && error.response.body.errors.message) {
            errorToThrow = error.response.body.errors;
        } else if (error.response.data.message && !_.isEmpty(error.response.data.errors)) {
            errorToThrow = error.response.data.errors;
        } else if (error.response.data.message) {
            // everywhere in code it waits for {message: String, code: Number} error object structure (except file upload)
            errorToThrow = {
                message: error.response.data.message,
                code: error.response.data.code || 0
            };
        } else {
            errorToThrow = error.response.body;
        }
    } else {
        errorToThrow = error;
    }

    throw errorToThrow;
};

class Request {
    constructor(localStorage, baseUrl) {
        this.localStorage = localStorage;
        this.baseUrl = baseUrl;

        this.get = this.get.bind(this);
        this.del = this.del.bind(this);
        this.patch = this.patch.bind(this);
        this.put = this.put.bind(this);
        this.post = this.post.bind(this);
    }

    send(method, url, data = {}) {
        let jwtToken = window.localStorage.getItem('jwtToken');


        // Add auth headers and x-ray tracking if logged in, and using our API.
        if (jwtToken && url.indexOf(this.baseUrl) !== -1) {
        }
        if (jwtToken && jwtToken !== 'null') {
            return axios({
                url,
                method,
                data,
                headers: {
                    Authorization: `Token ${jwtToken}`,
                },
            })
        }
        console.log(url, "dfdfdfdfdfdfdfdfdf")
        return axios({
            url,
            method,
            data,
        })
    }

    del(url) {
        return this.send('delete', url);
    }

    get(url) {
        console.log(url, 'get(url)')
        return this.send('get', url);
    }

    patch(url, data) {
        return this.send('patch', url, data);
    }

    put(url, data) {
        return this.send('put', url, data);
    }

    post(url, data) {
        return this.send('post', url, data);
    }

}

const requests = (localStorage, config) => {
    const baseUrl = config.apiUrl;
    console.log(baseUrl, 'baseUrl')
    const requestInstance = new Request(localStorage, baseUrl);
    return {
        getClassRooms: () => requestInstance.get(`${baseUrl}/classrooms/`),
        getOneClassRoom: (id) => requestInstance.get(`${baseUrl}/classrooms/${id}`),
        registerUser: (payload) => requestInstance.post(`${config.webUrl}/api/users/`, payload),
        loginUser: (payload) => requestInstance.post(`${config.webUrl}/api/login/`, payload),
        addClassRoom: (payload) => requestInstance.post(`${baseUrl}/classrooms/`, payload),
        addPost: (payload, classRoomId) => requestInstance.post(`${baseUrl}/classrooms/${classRoomId}/posts/`, payload),
        addComment: (payload, postId) => requestInstance.post(`${baseUrl}/posts/${postId}/comments/`, payload),
        getTasksForRoom: (classRoomId) => requestInstance.get(`${baseUrl}/classrooms/${classRoomId}/tasks/`),
        getOneTask: (taskId) => requestInstance.get(`${baseUrl}/classrooms/${taskId}/tasks/`),
        addTask: (classRoomId, payload) => requestInstance.post(`${baseUrl}/classrooms/${classRoomId}/tasks/`, payload),
        deleteMaterial: (ClassRoomID, TaskId) => requestInstance.del(`${baseUrl}/classrooms/${ClassRoomID}/materials/${TaskId}/`),
        addMaterial: (payload, ClassRoomID) => requestInstance.post(`${baseUrl}/classrooms/${ClassRoomID}/materials/`, payload),
        addAttachment: (payload) => requestInstance.post(`${baseUrl}/attachments/`, payload),
        addStudent: (payload, ClassRoomID) => requestInstance.post(`${baseUrl}/classrooms/${ClassRoomID}/add_student`, payload),
        deleteStudent: (payload, ClassRoomID) => requestInstance.post(`${baseUrl}/classrooms/${ClassRoomID}/unroll`, payload),
        acceptEnrollRequest: (payload, ClassRoomID) => requestInstance.post(`${baseUrl}/classrooms/${ClassRoomID}/accept`, payload),
        rejectEnrollRequest: (payload, ClassRoomID) => requestInstance.post(`${baseUrl}/classrooms/${ClassRoomID}/reject`, payload),

        requestInstance
    }
};

const localStorage = new LocalStorage(window.localStorage);
const config = getConfig();
const apiRequests = requests(localStorage, config);

export { apiRequests }; // this is a configured instance of requests, could be used directly
export default requests;
