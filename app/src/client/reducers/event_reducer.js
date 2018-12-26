import {
  ASYNC_FETCH_EVENTS,
  ASYNC_POST_EVENT,
  ASYNC_PATCH_ISDONE,
  ASYNC_REARRANGE_EVENTS,
  REARRANGE_REDUX_EVENTS
} from '../actions/_action_types';

export default (state = [], action) => {
  switch (action.type) {
    case ASYNC_FETCH_EVENTS:
      return action.events;
    case ASYNC_POST_EVENT:
      return [ ...state, action.event ];
    case ASYNC_PATCH_ISDONE:
      return [ ...state.filter(({_id}) => _id !== action.event._id), action.event ];
    case REARRANGE_REDUX_EVENTS:
      const { fromIndex, toIndex, movedIndex } = action;
      console.log({ fromIndex, toIndex });      

      const temp = state[toIndex]._rank;

      const newArr = state.map((event, i) => {
        if (fromIndex < toIndex) {
          if (i > fromIndex && i <= toIndex) {
            event._rank = (event._rank - 1); 
          }
        } else {
          if (i >= toIndex && i < fromIndex) {
            event._rank = (event._rank + 1);
          }
        }
        return event;
      });
      
      newArr[fromIndex]._rank = temp;

      // console.log('_rank', newArr.map(({ _rank }) => _rank));
      // console.log('title', newArr.map(({ title }) => parseInt(title)));
      return newArr;
    case ASYNC_REARRANGE_EVENTS:
      return action.events;
    default:
      return state;
  }
}