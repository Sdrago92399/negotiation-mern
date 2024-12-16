import React, { useState } from 'react';
import { 
  MDBCard, 
  MDBCardBody, 
  MDBCardTitle, 
  MDBCardText, 
  MDBBtn, 
  MDBCardImage, 
  MDBRow, 
  MDBCol, 
  MDBModal, 
  MDBModalHeader, 
  MDBModalBody, 
  MDBModalFooter, 
  MDBInput,
  MDBModalDialog,
  MDBModalContent
} from 'mdb-react-ui-kit';
import { createOrder } from '../api/index';

const ProductCard = ({ product, token, currentUser }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');
  const [notes, setNotes] = useState('');

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleMakeOffer = async () => {
    try {
      const orderData = {
        productId: product._id,
        quantity: 1,
        offerAmount: parseFloat(offerAmount),
        notes,
      };

      await createOrder(orderData, token);
      alert('Offer submitted successfully!');
      setModalOpen(false);
      setOfferAmount('');
      setNotes('');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <MDBCard>
      <div
        className="header-cover"
        style={{
          backgroundImage: `url(${product.image})`,
          height: '130px',
          backgroundSize: 'cover',
        }}
      ></div>
      <MDBCardBody className="text-center">
        <MDBCardImage
          src={product.image}
          className="img-fluid rounded-circle"
          style={{
            width: '100px',
            marginTop: '-50px',
            border: '5px solid white',
          }}
          alt="Product avatar"
        />
        <MDBCardTitle className="mt-3">{product.name}</MDBCardTitle>
        <MDBCardText>Price: ₹{product.price}</MDBCardText>
        <div className="user-button">
          <MDBRow>
            <MDBCol>
              <MDBBtn
                size="sm"
                color="primary"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? 'Hide Description' : 'Show Description'}
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn size="lg" color="light" onClick={toggleModal}>
                Make an Offer
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </div>
        {showDescription && (
          <MDBCardText className="mt-3">{product.description}</MDBCardText>
        )}
      </MDBCardBody>

      <MDBModal open={modalOpen} setShow={setModalOpen} tabIndex="-1">
        <MDBModalDialog size='sm'>
          <MDBModalContent>
            <MDBModalHeader>Make an Offer</MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Offer Amount (₹)"
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
              />
              <MDBInput
                className="mt-3"
                label="Additional Notes"
                type="textarea"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Cancel
              </MDBBtn>
              <MDBBtn color="primary" onClick={handleMakeOffer}>
                Submit Offer
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBCard>
  );
};

export default ProductCard;
