/* eslint-disable eqeqeq */

import { types } from 'mobx-state-tree';
export const task = types.model({
   id: types.optional(types.identifierNumber, 0),
   url: types.optional(types.string, ''),
   uploadedAt: types.optional(types.string, ''),
   title: types.optional(types.string, ''),
   description: types.optional(types.string, '')
}).actions((self) => ({
   setNewData: (payload) => {
      self[payload.key] = payload.value;
   }
}));
const TaskStore = types.model({
   tasks: types.array(task)
}).actions((self) => ({
   addNewTask: (payload) => {
      self.tasks.push(
         task.create({
            id: self.tasks.length + 1,
            ...payload
         })
      )
   },
   editTask: (payload) => {
      let edited = false;
      self.tasks = self.tasks.map((cR) => {
         if (cR.id == payload.id) {
            edited = true
            return payload;
         }
         return cR
      });
      return edited
   },
   get: (id) => {
      return self.tasks.find((cR) => {
         return cR.id == id;
      })
   }
   ,
   delete: (id) => {
      let deleted = false;
      self.tasks = self.tasks.filter((cR) => {
         console.log(cR.id == id, id, cR.id);

         if (cR.id == id)
            deleted = true
         return cR.id != id
      });
      return deleted
   }
}))
export default TaskStore;
