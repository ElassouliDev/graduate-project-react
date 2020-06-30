
import { types } from 'mobx-state-tree';
export const StudentClass = types.model({
   id: types.optional(types.identifierNumber, 0),
   token: types.optional(types.string, ''),
   name: types.optional(types.string, ''),
   profileImage: types.optional(types.string, ''),
}).actions((self) => ({
   setClassData: (payload) => {
      if (payload.key === "profileImage") {
      }
      self[payload.key] = payload.value;
   }
}));
export default StudentClass
