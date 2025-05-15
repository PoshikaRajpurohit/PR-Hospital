import { Button, Container, Navbar } from "react-bootstrap"
import { useNavigate } from "react-router"
import logo from "../assets/LOGO.PNG"
const Header=()=>{
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/add")
    }
    return(
        <>
       
            <Navbar className="hospital-navbar" expand="lg">
          <Container>
    <Navbar.Brand href="/">
      <img src={logo} className="hospital-logo" alt="Logo" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse className="justify-content-end">
      <Button onClick={handleClick} variant="success">Add Patient</Button>
    </Navbar.Collapse>
  </Container>
</Navbar>

 
        </>
    )
}
export default Header