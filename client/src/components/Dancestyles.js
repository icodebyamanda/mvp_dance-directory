import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import DanceDisplay from '../components/DanceDisplay';

export default function Dancestyles() {

    const [danceStyles, setDanceStyles] = useState([]);
    const [activeTab, setActiveTab] = useState([]);

    const fetchDanceInfo = async () => {
        const response = await fetch('/dancestyles');
        const data = await response.json();
        setDanceStyles(data)
    }
    
    useEffect(() => {
        fetchDanceInfo();
        setActiveTab(danceStyles[0]);
    }, []);

    return (
        <Router>
            <ul>
                {danceStyles.map((d) => {
                    return (
                        <li onClick={()=>setActiveTab(d)}>
                            <Link to={`/dancestyles/${d.name.toLowerCase()}`}>{d.name}</Link>
                        </li>
                    )
                })}
            </ul>

            <Switch>
                <Route path="/dancestyles/bachata">
                    <DanceDisplay dance={activeTab}/>
                </Route>
                <Route path="/dancestyles/ballet">
                    <DanceDisplay dance={activeTab}/>
                </Route>
                <Route path="/dancestyles/ballroom">
                    <DanceDisplay dance={activeTab}/>
                </Route>
                <Route path="/dancestyles/salsa">
                    <DanceDisplay dance={activeTab}/>
                </Route>
                <Route path="/dancestyles/tango">
                    <DanceDisplay dance={activeTab}/>
                </Route>
                <Route path="/">
                    Dance Styles Home               
                </Route>
            </Switch>

            <div>
                {/* Dance Styles Tab */}
                {/* {danceStyles && danceStyles.map((dance) => {
                    return (
                        <div key ={dance.id}>
                            <h2>name: {dance.name}</h2>
                            <p>description: {dance.description}</p>
                            <p>video_url: {dance.video_url}</p>
                        </div>   
                    )
                })
                } */}
            </div>
        </Router>
    )
}
