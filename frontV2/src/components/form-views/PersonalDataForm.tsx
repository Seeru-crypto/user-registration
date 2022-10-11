import React from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {setPersonalData, UserPersonalDataForm} from "../../slicers/UserSlice";
import {setCurrentStep} from "../../slicers/AppSlice";
import FormButton from "../util/FormButton";
import FormErrorMessage from "../util/FormErrorMessage";
import FormInput from "../util/FormInput";
import Title from "../util/Title";

const noNummbersRegex = /^([^0-9]*)$/;
const onlyNumbersRegex =  /^(0|[1-9][0-9]*)$/;

const PersonalDataForm = () => {
    const dispatch = useAppDispatch();
    const currentStepIndex = useAppSelector(state => state.app.currentStep)
    const userFirstName = useAppSelector(state => state.user.firstName)
    const userLastName = useAppSelector(state => state.user.lastName)
    const userAge = useAppSelector(state => state.user.age)
    const userSecotr = useAppSelector(state => state.user.sector)

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            firstName: userFirstName ? userFirstName : "",
            lastName: userLastName ? userLastName : "",
            age: userAge ? userAge : null,
            sector: userSecotr ? userSecotr : "",
        }
    });

    const onSubmit = (data: UserPersonalDataForm) => {
        dispatch(setPersonalData(data))
        dispatch(setCurrentStep(currentStepIndex + 1))
    }

    const firstNameOptions = {
        required: "First name is a required field", pattern: {
            value: noNummbersRegex,
            message: "First name should not contain numbers"
        }
    }
    const lastNameOptions = {
        required: "Last name is a required field", pattern: {
            value: noNummbersRegex,
            message: "Last name should not contain numbers"
        }
    };
    const ageOptions = {
        required: "Age must be a number",
        min: {
            value: 0,
            message: "Age should be positive"
        },
        pattern:{
            value: onlyNumbersRegex,
            message: "Age must be a number"
        }
    }

    const sectorOptions= {
        required: "Sector must be selected!",
    }

    return (
        <PersonalDataStyle>
            <Title value="Step 1" />
            <form className="dataForm" onSubmit={handleSubmit(onSubmit)}>

                <div className="inputGroup">
                    <FormInput register={register} options={firstNameOptions} name="firstName" placeholder="first name"/>
                    <FormErrorMessage value={errors.firstName?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} options={lastNameOptions} name="lastName" placeholder="last name"/>
                    <FormErrorMessage value={errors.lastName?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} options={ageOptions} placeholder="age" name="age"/>
                    <FormErrorMessage value={errors.age?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} options={sectorOptions} placeholder="sector" name="sector"/>
                    <FormErrorMessage value={errors.sector?.message}/>
                </div>


                <div className="buttonGrp">
                    <FormButton type="submit" value="next" testId="submit"/>
                </div>
            </form>
        </PersonalDataStyle>
    )
}

export default PersonalDataForm

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
    justify-content: center;
  }

  .inputGroup{
    display: flex;
    flex-direction: column;
    gap: var(--size100)
  }
`