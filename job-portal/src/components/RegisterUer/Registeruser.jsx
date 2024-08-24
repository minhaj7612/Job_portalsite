// src/Register.js
import React, { useState } from 'react';
import "./Register.css"
import Api from '../../AxiosConfigue';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Registeruser = () => {
   const routes= useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
   console.log(formData,"formData")
   
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

   
    async  function handleSubmit (e) {
        e.preventDefault();

        try{
            if(formData.name && formData.email && formData.password){
            const response = await Api.post("/auth/register",{formData})
           if(response.data.success){
              setFormData({
                name: "",
                email: "",
                password: "",
              })  
              routes("/login");
              toast.success(response.data.message);
            }}
            else{
            throw Error("All fields are mandatory."); 
            }}
           catch(error){
            toast.error(error?.response?.data?.error || error.message);
         }

    };

    return (
        <div className="register-container">
            <h2 className='registerhead'> Job Portal Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button className='registerbtn' type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registeruser;

