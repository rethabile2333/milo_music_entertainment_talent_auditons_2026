import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ProfilePage.css";

export default function ChangePasswordPage(){

    const navigate=useNavigate();

    const [passwords,setPasswords]=useState({

        currentPassword:"",
        newPassword:"",
        confirmPassword:""

    });

    const handleChange=(e)=>{

        setPasswords({
            ...passwords,
            [e.target.name]:e.target.value
        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        if(passwords.newPassword!==passwords.confirmPassword){

            alert("Passwords do not match.");

            return;

        }

        const token=localStorage.getItem("token");

        await api.put("/user/change-password",passwords,{

            headers:{
                Authorization:`Bearer ${token}`
            }

        });

        alert("Password changed successfully.");

        navigate("/profilepage");

    };

    return(

        <div className="form-container">

            <div className="form-card">

                <h2>Change Password</h2>

                <form onSubmit={handleSubmit}>

                    <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    onChange={handleChange}
                    />

                    <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                    />

                    <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    />

                    <button className="save-btn">
                        Change Password
                    </button>

                </form>

            </div>

        </div>

    )

}