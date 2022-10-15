import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../store";
import FormButton from "../util/FormButton";
import {reverseNavigateToLanding, setCurrentStep} from "../../slicers/AppSlice";
import Title from "../util/Title";
import {resetUserFormState, saveUser, UserDtoProps} from "../../slicers/UserSlice";

const RegistrationOverview = (): JSX.Element => {
    const {
        firstName,
        lastName,
        age,
        phoneNumber,
        emailAddress,
        seatNr,
        foodPreference,
        allergyInfo,
        sectorId,
        agreeToTerms
    } = useAppSelector(state => state.user)
    const sectors = useAppSelector(state => state.app.sectors)
    const currentStepIndex = useAppSelector(state => state.app.currentStep)
    const dispatch = useAppDispatch();
    const [userCurrentSector, setUserCurrentSector] = useState("")

    function onSubmit() {
        const userDto: UserDtoProps = {
            firstName,
            lastName,
            age,
            phoneNumber,
            emailAddress,
            seatNr,
            foodPreference,
            allergyInfo,
            agreeToTerms,
            sectors: [{id: sectorId}]
        };
        dispatch(saveUser(userDto)).then(() => {
            dispatch(reverseNavigateToLanding())
            dispatch(resetUserFormState())
            dispatch(setCurrentStep(0))
        });
    }

    useEffect(() => {
            sectors.forEach(sector => {
                if (sector.id === sectorId) setUserCurrentSector(sector.name);
            })
        }, [sectors, sectorId]
    )

    return (
        <OverviewStyle>
            <Title value={"Does everything seem fine?"}/>
            <div className="row personal">
                <p><span className="label">First Name: </span> <span data-testid="firstName"
                                                                     className="value">{firstName}</span></p>
                <p><span className="label">Last Name: </span> <span data-testid="lastName"
                                                                    className="value">{lastName}</span></p>
                <p><span className="label">Age: </span> <span data-testid="age" className="value">{age}</span></p>
                <p><span className="label">Sector: </span> <span className="value">{userCurrentSector}</span></p>

            </div>
            <div className="row contact">
                <p><span className="label">Phone number: </span> <span data-testid="phone"
                                                                       className="value">{phoneNumber}</span></p>
                <p><span className="label">Email address: </span> <span data-testid="email"
                                                                        className="value">{emailAddress}</span></p>
            </div>

            <div className="row misc">
                <p><span className="label">Seating preference: </span> <span data-testid="seat"
                                                                             className="value">{seatNr}</span></p>
                <p><span className="label">food preference: </span> <span data-testid="food"
                                                                          className="value">{foodPreference}</span></p>
                <p><span className="label">allergie info: </span> <span data-testid="allergies"
                                                                        className="value">{allergyInfo}</span></p>
            </div>
            <div className="buttonGrp">
                <FormButton type="button" testId="back" onClick={() => dispatch(setCurrentStep(currentStepIndex - 1))}
                            value="back"/>
                <FormButton type="button" testId="confirm" onClick={() => onSubmit()} value="confirm"/>
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

