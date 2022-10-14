import React from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {setMiscData, UserMicDataForm} from "../../slicers/UserSlice";
import {setCurrentStep} from "../../slicers/AppSlice";
import FormButton from "../util/FormButton";
import FormErrorMessage from "../util/FormErrorMessage";
import FormInput from "../util/FormInput";
import Title from "../util/Title";

const MiscDataForm = () => {
    const dispatch = useAppDispatch();
    const seatNr = useAppSelector(state => state.user.seatNr)
    const userFood = useAppSelector(state => state.user.foodPreference)
    const userAllergies = useAppSelector(state => state.user.allergyInfo)
    const currentStepIndex = useAppSelector(state => state.app.currentStep)
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            seatNr: seatNr ? seatNr : null,
            foodPreference: userFood ? userFood : "",
            allergyInfo: userAllergies ? userAllergies : "",
        }
    });

    const onSubmit = (data: UserMicDataForm) => {
        dispatch(setMiscData(data))
        dispatch(setCurrentStep(currentStepIndex + 1));
    }

    const seatOptions = {required: "Seat is a required field"}
    const foodOptions = {required: "Food is a required field"};
    const allergiesOptions = {required: "Allergies is a required field"};

    return (
        <MiscDataFormStyle>
            <Title value={"Step 3"} />
            <form className="dataForm" onSubmit={handleSubmit(onSubmit)}>

                <div className="inputGroup">
                    <FormInput register={register} placeholder="seat number" name="seatNr" options={seatOptions}/>
                    <FormErrorMessage value={errors.seatNr?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} placeholder="food preference" name="foodPreference" options={foodOptions}/>
                    <FormErrorMessage value={errors.foodPreference?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} placeholder="allergie info" name="allergyInfo" options={allergiesOptions}/>
                    <FormErrorMessage value={errors.allergyInfo?.message}/>
                </div>

                <div className="buttonGrp">
                    <FormButton onClick={() => dispatch(setCurrentStep(currentStepIndex - 1))} type="button"
                                value="back" testId="back"/>
                    <FormButton type="submit" value="next" testId="submit"/>
                </div>
            </form>
        </MiscDataFormStyle>
    )
}

export default MiscDataForm

const MiscDataFormStyle = styled.div`
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
    gap: var(--size100)
  }
`;