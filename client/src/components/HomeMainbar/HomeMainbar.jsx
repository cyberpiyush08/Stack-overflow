import React from 'react'
import "./HomeMainbar.css"
import {useLocation,useNavigate} from "react-router-dom";
// import Questions from './Questions';
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';

const HomeMainbar = () => {
  const location=useLocation();
   
  const user=1;                 // here the user value is defined
  const navigate=useNavigate();

  const questionsList=useSelector(state => state.questionsReducer)
  console.log(questionsList);

  // so the below predefined questions is been replaced by the data from the database and backend

//   var questionsList=[{
//         _id:1,
//         votes:3,
//         noOfAnswers:2,
//         questionTitle:"what is function",
//         questionBody:"It meant to be",
//         questionTags:["java","node js","reactjs","java","node js","reactjs"],
//         userPosted:"Tom",
//         askedOn:"jan 1"
//       },
//       {
//         _id:2,
//         votes:4,
//         noOfAnswers:3,
//         questionTitle:"what is function",
//         questionBody:"It meant to be",
//         questionTags:["javascript","node C","reactjs"],
//         userPosted:"Tom",
//         askedOn:"jan 2"
//       },
//       {
//         _id:3,
//         votes:3,
//         noOfAnswers:2,
//         questionTitle:"what is function????",
//         questionBody:"It meant to be",
//         questionTags:["R","Angular js","reactjs"],
//         userPosted:"piyush",
//         askedOn:"jan 1"
//       },
// ]


  
    const checkAuth=()=>{
      if(user===null){
        alert("login or signup")
        navigate('/Auth')
      }
      else{
        navigate('/AskQuestion');
      }
    }


  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
      
            {
              location.pathname==='/'?<h1>Top Questions</h1>: <h1>All Questions</h1>
            }

{/* //the below code is for askquestions if the user is note login and trying to ask question then it will redirect
    //to login page through UseNavigate  */}

            <button  onClick={checkAuth} className='ask-btn'>Ask Questions</button>
      </div>
      <div>
     
           {questionsList.data=== null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>    
            {/* adding .data because data is the object then to access another element through it  */}
            <QuestionList questionsList={questionsList.data} />
          </>
        )} 
      </div>
      
    </div>
  )
}

export default HomeMainbar
