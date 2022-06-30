import React, {memo, useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {validateCustomerData} from "../util/validate";
import {Toast} from 'primereact/toast';
import {TreeSelect} from 'primereact/treeselect';
import {getUserSectors, postUser, updateUser} from "../service/user";
import styled from "styled-components";

const AddCustomer = () => {
    const [userId, setUserId] = useState("");
    const toast = useRef(null);
    const [sectors, setSectors] = useState(null);
    const [selectedSectors, setSelectedSectors] = useState(null);
    const [userName, setUserName] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const showWarn = (body) => toast.current.show({severity: 'warn', summary: 'Hoiatus', detail: body, life: 3000});
    const showSuccess = (body) => toast.current.show({severity: 'success', summary: 'Edu', detail: body, life: 3000});

    useEffect(() => {
        if (!sectors) getUserSectors().then((e) => setSectors(e));
    }, [])

    const submitForm = () => {
        if (!validateCustomerData(userName, agreeToTerms, selectedSectors)) {
            showWarn("Viga sisend andmetes")
            return;
        }

        const formattedSectorIds = Object.entries(selectedSectors).map(([key, value]) => {
            return parseInt(key);
        });

        if (!userId) {
            postUser(userName, formattedSectorIds, agreeToTerms).then((e) => {
                setUserId(e);
                showSuccess("loodud")
            });
        } else {
            updateUser(userId, userName, formattedSectorIds).then(() => {
                showSuccess("uuendatud");
            });
        }
    }

    return(
        <UserFormStyle>
            <Toast ref={toast}/>
            <h1> Add user </h1>
            <div className="name-input">
                <span className="p-float-label">
                    <InputText id="username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <label htmlFor="username">User name</label>
                </span>
            </div>
            <div className="sector-selector">
                <TreeSelect display="chip" placeholder="Select sector" value={selectedSectors} scrollHeight={"400px"}
                            options={sectors} onChange={(e) => setSelectedSectors(e.value)} selectionMode="multiple"
                            metaKeySelection={false}/>
            </div>
            <div className="terms-checkbox">
                <Checkbox inputId="binary" checked={agreeToTerms} onChange={e => setAgreeToTerms(!agreeToTerms)}/>
                <label htmlFor="binary">Agree to terms</label>
            </div>
            <div className="submit-button">
                <Button onClick={() => submitForm()}>Submit</Button>
            </div>
            </UserFormStyle>
    )
}
export default memo(AddCustomer);

const UserFormStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-items: center;
  font-family: -apple-system, system-ui;
`