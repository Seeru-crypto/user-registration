import React from "react";
import {Route, Routes} from 'react-router-dom';
import NotFound from "./components/NotFound";
import UserRegistration from "./components/UserRegistration";
import Landing from "./components/Landing";

function ComponentRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/register" element={<UserRegistration/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default ComponentRoutes;