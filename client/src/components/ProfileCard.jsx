import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { fetchTransactions } from '../api/index';

const ProfileCard = ({ currentUser, token }) => {
  const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   const fetchUserTransactions = async () => {
  //     const data = await fetchTransactions(token);
  //     setTransactions(data);
  //   };

  //   fetchUserTransactions();
  // }, [token]);

  return (
    <MDBCard style={{ borderRadius: '15px', width: '550px' }}>
      <MDBCardBody className="p-4">
        <div className="d-flex text-black">
          <div className="flex-shrink-0">
            <MDBCardImage
              style={{ width: '180px', borderRadius: '10px' }}
              src={currentUser.image}
              alt="Profile image"
              fluid />
          </div>
          <div className="flex-grow-1 ms-3">
            <MDBCardTitle>{currentUser.username}</MDBCardTitle>
            <MDBCardText>{currentUser.email}</MDBCardText>
            <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
{/*              <div>
                <p className="small text-muted mb-1">Items Purchased</p>
                <p className="mb-0">{transactions.length}</p>
              </div>
              <div className="px-3">
                <p className="small text-muted mb-1">Total Transactions</p>
                <p className="mb-0">{transactions.filter(t => t.status === 'successful').length}</p>
              </div>
              <div>
                <p className="small text-muted mb-1">Completed Transactions</p>
                <p className="mb-0">{transactions.filter(t => t.status === 'completed').length}</p>
              </div>*/}
              <div>
                <p className="small text-muted mb-1">Account Type</p>
                <p className="mb-0">{currentUser.role[0].toUpperCase()+currentUser.role.slice(1)}</p>
              </div>
            </div>
{/*            <div className="d-flex pt-1">
              <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
              <MDBBtn className="flex-grow-1" onClick={() => setTransactions(transactions)}>Show Transactions</MDBBtn>
            </div>*/}
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ProfileCard;
