import React from 'react'
import { Send } from '@mui/icons-material'

const Newsletter = () => {
  return (
    <div className='flex flex-col justify-center items-center p-20 w-[100%] h-[100%] bg-gradient-to-b from-purple-200 to-purple-300'>
        <h1 className='text-6xl'>Newsletter</h1>
        <p className='pt-5'>Get timely updates from your favourite products</p>

        <div>
            <input type="text" placeholder='your email' className='mt-3 p-2 text-center'/>
            <button>{<Send  className=''/>}</button>
        </div>
      
    </div>
  )
}

export default Newsletter
