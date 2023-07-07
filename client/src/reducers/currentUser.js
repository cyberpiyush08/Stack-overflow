const currentUserReducer = (state = null, action) => {
    switch (action.type) {
      case "FETCH_CURRENT_USER":
        return action.payload;
      default:
        return state;
    }
  };

  //the "FETCH_CURRENT_USER" is been called from the action/currentuser.js and this file is  been called in index.js
  //file of reducers reducers/index.js
  
  export default currentUserReducer;
  