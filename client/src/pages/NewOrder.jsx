import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "axios";
import Loader from "./Loader";

const NewOrder = () => {
  document.title = "New Order";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [checkedList, setCheckedList] = useState("");
  const [orderName, setOrderName] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get-products`)
      .then((res) => {
        if (res.status === 200) {
          //   console.log(res.data.data);
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }, []);

  const handleSelectData = (e, value) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedList([...checkedList, value]);
      // setCheckBox([...checkBox, val]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  const handleSubmit = () => {
    if (!orderName) {
      alert("Enter Order Details!");
      return;
    }
    if (!checkedList) {
      alert("Please Select on Product to Buy!");
      return;
    }
    setLoader(true);
    const len = checkedList.length;
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/orders`,
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      data: { orderName, len },
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="parent-border">
      <h2>New Order</h2>
      <input
        type="text"
        placeholder="Enter Order Description..."
        onChange={(e) => setOrderName(e.target.value)}
      />
      <div>
        {products.length > 0 ? (
          products.map((val) => {
            return (
              <div className="flex-box div-center">
                <div className="">
                  <input type="checkbox" onChange={(e) => handleSelectData(e, val)} />
                </div>
                <div className="border-div">
                  <h4>{val.productName}</h4>
                  <h5>{val.productDescription}</h5>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
        <NavLink to="/">
          <button className="btn-global">Cancel</button>
        </NavLink>
        <button onClick={handleSubmit} className="btn-global">
          Submit
        </button>
      </div>
    </div>
  );
};

export default NewOrder;
