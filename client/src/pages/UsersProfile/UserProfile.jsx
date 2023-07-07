import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import "./UsersProfile.css"


import moment from "moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


const UsersProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];//22:23specific id will be selcted foe the particular user
  const currentUser = useSelector((state) => state.currentUserReducer); 
  // console.log(currentProfile);

  const [Switch,setSwitch]=useState(false);



  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
            <section>
                <div className="user-details-container">
                   <div div className='user-details'>
                      <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">
                      {currentProfile?.name.charAt(0).toUpperCase()}

                      </Avatar>
                        <div className="user-name">
                            <h1>{currentProfile?.name}</h1>
                            <p>
                            <FontAwesomeIcon icon={faBirthdayCake} /> Joined {""}
                            {moment(currentProfile?.joinedOn).fromNow()}
                            </p>      
                        </div>
                    </div>
                    {
                      currentUser?.result._id === id &&(
                        <button type="button" onClick={()=>setSwitch(true)} className='edit-profile-btn'> 
                            <FontAwesomeIcon icon={faPen}/> Edit profile
                        </button>
                      )
                    }
                </div>
                    
                <>
                {Switch ? (
                    <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/> 
                    // sending the current state of the setswitch that is true to the editprofileform page
                ) : (
                  <ProfileBio currentProfile={currentProfile}/>
                )
                   
                }
                    </>      
            </section>
        </div>
     
    </div>
  )
}

export default UsersProfile
