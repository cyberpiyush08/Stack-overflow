import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import './tags.css'
import { tagsList } from './tagList'
const Tags = () => {
    
      
  return (
    <div className="home-container-1">
       <LeftSidebar/>
       <div className="home-container-2">
        <h1 className="tags-h1">Tags</h1>
        <p className='tags-p'>A tag is a keyword or label that categories your question eith other,similar questions.</p>
        <p className='tags-p'>Using the right tags make it easier to others to  find the answer your questions.</p>
        <div class="tags-list-container">
            {
                tagsList.map((tag,index)=>(
                    <TagsList tag={tag} key={index}/>
                ))
            }
          

        </div>
       
       </div>
       
     
    </div>
  )
}

export default Tags
