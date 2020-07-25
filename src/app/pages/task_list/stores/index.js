/* eslint-disable eqeqeq */

import { types, getParent } from 'mobx-state-tree';
import { values } from "mobx";
import User from '../../auth/stores/User';
import File from "../../../../shared/store/File"
import { attachment } from "../../../../shared/store/Models"
import { classRoom } from '../../courses-dashboard-page/stores/ClassRoomStore';
const modal = {
   id: types.optional(types.identifierNumber, 0),
   taskFile: types.optional(File, {}),
   created_at: types.optional(types.maybeNull(types.string), null),
   modified_at: types.optional(types.maybeNull(types.string), null),
   title: types.optional(types.maybeNull(types.string), null),
   content: types.optional(types.maybeNull(types.string), null),
   user_info: types.optional(User, {}),
   status: types.optional(types.maybeNull(types.string), null),
   validUntill: types.optional(types.boolean, false),
   SubmittedSolutions: types.array(File),
   accept_solutions: false,
   accept_solutions_due: types.optional(types.maybeNull(types.string), null),
   classroom: 1,
   attachments_info: types.array(attachment)
   // average_degree: types.optional(types.number, types.null),
   // accept_solutions: types.optional(types.boolean, types.null),
   // accept_solutions_due: types.optional(types.string, types.null),
   // attachments: types.optional(types.array(types.File), []),
};
export const task = types.model(modal).views((self) => ({

   get getStudentsWhoAnswered() {
      return self.SubmittedSolutions.toJSON();
   },
   get getStudentsWhoDidntAnswered() {

      let ids = []
      ids = values(self.SubmittedSolutions).map(solution => {
         return solution.createdBy.id
      });
      let StudentsWhoDidntAnswered = getParent(self).student_objects;
      // return values(StudentsWhoDidntAnswered).filter((std) => {
      //    return !ids.includes(std.id)
      // })
      return []
   }
})).actions((self) => ({
   setNewData: (payload) => {
      self[payload.key] = payload.value;
   }
}));
const classroom_tasks_info = types.model({
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
export default classroom_tasks_info;
