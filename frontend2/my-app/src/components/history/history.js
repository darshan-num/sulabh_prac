import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "./history.css";
import axios from "axios";
import { TabPane, Row, Col, Button } from "reactstrap";
import { Table } from "reactstrap";
// import { Form, FormGroup, Label, Input } from "reactstrap";
// import { Link } from "react-router-dom";

// ID of user logged in:
// var id = localStorage.getItem("id");

// =============================================================
// var id = 1;
//
// function searchName(get_id) {
//   var out_var;
//
//   axios.get('http://localhost:3000/api/users')
//   .then(res =>{
//   // console.log(res.data);
//   for (var j = 0; j < res.data.length; j++) {
//     if (res.data[j].id === get_id) {
//       console.log("OUT")
//       console.log(res.data[j].username)
//       out_var = res.data[j].username;
//     }
//   }
//
//   console.log(out_var);
//   return out_var;
//
//   // setRitems(res.data) // reacher items
//   // console.log(res.data);
//
//    })
//   .catch(err => {
//     console.log(err)
//   })
//
//   // console.log(out_var);
//   // return out_var;
// }
//
// // Function to fetch name for ID:
// // var test = searchName(2);
// // console.log(test);
//
// function History() {
//
//   const [items,setItems] = useState([])
//   const [ritems,setRitems] = useState([])
//
// // For helper
//   useEffect(()=>{
//     //setItems({loading:true});
//     axios.get('http://localhost:3000/items')
//     .then(res =>{
//
//     for (var i = 0; i < res.data.length; i++) {
//       if (res.data[i].helper_id !== id) {
//         delete res.data[i];
//       }
//     }
//
//     setItems(res.data) // helper items
//
//      })
//     .catch(err => {
//       console.log(err)
//     })
//   },[])
//
// // For reacher
//   useEffect(()=>{
//     //setItems({loading:true});
//     axios.get('http://localhost:3000/items')
//     .then(res =>{
//
//       var test = searchName(2);
//       console.log(test);
//
//     for (var j = 0; j < res.data.length; j++) {
//
//       if (res.data[j].reacher_id !== id) {
//         delete res.data[j];
//       }
//     }
//
//     setRitems(res.data) // reacher items
//
//      })
//     .catch(err => {
//       console.log(err)
//     })
//   },[])
//
//   return (
//     <div className="main-div-helper">
//       <Container>
//       <TabPane tabId="2">
//
//       <Row>
//       <Col sm="3"></Col>
//       <Col sm="6">
//           <h4>
//           Your history:
//           </h4>
//           <Table>
//               <thead>
//                   <tr>
//                   <th>Role</th>
//                   <th>Peer ID</th>
//                   <th>Peer Username</th>
//                   <th>Job Description</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   <tr>
//                     <td className="td-1">
//                       Helper
//                       </td>
//                       <td className="td-3">
//                       {items.map(item =>(
//                           <li key = {item.id}>{item.reacher_id}</li>
//                       ))}
//                       </td>
//                       <td>
//                       {items.map(item =>(
//                           <li key = {item.id}>{searchName(item.reacher_id)}</li>
//                       ))}
//                       </td>
//                       <td className="td-2">
//                       {items.map( item =>(
//                          <li  key = {item.id}>{item.itemdesc}</li>))}
//                       </td>
//
//                   </tr>
//                   <tr>
//                     <td className="td-1">
//                     Reacher
//                     </td>
//                     <td className="td-3">
//                     {ritems.map(ritem =>(
//                         <li key = {ritem.id}>{ritem.helper_id}</li>
//                     ))}
//
//                     </td>
//                     <td>
//                     {ritems.map(ritem =>(
//                         <li key = {ritem.id}>{searchName(ritem.helper_id)}</li>
//                     ))}
//                     </td>
//
//                     <td className="td-2">
//                     {ritems.map( ritem =>(
//                        <li  key = {ritem.id}>{ritem.itemdesc}</li>))}
//
//                     </td>
//                   </tr>
//
//               </tbody>
//           </Table>
//       </Col>
//       <Col sm="3"></Col>
//       </Row>
//   </TabPane>
//       </Container>
//     </div>
//   );
// }
//
// export default History;

// =============================================================
console.log("id", localStorage.getItem("id"));
var id = parseInt(localStorage.getItem("id"));
// var local_data;

// function searchName(get_id) {

// console.log(out_var);
// return out_var;
// }

// console.log(local_data.data)

// Function to fetch name for ID:
// var test = searchName(2);
// console.log(test);

function History() {
  // var local_data;

  function searchName(get_id) {
    for (var j = 0; j < local_data.length; j++) {
      if (local_data[j].id === get_id) {
        console.log("OUT");
        console.log(local_data[j].username);
        return local_data[j].username;
      }
    }
  }

  const [items, setItems] = useState([]);
  const [ritems, setRitems] = useState([]);
  const [users, setUsers] = useState([]);
  const [local_data, setLocal_data] = useState([]);

  // For user info
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/users")
      .then((res) => {
        // console.log(res.data);
        // for (var j = 0; j < res.data.length; j++) {
        //   if (res.data[j].id === get_id) {
        //     console.log("OUT")
        //     console.log(res.data[j].username)
        //     out_var = res.data[j].username;
        //   }
        // }
        console.log(res);
        // local_data = res;
        setLocal_data(res.data);
        // setRitems(res.data) // reacher items
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setUsers(local_data);
  }, []);

  // For helper
  useEffect(() => {
    //setItems({loading:true});
    axios
      .get("http://localhost:7000/items")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].helper_id !== id) {
            delete res.data[i];
          }
        }

        setItems(res.data); // helper items
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // For reacher
  useEffect(() => {
    //setItems({loading:true});
    axios
      .get("http://localhost:7000/items")
      .then((res) => {
        // var test = searchName(2);
        // console.log(test);

        for (var j = 0; j < res.data.length; j++) {
          if (res.data[j].reacher_id !== id) {
            delete res.data[j];
          }
        }

        setRitems(res.data); // reacher items
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main-div-helper">
      <Container>
        <TabPane tabId="2">
          <Row>
            <Col sm="2"></Col>
            <Col sm="8">
              <h4>Your previous tasks</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Peer ID</th>
                    <th>Peer Username</th>
                    <th>Job Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-1">Helper</td>
                    <td className="td-3">
                      {items.map((item) => (
                        <li key={item.id}>{item.reacher_id}</li>
                      ))}
                    </td>
                    <td className="td-4">
                      {items.map((item) => (
                        <li key={item.id}>{searchName(item.reacher_id)}</li>
                      ))}
                    </td>
                    <td className="td-2">
                      {items.map((item) => (
                        <li key={item.id}>{item.itemdesc}</li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className="td-1">Reacher</td>
                    <td className="td-3">
                      {ritems.map((ritem) => (
                        <li key={ritem.id}>{ritem.helper_id}</li>
                      ))}
                    </td>
                    <td className="td-4">
                      {ritems.map((ritem) => (
                        <li key={ritem.id}>{searchName(ritem.helper_id)}</li>
                      ))}
                    </td>

                    <td className="td-2">
                      {ritems.map((ritem) => (
                        <li key={ritem.id}>{ritem.itemdesc}</li>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col sm="2"></Col>
          </Row>
        </TabPane>
      </Container>
    </div>
  );
}

export default History;
