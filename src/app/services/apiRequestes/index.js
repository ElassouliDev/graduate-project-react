import axios from 'axios';
import makeCancelable from 'axios-cancelable';

import _ from 'lodash';
import LocalStorage from "../LocalStorage";
import getConfig from "../../config";

makeCancelable(axios, { debug: true });
const handleError = error => {
    let errorToThrow = null;
    if (error.response) {
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

    async send(method, url, data = {}) {
        let jwtToken = window.localStorage.getItem('jwtToken');

        const authCredentials = this.localStorage.get('authCredentials');

        // Add auth headers and x-ray tracking if logged in, and using our API.
        if (jwtToken && !_.isEmpty(authCredentials) && url.indexOf(this.baseUrl) !== -1) {
        }
        if (jwtToken && jwtToken !== 'null') {
            return axios({
                url,
                method,
                data,
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
                .then(response => response)
                .catch(error => handleError(error));
        }
        return axios({
            url,
            method,
            data,
        })
            .then(response => response)
            .catch(error => handleError(error));
    }

    del(url) {
        return this.send('delete', url);
    }

    get(url) {
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
    const requestInstance = new Request(localStorage, baseUrl);
    return {
        requestInstance
    }
};

const localStorage = new LocalStorage(window.localStorage);
const config = getConfig();
const apiRequests = requests(localStorage, config);

export { apiRequests }; // this is a configured instance of requests, could be used directly
export default requests;