import { types } from 'mobx-state-tree';
import User from '../../auth/stores/User';
export const Comment = types.model('Comment', {
   id: types.optional(types.identifierNumber, 0),
   user_info: types.optional(User, {}),
   content: types.optional(types.maybeNull(types.string), null),
   created_at: types.optional(types.maybeNull(types.string), null),
}).actions((self) => ({
   setData: (payload) => {
      self[payload.key] = payload.value;
   }
}))
export const Post = types.model('Post', {
   id: types.optional(types.identifierNumber, 0),
   user_info: types.optional(User, {}),
   content: types.optional(types.maybeNull(types.string), null),
   created_at: types.optional(types.maybeNull(types.string), null),
   comments: types.array(Comment)
}).views((self) => ({
   sortDescComments: () => {

      return self.comments.sort(compareDesc)
   }
})).actions((self) => ({
   setData: (payload) => {
      self[payload.key] = payload.value;
   },
   addComment: (payload) => {
      self.comments.push(Comment.create(payload));
   }
}))
const PostStore = types.model('PostStore', {
   Posts: types.array(Post),
   newPost: types.optional(Post, {})
}).views((self) => ({
   sortDescPosts: () => {

      return self.Posts.sort(compareDesc)
   }
})).actions((self) => ({
   setData: (payload) => {
      self.newPost.setData(payload);
   },
   addPost: (payload) => {
      self.Posts.push(
         Post.create({
            id: self.Posts.length + 1,
            ...payload
         })
      )
   },

}))

export default PostStore;


function compareDesc(tk1, tk2) {
   // Use toUpperCase() to ignore character casing
   console.log('task 1', tk1)
   const id1 = tk1.id;
   const id2 = tk2.id;

   let comparison = 0;
   if (id1 > id2) {
      comparison = -1;
   } else if (id1 < id2) {
      comparison = 1;
   }
   return comparison;
}