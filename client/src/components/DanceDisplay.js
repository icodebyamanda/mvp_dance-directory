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
        <div>
            Dance display tab

            {danceStyles && (
                <div key ={danceStyles.id}>
                    <h2>name: {danceStyles.name}</h2>
                    <img src={`${danceStyles.image}`} alt="" />
                    <p>description: {danceStyles.description}</p>
                    <p>video_url: {danceStyles.video_url}</p>
                    <p><iframe src={`${danceStyles.video_url}`}></iframe></p>
                    <Link to={{pathname: `/classes/`, search: `?style=${danceStyles.id}`}}>Find {danceStyles.name} Classes</Link>
                </div>   
            )}
           
        </div>
    )
}
