import React from 'react';
import '../styles/layout.scss';
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar';
import HeaderImage from '../assets/header.jpg';

const Layout = ({ children, location }) => (
  <div>
    <div className="header">
      <Navbar location={location} />
      <div className="header-image">
        <img src={HeaderImage} alt="Event" />
      </div>
    </div>
    <div className="page-container">{children}</div>
    <footer className="footer">
      <Typography component="p">© The Big Event 2019</Typography>
    </footer>
  </div>
);

export default Layout;
