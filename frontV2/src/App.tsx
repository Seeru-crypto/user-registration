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

function App() {
    useToast();
    const currentStep = useAppSelector(state => state.app.currentStep);
    const items = [
        {label: 'Personal'},
        {label: 'Contact'},
        {label: 'Miscellaneous'},
        {label: 'Confirmation'}
    ];

    const users = useAppSelector(state => state.app.users);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getSectors());
    }, [])
    // TODO: Create proper landing page with a user´s table, which shows first name, seat and sector
    return (
        <AppStyle>
            <ToastContainer className="toastify-container" toastClassName="toastify-toast" />
            <p>Number of users: {users.length}</p>
            <div className="body">
                <ComponentRoutes/>
            </div>
            <div className="footer">
                <Steps model={items} activeIndex={currentStep}/>
            </div>
        </AppStyle>
    );
}

const AppStyle = styled.div`
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;

  .body {
    flex: 1;
  }

  .footer {
    display: flex;
    min-height: 150px;

    .p-steps-title {
      padding: 0 30px;
    }
  }
`
export default App;

