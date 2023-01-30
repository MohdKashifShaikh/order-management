import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const Order = () => {
  document.title = "Order Management";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [loader, setLoader] = useState(false);

  const renderOrder = async () => {
    Axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  useEffect(() => {
    renderOrder();
  }, []);

  const handleSearch = async () => {
    if (inputData === "" || inputData.trim() === "") {
      alert("Empty fields ?");
      return;
    }
    Axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/${inputData}`)
      .then((res) => {
        if (res.status === 200) {
          const newData = [];
          newData.push(res.data.data);
          localStorage.setItem("SearchedData", JSON.stringify(newData));
          const storeData = localStorage.getItem("SearchedData")
            ? JSON.parse(localStorage.getItem("SearchedData"))
            : [];
          console.log(storeData);
          setData(storeData);
        }
      })
      .catch((err) => {
        console.log("Error in Searching! : ", err.toString());
      });

    // const result = data.filter(
    //   (val) => val.orderDescription.toLowerCase() === inputData.toLowerCase()
    // );
    // localStorage.setItem("SearchedData", JSON.stringify(result));
    // const storeData1 = localStorage.getItem("SearchedData")
    //   ? JSON.parse(localStorage.getItem("SearchedData"))
    //   : [];
    // setData(storeData1);
  };

  const handleEdit = (val) => {
    localStorage.setItem("OrderEdit", JSON.stringify(val));
    navigate("/edit-order");
  };

  const handleDelete = (id) => {
    if (!id) {
      alert("Error");
      return;
    }
    if (!window.confirm("Sure to Delete ?")) {
      return;
    } else {
      Axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_URL}/api/orders/${id}`,
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
      })
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Order Deleted Successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
          renderOrder();
        })
        .catch((err) => {
          console.log(err.toString());
        });
    }
  };

  return (
    <div>
      <div className="flex-box j-c-e a-i-c">
        <h2 style={{ margin: "1.5rem 0" }}>Order Management</h2>
        <div>
          <input
            type="search"
            placeholder="Search by Order Id..."
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
        </div>
      </div>
      <div className="text-center">
        <table border={4} style={{ margin: "0 auto" }} cellPadding={6}>
          <tr>
            <th>Order ID</th>
            <th>Order Description</th>
            <th>Count of Product</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
          {data.length > 0 ? (
            data.map((val) => {
              return (
                <tr>
                  <td>{val._id}</td>
                  <td>{val.orderDescription}</td>
                  <td>{val.countsOfProduct}</td>
                  <td>{val.createdAt.slice(0, 10)}</td>
                  <td>
                    <button onClick={() => handleEdit(val)} className="btn-action">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(val._id)} className="btn-action">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h2>No Orders Yet....</h2>
          )}
        </table>
        <NavLink to="/new-order">
          <button className="btn-global">New Order</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Order;
