import { flow, getParent, types } from 'mobx-state-tree';

export default types.model('UserStore', {
    username: types.optional(types.string, ''),
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    confirmPassword: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
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
        self.email = payload.email;
        self.email = payload.email;
        self.email = payload.email;
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
        user.append('firstName', self.firstName)
        user.append('lastName', self.lastName)
       const res = yield getParent(self).apiRequests.registerUser(user)
        console.log(res)
    })
}))
