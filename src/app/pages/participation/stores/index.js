import { types } from 'mobx-state-tree';
import User from '../../auth/stores/User';
export const Comment = types.model('Comment', {
   id: types.optional(types.identifierNumber, 0),
   user_info: types.optional(User, {}),
   content: types.optional(types.string, ''),
   created_at: types.optional(types.string, ''),
}).actions((self) => ({
   setData: (payload) => {
      self[payload.key] = payload.value;
   }
}))
export const Post = types.model('Post', {
   id: types.optional(types.identifierNumber, 0),
   user_info: types.optional(User, {}),
   content: types.optional(types.string, ''),
   created_at: types.optional(types.string, ''),
   comments: types.array(Comment)
}).views((self) => ({

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
}).actions((self) => ({
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