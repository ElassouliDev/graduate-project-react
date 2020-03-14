const dev = {
    apiUrl: 'http://localhost:8000',
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