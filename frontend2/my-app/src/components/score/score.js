import React, { useEffect, Component } from "react";
import { useState } from "react";
import "./score.css";
import { Button, ButtonGroup } from "reactstrap";
import axios from "axios";
// User logged in ID:

var id = parseInt(localStorage.getItem("id"));
// Variables to store calculated values:
var helper_score = 0;
var reacher_score = 0;
function Score() {
  const [local, setLocal] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/items")
      .then((res) => {
        console.log(res);
        setLocal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function helpers(get_id) {
    var total = 0;
    var promoters = 0;
    var detractors = 0;
    for (var j = 0; j < local.length; j++) {
      if (local[j].helper_id === get_id) {
        console.log(local[1].helper_id);
        total++;
        if (local[j].helper_score > 8 && local[j].helper_score < 11) {
          promoters++;
        } else if (local[j].helper_score > -1 && local[j].helper_score < 7) {
          detractors++;
        }
      }
    }
    console.log(total);
    console.log(promoters);
    console.log(detractors);
    var nps = promoters / total - detractors / total;
    console.log(nps * 100);
    return nps * 100;
  }
  function reachers(get_id) {
    var total = 0;
    var promoters = 0;
    var detractors = 0;
    for (var j = 0; j < local.length; j++) {
      if (local[j].reacher_id === get_id) {
        total++;
        if (local[j].reacher_score > 8 && local[j].reacher_score < 11) {
          promoters++;
        } else if (local[j].reacher_score > -1 && local[j].reacher_score < 7) {
          detractors++;
        }
      }
    }
    console.log(total);
    console.log(promoters);
    console.log(detractors);
    var nps = promoters / total - detractors / total;
    console.log(nps * 100);
    return nps * 100;
  }
  helper_score = helpers(id);
  reacher_score = reachers(id);
  return (
    <div>
      Helper NPS score: {Math.round(helper_score)}
      <br />
      Reacher NPS score: {Math.round(reacher_score)}
    </div>
  );
}
export default Score;
