import { types, getParent } from 'mobx-state-tree';
export  const media = types.model({
    id:types.optional(types.identifierNumber,0),
    path:types.optional(types.string,""),
    provider:types.optional(types.number,1),// youtube
    course:types.optional(types.number,0)
}).actions((self)=>({
setData:(payload)=>{
    self[payload.key]= payload.value;
}
}));
export  const video = types.model({
    id:types.optional(types.identifierNumber,0),
    title:types.optional(types.string,""),
    description:types.optional(types.string,""),

    // path:types.optional(types.maybeNull(types.string),""),
    media:types.optional(media,{}),
}).actions((self)=>({
setNewData:(payload)=>{
    self[payload.key]= payload.value;
}
}));


export const classRoonCourses = types.model({
    videos :types.optional(types.array(video),[]),
    newVideo :types.optional(video,{}),
}).actions((self)=>({
    addNewVideo:(payload)=>{
        console.log('add course', payload)
        self.videos.push(payload)
    },
    editVideo:(payload)=>{
       let edited =false ;
       self.videos =  self.videos.map((cR)=>{

            if(cR.id == payload.id){
                edited =true;
                return payload ;
            }
            return edited
        })
    },
    get:($id) =>{
        return self.videos.find((cR)=>{
            return cR.id == $id;
        })
    },
    delete:($id) =>{
    let deleted =false ;
    console.log('deletec couese',$id)
    self.videos = self.videos.filter((cR)=>{
        if(cR.id == $id)
            deleted = true ;
            return cR.id != $id;

    })
    return deleted

    }
}));