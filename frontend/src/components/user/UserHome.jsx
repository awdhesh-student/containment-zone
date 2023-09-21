import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import axiosInstance from '../common/AxiosInstances';
import { UserContext } from '../../App';

const UserHome = () => {
  const user = useContext(UserContext)
  const [allPlaces, setAllPlaces] = useState([])
  const [filterLocality, setFilterLocality] = useState('');
  const [filterSname, setFilterSname] = useState('');
  const [filterContainmentZone, setFilterContainmentZone] = useState('');
  const [show, setShow] = useState(false);

  const [modalInputValues, setModalInputValues] = useState({
    qpeople: '',
    ipeople: '',
    vpeople: '',
    containmentZone: '',
  });
  const [showModal, setShowModal] = useState([]);

  const updateModalInputValues = (place) => {
    setModalInputValues({
      qpeople: place.qpeople,
      ipeople: place.ipeople,
      vpeople: place.vpeople,
      containmentZone: place.containmentZone,
    });
  };

  const handleClose = () => {
    // Close all modals by setting all showModal states to false
    setShowModal(Array(allPlaces.length).fill(false));
  };

  const handleShow = (index) => {
    // Open the modal for the corresponding place by setting its state to true
    setShowModal((prevState) =>
      prevState.map((state, i) => (i === index ? true : state))
    );
  };

  const getPlaces = async () => {
    try {
      const res = await axiosInstance.get('/api/user/allplaces')
      if (res.data.success) {
        setAllPlaces(res.data.data)
        setShowModal(Array(res.data.data.length).fill(false));
      }
      else {
        alert(res.data.error)
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getPlaces()
  }, [])

  const handleUpdate = async (placeId) => {
    try {
      const res = await axiosInstance.patch(`/api/admin/updateplace/${placeId}`, modalInputValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if (res.data.success) {
        alert(res.data.message)
        getPlaces()
      }
      else {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (placeId) => {
    const assure = confirm("Are you sure!!")
    if (assure) {
      try {
        const res = await axiosInstance.delete(`/api/admin/deleteplace/${placeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.success) {
          alert(res.data.message)
          getPlaces()
        }
        else {
          alert(res.data.message)
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  }

  // Filtered places based on the filter criteria
  const filteredPlaces = allPlaces.filter(
    (place) =>
      filterLocality === '' ||
      place.locality?.toLowerCase().includes(filterLocality.toLowerCase())
  )
    .filter(
      (place) =>
        filterSname === '' ||
        place.Sname?.toLowerCase().includes(filterSname.toLowerCase())
    )
    .filter((place) =>
      filterContainmentZone === '' || place.containmentZone.toLowerCase() === filterContainmentZone.toLowerCase()
    );

  return (
    <>
      <h3 style={{ fontSize: '40px' }} className='text-center'><strong>All Places to Watch Out!!</strong></h3>
      {user.userData.type === 'user' ?
        <div className=" mt-4 filter-container text-center">
          <p className="mt-3">Filter By: </p>
          <input
            type="text"
            placeholder="Locality"
            value={filterLocality}
            onChange={(e) => setFilterLocality(e.target.value)}
          />
          <input
            type="text"
            placeholder="Street Name"
            value={filterSname}
            onChange={(e) => setFilterSname(e.target.value)}
          />
          <select value={filterContainmentZone} onChange={(e) => setFilterContainmentZone(e.target.value)}>
            <option value="">All Zone</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>


        : <></>}

      <div className='card-container my-5'>
        {filteredPlaces.length === 0 ? (
          <p>No places found</p>
        ) : (
          filteredPlaces.map((place, i) => {
            return <Card className={place.containmentZone === 'Yes' ? 'styleContainementZone' : 'styleFreeZone'}
              key={i}>
              <Card.Body>
                <Card.Title><strong>Locality: {place.locality}</strong></Card.Title>
                <Card.Subtitle className="mb-2 mt-3 text-muted"><b>Street Name:</b> {place.Sname}</Card.Subtitle>
                <Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ color: '#876d6d' }}>Quarantined People: {place.qpeople}</ListGroup.Item>
                    <ListGroup.Item style={{ color: 'red' }}>Infected People: {place.ipeople}</ListGroup.Item>
                    <ListGroup.Item style={{ color: 'green' }}>Vaccinated People: {place.vpeople}</ListGroup.Item>
                    <ListGroup.Item>Containment Zone : {place.containmentZone}</ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                {user.userData.type === 'user' ? <></> : <div className='d-flex justify-content-between'>
                  <Button onClick={() => { handleShow(i); updateModalInputValues(place); }} size='sm' variant='outline-success'>Update</Button>
                  <Modal show={showModal[i]} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{place.locality}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={() => handleUpdate(place._id)}>
                        <Form.Group className="mb-3" controlId="quarantinedPeople">
                          <Form.Label>Quarantined People</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Quarantined People"
                            autoFocus
                            value={modalInputValues.qpeople}
                            onChange={(e) => setModalInputValues({ ...modalInputValues, qpeople: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="infectedPeople">
                          <Form.Label>Infected People</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Infected People"
                            value={modalInputValues.ipeople}
                            onChange={(e) => setModalInputValues({ ...modalInputValues, ipeople: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="vaccinatedPeople">
                          <Form.Label>Vaccinated People</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Vaccinated People"
                            value={modalInputValues.vpeople}
                            onChange={(e) => setModalInputValues({ ...modalInputValues, vpeople: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="containmentZone">
                          <Form.Label>Containment Zone</Form.Label>
                          <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                              inline
                              label="Yes"
                              type='radio'
                              name='containmentZone'
                              value='Yes'
                              checked={modalInputValues.containmentZone === 'Yes'}
                              onChange={() => setModalInputValues({ ...modalInputValues, containmentZone: 'Yes' })}
                            />
                            <Form.Check
                              inline
                              label="No"
                              type='radio'
                              name='containmentZone'
                              value='No'
                              checked={modalInputValues.containmentZone === 'No'}
                              onChange={() => setModalInputValues({ ...modalInputValues, containmentZone: 'No' })}
                            />
                          </div>
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button className='mx-2' variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Button onClick={() => handleDelete(place._id)} size='sm' variant='outline-danger'>Delete</Button>

                </div>}

              </Card.Body>
            </Card>

          })
        )}


      </div>
    </>
  )
}

export default UserHome
