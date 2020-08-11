import React from "react";
import "../slide-show/slide-show.css";
import {} from "reactstrap";

function SlideShow() {
  return (
    <div className="slider">
      <div className="slides">
        <div id="slide-1">
          <h1 className="title1">Help out someone and get Paid</h1>
          <br />

          <span className="title2">
            Signup to be a Helper and join the large network of helpers
          </span>
        </div>

        <div id="slide-2">
          <h1 className="title1">Need Help ? Reach out for a Helper Now </h1>
          <br />

          <span className="title2">
            Signup to reach out to our Helpers and get your job done
          </span>
        </div>
      </div>
    </div>
  );
}

export default SlideShow;
