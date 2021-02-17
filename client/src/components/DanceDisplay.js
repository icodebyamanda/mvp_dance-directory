import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
                <p>description: {danceStyles.description}</p>
                <p>video_url: {danceStyles.video_url}</p>
            </div>   
            )}
            
        </div>
    )
}
