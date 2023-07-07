const questionsReducer = (state = { data: null }, action) => {
    switch (action.type) {
      case "POST_QUESTION":
        // the above POST_QUESTION is been called from action/question.js
        return { ...state }
      case "POST_ANSWER":
        return { ...state }
           // the above POST_ANSWERS is been called from action/question.js
      case "FETCH_ALL_QUESTIONS":
        return { ...state,data:action.payload}
         // the above POST_QUESTION is been called from action/question.js
   
    default:
        return state
    }
}

export default questionsReducer;


