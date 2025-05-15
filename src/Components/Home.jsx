import { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { getStorage, setStorage } from "../Services/storagedata";
const Home = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(getStorage());
const handleEdit = (id) => {
  navigate(`/edit/${id}`);
};
  const handleDelete = (id) => {
  let patients = getStorage();
  const updatedPatients = patients.filter(patient => patient.id !== id);
  setStorage(updatedPatients);
  setPatients(updatedPatients);
};
  return (
    <Container className="patient-records-container my-3">
  <h2 className="mb-4 text-center">Patient Records</h2>
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Address</th>
        <th>Emergency</th>
        <th>Reasons</th>
        <th>Actions</th>
      </tr>
    </thead>
 <tbody>
  {patients.length > 0 ? (
    patients.map((patient, index) => (
      <tr key={patient.id}>
        <td>{index + 1}</td>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.contact}</td>
        <td>{patient.email}</td>
        <td>{patient.address}</td>
        <td>
          <div><strong>Name:</strong> {patient.emergency}</div>
          <div><strong>Phone:</strong> {patient.ephone}</div>
        </td>
        <td>{patient.reason}</td>
        <td className="actions">
          <Button variant="warning" className="me-3" size="sm" onClick={() => handleEdit(patient.id)}>
            <FaPenToSquare />
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(patient.id)}>
            <FaTrash />
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="13" className="text-center">No patients found.</td>
    </tr>
  )}
    </tbody>
    </Table>
  </Container>
  );
};

export default Home;
