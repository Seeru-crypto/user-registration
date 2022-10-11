import React from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store";
import FormButton from "../util/FormButton";
import {setCurrentStep} from "../../slicers/AppSlice";
import Title from "../util/Title";

const RegistrationOverview = (): JSX.Element => {
    const {firstName, lastName, age, phone, email, seat, food, allergies} = useAppSelector(state => state.user)
    const currentStepIndex = useAppSelector(state => state.app.currentStep)

    const dispatch = useAppDispatch();
    return (
        <OverviewStyle>
            <Title value={"Does everything seem fine?"} />
            <div className="row personal">
                <p><span className="label">First Name: </span> <span data-testid="firstName" className="value">{firstName}</span></p>
                <p><span className="label">Last Name: </span> <span data-testid="lastName" className="value">{lastName}</span></p>
                <p><span className="label">Age: </span> <span data-testid="age" className="value">{age}</span></p>
            </div>
            <div className="row contact">
                <p><span className="label">Phone number: </span> <span data-testid="phone" className="value">{phone}</span></p>
                <p><span className="label">Email address: </span> <span data-testid="email" className="value">{email}</span></p>
            </div>

            <div className="row misc">
                <p><span className="label">Seating preference: </span> <span data-testid="seat" className="value">{seat}</span></p>
                <p><span className="label">food preference: </span> <span data-testid="food" className="value">{food}</span></p>
                <p><span className="label">allergie info: </span> <span data-testid="allergies" className="value">{allergies}</span></p>
            </div>
            <div className="buttonGrp">
                <FormButton type="button" testId="back" onClick={() => dispatch(setCurrentStep(currentStepIndex - 1))}
                            value="back"/>
                <FormButton type="button" testId="confirm" onClick={() => alert("form submitted")} value="confirm"/>
            </div>
        </OverviewStyle>
    )
}
export default RegistrationOverview;


const OverviewStyle = styled.div`

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--size200);

  .personal, .misc, .contact {
    padding-bottom: var(--size100);
  }

  .label {
    font-weight: bold;
    padding-right: var(--size400);
  }

  h1, h2 {
    font-size: var(--size500);
  }


  .buttonGrp {
    padding: var(--size300) 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--size500);
  }

`

