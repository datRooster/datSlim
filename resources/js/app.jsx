import React from 'react';
import Login from './components/Layout/Auth/Login/Login';
import Dashboard from './components/Layout/Dashboard';
import PrivateRoute from './components/Layout/Auth/PrivateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App