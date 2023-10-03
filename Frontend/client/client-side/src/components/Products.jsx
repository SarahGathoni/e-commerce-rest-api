import React from 'react'
import { popularProducts } from '../data'
import Product from './Product'

const Products = () => {
  return (
    <>
    <div className='m-4'>

    <div className='flex flex-wrap p-20 mb-[10px]'>
      {
        popularProducts.slice(0, 4).map((item) =>(
            <Product item={item} key={item.id}/>
        ))
      }
    </div>
      
    <div className='flex flex-wrap p-20  mt-[-170px]'>
      {
        popularProducts.slice(4, 8).map((item) =>(
            <Product item={item} key={item.id}/>
        ))
      }
    </div>
    </div>
    
    </>
    
  )
}

export default Products
