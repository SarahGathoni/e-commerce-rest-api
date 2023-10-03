import React from 'react'

export default function CategoryItem({item}) {
  return (
    <>
    <div className='flex flex-1 h-[80vh] relative'>
      
      <img src={item.img} alt="" srcset="" className='w-[100%] m-0 object-cover ' />

      <div className='flex flex-col justify-center items-center w-[100%] h-[100%] mt-3 top-0 bottom-0 z-50 absolute'>
        <h1 className="text-4xl font-extrabold text-white">{item.title}</h1>
        <button className='text-1xl font-200 p-[5px] bg-white text-black-200 mt-5 cursor-pointer'>SHOP NOW!</button>
      </div>
      
    </div>



    </>
    
  )
}

