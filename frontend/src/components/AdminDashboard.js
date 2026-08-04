import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});

    const [stats, setStats] = useState({
        contestants: 0,
        judges: 0,
        auditions: 0,
        applications: 0
    });

    const [recentContestants, setRecentContestants] = useState([]);

    const [upcomingAuditions, setUpcomingAuditions] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/admin/dashboard", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setProfile(res.data.profile);
            setStats(res.data.stats);
            setRecentContestants(res.data.recentContestants);
            setUpcomingAuditions(res.data.upcomingAuditions);

        }

        catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="admin-dashboard">

            <header className="header">

                <div className="logo-area">

                    <img
                        src="/logo.jpeg"
                        className="logo"
                        alt="Logo"
                    />

                    <h1 className="site-title">
                        Talent Auditions
                    </h1>

                </div>

                <nav className="nav">

                    <button onClick={()=>navigate("/admin/dashboard")} className="nav-btn">
                        Dashboard
                    </button>

                    <button onClick={()=>navigate("/admin/users")} className="nav-btn">
                        Users
                    </button>

                    <button onClick={()=>navigate("/admin/contestants")} className="nav-btn">
                        Contestants
                    </button>

                    <button onClick={()=>navigate("/admin/judges")} className="nav-btn">
                        Judges
                    </button>

                    <button onClick={()=>navigate("/admin/auditions")} className="nav-btn">
                        Auditions
                    </button>

                    <button onClick={()=>navigate("/admin/results")} className="nav-btn">
                        Results
                    </button>

                    <button onClick={()=>navigate("/admin/reports")} className="nav-btn">
                        Reports
                    </button>

                    <button onClick={()=>navigate("/admin/settings")} className="nav-btn">
                        Settings
                    </button>

                    <button
                        className="logout-btn"
                        onClick={()=>{
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>

                </nav>

            </header>

            <section className="welcome">

                <h2>
                    Welcome, {profile.full_name} 👋
                </h2>

                <p>
                    Manage auditions, judges and contestants.
                </p>

            </section>

            <section className="cards">

                <div className="card">
                    <h3>Contestants</h3>
                    <span>{stats.contestants}</span>
                </div>

                <div className="card">
                    <h3>Judges</h3>
                    <span>{stats.judges}</span>
                </div>

                <div className="card">
                    <h3>Auditions</h3>
                    <span>{stats.auditions}</span>
                </div>

                <div className="card">
                    <h3>Applications</h3>
                    <span>{stats.applications}</span>
                </div>

            </section>

            <section className="dashboard-grid">

                <div className="box">

                    <h2>Recent Contestants</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Category</th>

                            </tr>

                        </thead>

                        <tbody>

                            {recentContestants.map(c=>(

                                <tr key={c.user_id}>

                                    <td>{c.full_name}</td>

                                    <td>{c.email}</td>

                                    <td>{c.category}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="box">

                    <h2>Upcoming Auditions</h2>

                    <ul>

                        {upcomingAuditions.map(a=>(

                            <li key={a.audition_id}>

                                <strong>{a.category}</strong>

                                <br/>

                                {a.audition_date}

                                <br/>

                                {a.venue}

                            </li>

                        ))}

                    </ul>

                </div>

            </section>

        </div>

    );

}