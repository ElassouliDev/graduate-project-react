/* eslint-disable eqeqeq */

import { types, getParent } from "mobx-state-tree";
import { values } from "mobx";
import User from "../../auth/stores/User";
import File from "../../../../shared/store/File";
import { attachment } from "../../../../shared/store/Models";
import { classRoom } from "../../courses-dashboard-page/stores";
import { create } from "lodash";
import SolutionListStore from "./solutionStore";
const modal = {
  id: types.optional(types.identifierNumber, 0),
  taskFile: types.optional(File, {}),
  created_at: types.optional(types.maybeNull(types.string), null),
  modified_at: types.optional(types.maybeNull(types.string), null),
  title: types.optional(types.maybeNull(types.string), null),
  content: types.optional(types.maybeNull(types.string), null),
  user_info: types.optional(User, {}),
  task_solutions: types.optional(SolutionListStore, {}),
  delivered_students: types.optional(types.array(User), []),
  undelivered_students: types.optional(types.array(User), []),

  status: types.optional(types.maybeNull(types.string), null),
  validUntill: types.optional(types.boolean, false),
  SubmittedSolutions: types.array(File),
  accept_solutions: true,
  accept_solutions_due: types.optional(types.maybeNull(types.string), null),
  classroom: 1,
  attachments_info: types.array(attachment),
  // average_degree: types.optional(types.number, types.null),
  // accept_solutions: types.optional(types.boolean, types.null),
  // accept_solutions_due: types.optional(types.string, types.null),
  // attachments: types.optional(types.array(types.File), []),
};
export const task = types
  .model(modal)
  .views((self) => ({
    get getStudentsWhoAnswered() {
      // return self.attachments.map(task => task.user_info).toJSON();
      return [];
    },
    get getStudentsWhoDidntAnswered() {
      return [];
      let ids = [];
      ids = values(self.SubmittedSolutions).map((solution) => {
        return solution.createdBy.id;
      });
      let StudentsWhoDidntAnswered = getParent(self).student_objects;
      // return values(StudentsWhoDidntAnswered).filter((std) => {
      //    return !ids.includes(std.id)
      // })
      return [];
    },
  }))
  .actions((self) => ({
    setNewData: (payload) => {
      if (
        payload.key == "undelivered_students" ||
        payload.key == "delivered_students"
      ) {
        self[payload.key] = payload.value.map((user) => User.create(user));
        return;
      }
       else if (payload.key == "task_solutions") {
         console.log('task_solutions sasdas ', payload.value)
         let  nSolutionListStore =SolutionListStore.create();
         nSolutionListStore.setSolutions(payload.value);
        self[payload.key] = nSolutionListStore ;// SolutionListStore.create({solutions:payload.value});
        return;
      }
      else self[payload.key] = payload.value;
    },
  }));
const classroom_tasks_info = types
  .model({
    tasks: types.array(task),
    newTask: types.optional(task, {}),
  })
  .actions((self) => ({
    addNewTask: (payload) => {
      let _newtask = payload;
      let user = payload.user_info;
      user.groups = payload.user_info.groups; //"" + payload.user_info.groups[0].id
      const created_user = User.create(user);
      _newtask.user_info = created_user;
      self.tasks.push(task.create(_newtask));
    },
    editTask: (payload) => {
      let edited = false;
      self.tasks = self.tasks.map((cR) => {
        if (cR.id == payload.id) {
          edited = true;
          return payload;
        }
        return cR;
      });
      return edited;
    },
    get: (id) => {
      return self.tasks.find((cR) => {
        return cR.id == id;
      });
    },
    delete: (id) => {
      let deleted = false;
      self.tasks = self.tasks.filter((cR) => {
        console.log(cR.id == id, id, cR.id);

        if (cR.id == id) deleted = true;
        return cR.id != id;
      });
      return deleted;
    },
    sortDescTask:() =>{

     return self.tasks.sort(compareDesc)
    }
  }));
export default classroom_tasks_info;

function compareDesc(tk1, tk2) {
  // Use toUpperCase() to ignore character casing
  console.log('task 1', tk1)
  const id1 = tk1.id;
  const id2 = tk2.id;

  let comparison = 0;
  if (id1 > id2) {
    comparison = -1;
  } else if (id1 < id2) {
    comparison = 1;
  }
  return comparison;
}