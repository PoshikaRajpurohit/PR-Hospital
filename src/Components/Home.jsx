import { useState } from "react";
import { Container, Table, Button, Pagination } from "react-bootstrap";
import { FaEye, FaPenSquare, FaTrash, FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt} from "react-icons/fa";
import { useNavigate } from "react-router";
import { getStorage, setStorage } from "../Services/storagedata";


const Home = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(getStorage());
  const [search, Setsearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, Setsearching] = useState("false");
  const recordsPerPage = 3;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginated = patients.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(patients.length / recordsPerPage);
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleView = (id) => {
    navigate(`/view/${id}`);
  };
  const handleDelete = (id) => {
    let patients = getStorage();
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setStorage(updatedPatients);
    setPatients(updatedPatients);
  };
  const handleChange = (e) => {
    Setsearch(e.target.value);
  };
  const handleSearch = () => {
    let data = [...patients];
    let updatedData = data.filter((patients) => {
      return (
        patients.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        patients.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        patients.gender.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    });
    setPatients(updatedData);
    Setsearching('true')
    Setsearch("");
  };
  const handleClear = () => {
    let data = getStorage();
    setPatients(data);
  };

  const handleAsc = () => {
    let data = [...patients];
    let updatedData = data.sort((a, b) => a.firstName.localeCompare(b.firstName));
    setPatients(updatedData);
  };

  const handleDesc = () => {
    let data = [...patients];
    let updatedData = data.sort((a, b) => b.firstName.localeCompare(a.firstName));
    setPatients(updatedData);
  };

const handleSorting = (type, field) => {
  let data = [...patients];
  let updatedData;

  if (field === "fullName") {
    updatedData = data.sort((a, b) => {
      const A = `${a.firstName} ${a.lastName}`.toLowerCase();
      const B = `${b.firstName} ${b.lastName}`.toLowerCase();
      return type === "asc" ? A.localeCompare(B) : B.localeCompare(A);
    });
  } else if (field === "age") {
    updatedData = data.sort((a, b) => (type === "asc" ? a.age - b.age : b.age - a.age));
  } else {
    updatedData = data.sort((a, b) =>
      type === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field])
    );
  }

  setPatients(updatedData);
};
  return (
    <Container className="patient-records-container my-3">
      <h2 className="mb-4 text-center">Patient Records</h2>
      <div className="d-flex gap-2 mb-3 justify-content-between">
        <div className="d-flex justify-content-start gap-3">
          <input type="text" placeholder="Search" name="search" value={search} onChange={handleChange}/>
          <Button  className="px-2 fs-6 py-1 sort-btn " onClick={handleSearch}>
          <FaSearch />
        </Button>
        <Button  className="px-2 fs-6 py-1 sort-btn " onClick={handleClear}>
          Clear
        </Button>
        </div>
        <div className="d-flex justify-content-end gap-3">
          <Button className="px-2 fs-6 py-1 sort-btn " onClick={handleAsc}>
          <FaSortAlphaDown />
        </Button>
        <Button  className="px-2 fs-6 py-1 sort-btn" onClick={handleDesc}>
          <FaSortAlphaDownAlt />
        </Button>
        </div>
      </div>
    <div className="table-responsive">
        <Table striped bordered hover className="responsive-table">
        <thead>
          <tr>
            <th>#</th>
           <th>
            <div className="d-flex flex-column align-items-center" >
              <span>Full Name</span>
              <div className="d-flex justify-content-center  gap-2">
              <Button  className="sort-btn px-2 py-1" onClick={() => handleSorting("asc", "fullName")}>
                  <FaSortAlphaDown />
              </Button>
              <Button className="sort-btn px-2 py-1" onClick={() => handleSorting("desc", "fullName")}>
                  <FaSortAlphaDownAlt />
              </Button>
              </div>
            </div>
          </th>
        <th>
          <div className="d-flex flex-column align-items-center">
              <span>Age</span>
            <div className="d-flex justify-content-center gap-2">
            <Button  className="sort-btn px-2 py-1" onClick={() => handleSorting("asc", "age")}>
              <FaSortAlphaDown />
            </Button>
            <Button  className="sort-btn px-2 py-1" onClick={() => handleSorting("desc", "age")}>
              <FaSortAlphaDownAlt />
            </Button>
          </div>
        </div>
        </th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Emergency</th>
            <th>Reasons</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
              {paginated.length > 0 ? (
                paginated.map((patient, i) => (
                  <tr key={patient.id}>
                    <td>{indexOfFirstRecord + i + 1}</td>
                    <td>{patient.firstName}  {patient.lastName}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.address}</td>
                    <td>
                      <div><b>Name:</b> {patient.emergency}</div>
                      <div><b>Phone:</b> {patient.ephone}</div>
                    </td>
                    <td>{patient.reason}</td>
                    <td>
                      <div className="action-buttons d-flex justify-content-center">
                      <Button size="sm" variant="info" onClick={() => handleView(patient.id)}>
                      <FaEye />
                      </Button>
                      <Button size="sm" variant="warning" className="mx-2" onClick={() => handleEdit(patient.id)}>
                      <FaPenSquare />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(patient.id)}>
                      <FaTrash />
                      </Button>
                      </div>
                  </td>
                </tr>
                ))
              ) :searching ? (
                <tr>
                <td colSpan="11" className="text-center text-danger">No patients found matching your search.</td>
                </tr>
                ) : (
                      <tr>
                <td colSpan="11" className="text-center text-muted">No patient records available.</td>
                </tr>
                )}
            </tbody>
         </Table>
    </div>
          {totalPages > 1 && (
            <Pagination className="justify-content-center gap-2 ">
                {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default Home;
