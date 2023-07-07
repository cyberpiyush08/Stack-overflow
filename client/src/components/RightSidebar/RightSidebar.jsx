import React from "react";
import './RightSidebar.css';
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";



const RightSidebar = () => {
  return (
    <aside className='right-sidebar'>
        <Widget/>
        <WidgetTags/>
        {/* <h1>hii</h1> */}

    </aside>
  )
}

export default RightSidebar
