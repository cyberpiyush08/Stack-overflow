import React,{useState} from 'react'
import  {useParams,Link,useNavigate,useLocation} from "react-router-dom"
import  moment from 'moment';
import { useSelector , useDispatch } from 'react-redux';

import copy from 'copy-to-clipboard'

import QuestionList from '../../components/HomeMainbar/QuestionList';
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import  "./Questions.css"
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { postAnswer,deleteQuestion,voteQuestion} from '../../actions/question';  // adding curly braces because it is not a default export function
// import { deleteQuestion } from '../../api';




const QuestionDetail = () => {
  const {id}=useParams();
  // console.log(id);

  const questionsList=useSelector(state => state.questionsReducer)
  console.log(questionsList)
  
//   var questionsList=[{
//       _id:'1',
//       upVotes:3,
//       downVotes:4,
//       noOfAnswers:2,
//       questionTitle:"what is function",
//       questionBody:"It meant to be",
//       questionTags:["java","node js","reactjs","java","node js","reactjs"],
//       userPosted:"To",
//       askedOn:"jan 1",
//       userId:1,
//       answers:[{
//           answerBody:"Answer",
//           userAnswered:"kumar",
//           answeredOn:"jan 2",
//           userId:1,
//       }]
//     },
//     {
//       _id:'2',
//       upVotes:3,
//       downVotes:2,
//       noOfAnswers:2,
//       questionTitle:"what is javascript",
//       questionBody:"It meant to be",
//       questionTags:["java","node js","reactjs","java","node js","reactjs"],
//       userPosted:"Tom",
//       askedOn:"jan 1",
//       userId:2,
//       answers:[{
//           answerBody:"Answer",
//           userAnswered:"kumar",
//           answeredOn:"jan 2",
//           userId:1,
//       }]
//     },
//     {
//       _id:'3',
//       upVotes:1,
//       downVotes:4,
//       noOfAnswers:2,
//       questionTitle:"what is javascript",
//       questionBody:"It meant to be",
//       questionTags:["java","node js","reactjs","java","node js","reactjs"],
//       userPosted:"Tom",
//       askedOn:"jan 1",
//       userId:1,
//       answers:[{
//           answerBody:"Answer",
//           userAnswered:"kumar",
//           answeredOn:"jan 2",
//           userId:3,
//       }]
//     },
// ]

const[Answer,setAnswer]=useState('');
const Navigate= useNavigate()
const dispatch =useDispatch()
const User =useSelector((state)=>(state.currentUserReducer))
const location=useLocation();
console.log(location)
const url = "http://localhost:3000";    //  this is been used to  give pathname of the particyular question 

const handlePostans =(e,answerLength)=>{
  e.preventDefault()
  if(User === null){
      alert("Login or Signup to answer a question")
      Navigate('/Auth')
  }
  else{
    if(Answer === ''){
      alert("Enter a answer before submitting ")
    }
    else{
      dispatch(
        postAnswer({
          id,
          noOfAnswers: answerLength + 1,
          answerBody: Answer,
          userAnswered: User.result.name,
          userId: User.result._id
        }));
    }
  }

}

const handleShare=()=>{
   copy(url+location.pathname)  // the url is been defiened above and it  gives the pathname of the question
   alert('copies url : '+url+location.pathname)
}

const handleDelete = () => {
  dispatch(deleteQuestion(id, Navigate));
};

const handleUpVote =()=>{
  dispatch(voteQuestion(id,'upVote',User.result._id))   // this partiular action is been passed in the backend and in controllers/question.js 
}

const handleDownVote =()=>{
  dispatch(voteQuestion(id,'downVote',User.result._id))
}

  return (
    <div className='question-details-page'>
    
      {questionsList.data===null?
            <h1>Loading...</h1>:
            <>
            {
                questionsList.data.filter(question=>question._id===id).map(question=>(
                    <div key={question._id}>
                    
                        {/* the below section is to create a question that has been posted contaning no of votes questiion body
                        tag avatar and timeline when question was posted */}
                        <section className='question-details-container'>
                            <h1>{question.questionTitle}</h1>
                            <div className='question-details-container-2'>
                                  <div className='question-votes'>
                                      <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                      <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownVote}/>
                                  </div>
                                <div style={{width:"100%"}}>
                                  <p className='question-body'> {question.questionBody}</p>
                                  <div className='question-details-tags'>
                                      {
                                        question.questionTags.map((tag)=>(
                                              <p key={tag}>{tag}</p>
                                        ))
                                      }

                                    </div>
                                      <div className='question-actions-user'>
                                      <div>
                                        <button type="button" onClick={handleShare}>Share</button> 
                                        {/* this button is been caleed when clicking the question and posting the answer part */}
                                        {User?.result?._id === question?.userId && (
                                                  <button type="button" onClick={handleDelete}>
                                                    Delete
                                                  </button>
                                                )}
                                                          
                                      </div>

                                <div>
                                  <p> asked  {moment(question.askedOn).fromNow()}</p> 
                                  {/* the moment changes the time of more than 8 letters to hours ago  
                                  eg 2023-06-13T14:38:52.976Z to  5 hours ago */}
                                  <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="orange"
                                  px="8px"
                                  py="5px"
                                  borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                  <div>{question.userPosted}</div>
                                  
                                 </Link> 
                               </div>
                            </div>
                       </div>
                                
                    </div>

                        </section>
                        {/* // the below section is about  the answers that has been posted containing no of answers avatar and
                        display the answers */}
                        {
                          question.noOfAnswers !==null &&
                          (
                            <section>
                              <h3>{question.noOfAnswers} Answers</h3>
                              <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                            </section>
                          )
                        }

                        {/* the below is the form section when the user can answer the particular question */}

                       <section className='post-ans-container'>
                          <h1>Yours Answers</h1>
                          <form onSubmit={(e)=>{handlePostans(e,question.answer.length)}}>
                            
                            <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br/>
                            <input type="submit" className='post-ans-btn' value="Post Your Answer"/>
                          </form>

                          <p>
                            Browse other Questions tagged
                            {
                              question.questionTags.map((tag)=>(
                               <Link to='/tags' key={tag} className='ans-tags'>{tag}</Link>
                              ))
                            }
                            or {
                              <Link to='/AskQuestion' style={{textDecoration:"none", color:"#009dff"}}>Ask Your Own Question</Link>
                            }
                          </p>
                          
                          
                       </section>

                    </div>
                ))
            }
          

            </>
            }
    </div>
  )
}

export default QuestionDetail
