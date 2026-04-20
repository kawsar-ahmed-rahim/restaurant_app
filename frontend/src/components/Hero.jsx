import React from 'react'
import { useContext } from 'react'
import { AppContext } from './../context/AppContext';

const Hero = () => {
    const {navigate} = useContext(AppContext)
  return (
    <section className='relative h-[90vh] flex items-center justify-center bg-center bg-cover' style={{backgroundImage:"url(``)"}}>
        <div>
            
        </div>

    </section>
  )
}

export default Hero