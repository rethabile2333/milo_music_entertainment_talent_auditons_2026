
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./ResultsPage.css";

export default function FeedbackPage() {

    const [feedback, setFeedback] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const loadFeedback = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await api.get("/user/feedback", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setFeedback(res.data.feedback || []);

            } catch (err) {

                console.error("Feedback loading error:", err);

            }

        };

        loadFeedback();

    }, []);


    return (

        <div className="feedback-page">

            <header className="header">

                <div className="logo-area">
                    <img 
                        src="/logo.jpeg" 
                        alt="Logo" 
                        className="logo" 
                    />

                    <h1 className="site-title">
                        Talent Auditions
                    </h1>
                </div>


                <nav className="nav">

                    <a href="/profilepage">
                        My Profile
                    </a>

                    <a href="/results">
                        Results
                    </a>

                    <a href="/feedback">
                        Feedback
                    </a>


                    <button
                        className="logout-btn"
                        onClick={() => {

                            localStorage.removeItem("token");
                            navigate("/login");

                        }}
                    >
                        Logout
                    </button>

                </nav>

            </header>



            <div className="page-container">

                <h2>
                    Judge Feedback
                </h2>



                {feedback.length === 0 ? (

                    <p>
                        No feedback available yet.
                    </p>

                ) : (

                    feedback.map((item, index) => (

                        <div 
                            className="feedback-card" 
                            key={index}
                        >

                            <h3>
                                Audition Review
                            </h3>


                            <p>
                                <strong>
                                    Judge:
                                </strong> 
                                {" "}
                                {item.judge_name}
                            </p>


                            <p>
                                <strong>
                                    Score:
                                </strong>
                                {" "}
                                {item.overall_score}/100
                            </p>


                            <p>
                                <strong>
                                    Status:
                                </strong>
                                {" "}
                                {item.status}
                            </p>


                            <p>
                                <strong>
                                    Comments:
                                </strong>
                            </p>


                            <p>
                                {item.feedback}
                            </p>


                        </div>

                    ))

                )}


            </div>


        </div>

    );

}

