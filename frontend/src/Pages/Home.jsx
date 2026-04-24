import React from 'react'
import Hero from '../components/Hero'
import Categories from './admin/Categories';
import Menus from '../components/Menus';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Menus />
    </div>
  )
}

export default Home