import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./JudgeDashboard.css";

export default function JudgeDashboard() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    const [stats, setStats] = useState({
        assigned: 0,
        pending: 0,
        completed: 0
    });

    const [contestants, setContestants] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get("/judge/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProfile(res.data.profile);
            setStats(res.data.stats);

            // Add score and feedback fields
            const data = res.data.contestants.map(c => ({
                ...c,
                score: "",
                feedback: ""
            }));

            setContestants(data);

        } catch (err) {
            console.error(err);
        }

    };

    const submitReview = async (contestant) => {

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/judge/review",
                {
                    contestant_id: contestant.user_id,
                    score: contestant.score,
                    feedback: contestant.feedback
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Evaluation submitted successfully.");

            loadDashboard();

        } catch (err) {

            console.error(err);

            alert("Unable to submit evaluation.");

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div className="judge-dashboard">

            <header className="header">

                <div className="logo-area">

                    <img
                        src="/logo.jpeg"
                        alt="Logo"
                        className="logo"
                    />

                    <h1 className="site-title">
                        Talent Auditions Milo
                    </h1>

                </div>

                <nav className="nav">

                    <button
                        className="nav-btn"
                        onClick={() => navigate("/judge/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </nav>

            </header>

            <section className="welcome">

                <h2>
                    Welcome, {profile.full_name}
                </h2>

                <p>
                    Manage contestant evaluations and submit scores.
                </p>

            </section>

            <section className="cards">

                <div className="card">

                    <h3>Assigned</h3>

                    <span>{stats.assigned}</span>

                </div>

                <div className="card">

                    <h3>Pending</h3>

                    <span>{stats.pending}</span>

                </div>

                <div className="card">

                    <h3>Completed</h3>

                    <span>{stats.completed}</span>

                </div>

            </section>

            <section className="dashboard-grid">

                <div className="box">

                    <h2>Assigned Contestants</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Category</th>
                                <th>Score</th>
                                <th>Feedback</th>
                                <th>Submit</th>

                            </tr>

                        </thead>

                        <tbody>

                            {contestants.map((c) => (

                                <tr key={c.user_id}>

                                    <td>{c.full_name}</td>

                                    <td>{c.role}</td>

                                    <td>

                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={c.score}
                                            onChange={(e) => {

                                                const value = e.target.value;

                                                setContestants(prev =>
                                                    prev.map(item =>
                                                        item.user_id === c.user_id
                                                            ? {
                                                                ...item,
                                                                score: value
                                                            }
                                                            : item
                                                    )
                                                );

                                            }}
                                        />

                                    </td>

                                    <td>

                                        <textarea
                                            rows="3"
                                            value={c.feedback}
                                            onChange={(e) => {

                                                const value = e.target.value;

                                                setContestants(prev =>
                                                    prev.map(item =>
                                                        item.user_id === c.user_id
                                                            ? {
                                                                ...item,
                                                                feedback: value
                                                            }
                                                            : item
                                                    )
                                                );

                                            }}
                                        />

                                    </td>

                                    <td>

                                        <button
                                            className="evaluate-btn"
                                            onClick={() => submitReview(c)}
                                        >
                                            Submit
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="box">

                    <h2>Today's Tasks</h2>

                    <ul>

                        <li>Review assigned contestants.</li>

                        <li>Enter a score out of 100.</li>

                        <li>Provide written feedback.</li>

                        <li>Submit completed evaluations.</li>

                    </ul>

                </div>

            </section>

        </div>

    );

}
