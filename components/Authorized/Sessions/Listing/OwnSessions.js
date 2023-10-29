import React from 'react'

function OwnSessions(props) {
  console.log(props.data)
  return (
    <div
      className=" min-h-screen  
grid items-stretch grid-cols-12  
gap-2 px-2 mx-auto xl:container md:gap-4 
xl:grid-cols-8 2xl:px-5 "
    >

      <div className="z-40 col-span-12 md:pt-2">

        Main

      </div>

    </div>
  )
}

export default OwnSessions