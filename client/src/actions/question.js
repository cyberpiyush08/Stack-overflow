
import * as api from "../api/index";

// export const askQuestion = (questionData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.postQuestion(questionData);
//     // the above postQuestion is been called from api/index.js
//     dispatch({ type: "POST_QUESTION", payload: data });
//     dispatch(fetchAllQuestions());  /// this will display all the questions in the database without refreshing

//     navigate("/");
//   } catch (error) {
//     console.log(error);
//   }
// };
export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
      // the above postQuestion is been called from api/index.js
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions()); /// this will display all the questions in the database without refreshing
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};


export const fetchAllQuestions= ()=> async(dispatch)=>{
  try{
      const {data} = await api.getAllQuestions();
      dispatch({type: 'FETCH_ALL_QUESTIONS',payload:data})
      // the above FETCH_ALL_QUESTIONS is been passed in reducers/question.js
  }catch(error){
    console.log(error);
  }
}

export const deleteQuestion = (id,navigate)=>async(dispatch)=>{
  try{
    console.log("fetch data");
    const {data}=api.deleteQuestion(id);
    dispatch(fetchAllQuestions())
    navigate("/")   // after deleting the questions we will be navigating towards home page
  }catch(error){
      console.log(error)
  }
}

export  const voteQuestion =(id,value,userId) =>async(dispatch)=>{
    try{
        const { data } = await api.voteQuestion(id,value,userId)   // this function is been called in api/index.js
        dispatch(fetchAllQuestions()) 

    }catch(error){
        console.log(error);
    }
}

// the below function will be triggered when we click on button post your answer in pages/Questions/quwstiondetails
//   in form function on submit in handleposans function
export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered,userId } = answerData;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,userId
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};


export const deleteAnswer = (id,answerId,noOfAnswers) =>async(dispatch)=>{
  try{
      const {data}= await api.deleteAnswer(id,answerId,noOfAnswers);
      dispatch(fetchAllQuestions());
  }catch(error)
  {
    console.log(error);
  }

}





// export const deleteQuestion = (id, navigate) => async (dispatch) => {
//   try {
//     await api.deleteQuestion(id);
//     dispatch(fetchAllQuestions());
//     navigate("/");
//   } catch (error) {
//     console.log(error);
//   }
// };


// import * as api from "../api/index";

// export const askQuestion = (questionData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.postQuestion(questionData);
//     dispatch({ type: "POST_QUESTION", payload: data });
//     dispatch(fetchAllQuestions());
//     navigate("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchAllQuestions = () => async (disptach) => {
//   try {
//     const { data } = await api.getAllQuestions();
//     disptach({ type: "FETCH_ALL_QUESTIONS", payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const postAnswer = (answerData) => async (dispatch) => {
//   try {
//     const { id, noOfAnswers, answerBody, userAnswered } = answerData;
//     const { data } = await api.postAnswer(
//       id,
//       noOfAnswers,
//       answerBody,
//       userAnswered
//     );
//     dispatch({ type: "POST_ANSWER", payload: data });
//     dispatch(fetchAllQuestions());
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteQuestion = (id, navigate) => async (dispatch) => {
//   try {
//     await api.deleteQuestion(id);
//     dispatch(fetchAllQuestions());
//     navigate("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

