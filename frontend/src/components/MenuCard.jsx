import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MenuCard = ({menu}) => {
    const {navigate} = useContext(AppContext)
  return (
    <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group'>
        {/* image section */}
        <div onClick={()=>navigate(`/menu-details/${menu._id}`)} className='relative h-58 overflow-hidden cursor-pointer'>
            <img src={menu.image} alt="img" className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
            {/* overlay on hover */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            

            </div>
        </div>
    </div>
  )
}

export default MenuCard