import React, { useEffect, useState } from "react";
import "../css/landingpage.css";
import { AllUsers } from "../api/userdata";
import { AllUsersPost, DeleteUser } from "../api/userdata";

const Landingpage = () => {
  const [data, setData] = useState([]);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({});

  const Userdata = async () => {
    let users = await AllUsers();
    setData(users);
  };

  useEffect(() => {
    Userdata();
  }, [formData]);

  const handleSubmit = async (e) => {
    try {
      const Data = { name, address, city, password };

      setFormData(Data);
      await AllUsersPost(Data);
      alert("user added");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle invalid credentials error
        console.log(error.response);
        alert("Invalid credentials");
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const handleDelete = (name) => {

  DeleteUser(name)
  alert("user deleted")
  window.location.reload();


  }



  // if (data.length === 0 || undefined ||  data === null) return <></>;
  // else
    return (
      <div className="landingContainer">
        <div>
          <div>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            Password <input onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </div>
        </div>
        <table>
          <th>
            <th>Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Action</th>

            {data.map((e, ind) => {
              return (
                <tr key={ind}>
                  <td>{e.name}</td>
                  <td>{e.address} </td>
                  <td>{e.city}</td>
                  <td><button onClick={()=>handleDelete(e.name)}>Delete</button></td>


                </tr>
              );
            })}
          </th>
        </table>
      </div>
    );
};

export default Landingpage;
