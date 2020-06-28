
import { types } from 'mobx-state-tree';
export const classRoom = types.model({
   id: types.optional(types.identifierNumber, 0),
   title: types.optional(types.string, ''),
   description: types.optional(types.string, ''),
   coverImage: types.optional(types.string, ''),
   thumbnail: types.optional(types.string, '')
}).actions((self) => ({
   setClassData: (payload) => {

      if (payload.key === "coverImage" || payload.key === "coverImage") {
      }
   }
}));
export default types.model('ClassRoomStore', {
   classRooms: types.array(classRoom),
   newClassRoom: types.optional(classRoom, {})
}).views((self) => ({
   getCoverImage: (id) => {
      let selectedClassRoom = self.classRooms = self.classRooms.find((cR) => {
         return cR.id !== id
      });
      return selectedClassRoom.classCover ? selectedClassRoom.classCover : ""
   }
})).actions((self) => ({
   addNewClassRoom: (payload) => {
      self.classRooms.push(
         classRoom.create({
            id: self.classRooms.length + 1,
            ...self.newClassRoom
         })
      )
   },
   setClassRoomData: (payload) => {
      self.newClassRoom.setClassData(payload);
   },
   deleteClassRoom: (id) => {
      let deleted = false;
      self.classRooms = self.classRooms.filter((cR) => {
         if (cR.id === id)
            deleted = true
         return cR.id !== id
      });
      return deleted
   }
}))
