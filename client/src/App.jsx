import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { fetchProfiles } from './api/index';
import ProductList from './components/ProductList';
import ProfileCard from './components/ProfileCard';
import SellerDashboard from './components/SellerDashboard';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [token, setToken] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchProfilesData = async () => {
      try {
        const data = await fetchProfiles();
        setToken(data.token);
        setProfiles(data.users);
        setSelectedProfile(data.currentUser);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfilesData();
  }, []);

return (
  <MDBContainer fluid className="min-vh-100 min-vw-100 d-flex flex-column">
    {selectedProfile && (
      <>
        <MDBRow className="justify-content-center flex-grow-0" style={{ backgroundColor: '#9de2ff' }}>
          <MDBCol md="9" lg="7" xl="5" className="my-5">
            <ProfileCard currentUser={selectedProfile} token={token} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="flex-grow-1">
          <MDBCol>
            {selectedProfile.role !== 'seller' ? (
              <ProductList token={token} currentUser={selectedProfile} />
            ) : (
              <SellerDashboard token={token} id={selectedProfile._id} />
            )}
          </MDBCol>
        </MDBRow>
      </>
    )}
  </MDBContainer>
);

}

export default App;
