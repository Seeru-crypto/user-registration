import React, {memo, useEffect, useState} from "react";
import {MultiSelect} from "primereact/multiselect";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {validateCustomerData} from "../util/vaildate";
import {getUserSectors, postUser, updateUser} from "../service/user";
import styled from "styled-components";

const AddCustomer = () => {
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [selectedSectorId,setSectorId] = useState("");
    const [agreeToTerms,setAgreeToTerms] = useState(false);
    const [sectors, setSectors] = useState([]);

    useEffect(() => {
        // if (!sectors) getUserSectors().then((e) => setSectors(e));
        const testData = [
            {
                label: 'food & beverage', code: 'FB',
                items: [
                    { label: 'Beverages', value: '1' },
                    { label: 'Bakery', value: '2' },
                    { label: 'Fish', value: '3' }
                ]
            },
            {
                label: 'Furniture', code: 'US',
                items: [
                    { label: 'Bathroom', value: '11' },
                    { label: 'Bedroom', value: '12' },
                    { label: 'Childrens room', value: '13' }
                ]
            }
        ];
        setSectors(testData)
    }, [])

    const submitForm = () => {
        if (!validateCustomerData(customerName, agreeToTerms)) return;
        if (!customerId) {
            postUser(customerName, selectedSectorId, agreeToTerms).then((e) => {
                setCustomerId(e.id);
            });
        }
        else {
            updateUser(customerId, customerName, selectedSectorId, agreeToTerms);
        }
    }

    return(
        <UserFormStyle>
            <h1> Add user </h1>
            <div className="name-input">
                <span className="p-float-label">
                    <InputText id="username" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    <label htmlFor="username">User name</label>
                </span>
            </div>
            <div className="sector-selector">
                <MultiSelect id={"sector-selector"} showSelectAll={false} scrollHeight={"400px"} value={selectedSectorId} options={sectors} onChange={(e) => setSectorId(e.value)} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items"
                             placeholder="Select sector" />
            </div>

            <div className="terms-checkbox">
                <Checkbox inputId="binary" checked={agreeToTerms} onChange={e => setAgreeToTerms(!agreeToTerms)} />
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