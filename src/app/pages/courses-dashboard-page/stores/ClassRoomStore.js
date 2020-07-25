import { types } from 'mobx-state-tree';
import materialStore from "../../material/stores"
import TaskStore from "../../task_list/stores"
import PostStore from "../../participation/stores"
import User from '../../auth/stores/User';
/** test comment */
export const classRoom = types.model({
   id: types.optional(types.identifierNumber, 0),
   title: types.optional(types.string, ''),
   description: types.optional(types.string, ''),
   background_img: types.optional(types.string, ''),
   logo_img: types.optional(types.string, ''),
   material: types.optional(materialStore, {}),
   TaskStore: types.optional(TaskStore, {}),
   student_objects: types.array(User, {}),
   student_requests_objects: types.array(User),
   posts: types.optional(PostStore, {}),
   created_at: types.optional(types.string, ''),
   modified_at: types.optional(types.string, ''),
   promo_code: types.optional(types.string, ''),
   allow_student_participation: types.optional(types.boolean, true),
   auto_accept_students: types.optional(types.boolean, false),
   archived: types.optional(types.boolean, false),
   attachments: types.optional(materialStore, {}),
}).actions((self) => ({
   setClassData: (payload) => {
      if (payload.key === "background_img" || payload.key === "logo_iog") {
      }
      self[payload.key] = payload.value;
   },
   getPostById: (id) => {
      return self.posts.Posts.find((p) => {
         return p.id == id;
      })
   }
   ,
}));
export default types.model('ClassRoomStore', {
   classRooms: types.array(classRoom),
   newClassRoom: types.optional(classRoom, {}),
}).views((self) => ({
   getbackground_img: (id) => {
      let selectedClassRoom = self.classRooms.find((cR) => cR.id == id);
      return selectedClassRoom.background_img ? selectedClassRoom.background_img : ""
   }
})).actions((self) => ({
   addClassRoom: (cR) => {
      // let nmaterial = material.create({
      //    materials: cR.material
      // })
      // let nPostStore = PostStore.create({
      //    Posts: cR.posts
      // })
      // let nAttachments = material.create({
      //    materials: cR.attachments
      // })
      let nRoom = classRoom.create({
         id: cR.id,
         title: cR.title,
         description: cR.description,
         // background_img: cR.background_img && "",
         // logo_iog: cR.logo_iog,
         // material: nmaterial,
         // student_objects: cR.student_objects,
         // student_requests_objects: cR.student_requests_objects,
         created_at: cR.created_at,
         modified_at: cR.modified_at,
         // posts: nPostStore,
         // promo_code: cR.promo_code,
         // allow_student_participation: cR.allow_student_participation,
         // auto_accept_students: cR.auto_accept_students,
         // archived: cR.archived,
         // attachments: nAttachments
      })
      self.classRooms.push(nRoom)
   },
   editClassRoom: (payload) => {
      let edited = false;
      self.classRooms = self.classRooms.map((cR) => {
         if (cR.id == payload.id) {
            edited = true
            return payload;
         }
         return cR
      });
      return edited
   },
   getClassRoom: (id) => {
      return self.classRooms.find((cR) => {
         return cR.id == id;
      })
   }
   ,
   setClassRoomData: (payload) => {
      self.newClassRoom.setClassData(payload);
   },
   deleteClassRoom: (id) => {
      let deleted = false;
      self.classRooms = self.classRooms.filter((cR) => {
         console.log(cR.id == id, id, cR.id);
         if (cR.id == id)
            deleted = true
         return cR.id != id
      });
      return deleted
   },
   setClassRooms: (res) => {
      self.classRooms = [];
      res.forEach(cR => {
         let nmaterial = materialStore.create({
            materials: cR.material
         })
         let nPostStore = PostStore.create({
            Posts: cR.posts
         })
         let nAttachments = materialStore.create({
            materials: cR.attachments
         })
         let nRoom = classRoom.create({
            id: cR.id,
            title: cR.title,
            description: cR.description,
            background_img: cR.background_img,
            logo_iog: cR.logo_iog,
            material: nmaterial,
            student_objects: cR.student_objects,
            student_requests_objects: cR.student_requests_objects,
            created_at: cR.created_at,
            modified_at: cR.modified_at,
            posts: nPostStore,
            promo_code: cR.promo_code,
            allow_student_participation: cR.allow_student_participation,
            auto_accept_students: cR.auto_accept_students,
            archived: cR.archived,
            attachments: nAttachments
         })
         self.classRooms.push(nRoom);
      });
   },
   setOneClassRoom: (cR) => {
      if (self.classRooms.find(item => cR.id == item.id)) {
         // class room found
         return
      }
      let nmaterial = materialStore.create({
         materials: cR.material
      })
      let nPostStore = PostStore.create({
         Posts: cR.posts
      })
      let nAttachments = materialStore.create({
         materials: cR.attachments
      })
      let nRoom = classRoom.create({
         id: cR.id,
         title: cR.title,
         description: cR.description,
         background_img: cR.background_img,
         logo_iog: cR.logo_iog,
         material: nmaterial,
         student_objects: cR.student_objects,
         student_requests_objects: cR.student_requests_objects,
         created_at: cR.created_at,
         modified_at: cR.modified_at,
         posts: nPostStore,
         promo_code: cR.promo_code,
         allow_student_participation: cR.allow_student_participation,
         auto_accept_students: cR.auto_accept_students,
         archived: cR.archived,
         attachments: nAttachments
      })
      self.classRooms.push(nRoom);
   },
}))