import React, { useState, useEffect } from 'react'
import {
    // BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import DanceDisplay from '../components/DanceDisplay';

export default function Dancestyles() {

    const [danceStyles, setDanceStyles] = useState([]);

    const fetchDanceInfo = async () => {
        const response = await fetch('/dancestyles');
        const data = await response.json();
        setDanceStyles(data)
    }
    
    useEffect(() => {
        fetchDanceInfo();
    }, []);

    return (
        <div className="stylesDisplay">
            <div>
                <p>Click on a dance to learn more.</p>
                <ul>
                    {danceStyles.map((d) => {
                        return (
                            <li key={d.id}>
                                <Link to={`/dancestyles/${d.id}`}>{d.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <Switch>
                <Route path="/dancestyles/:id">
                    <DanceDisplay />
                </Route>
                <Route path="/">
                    <img src="/dancing_640x771.jpg" alt=""></img>
                </Route>
            </Switch>

        </div>
    )
}
