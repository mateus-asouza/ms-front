
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    
} from "reactstrap";


const Menu = () => {
    return (
        <div >
            <Navbar 
                color="dark"
                dark
                expand
                container
                

            >
                <NavbarBrand href="/">
                    Home
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/cadastroUsuario">
                                cadastro Usuário
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>


    )
}

export default Menu;