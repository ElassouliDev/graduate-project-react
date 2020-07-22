
import { types } from 'mobx-state-tree';
export const StudentClass = types.model({
   id: types.optional(types.identifierNumber, 0),
   token: types.optional(types.maybeNull(types.string), null),
   name: types.optional(types.maybeNull(types.string), null),
   profileImage: types.optional(types.maybeNull(types.string), null),
}).actions((self) => ({
   setClassData: (payload) => {
      if (payload.key === "profileImage") {
      }
      self[payload.key] = payload.value;
   }
}));
export default StudentClass
