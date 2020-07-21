import { types } from 'mobx-state-tree';
import User from "../../app/pages/auth/stores/User"
const File = types.model({
   id: types.optional(types.identifierNumber, 0),
   file_name: types.optional(types.string, ''),
   file_path: types.optional(types.string, ''),
   created_at: types.optional(User, {}),
})
export default File;