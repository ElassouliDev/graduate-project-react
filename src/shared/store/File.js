import { types } from 'mobx-state-tree';
import User from "../../app/pages/auth/stores/User"
const File = types.model({
   id: types.optional(types.identifierNumber, 0),
   file_name: types.optional(types.maybeNull(types.string), null),
   file_path: types.optional(types.maybeNull(types.string), null),
   createdBy: types.optional(User, {}),
})
export default File;