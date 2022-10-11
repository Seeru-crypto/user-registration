import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from "./components/NotFound";
import UserRegistration from "./components/UserRegistration";

function ComponentRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<UserRegistration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default ComponentRoutes;