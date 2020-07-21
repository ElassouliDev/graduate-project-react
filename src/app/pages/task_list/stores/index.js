/* eslint-disable eqeqeq */

import { types } from 'mobx-state-tree';
import { values } from "mobx";
import User from '../../auth/stores/User';
import File from "../../../../shared/store/File"
const modal = {
   id: types.optional(types.identifierNumber, 0),
   taskFile: types.optional(File, {}),
   created_at: types.optional(types.string, ''),
   title: types.optional(types.string, ''),
   description: types.optional(types.string, ''),
   User: types.optional(User, {}),
   status: types.optional(types.string, ''),
   validUntill: types.optional(types.boolean, false),
   SubmittedSolutions: types.array(File),
   students: types.array(User)
};
export const task = types.model(modal).views((self) => ({

   get getStudentsWhoAnswered() {
      return values(self.SubmittedSolutions).map(solution => {
         return solution.created_at
      });
   },
   get getStudentsWhoDidntAnswered() {
      let ids = []
      ids = values(self.SubmittedSolutions).map(solution => {
         return solution.created_at.id
      });
      return values(self.students).filter((std) => {
         return !ids.includes(std.id)
      })
   }
})).actions((self) => ({
   setNewData: (payload) => {
      self[payload.key] = payload.value;
   }
}));
const TaskStore = types.model({
   tasks: types.array(task)
})
   .actions((self) => ({
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
