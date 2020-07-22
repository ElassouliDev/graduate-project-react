import { flow, getParent, types } from 'mobx-state-tree';

export default types.model('User', {
   password: types.optional(types.string, ''),
   username: types.optional(types.string, ''),
   state: types.optional(types.string, ''),
   responseMessage: types.optional(types.string, ''),
   image: types.optional(types.string, ''),
   groub: types.optional(types.string, ''),
   id: types.optional(types.identifierNumber, 0),
   jwtToken: types.optional(types.string, ''),
}).views((self) => ({

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
