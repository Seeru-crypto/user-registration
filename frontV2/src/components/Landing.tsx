import React from "react";
import styled from "styled-components";
import {DataTable} from "primereact";
import {Column} from 'primereact/column';
import {useAppSelector} from "../store";
import {FormattedExistingUsers} from "../slicers/AppSlice";
import {DTOStyle} from "./util/anchor";

const Landing = (): JSX.Element => {

    const users = useAppSelector(state => state.app.users);

    return (
        <LandingStyle><h1>
            Welcome to landing page!
        </h1>
            <DTOStyle href="/register" >Sign-up</DTOStyle>
            <div className="table">
                //TODO: Add delete entry funtiopnality to table
                //TODO: Refactor styling
                <h3>Existing users</h3>
                <DataTable value={users} responsiveLayout="scroll">
                    <Column field="firstName" header="first"/>
                    <Column field="age" header="age"/>
                    <Column field="sector.name" body={(row : FormattedExistingUsers) => row.sector.name} header="Sector"/>
                </DataTable>
            </div>
        </LandingStyle>

    )

}

export default Landing;

const LandingStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  
  .table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
`