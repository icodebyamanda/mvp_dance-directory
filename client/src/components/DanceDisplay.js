import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";

export default function DanceDisplay() {
    const { id } = useParams();
    const [danceStyles, setDanceStyles] = useState();

    const fetchDanceInfo = async () => {
        const response = await fetch(`/dancestyles/${id}`);
        const data = await response.json();
        setDanceStyles(data[0])
    }

    useEffect(() => {
        fetchDanceInfo();
    }, [id]);

    return (
        <div className="danceDisplay">
            {danceStyles && (
                <div className="danceInfo" key ={danceStyles.id}>
                    <h3>{danceStyles.name}</h3>
                    <p>{danceStyles.description}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                    <iframe width="560" height="340" src={`${danceStyles.video_url}`}></iframe>

                    <div>
                        Like what you see? 
                    <Link to={{pathname: `/classes/`, search: `?style=${danceStyles.id}`}}> Find {danceStyles.name} Classes</Link>
                    </div>
                </div>   
            )}        
        </div>
    )
}
