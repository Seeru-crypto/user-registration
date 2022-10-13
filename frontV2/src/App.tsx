import React, {useEffect} from 'react';
import ComponentRoutes from "./ComponentRoutes";
import {Steps} from 'primereact/steps';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "./store";
import {getSectors, getUsers} from "./slicers/AppSlice";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useToast from "./useToast";
import Loader from "./components/util/Loader";

function App() {
    useToast();
    const isUserLoading: boolean = useAppSelector<boolean>(state => state.user.loading);
    const isAppLoading: boolean = useAppSelector<boolean>(state => state.app.loading);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getSectors());
    }, [])

    return (
        <AppStyle>
            <ToastContainer className="toastify-container" toastClassName="toastify-toast"/>
            {
                isAppLoading || isUserLoading ? <Loader/> : (
                    <div>
                        <div className="body">
                            <ComponentRoutes/>
                        </div>

                    </div>
                )
            }

        </AppStyle>
    )
}

const AppStyle = styled.div`
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;

  .body {
    flex: 1;
  }

`
export default App;

