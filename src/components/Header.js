import React from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";

const Header = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);

  const logout = (
    <Link>
      <p
        onClick={() => {
          window.localStorage.removeItem("token");
          setGState({ ...gState, token: null });
        }}
      >
        Logout
      </p>
    </Link>
  );

  return (
    <>
    <MDBNavbar color= '#9fa8da indigo lighten-3' expand="md">
    <MDBNavbarBrand>
      <img src="https://i.imgur.com/C4UfKyh.png"></img>
      <strong className="black-text">CHS</strong>
    </MDBNavbarBrand>
      <MDBNavbarNav left>
        <MDBNavItem active>
          <MDBNavLink to="/">Home</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/signup">Signup</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/login">Login</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
        <MDBNavbarNav right>
        <MDBNavItem>
          {gState.token ? logout : null}
          </MDBNavItem>
          </MDBNavbarNav>
      {/* <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink className="waves-effect waves-light" to="#!">
            <MDBIcon fab icon="twitter" />
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink className="waves-effect waves-light" to="#!">
            <MDBIcon fab icon="google-plus-g" />
          </MDBNavLink>

        </MDBNavItem>
      </MDBNavbarNav> */}
  </MDBNavbar>

   
    
    </>
  );
};

export default Header;