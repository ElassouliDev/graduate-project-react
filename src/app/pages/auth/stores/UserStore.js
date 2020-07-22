import { flow, getParent, types } from 'mobx-state-tree';

export default types.model('UserStore', {
    username: types.optional(types.maybeNull(types.string), null),
    first_name: types.optional(types.maybeNull(types.string), null),
    last_name: types.optional(types.maybeNull(types.string), null),
    password: types.optional(types.maybeNull(types.string), null),
    confirmPassword: types.optional(types.maybeNull(types.string), null),
    email: types.optional(types.maybeNull(types.string), null),
    groups: types.optional(types.integer, 1),
}).views((self) => ({
    get isMatchingPassword() {
        return self.password === self.confirmPassword;
    }
})).actions((self) => ({
    setNewUser: (payload) => {
        self.username = payload.username;
        self.password = payload.password;
        self.confirmPassword = payload.confirmPassword;
        self.first_name = payload.first_name;
        self.last_name = payload.last_name;
        self.groubs = payload.groubs;
    },
    setNewUserData: (payload) => {
        self[payload.key] = payload.value;
    },
    registerUser: flow(function* registerUser() {
        const user = new FormData();
        user.append('username', self.username)
        user.append('password', self.password)
        // user.append('confirm_password', self.confirmPassword)
        user.append('email', self.email)
        user.append('groups', self.groups)
        user.append('first_name', self.first_name)
        user.append('last_name', self.last_name)
        const res = yield getParent(self).apiRequests.registerUser(user)
        console.log(res)
    })
}))
