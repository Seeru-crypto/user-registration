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
    const userSeat = useAppSelector(state => state.user.seat)
    const userFood = useAppSelector(state => state.user.food)
    const userAllergies = useAppSelector(state => state.user.allergies)
    const currentStepIndex = useAppSelector(state => state.app.currentStep)
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            seat: userSeat ? userSeat : null,
            food: userFood ? userFood : "",
            allergies: userAllergies ? userAllergies : "",
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
                    <FormInput register={register} placeholder="seat number" name="seat" options={seatOptions}/>
                    <FormErrorMessage value={errors.seat?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} placeholder="food preference" name="food" options={foodOptions}/>
                    <FormErrorMessage value={errors.food?.message}/>
                </div>

                <div className="inputGroup">
                    <FormInput register={register} placeholder="allergie info" name="allergies" options={allergiesOptions}/>
                    <FormErrorMessage value={errors.allergies?.message}/>
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