import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { setContactData, UserContactDataForm } from '../../slicers/UserSlice';
import { setCurrentStep } from '../../slicers/AppSlice';
import FormButton from '../util/FormButton';
import FormErrorMessage from '../util/FormErrorMessage';
import FormInput from '../util/FormInput';
import Title from '../util/Title';

const ContactDataForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentStepIndex = useAppSelector((state) => state.app.currentStep);
  const phoneNumber = useAppSelector((state) => state.user.phoneNumber);
  const emailAddress = useAppSelector((state) => state.user.emailAddress);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: phoneNumber != null ? phoneNumber : null,
      emailAddress: emailAddress !== '' ? emailAddress : '',
    },
  });

  const onSubmit = (data: UserContactDataForm): void => {
    dispatch(setContactData(data));
    dispatch(setCurrentStep(currentStepIndex + 1));
  };

  const emailRegexPattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

  const telephoneOption = { required: 'Phone number is a required field' };
  const emailOptions = {
    required: 'Email is a required field',
    pattern: {
      value: emailRegexPattern,
      message: 'Email should have correct format',
    },
  };

  return (
    <PersonalDataStyle>
      <Title value="Step 2" />
      <form className="dataForm" onSubmit={() => handleSubmit(onSubmit)}>
        <div className="inputGroup">
          <FormInput register={register} placeholder="phone number" name="phoneNumber" options={telephoneOption} />
          <FormErrorMessage value={errors.phoneNumber?.message} />
        </div>

        <div className="inputGroup">
          <FormInput register={register} placeholder="email adress" name="emailAddress" options={emailOptions} />
          <FormErrorMessage value={errors.emailAddress?.message} />
        </div>

        <div className="buttonGrp">
          <FormButton onClick={() => dispatch(setCurrentStep(currentStepIndex - 1))} type="button" testId="back" value="back" />
          <FormButton type="submit" value="next" testId="submit" />
        </div>
      </form>
    </PersonalDataStyle>
  );
};

export default ContactDataForm;

const PersonalDataStyle = styled.div`
  display: flex;
  flex-direction: column;
  form {
    gap: 1rem;
    display: flex;
    flex-direction: column;
  }

  .buttonGrp {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: var(--size100);
  }
`;
