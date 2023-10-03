import React from 'react'
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge} from "@mui/icons-material";

export default function Navbar() {
  return (
    <div>
      <div className='flex flex-1 justify-between p-5'>
        <div className='text-4*1 font-extrabold'>KILA</div>
        <div>
            <input className="border-solid"/>
            <Search/>
        </div>
        <div className='flex'>
            <div className=''>SignIn</div>
            <div className='pl-2'>SignUp</div>
        
            
            <div className='pl-2'>
                <Badge badgeContent={1}>
                
                </Badge>
                <ShoppingCartOutlined className='pt-4'/>
            </div>
        </div>
      </div>
    </div>
  )
}
