import React, { useEffect, useState } from "react";
import "../css/landingpage.css";
import { AllUsers } from "../api/userdata";
import { AllUsersPost } from "../api/userdata";

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
  try{

    
    const Data = { name, address, city, password };

    setFormData(Data);
    await AllUsersPost(Data);
  }

  catch(error){
    if (error.response && error.response.status === 401) {
        // Handle invalid credentials error
        console.log(error.response)
        alert("Invalid credentials");
      } else {
        alert("Invalid credentials");
      }
  }
  

  };


  

if (data.length === undefined )
return <></>
else
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

      {data.map((e, ind) => {
        return (
          <div key={ind}>
            <div> Name : {e.name} </div>
            <div> Address : {e.address} </div>
            <div> City : {e.city}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Landingpage;
