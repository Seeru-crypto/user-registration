import React, {useEffect, useState} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {getAccounts} from "../service/user";
import {Button} from "primereact/button";
import styled from "styled-components";

const AccountTable = () => {
    const [accountList, setAccountList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        getAccounts().then((response) => {
            setAccountList(response);
            setLoading(false)
        });
    }, [refresh])

/*    const sectorBodyTemplate = (rowData) => {
        const res = rowData.sectors.map((e) => `${e.name}, `);
        var lastElement = res.pop();
        lastElement = lastElement.substr(0, lastElement.length-2)
        res.push(lastElement);
        return res;
    }*/

    return (
        <div>
            <TableStyle>
                <DataTable value={accountList} loading={loading} dataKey={"id"} rowHover
                           emptyMessage="No Accounts found">
                    <Column field="firstName" header="firstName"/>
                    <Column field="id" header="Id"/>
                </DataTable>
                <Button className="refresh-btn" onClick={() => setRefresh(!refresh)}>Refresh</Button>
            </TableStyle>
        </div>)
}

export default AccountTable

const TableStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .refresh-btn{
    margin-top: 1rem;
  }

`