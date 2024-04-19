import React from 'react';
import { Link } from 'react-router-dom';
const Nav= ()=>{
    return(
        <div>
            <h1 style={{"font-size":"50px","color":"#D9FB00"}}>Welcome to Electrical Dashboard</h1>
            <ul className='nav-ul' style={{"backgroundColor":"#D9FB00"}}>
                <li><Link to="/"><span style={{"color":"black","fontWeight":"bolder","fontSize":"20px"}}>Unit Commitment</span></Link></li>
                <li><Link to="/YWG"><span style= {{"color":"black","fontWeight":"bolder","fontSize":"20px"}}>Year-Wise Generation</span></Link></li>
                <li><Link to="/SWG"><span style= {{"color":"black","fontWeight":"bolder","fontSize":"20px"}}>State-Wise Requirement</span></Link></li>

            </ul>
        </div>
    );
}
export default Nav;