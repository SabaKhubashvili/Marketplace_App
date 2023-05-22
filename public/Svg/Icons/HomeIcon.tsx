import React from 'react'

interface Props{
  isActive?: boolean
}

export  function HomeIcon({isActive}:Props) {
  return (
    <React.Fragment>

      <svg height="31" width="35" fill="none" viewBox="0 0 35 31" xmlns="http://www.w3.org/2000/svg" >
        <path d="M30.0746 28.5746C30.0746 29.4205 29.3889 30.1062 28.543 30.1062H7.10054C6.25467 30.1062 5.56894 29.4205 5.56894 28.5746V14.7902H0.974121L16.7915 0.410753C17.3756 -0.120316 18.2679 -0.120316 18.8521 0.410753L34.6694 14.7902H30.0746V28.5746ZM16.2902 17.8534V27.043H19.3534V17.8534H16.2902Z" 
        fill={`${isActive ? '#24B47E' : '#A8A8A8'}`}/>
      </svg>

  </React.Fragment>
  )
}
