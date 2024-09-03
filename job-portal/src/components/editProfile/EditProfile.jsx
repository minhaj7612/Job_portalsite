
import React, { useState } from 'react';
import Api from '../../AxiosConfigue'; 
import './EditProfile.css'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProfile = () => {
    const routes=useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: ''
    });
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]:value})
    };

    async  function handleSubmit (e) {
        e.preventDefault();

        try{
            if(formData.name && formData.email && formData.phone && formData.skills ){
            const response = await Api.post("/user/edit-user-profile",{formData})
           if(response.data.success){
              setFormData({
                name: '',
                email: '',
                phone: '',
                skills: ''
              })  
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
        <div className="add-info-container">
            <h2 className=''>Add Your Personal Information and Skills</h2>
            <form className='editinfoForm' onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label>Phone:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <label>Skills:</label>
                <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                />
                <button type="submit" className='submit' >Submit</button>
            </form>
        </div>
    );
};

export default EditProfile;
