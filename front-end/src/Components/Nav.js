import React from 'react';
import Helper1 from './helper1';
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
const Nav= ()=>{
    const navigate = useNavigate();
    return(
        <div>
            <h1 style={{"font-size":"50px","color":"#D9FB00"}}>Welcome to Electrical Dashboard</h1>
            <ul className='nav-ul' style={{"backgroundColor":"#D9FB00"}}>
                <li style={{"color":"black"}}><Link to="/UCDP">Unit Commitment</Link></li>
                <li><Link to="/YWG">Year-Wise Generation</Link></li>
                <li><Link to="/SWG">State-Wise Requirement</Link></li>

            </ul>
        </div>
    );
}
export default Nav;