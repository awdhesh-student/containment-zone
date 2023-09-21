import React, { useState } from 'react';
import NavBar from './NavBar';
import UserHome from "../user/UserHome"
// import AddDoc from '../user/AddDoc'
import { Container } from 'react-bootstrap';
import AddLoc from '../Admin/AddLoc';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'home':
        return <UserHome />
      // case 'adddoc':
      //   return <AddDoc />
      case 'addloc':
        return <AddLoc />
      default:
        return <UserHome />

    }
  };

  return (
    <>
      <NavBar setSelectedComponent={setSelectedComponent} />
      <Container className='my-3'>
        {renderSelectedComponent()}
      </Container>
    </>
  );
};

export default Dashboard;


