import React from "react";
import styled from "styled-components";
import {useAppSelector} from "../store";
import ContactDataForm from "./form-views/ContactDataForm";
import PersonalDataForm from "./form-views/PersonalDataForm"
import MiscDataForm from "./form-views/MiscDataForm";
import RegistrationOverview from "./form-views/RegistrationOverview";

const UserRegistration = () => {
    const currentStep: number = useAppSelector(state => state.app.currentStep);

    return (
        <UserRegistrationStyle>
            {(currentStep === 0) && <PersonalDataForm/>}
            {currentStep === 1 && <ContactDataForm/>}
            {currentStep === 2 && <MiscDataForm/>}
            {currentStep === 3 && <RegistrationOverview/>}
        </UserRegistrationStyle>
    )
}

export default UserRegistration;

const UserRegistrationStyle = styled.div`
`