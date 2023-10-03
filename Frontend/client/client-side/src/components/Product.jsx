import React from 'react'
import { ShoppingCartOutlined, SearchOutlined, FavoriteBorderOutlined} from "@mui/icons-material";


const Product = ({item}) => {
  return (
    <div className='flex flex-1 m-5 mb-2 h-50 relative hover:bg-black hover:bg-opacity-[0.2] transition duration-300 ease-in-out '>
      <img src={item.img} alt="" srcset="" className='w-50 h-full w-full object-cover '/>

      <div className='flex opacity-0 absolute w-[100%] h-[100%] justify-center items-center text-black hover:opacity-100'>
        <div className='w-[40px] h-[40px] rounded-[50px] bg-white flex justify-center items-center'><ShoppingCartOutlined/></div>
        <div  className='w-[40px] h-[40px] rounded-[50px] bg-white flex justify-center items-center'><SearchOutlined/></div>
        <div className='w-[40px] h-[40px] rounded-[50px] bg-white flex justify-center items-center'><FavoriteBorderOutlined/></div>
      </div>
    </div>
  )
}

export default Product
