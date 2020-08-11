import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
const SideNav = (props) => {


  return (
   
        <div>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/loggedin">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="http://localhost:3001/loggedin/user_info">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Nav>

        </div>
        );
}

export default SideNav;






// import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
// import { Link } from 'react-router-dom';
// import React from 'react'

// const SideNav = (props) => {
//   return (
// <ProSidebar>
//   <Menu iconShape="square">
//     <MenuItem >Dashboard</MenuItem>
//     <SubMenu title="Components" >
//       <MenuItem>Component 1</MenuItem>
//       <MenuItem>Component 2</MenuItem>
//       <MenuItem>Component 2</MenuItem>
//       <MenuItem>Component 2</MenuItem>
//       <MenuItem>Component 2</MenuItem>
//     </SubMenu>
//   </Menu>
// </ProSidebar>
//   );
// }

// export default SideNav;