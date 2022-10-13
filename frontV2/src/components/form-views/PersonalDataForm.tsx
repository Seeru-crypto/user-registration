import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {setPersonalData, UserPersonalDataForm} from "../../slicers/UserSlice";
import {SectorProps, setCurrentStep} from "../../slicers/AppSlice";
import FormButton from "../util/FormButton";
import FormErrorMessage from "../util/FormErrorMessage";
import FormInput from "../util/FormInput";
import Title from "../util/Title";
import {TreeSelect} from 'primereact/treeselect';
import {noNumbersRegex, onlyNumbersRegex} from "../../constants";

const PersonalDataForm = () => {
    //TODO: Add dropdown empty input control
    //TODO: Add proper styling to dropwon
    const dispatch = useAppDispatch();
    const currentStepIndex = useAppSelector(state => state.app.currentStep)
    const userFirstName = useAppSelector(state => state.user.firstName)
    const userLastName = useAppSelector(state => state.user.lastName)
    const userAge = useAppSelector(state => state.user.age)
    const userSectorId = useAppSelector<number>(state => state.user.sectorId)
    const sectors = useAppSelector<SectorProps[]>(state => state.app.sectors);
    const [selectedSector, setSelectedSector] = useState<any>(undefined);
    const [sectorErrorMsg, setSectorErrorMsg] = useState<string>("");
    const [formattedSectors, setFormattedSectors] = useState<FormattedSector[]>([])
    const sectorErrorMessage = "A sector must be selected";

    interface FormattedSector {
        key: number;
        label: string;
        children: any;
    }

    useEffect(() => {
        if (userSectorId !== 0) setSelectedSector(userSectorId)
    }, [userSectorId])

    useEffect(() => {
        const formattedList = sectors.map((sector: SectorProps) => sectorToTree(sector));
        setFormattedSectors(formattedList);
    }, [sectors]);

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            firstName: userFirstName ? userFirstName : "",
            lastName: userLastName ? userLastName : "",
            age: userAge ? userAge : null,
            sectorId: userSectorId ? userSectorId : 0,
        }
    });

    function sectorToTree(sector: SectorProps): FormattedSector {
        return {key: sector.id, label: sector.name, children: (sector.children.map((e) => sectorToTree(e)))}
    }

    const onSubmit = (data: UserPersonalDataForm) => {
        if(!selectedSector) {
            setSectorErrorMsg(sectorErrorMessage)
            return
        }
        else setSectorErrorMsg("")
        dispatch(setPersonalData({...data, sectorId: selectedSector}))
        dispatch(setCurrentStep(currentStepIndex + 1))
    }
    const firstNameOptions = {
        required: "First name is a required field", pattern: {
            value: noNumbersRegex,
            message: "First name should not contain numbers"
        }
    }
    const lastNameOptions = {
        required: "Last name is a required field", pattern: {
            value: noNumbersRegex,
            message: "Last name should not contain numbers"
        }
    };
    const ageOptions = {
        required: "Age must be a number",
        min: {
            value: 0,
            message: "Age should be positive"
        },
        pattern: {
            value: onlyNumbersRegex,
            message: "Age must be a number"
        }
    }
    const sectorOptions = {
        required: "Sector must be selected!",
    }

    return (
        <PersonalDataStyle>
            <Title value="Step 1"/>
            <form className="dataForm" onSubmit={handleSubmit(onSubmit)}>

                <div className="inputGroup">
                    <FormInput register={register} options={firstNameOptions} name="firstName"
                               placeholder="first name"/>
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

                <TreeSelect display="chip"
                            placeholder="Select sector"
                            {...register("sectorId", sectorOptions)}
                            value={selectedSector}
                            scrollHeight={"400px"}
                            options={formattedSectors}
                            onChange={(e) => setSelectedSector(e.value)}
                            selectionMode="single"
                            filter
                            filterBy={"label"}
                            filterPlaceholder="Electronics ..."
                            filterInputAutoFocus
                            required={true}
                            className="treeSelect"
                            metaKeySelection={false}/>
                <FormErrorMessage value={sectorErrorMsg}/>

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

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: var(--size100)
  }

  .treeSelect {
    border: none;
    border-bottom: 2px solid var(--teal400);
    :hover, :focus, :active {
        border-color: var(--gray800);
    }
  }
`