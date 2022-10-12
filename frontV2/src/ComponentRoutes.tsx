import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import NotFound from "./components/NotFound";
import UserRegistration from "./components/UserRegistration";
import Landing from "./components/Landing";
import {useAppDispatch, useAppSelector} from "./store";
import {reverseNavigateToLanding} from "./slicers/AppSlice";

function ComponentRoutes() {
    const navigateToLanding = useAppSelector(state => state.app.navigateToLanding)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (navigateToLanding) {
            navigate("/")
            dispatch(reverseNavigateToLanding());
        }
    }, [navigateToLanding])

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