/* eslint-disable eqeqeq */

import { types, getParent } from "mobx-state-tree";
import { values } from "mobx";
import User from "../../auth/stores/User";
import File from "../../../../shared/store/File";
import { attachment } from "../../../../shared/store/Models";
import { classRoom } from "../../courses-dashboard-page/stores";
import { create } from "lodash";

const solutionInfo = types
  .model({
    id: types.optional(types.maybeNull(types.number), null),
    notes: types.optional(types.maybeNull(types.string), null),
    attachment_info: types.optional(attachment, {}),
  })
  .actions((self) => ({
    setAttachmentInfo(attachments) {
      self.attachment_info = attachments.map((attach) => {
        attachment.create(attach);
      });
    },
  }));

const SolutionStore = types
  .model({
    id: types.optional(types.identifierNumber, 0),
    solutionInfo: types.optional(types.array(solutionInfo), []),
    created_at: types.optional(types.maybeNull(types.string), null),
    modified_at: types.optional(types.maybeNull(types.string), null),
    accepted: types.optional(types.maybeNull(types.boolean), null),
    user: types.optional(types.maybeNull(types.integer), null),
  })
  .actions((self) => ({
    setData(payload) {
      self[payload.key] = payload.value;
    },
    addSolutionFile(payload) {
      payload.attachment_info = attachment.create(payload.attachment_info);
      console.log("add sol1", payload);
      self.solutionInfo.push(solutionInfo.create(payload));
      console.log("add sol2", payload);
    },
  }));

const SolutionListStore = types
  .model({
    solutions: types.optional(types.array(SolutionStore), []),
    newSolution: types.optional(SolutionStore, {}),
  })
  .actions((self) => ({
    setNewData: (payload) => {
      self[payload.key] = payload.value;
    },
    setSolutions: (payload) => {
      self.solutions = payload.map((solution) => {
        // all user solution  map
        console.log("solution", solution);

        let nSolutionInfo = solution.solutionInfo.map((sol1) => {
          console.log("sol1", sol1);
          sol1.attachment_info = attachment.create(sol1.attachment_info);
          return solutionInfo.create(sol1);
        });
        console.log("solution 2", nSolutionInfo);

        // let nSolutionInfo = solutionInfo.create(solution.solutionInfo);

        return SolutionStore.create({
          ...solution,
          solutionInfo: nSolutionInfo,
        });
      });
    },
    addSolution: (payload) => {
      let user_solution = self.getUserSolution(
        window.localStorage.getItem("id")
      );
      if (!user_solution) { // if user not have previuse solution
        user_solution = SolutionStore.create({
          id: payload.id,
          solutionInfo: [],
          created_at: payload.created_at,
          modified_at: payload.created_at,
          user: window.localStorage.getItem("id"),
        });
      }

      user_solution.addSolutionFile(payload);
    },
    addNewSolution: (payload) => {
      // let _newSotution = payload;
      // let user = payload.user_info
      // self.get(user);
      // user.groups =  payload.user_info.groups//"" + payload.user_info.groups[0].id
      // const created_user = User.create(user)
      // _newtask.user_info = created_user
      // self.tasks.push(
      //    task.create(_newtask)
      // )
    },
    editTask: (payload) => {
      let edited = false;
      self.solutions = self.solutions.map((cR) => {
        if (cR.id == payload.id) {
          edited = true;
          return payload;
        }
        return cR;
      });
      return edited;
    },
    get: (id) => {
      return self.solutions.find((cR) => {
        return cR.id == id;
      });
    },
    getUserSolution: (id) => {
      return self.solutions.find((cR) => {
        return cR.user == id;
      });
    },
    delete: (id) => {
      let deleted = false;
      self.solutions = self.solutions.filter((cR) => {
        console.log(cR.id == id, id, cR.id);

        if (cR.id == id) deleted = true;
        return cR.id != id;
      });
      return deleted;
    },
  }));

export default SolutionListStore;
