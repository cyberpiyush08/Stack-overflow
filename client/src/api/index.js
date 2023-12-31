import axios from "axios";

const API=  axios.create({baseURL:"https://stack-overflow-server-5h6z.onrender.com"}) // providing backenend url


API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});


export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);  // contains the post request and a body authData



export const postQuestion = (questionData) =>API.post("/questions/Ask", questionData);// this postQuestion is been callled in actions.question.js
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion=(id,value,userId) => API.patch(`/questions/vote/${id}`,{ value, userId} );





export const postAnswer = (id, noOfAnswers, answerBody, userAnswered,userId) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered ,userId });  // the particular url is been came from index.js (server) app.use("/answer", answerRoutes);
  
export const deleteAnswer=(id,answerId,noOfAnswers)=>API.patch(`/answer/delete/${id}`,{answerId,noOfAnswers})

export const fetchAllUsers=()=>API.get('/user/getAllUsers')
export const updateProfile= (id,updateData)=>API.patch(`/user/update/${id}`,updateData)