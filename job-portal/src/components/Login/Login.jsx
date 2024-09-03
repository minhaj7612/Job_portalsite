import React, { useContext, useState } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import Api from '../../AxiosConfigue';
import toast from 'react-hot-toast';
import { Authcontext } from '../context/AuthContext';

const Login = () => {
    const routes=useNavigate();
    const {state,dispatch}=useContext(Authcontext);
    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
        };
    const route=useNavigate();


   const navigate=()=>{
    route("/register")
    }

    const handleLogin = async (e) => {
         e.preventDefault();
         try{
            if(formData.email && formData.password){

            const response = await Api.post("/auth/login",{formData})

            if(response.data.success){
            dispatch({type:"LOGIN",payload:response.data.userData})
              setFormData({
                email: '',
                password: '',
              })  
             toast.success(response.data.message)
             routes("/jobs")
            }
            else{
            toast.error(response?.data?.error)
            // throw Error("All fields are mandatory."); 
            }
        }
          }catch(error){
            toast.error(error?.response?.data?.error || error.message);
         }

    };

   
    return (
        <div className='login_main'>
      <div className="login-container">
            <h2 className='jobphead'>Job Portal Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
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
                <button className='login_button' type="submit">Login</button>
                <p className="signup-link">Don't have an account? <a style={{cursor:"pointer"}} onClick={navigate}>Creat account</a></p>
            </form>
        </div>
        </div>
      
    );
};



export default Login;
