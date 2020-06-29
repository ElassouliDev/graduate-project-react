/* eslint-disable eqeqeq */

import { types } from 'mobx-state-tree';
export const material = types.model({
   id: types.optional(types.identifierNumber, 0),
   url: types.optional(types.string, ''),
   uploadedAt: types.optional(types.string, ''),
   title: types.optional(types.string, ''),
   description:types.optional(types.string,'')
}).actions((self) => ({
   setClassData: (payload) => {
      if (payload.key === "profileImage") {
      }
      self[payload.key] = payload.value;
   }
}));
const MaterialStore = types.model({
   materials: types.array(material),
   newMaterial: types.optional(material, {})
}).actions((self) => ({
   addNewMaterial: (payload) => {
      self.materials.push(
         material.create({
            id: self.materials.length + 1,
            ...self.newMaterial
         })
      )
   },
   editMaterial: (payload) => {
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
   getMaterial: (id) => {
      return self.classRooms.find((cR) => {
         return cR.id == id;
      })
   }
   ,
   setClassRoomData: (payload) => {
      self.newMaterial.setClassData(payload);
   },
   deleteClassRoom: (id) => {
      let deleted = false;
      self.materials = self.materials.filter((cR) => {
         console.log(cR.id == id, id, cR.id);

         if (cR.id == id)
            deleted = true
         return cR.id != id
      });
      return deleted
   }
}))
export default MaterialStore;
