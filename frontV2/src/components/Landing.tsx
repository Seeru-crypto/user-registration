import React from 'react';
import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAppDispatch, useAppSelector } from '../store';
import { FormattedExistingUsers } from '../slicers/AppSlice';
import { CTAStyle } from './util/Anchor';
import { MdDelete } from 'react-icons/md';
import { deleteUser } from '../slicers/UserSlice';
import { useNavigate } from 'react-router-dom';

const Landing = (): JSX.Element => {
  const users = useAppSelector((state) => state.app.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteElement = (row: FormattedExistingUsers): JSX.Element => {
    return (
      <MdDelete
        className="icon"
        onClick={() => {
          void dispatch(deleteUser(row.id));
        }}
      />
    );
  };

  function navigateToRegister(e: React.MouseEvent<HTMLAnchorElement>): void {
    navigate('/register');
    e.preventDefault();
  }

  return (
    <LandingStyle>
      <h1>Welcome to user registration</h1>
      <CTAStyle onClick={(e) => navigateToRegister(e)} href="/register">
        Sign-up
      </CTAStyle>
      <div className="table">
        <h3>Existing users</h3>
        <DataTable value={users} responsiveLayout="scroll">
          <Column field="firstName" header="First name" />
          <Column field="age" header="Age" />
          <Column field="sector" body={(row: FormattedExistingUsers) => row.sector.name} header="Sector" />
          <Column field="delete" body={deleteElement} header="Delete" />
        </DataTable>
      </div>
    </LandingStyle>
  );
};

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

  .icon {
    color: var(--teal600);
    font-size: var(--size400);
    :hover {
      cursor: pointer;
    }
  }
`;
