// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Favorite from './Favorite'
import Header from './Header'
import Home from './Home'
import Product from './Product'
import ButtonAll from './Button'
import About from './About'

const AllRoutes = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='product/:id' element={<Product />}></Route>
                <Route path='/favorite' element={<Favorite />}></Route>
                <Route path='/about' element={<About />}></Route>
            </Routes>
        </div>
    )
}

export default AllRoutes
