/* eslint-disable eqeqeq */

import { types, getParent } from 'mobx-state-tree';
export const material = types.model({
   id: types.optional(types.identifierNumber, 0),
   file: types.optional(types.maybeNull(types.string), null),
   created_at: types.optional(types.maybeNull(types.string), null),
}).actions((self) => ({
   setNewData: (payload) => {
      self[payload.key] = payload.value;
   }
}));
const materialStore = types.model({
   materials: types.array(material),
   newMaterial: types.optional(material, {})
}).actions((self) => ({
   addNewMaterial: (payload) => {
      self.materials.push(
         material.create({
               id: payload.id?payload.id:self.materials.length + 1,
               ...payload

         })
      )
   },
   editMaterial: (payload) => {
      let edited = false;
      self.materials = self.materials.map((cR) => {
         if (cR.id == payload.id) {
            edited = true
            return payload;
         }
         return cR
      });
      return edited
   },
   get: (id) => {
      return self.materials.find((cR) => {
         return cR.id == id;
      })
   }
   ,
   setNewData: (payload) => {
      self.newMaterial.setNewData(payload);
   },
   delete: (id) => {
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
export default materialStore;
