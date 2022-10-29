import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../store';
import ContactDataForm from './form-views/ContactDataForm';
import PersonalDataForm from './form-views/PersonalDataForm';
import MiscDataForm from './form-views/MiscDataForm';
import RegistrationOverview from './form-views/RegistrationOverview';
import { Steps } from 'primereact/steps';

const UserRegistration = (): JSX.Element => {
  const currentStep: number = useAppSelector((state) => state.app.currentStep);
  const items = [{ label: 'Personal' }, { label: 'Contact' }, { label: 'Miscellaneous' }, { label: 'Confirmation' }];
  return (
    <UserRegistrationStyle>
      <div className="formFields">
        {currentStep === 0 && <PersonalDataForm />}
        {currentStep === 1 && <ContactDataForm />}
        {currentStep === 2 && <MiscDataForm />}
        {currentStep === 3 && <RegistrationOverview />}
      </div>
      <div className="footer">
        <Steps model={items} activeIndex={currentStep} />
      </div>
    </UserRegistrationStyle>
  );
};

export default UserRegistration;

const UserRegistrationStyle = styled.div`
  .formFields {
    min-height: 75vh;
  }

  .footer {
    display: flex;
    min-height: 150px;

    .p-steps-title {
      padding: 0 30px;
    }
  }
`;
