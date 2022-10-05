import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '../pages/private/Home';
import Info from '../pages/private/Info';

const OtherRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='*' element={<Navigate to="/" />} />
                <Route path="/info" element={<Info />} />
            </Routes>
        </BrowserRouter>
    );
};

export default OtherRoutes;