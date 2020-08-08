import { types } from 'mobx-state-tree';
import User from "../../app/pages/auth/stores/User"
export const attachment = types.model({
   id: types.optional(types.identifierNumber, 0),
   attachment_type: types.optional(types.maybeNull(types.string), null),
   file: types.optional(types.maybeNull(types.string), null),
   title: types.optional(types.maybeNull(types.string), null),
   created_at: types.optional(types.maybeNull(types.string), null),
   modified_at: types.optional(types.maybeNull(types.string), null),
   //createdBy: types.optional(types.maybeNull(User), {}),
})