
import { types } from 'mobx-state-tree';
export const classRoom = types.model({

   id: types.identifierNumber,
   title: types.optional(types.string, ''),
   description: types.optional(types.string, ''),
   coverImage: types.optional(types.string, ''),
   thumbnail: types.optional(types.string, '')

}).actions((self) => ({

}));
export default types.model('ClassRoomStore', {
   classRooms: types.array(classRoom),
   newClassRoom: types.map(classRoom)
}).views((self) => ({

})).actions((self) => ({
   addNewClassRoom: (payload) => {
      self.classRooms.push(self.newClassRoom);
   },
   setClassRoomData: (payload) => {
      self.newClassRoom[payload.key] = payload.value;
   }
}))
