import React from 'react'
import Hero from '../components/Hero'
import Categories from './admin/Categories';
import Menus from '../components/Menus';
import NewsLetter from '../components/NewsLetter';
import Testimonial from '../components/Testimonial';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Menus />
      <NewsLetter />
      <Testimonial />
    </div>
  )
}

export default Home