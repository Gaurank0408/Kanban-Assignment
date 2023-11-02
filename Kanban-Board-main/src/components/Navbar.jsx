import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { BsSliders, BsChevronDown } from "react-icons/bs"; //BsSliders2
import { useDispatch, useSelector } from "react-redux";
import { dataSelect } from "../actions/action";

const getGroup = () => {
  if (localStorage.getItem("gr")) {
    return localStorage.getItem("gr");
  } else {
    return "status";
  }
};

const getOrder = () => {
  if (localStorage.getItem("order")) {
    return localStorage.getItem("order");
  } else {
    return "priority";
  }
};

const Navbar = () => {
  const [slider, setSlider] = useState(false);
  const dispatch = useDispatch();
  const { tickets, users } = useSelector((state) => state.datact);
  const [gr, setGroups] = useState(getGroup());
  const [order, setOrder] = useState(getOrder());

  const handleGroups = (e, va) => {
    if (va) {
      setGroups(e.target.value);
      setSlider(!setSlider);
      localStorage.setItem("gr", e.target.value);
    } else {
      setOrder(e.target.value);
      setSlider(!setSlider);
      localStorage.setItem("order", e.target.value);
    }
  };

  useEffect(() => {
    if (gr === "user") {
      dispatch(
        dataSelect(
          gr,
          {
            tickets,
            users,
          },
          order
        )
      );
    } else {
      dispatch(dataSelect(gr, tickets, order));
    }
  }, [tickets, dispatch, gr, users, order]);

  return (
    <div className="navbar">
      <div className="navbarButton">
        <button className="groupButton" onClick={() => setSlider(!slider)}>
          <BsSliders /> Display <BsChevronDown />
        </button>

        {slider && (
          <>
            <div className="dropDown">
              <div className="group">
                <span style={{ color: "grey" }}>Grouping</span>
                <select
                  value={gr}
                  onChange={(e) => handleGroups(e, true)}
                  name="group"
                  id="group"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="group">
                <span style={{ color: "grey" }}>Ordering</span>
                <select
                  value={order}
                  onChange={(e) => handleGroups(e, false)}
                  name="order"
                  id="order"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
