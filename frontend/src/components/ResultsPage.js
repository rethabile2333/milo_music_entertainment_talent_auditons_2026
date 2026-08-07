import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ResultsPage.css";


export default function ResultsPage() {


    const [results, setResults] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {


        const loadResults = async () => {


            try {


                const token = localStorage.getItem("token");


                const res = await api.get("/user/results", {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                });


                setResults(res.data.results || []);



            } catch (err) {


                console.error("Results loading error:", err);


            }


        };


        loadResults();


    }, []);




    return (


        <div className="results-page">


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
                    My Audition Results
                </h2>




                {results.length === 0 ? (


                    <p>
                        No results have been published yet.
                    </p>



                ) : (



                    <table className="results-table">


                        <thead>

                            <tr>

                                <th>
                                    Judge
                                </th>

                                <th>
                                    Score
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                            </tr>


                        </thead>




                        <tbody>



                            {results.map((result, index) => (


                                <tr key={index}>


                                    <td>
                                        {result.judge_name}
                                    </td>


                                    <td>
                                        {result.overall_score}/100
                                    </td>


                                    <td>
                                        {result.status}
                                    </td>


                                    <td>
                                        {result.created_at
                                        ? new Date(result.created_at)
                                            .toLocaleDateString()
                                        : "-"
                                        }
                                    </td>



                                </tr>


                            ))}



                        </tbody>



                    </table>


                )}



            </div>



        </div>


    );


}
