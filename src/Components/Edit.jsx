import { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, setStorage } from '../Services/storagedata';
const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialPatient = {
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    address: '',
    emergency: '',
    ephone: '',
    reason: '',
    check: false,
  };
  const [patient, setPatient] = useState(initialPatient);
  const [errors, setErrors] = useState({});
   const validate = () => {
  let errors = {};
  if (patient.firstName === "") {
    errors.fname = "First Name is required";
  }
  if (patient.lastName === "") {
    errors.lname = "Last Name is required";
  }
  if (patient.age  === "") {
    errors.age = "Enter your age";
  }
  if (patient.gender  === "") {
    errors.gen = "Select your gender";
  }
  if (patient.contact === "") {
    errors.phone = "Contact number required";
  }else if (!/^\d{10}$/.test(patient.contact)) {
            errors.phone = "Phone number must be exactly 10 digits";
        }
  if (patient.email  === "") {
    errors.email = "Email is required";
  }
  if (patient.address === "") {
    errors.address = "Please fill your address";
  }
  if (patient.emergency  === "") {
    errors.emergency = "Please enter emergency contact name";
  }
  if (patient.ephone  === "") {
    errors.ephone = "Please enter emergency contact number";
  }else if (!/^\d{10}$/.test(patient.ephone)) {
            errors.phone = "Phone number must be exactly 10 digits";
        }
  if (patient.reason  === "") {
    errors.reason = "Mention your reason for visit";
  }
if (patient.check === false) {
  errors.check = "Please confirm the information is accurate.";
}
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
     if (!validate()) return;
    const data = getStorage() || [];
    const updatedData = data.map((patients) => (patients.id === patient.id ? patient : p));
    setStorage(updatedData);
    navigate('/');
  };

  useEffect(() => {
    const data = getStorage() || [];
    const existingPatient = data.find((p) => p.id === id);
    if (existingPatient) {
      setPatient(existingPatient);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Edit Patient</h2>
      <Form className="mx-auto bg-light p-4 shadow rounded" style={{ maxWidth: "800px" }} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Name</Form.Label>
          <Col sm={4}>
            <Form.Control type="text" placeholder="First Name" name="firstName" value={patient.firstName} onChange={handleChange}/>
            <div className="comment-error text-danger">{errors.fname}</div>
          </Col>
          <Col sm={4}>
            <Form.Control type="text" placeholder="Last Name" name="lastName" value={patient.lastName} onChange={handleChange}/>
            <div className="comment-error text-danger">{errors.lname}</div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Age</Form.Label>
          <Col sm={4}>
            <Form.Control type="number" name="age" value={patient.age} onChange={handleChange} />
            <div className="comment-error text-danger">{errors.age}</div>
          </Col>
          <Form.Label column sm={1}>Gender</Form.Label>
          <Col sm={4}>
            <Form.Select name="gender" value={patient.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
             <div className="comment-error text-danger">{errors.gen}</div>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Contact No.</Form.Label>
          <Col sm={4}>
            <Form.Control type="number" name="contact" value={patient.contact} onChange={handleChange}/>
             <div className="comment-error text-danger">{errors.phone}</div>
          </Col>
          <Form.Label column sm={1}>Email</Form.Label>
          <Col sm={4}>
            <Form.Control type="email" name="email" value={patient.email} onChange={handleChange}    />
             <div className="comment-error text-danger">{errors.email}</div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formAddress">
        <Form.Label column sm={2}>Address</Form.Label>
      <Col sm={10}>
        <Form.Control as="textarea" placeholder="Address" className="mb-2" name="address" value={patient.address} onChange={handleChange}/>
        <div className="comment-error text-danger">{errors.address}</div>
      </Col>
      </Form.Group>
     <Form.Group as={Row} className="mb-3" controlId="formEmergencyContact">
          <Form.Label column sm={2}>Emergency Contact</Form.Label>
          <Col sm={5}>
            <Form.Control type="text" placeholder="Name" name="emergency" value={patient.emergency} onChange={handleChange} />
             <div className="comment-error text-danger">{errors.emergency}</div>
          </Col>
          <Col sm={5}>
            <Form.Control type="number" placeholder="Phone Number" name="ephone" value={patient.ephone} onChange={handleChange} />
             <div className="comment-error text-danger">{errors.ephone}</div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formReason">
          <Form.Label column sm={2}>Reason for Visit</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={2} name="reason" value={patient.reason} onChange={handleChange} 
            placeholder="Describe your symptoms" />
             <div className="comment-error text-danger">{errors.reason}</div>
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formConsent">
          <Form.Check type="checkbox" name="check" checked={patient.check} onChange={handleCheckboxChange} 
          label="I confirm the above information is accurate."/>
          <div className="comment-error text-danger">{errors.check}</div>
        </Form.Group>
        <div className="text-center">
          <Button variant="success" type="submit">Edit Patient</Button>
        </div>
      </Form>
    </Container>
  );
};
export default EditPatient;
