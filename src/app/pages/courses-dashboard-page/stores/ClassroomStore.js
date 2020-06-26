import { flow, getParent, types } from 'mobx-state-tree';

export default types.model('ClassroomStore', {
    id: types.optional(types.integer, 0),
    title: types.optional(types.string, ''),
    background_img: types.optional(types.string, ''),
    logo_img: types.optional(types.string, ''),
    description: types.optional(types.string, ''),
    promo_code: types.optional(types.string, ''),
    allow_student_participation: types.optional(types.boolean, true),
    auto_accept_students: types.optional(types.boolean, true),
    archived: types.optional(types.boolean, true),
    attachments: types.optional(types.array, []),
    student_requests: types.optional(types.array, []),
    students: types.optional(types.array, []),
}).views((self) => ({


})).actions((self) => ({
    setNewClassroom: (payload) => {
        self.title = payload.title;
        self.description = payload.description;
    },
    setNewClassroomData: (payload) => {
        self[payload.key] = payload.value;
    },
    createNewClassroom: flow(function* createNewClassroom() {
        const formdata = new FormData();
        formdata.append('title', self.title)
        formdata.append('description', self.description)

       const res = yield getParent(self).apiRequests.createNewClassroom(formdata)
        console.log(res)
    })
}))
