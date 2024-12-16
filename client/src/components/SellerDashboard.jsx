import React, { useState, useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBModalDialog,
  MDBModalContent
} from 'mdb-react-ui-kit';
import { fetchOrders, updateOrder } from '../api/index';

const SellerDashboard = ({ token, id }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
  const [sort, setSort] = useState('-updatedAt'); // Sorting field
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const data = await fetchOrders({ status: filter === 'all' ? undefined : filter, sort }, token);
        setOrders(data.data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data?.message || error.message);
      }
    };

    fetchSellerOrders();
  }, [filter, sort]);

  const toggleModal = (order) => {
    setSelectedOrder(order);
    setModal(!modal);
  };

  const handleUpdateOrder = async (orderId, status, comment = null) => {
    try {
      const data = await updateOrder(orderId, { status, comments: comment }, token);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status, comments: comment ? [...order.comments, { text: comment }] : order.comments }
            : order
        )
      );

      if (status === 'rejected') {
        toggleModal(null);
        setComment('');
      }
    } catch (error) {
      console.error('Error updating order:', error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="ms-2">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Sort:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="ms-2">
            <option value="-updatedAt">Newest</option>
            <option value="updatedAt">Oldest</option>
            <option value="offerAmount">Amount (Low to High)</option>
            <option value="-offerAmount">Amount (High to Low)</option>
          </select>
        </div>
      </div>

      <MDBRow className="mt-5">
        {orders.map((order) => (
          <MDBCol md="4" key={order._id}>
            <MDBCard>
              <MDBCardBody className="text-center">
                <MDBCardTitle>{order.item.name}</MDBCardTitle>
                <MDBCardText>Buyer: {order.buyerId.email}</MDBCardText>
                <MDBCardText>Offer Amount: {order.offerAmount}</MDBCardText>
                <MDBCardText>Status: {order.status}</MDBCardText>
                {order.comments.find((comment) => comment.commentor !== id) && (
                  <MDBCardText>Comment: {order.comments.find((comment) => comment.commentor !== id).text}</MDBCardText>
                )}
                <MDBCardText>
                  Last Updated: {new Date(order.updatedAt).toLocaleString()}
                </MDBCardText>
                <MDBBtn
                  color="success"
                  className="me-2"
                  onClick={() => handleUpdateOrder(order._id, 'accepted')}
                  disabled={order.status !== 'pending'}
                >
                  Accept
                </MDBBtn>
                <MDBBtn
                  color="danger"
                  onClick={() => toggleModal(order)}
                  disabled={order.status !== 'pending'}
                >
                  Reject
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

      <MDBModal open={modal} setShow={setModal} tabIndex="-1">
        <MDBModalDialog size="sm">
          <MDBModalContent>
            <MDBModalHeader>Add Comment</MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                type="textarea"
                label="Comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => toggleModal()}>
                Cancel
              </MDBBtn>
              <MDBBtn color="primary" onClick={() => handleUpdateOrder(selectedOrder._id, 'rejected', comment)}>
                Submit
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default SellerDashboard;
