import React from "react";
import styled from "styled-components";
import {DataTable} from "primereact";
import {Column} from 'primereact/column';
import {useAppDispatch, useAppSelector} from "../store";
import {FormattedExistingUsers} from "../slicers/AppSlice";
import {CTAStyle} from "./util/anchor";
import {MdDelete} from 'react-icons/md';
import {deleteUser} from "../slicers/UserSlice";

const Landing = (): JSX.Element => {
    const users = useAppSelector(state => state.app.users);
    const dispatch = useAppDispatch();

    const deleteElement = (row: FormattedExistingUsers): JSX.Element => {
        return (
            <MdDelete className="icon" onClick={() => dispatch(deleteUser(row.id))}/>
        )
    }

    return (
        <LandingStyle><h1>
            Welcome to landing page!
        </h1>
            <CTAStyle href="/register">Sign-up</CTAStyle>
            <div className="table">
                <h3>Existing users</h3>
                <DataTable value={users} responsiveLayout="scroll">
                    <Column field="firstName" header="First name"/>
                    <Column field="Age" header="age"/>
                    <Column field="sector" body={(row: FormattedExistingUsers) => row.sector.name}
                            header="Sector"/>
                    <Column field="delete" body={deleteElement}
                            header="Delete"/>
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

  .table {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;
  }
  
  .icon{
    color: var(--teal600);
    font-size: var(--size400);
    :hover{
      cursor: pointer;
    }
  }
`