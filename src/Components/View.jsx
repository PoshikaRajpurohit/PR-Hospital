
import { useParams, useNavigate } from "react-router";
import { Button, Card, Container } from "react-bootstrap";
import { getStorage } from "../Services/storagedata";
import { FaHome } from "react-icons/fa";


const ViewPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patients = getStorage();
  const patient = patients.find((p) => p.id === id);
    const handleClick=()=>{
        navigate('/')
    }
  return (
    <Container className="my-5 view-patient-container">
      <Card className="view-patient-card">
        <Card.Header>Patient Details</Card.Header>
        <Card.Body>
          <p><strong>First Name:</strong> {patient.firstName}</p>
          <p><strong>Last Name:</strong> {patient.lastName}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Emergency Contact Name:</strong> {patient.emergency}</p>
          <p><strong>Emergency Phone:</strong> {patient.ephone}</p>
          <p><strong>Reason for Visit:</strong> {patient.reason}</p>
        </Card.Body>
        <Card.Footer className="text-end">
          <Button variant="secondary" onClick={handleClick}>
            <FaHome />
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ViewPatient;

