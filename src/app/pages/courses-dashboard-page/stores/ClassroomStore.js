/* eslint-disable eqeqeq */
import { types } from 'mobx-state-tree';
import MaterialStore from "../../material/stores"
import TaskStore from "../../task_list/stores"
import PostStore from "../../participation/stores"
import User from '../../auth/stores/User';

export const classRoom = types.model({
   id: types.optional(types.identifierNumber, 0),
   title: types.optional(types.string, ''),
   description: types.optional(types.string, ''),
   background_img: types.optional(types.string, ''),
   logo_iog: types.optional(types.string, ''),
   material: types.optional(MaterialStore, {}),
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
   attachments: types.optional(MaterialStore, {}),
}).actions((self) => ({
   setClassData: (payload) => {
      if (payload.key === "background_img" || payload.key === "logo_iog") {
      }
      self[payload.key] = payload.value;
   }
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
   addNewClassRoom: () => {
      self.classRooms.push(
         classRoom.create({
            ...self.newClassRoom.toJSON(),
            id: self.classRooms.length + 1
         })
      )
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
         let nMaterialStore = MaterialStore.create({
            materials: cR.material
         })
         let nPostStore = PostStore.create({
            Posts: cR.posts
         })
         let nAttachments = MaterialStore.create({
            materials: cR.attachments
         })

         let nRoom = classRoom.create({
            id: cR.id,
            title: cR.title,
            description: cR.description,
            background_img: cR.background_img,
            logo_iog: cR.logo_iog,
            material: nMaterialStore,
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
   }
}))

const x = {
   "id": 1,
   "student_objects": [
      {
         "id": 2,
         "username": "amintest7",
         "first_name": "amin",
         "last_name": "alakhras",
         "groups": [
            {
               "id": 2,
               "name": "students"
            }
         ],
         "profile": {
            "avatar": null
         }
      }
   ],
   "student_requests_objects": [
      {
         "id": 2,
         "username": "amintest7",
         "first_name": "amin",
         "last_name": "alakhras",
         "groups": [
            {
               "id": 2,
               "name": "students"
            }
         ],
         "profile": {
            "avatar": null
         }
      }
   ],
   "posts": [],
   "material": [],
   "created_at": "2020-07-05T22:14:09.249252Z",
   "modified_at": "2020-07-05T22:18:02.284728Z",
   "title": "hello world",
   "logo_img": "https://aug-classroom.herokuapp.com/api/classrooms/https%3A/image.shutterstock.com/image-vector/shield-letter-s-logosafesecureprotection-logomodern-260nw-633031571.jpg",
   "background_img": "https://aug-classroom.herokuapp.com/api/classrooms/https%3A/3.bp.blogspot.com/-3OZFSKvugss/VzH53PuahJI/AAAAAAAABdc/rGczv9JzFFUH1wBMx7gTtJBNl44GjaeQwCLcB/s1600/desain%252Bbackground%252Bpermainan%252Bwarna%252B6.jpg",
   "description": "kflsfjklsd",
   "promo_code": "b6f2258",
   "allow_student_participation": false,
   "auto_accept_students": true,
   "archived": false,
   "attachments": []
}