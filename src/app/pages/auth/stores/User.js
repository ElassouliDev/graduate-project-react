import { flow, getParent, types } from 'mobx-state-tree';
const Profile = types.model({
   avatar: types.optional(types.maybeNull(types.string), null),
})
export default types.model('User', {
   password: types.optional(types.maybeNull(types.string), null),
   username: types.optional(types.maybeNull(types.string), null),
   first_name: types.optional(types.maybeNull(types.string), null),
   last_name: types.optional(types.maybeNull(types.string), null),
   state: types.optional(types.maybeNull(types.string), null),
   responseMessage: types.optional(types.maybeNull(types.string), null),
   profile: types.optional(Profile),
   groub: types.optional(types.maybeNull(types.string), null),
   id: types.optional(types.identifierNumber, 0),
   jwtToken: types.optional(types.maybeNull(types.string), null),
}).views((self) => ({
   get fullName() {
      return self.first_name + ' ' + self.last_name;
   },
   get image() {
      return self.profile.avatar
   }
})).actions((self) => ({
   setUserData: (payload) => {
      self[payload.key] = payload.value;
   },
   setUser: (payload) => {
      Object.keys(payload).forEach(key => {

         self[key] = payload[key];
      });
   },
   login: flow(function* loginUser() {
      try {
         const user = new FormData();
         user.append('username', self.username)
         user.append('password', self.password)

         const res = yield getParent(self).apiRequests.loginUser(user)
         if (res.body.auth_token) {
            self.jwtToken = res.body.auth_token
            self.state = "loggedIn"
            self.responseMessage = "logged in successfully"
            self.groups = res.body.group[0];
         }

      } catch (error) {
         console.error("Failed to fetch projects", error)
         self.state = "error"
      }
   })
}))
