import React from 'react';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import PartnerLogin from '../pages//authentication/PartnerLogin';
import PartnerRegister from '../pages//authentication/PartnerRegister';
import UserLogin from '../pages//authentication/UserLogin';
import UserRegister from '../pages//authentication/UserRegister';
import Home from '../pages/general/home';
import CreateFood from '../pages/food-partner/CreateFood';
import SavedVideos from '../pages/general/savedVideos';
import ProfilePage from '../pages/food-partner/profile';


const AppRoutes = () => {
    return (
       <Router>
        <Routes>
            <Route path='/user/register' element={<UserRegister/>} />
            <Route path='/user/login' element={<UserLogin />} />
            <Route path='/food-partner/register' element={<PartnerRegister />} />
            <Route path='/food-partner/login' element={<PartnerLogin />} />
            <Route path='/' element={<Home/>}/>
            <Route path='/create-food' element={<CreateFood/>}/>
            <Route path='/food-partner/:id' element={<ProfilePage/>}/>
            <Route path="/saved" element={<SavedVideos />} />
        </Routes>
       </Router>
    );
}

export default AppRoutes;
