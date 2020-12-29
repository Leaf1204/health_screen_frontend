import React from "react";
import { Link } from "react-router-dom";
import { GlobalCtx } from "../App";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBIcon, MDBCol, MDBContainer, MDBRow, MDBFooter   } from "mdbreact";

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
        <MDBIcon icon="sign-out-alt" />Logout
      </p>
    </Link>
  );

  return (
    <>
    <MDBNavbar color= '#c5cae9 indigo lighten-4' expand="md">
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
  </MDBNavbar>
    
    </>
  );
};

export default Header;