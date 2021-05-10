/* eslint-disable */
import React from 'react'
import "./BannerImage.css"

// Page Banner Component taking props to dynamically render content 
const BannerImage = (props) => {

  return (
    <div className= {props.banner} >
      <h1 className="BannerTitle">{props.title}</h1>
      <p className="BannerDescription">{props.desc}</p>
    </div>
  )
}



export default BannerImage
