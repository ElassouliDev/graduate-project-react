const dev = {
    // apiUrl: 'http://localhost:8000',
    apiUrl: 'https://aug-classroom.herokuapp.com/api/',
    apiUrlLocal: 'http://localhost:8000/api/',
    apiAuthUrl: 'https://aug-classroom.herokuapp.com/api-auth/login',
    webUrl: 'http://localhost:3000',
    logoutRedirectPage: '/login',
    environment: 'dev',
};

const getConfig = () => {
    const hostname = window.location.hostname;
    if (`http://${hostname}` === dev.webUrl) {
        return dev;
    }
    return {
        ...dev,
        environment: 'local',
        isLocalEnv: true,
    }
};
const routes = {
    logoutPage: '/logout',
    loginPage: '/login',
};
export { getConfig as default, routes };