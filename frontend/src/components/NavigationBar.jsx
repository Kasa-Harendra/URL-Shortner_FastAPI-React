import { Navbar, Nav } from 'react-bootstrap'; 

function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" style={{padding:"10px"}}>
        <Navbar.Brand href="/" style={{paddingLeft: "16px", borderBottom: 'white'}}>URL Shortner</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link href="/">Navigate</Nav.Link> */}
        </Nav>
      </Navbar>
    </>
  );
}

export default NavigationBar;