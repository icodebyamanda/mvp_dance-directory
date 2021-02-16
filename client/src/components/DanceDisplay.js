import React from 'react'

export default function DanceDisplay( {dance} ) {
    return (
        <div>
            Dance display tab
            <div key ={dance.id}>
                <h2>name: {dance.name}</h2>
                <p>description: {dance.description}</p>
                <p>video_url: {dance.video_url}</p>
            </div>   
        </div>
    )
}
