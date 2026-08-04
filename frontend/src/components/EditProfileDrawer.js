import { useEffect, useState } from "react";
import api from "../services/api";
import "./ProfilePage.css";

export default function EditProfilePage() {

    const [form, setForm] = useState({
        full_name:"",
        email:"",
    });

    useEffect(()=>{

        const loadProfile = async()=>{

            const token = localStorage.getItem("token");

            const res = await api.get("/user/profile",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            setForm({
                full_name:res.data.profile.full_name,
                email:res.data.profile.email
            });

        };

        loadProfile();

    },[]);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
const handleSubmit = async () => {
    alert("handleSubmit called");

    try {
        const token = localStorage.getItem("token");

        console.log("Submitting:", form);

        const res = await api.put(
            "/user/profile",
            form,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(res.data);

        alert("Profile updated successfully");

    } catch (err) {
        console.error(err);
        alert(JSON.stringify(err.response?.data || err.message));
    }
};
    return(

        <div className="form-container">

            <div className="form-card">

                <h2>Edit Profile</h2>

                <form onSubmit={handleSubmit}>

                    <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    />

                    <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    />

                  <button
    type="button"
    className="save-btn"
    onClick={handleSubmit}
>
    Save Changes
</button>

                </form>

            </div>

        </div>

    )

}