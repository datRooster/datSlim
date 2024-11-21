import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
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