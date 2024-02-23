import {
  ActionsPropsType,
  AddPostActionType,
  NewPostPropsType,
  UpdateNewPostTextActionType
} from "./state";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

export const myPostsPageReducer = (
  state: any, action: ActionsPropsType) => {
  switch (action.type) {
    case ADD_POST:
      let newPost: NewPostPropsType = {
        id: new Date().getTime(),
        message: state.newPostText,
        likesCount: 0
      };
      state.posts.push(newPost);
      state.newPostText = '';
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newPostText;
      return state;
    default:
      return state
  }
}

export const addPostAC = (): AddPostActionType  => ({type: ADD_POST});
export const updateNewPostTextAC = (text: string): UpdateNewPostTextActionType => {
  return {type: UPDATE_NEW_POST_TEXT, newPostText: text}
};