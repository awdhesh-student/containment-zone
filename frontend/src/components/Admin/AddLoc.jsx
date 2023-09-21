import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap';
import axiosInstance from '../common/AxiosInstances';

const AddLoc = () => {
   const [locationDetails, setLocationDetails] = useState({
      Sname: '',
      locality: '',
      qpeople: '',
      ipeople: '',
      vpeople: '',
      containmentZone: ''
   })

   const handleChange = (e) => {
      if (e.target.type === 'radio' && e.target.name === 'containmentZone') {
         setLocationDetails({ ...locationDetails, containmentZone: e.target.value });
      } else {
         setLocationDetails({ ...locationDetails, [e.target.name]: e.target.value });
      }
   }

   const handleSubmit = async () => {
      try {
         const response = await axiosInstance.post('/api/admin/postloc', locationDetails, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (response.data.success) {
            alert(response.data.message);
         } else {
            alert(response.data.message);
         }
      } catch (error) {
         console.error('Error adding blog:', error);
      }
   };

   return (
      <Container className='w-50 my-5'>
         <h3 style={{ fontSize: '40px' }} className='text-center'><strong>Add Places!!</strong></h3>

         <Form style={{ background: '#dddde8db' }} onSubmit={handleSubmit} className='p-3 border rounded'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Street Name</Form.Label>
               <Form.Control name='Sname' value={locationDetails.Sname} onChange={handleChange} type="text" placeholder="Enter street" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
               <Form.Label>locality</Form.Label>
               <Form.Control placeholder='enter locality' name='locality' value={locationDetails.locality} onChange={handleChange} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Quarantine People</Form.Label>
               <Form.Control name='qpeople' value={locationDetails.qpeople} onChange={handleChange} type="number" placeholder="Enter Quarantine People" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Infected People</Form.Label>
               <Form.Control name='ipeople' value={locationDetails.ipeople} onChange={handleChange} type="number" placeholder="Enter Infected people" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Vaccinated People</Form.Label>
               <Form.Control name='vpeople' value={locationDetails.vpeople} onChange={handleChange} type="number" placeholder="Enter vacc. people" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
               <Form.Label>Containment Zone</Form.Label>
               {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                     <Form.Check
                        inline
                        label="yes"
                        name="containmentZone"
                        value='Yes'
                        type={type}
                        checked={locationDetails.containmentZone === 'yes'}
                        onChange={handleChange}
                        id={`inline-${type}-1`}
                     />
                     <Form.Check
                        inline
                        label="no"
                        name="containmentZone"
                        value='No'
                        type={type}
                        checked={locationDetails.containmentZone === 'no'}
                        onChange={handleChange}
                        id={`inline-${type}-2`}
                     />
                  </div>
               ))}

            </Form.Group>
            <div className="text-center">
               <Button type='submit' variant='outline-secondary'>Add</Button>
            </div>
         </Form>
      </Container>
   )
}

export default AddLoc

