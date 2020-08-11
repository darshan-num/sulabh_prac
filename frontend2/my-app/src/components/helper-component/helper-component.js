import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import "./helper-component.css";
import axios from "axios";
import { TabPane, Row, Col, Button } from "reactstrap";
import { Table } from "reactstrap";

function HelperComponent() {
  const [items, setItems] = useState([]);
  const [showNegotiations, setShow] = useState(false); //don't show negotiation's initially

  var newPriceReacher = 0;

  useEffect(() => {
    axios
      .get("http://localhost:7000/match")
      .then((res) => {
        console.log("response.data.data", res);
        console.log(res.data.length);
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          if (
            res.data[i].status !== "matching" &&
            res.data[i].status !== "helperNegotiate" &&
            res.data[i].status !== "reacherNegotiate"
          ) {
            delete res.data[i];
          }
        }
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const buttonClick = (item) => {
    //job accepted
    //console.log(item)
    localStorage.setItem("helperJobId", item); //set helper's job id

    axios
      .patch("http://localhost:7000/items/" + item + "/", {
        status: "started",
        helper_id: localStorage.getItem("id"), //assign helper_id
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.href = "/helperProgress/";
  };
  //========================================================================
  const helperNegotiate = (item, newPrice) => {
    console.log(item, newPrice);
    console.log("helper negotiate", item, newPrice);
    axios
      .patch("http://127.0.0.1:8000/api/jobs/" + item + "/", {
        status: "helperNegotiate",
        helper_id: localStorage.getItem("id"), //assign helper_id
        bargain_price: parseInt(newPrice),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const promptNegotiate = (item) => {
    var newPrice = prompt("Enter price");
    helperNegotiate(item, newPrice); //pass the new price to patch
    //getUpdates(); //keep checking for reacher updates
  };
  //========================================================================
  // prettier-ignore
  const [price, setPrice] = useState([]);

  const fetchReachers = () => {
    axios.get("http://127.0.0.1:8000/api/jobs/").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        // prettier-ignore
        if(response.data[i].helper_id == localStorage.getItem("id") && response.data[i].status == "started"){ //reacher accepted job
          console.log("start");
          localStorage.setItem("helperJobId", response.data[i].id); //set helper's job id 
          window.location.href = "/helperProgress/";
        }
        else if (response.data[i].helper_id !== localStorage.getItem("id") && response.data[i].status !== "reacherNegotiate") {
            delete response.data[i];
        }
        else{
          console.log("nothing");
        }
      }
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i] !== undefined) {
          setShow(true);
          setPrice(response.data);
        }
      }
    });
  };

  const Reject = (item) => {
    axios
      .patch("http://localhost:7000/items/" + item + "/", {
        //patch location
        status: "matching",
        helper_id: 0,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.href = "/loggedin/helper/";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchReachers();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-div-helper">
      <Container>
        <TabPane tabId="2">
          <Row>
            <Col sm="1"></Col>
            <Col sm="10">
              <h4>Reachers you can help now!</h4>
              <Table className="helper-table">
                <thead>
                  <tr>
                    <th>Location of Reachers</th>
                    <th>Job Description</th>
                    <th>Service Amount</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-1">
                      {items.map((item) => (
                        <li key={item.id}>{item.location}</li>
                      ))}
                    </td>
                    <td className="td-2">
                      {items.map((item) => (
                        <li key={item.id}>{item.itemdesc}</li>
                      ))}
                    </td>
                    <td className="td-3">
                      {items.map((item) => (
                        <li key={item.id}>{item.price}</li>
                      ))}
                    </td>
                    <td className="td-4">
                      {items.map((item) => (
                        <li key={item.id}>
                          <Button
                            id={item.id}
                            type="button"
                            color="success"
                            onClick={() => buttonClick(item.id)}
                          >
                            Help out!
                          </Button>
                        </li>
                      ))}
                    </td>
                    <td className="td-5">
                      {items.map((item) => (
                        <li key={item.id}>
                          <Button
                            id={item.id}
                            onClick={() => promptNegotiate(item.id)}
                            color="danger"
                          >
                            Negotiate?
                          </Button>
                        </li>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col sm="1"></Col>
          </Row>
        </TabPane>
      </Container>
      <br />
      <br />

      {showNegotiations ? (
        <Container>
          <TabPane tabId="2">
            <Row>
              <Col sm="1"></Col>
              <Col sm="10">
                <h4>Your Negotiations</h4>
                <Table className="helper-table">
                  <thead>
                    <tr>
                      <th>Job Description</th>
                      <th>Initial Price</th>
                      <th>Negotiated Price</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-2">
                        {price.map((item) => (
                          <li key={item.id}>{item.itemdesc}</li>
                        ))}
                      </td>
                      <td className="td-3">
                        {price.map((item) => (
                          <li key={item.id}>{item.price}</li>
                        ))}
                      </td>
                      <td className="td-3">
                        {price.map((item) => (
                          <li key={item.id}>{item.bargain_price}</li>
                        ))}
                      </td>
                      <td className="td-4">
                        {price.map((item) => (
                          <li key={item.id}>
                            <Button
                              id={item.id}
                              onClick={() => buttonClick(item.id)}
                              color="success"
                            >
                              Help them out!
                            </Button>
                          </li>
                        ))}
                      </td>
                      <td className="td-5">
                        {price.map((item) => (
                          <li key={item.id}>
                            <Button
                              id={item.id}
                              color="danger"
                              onClick={() => Reject(item.id)}
                            >
                              Reject
                            </Button>
                          </li>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col sm="1"></Col>
            </Row>
          </TabPane>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
}
export default HelperComponent;
