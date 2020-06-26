
import { types, getSnapshot, getParent } from 'mobx-state-tree';
export const classRoom = types.model({
   title: types.optional(types.string, ''),
   description: types.optional(types.string, ''),
   coverImage: types.optional(types.string, ''),
   thumbnail: types.optional(types.string, '')

}).actions((self) => ({
   setClassRoomData: (payload) => {
      self[payload.key] = payload.value;
   }
}));
export default types.model('ClassRoomStore', {
   classRooms: types.array(classRoom),
   newClass: types.optional(classRoom, {}),
}).views((self) => ({

})).actions((self) => ({
   handleClassChange: (payload) => {
      self.newClass.setClassRoomData(payload)
   },
   addNewClass: () => {
      self.classRooms.push(self.newClass)
   },
   clearClass: () => {
   const data = {
      title:'',
      description: '',
      coverImage: '',
      thumbnail: ''
   };
      self.newClass = data;
   }

}))
