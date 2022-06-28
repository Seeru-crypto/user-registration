import React, {memo, useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {validateCustomerData} from "../util/vaildate";
import {Toast} from 'primereact/toast';
import {TreeSelect} from 'primereact/treeselect';
import {postUser, updateUser} from "../service/user";
import styled from "styled-components";

const AddCustomer = () => {
    const [customerId, setCustomerId] = useState("");
    const toast = useRef(null);
    const [nodes, setNodes] = useState(null);
    const [selectedSectorId, setSelectedSectorId] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [sectors, setSectors] = useState([]);

    useEffect(() => {
        // if (!sectors) getUserSectors().then((e) => setSectors(e));
        const nodeData = [
            {
                "key": "0",
                "label": "Documents",
                "children": [
                    {
                        "key": "0-0",
                        "label": "Work"
                    }
                ]
            },
            {
                "key": "1",
                "label": "Events",
                "children": [
                    {
                        "key": "1-0",
                        "label": "Meeting"
                    },
                    {
                        "key": "1-1",
                        "label": "Product Launch"
                    },
                    {
                        "key": "1-2",
                        "label": "Report Review"
                    }
                ]
            }
        ];
        setNodes(nodeData);
    }, [])


    const showWarn = (body) => {
        toast.current.show({severity: 'warn', summary: 'Hoiatus', detail: body, life: 3000});
    }

    const showSuccess = (body) => {
        toast.current.show({severity: 'success', summary: 'Edu', detail: body, life: 3000});
    }

    const submitForm = () => {
        if (!validateCustomerData(customerName, agreeToTerms)) {
            showWarn("Viga sisend andmetes")
            return;
        }

        const formattedSectorIds = Object.entries(selectedSectorId).map(([key, value]) => {
            return key;
        });

        if (!customerId) {
            postUser(customerName, formattedSectorIds).then((e) => {
                setCustomerId(e.id);
                showSuccess("loodud")
            });
        } else {
            updateUser(customerId, customerName, formattedSectorIds).then(() => {
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
                    <InputText id="username" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    <label htmlFor="username">User name</label>
                </span>
            </div>
            <div className="sector-selector">
                <TreeSelect display="chip" placeholder="Select sector" value={selectedSectorId} scrollHeight={"400px"}
                            options={nodes} onChange={(e) => setSelectedSectorId(e.value)} selectionMode="multiple"
                            metaKeySelection={false} />
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