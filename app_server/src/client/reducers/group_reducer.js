import {
  ASYNC_FETCH_GROUPS,
  ASYNC_EDIT_GROUP,
  ASYNC_DELETE_GROUP
} from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_GROUPS:
      return action.groups;
    case ASYNC_EDIT_GROUP:
      return [ ...state.filter(({_id}) => _id !== action.group._id), action.group ];
    case ASYNC_DELETE_GROUP:
      return state.filter(({_id}) => _id !== action._id);
    default:
      return state;
  }
}