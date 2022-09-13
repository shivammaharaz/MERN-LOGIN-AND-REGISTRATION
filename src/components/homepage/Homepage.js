import React from 'react'
import './Homepage.css'

const Homepage = (props) => {
  return (
    <div className="homepage">
      <h1>{`WELCOME ${props.user.name}`}</h1>
      <div className="btn btn-primary" onClick={()=>props.setLogin({})}>Logout</div>
    </div>
  )
}

export default Homepage