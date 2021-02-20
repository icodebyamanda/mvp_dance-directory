import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Classes() {
    let history = useHistory();
    let pathname = history.location.pathname;
    let query = history.location.search;

    const [classes, setClasses] = useState([]);
    const [styles, setStyles] = useState([]);
    const [selection, setSelection] = useState({
            "style":"",
            "partner":"",
            "day": "" 
        })

    const fetchClasses = async () => {
        let response;
        if(query !== ""){
            response = await fetch(`${pathname}${query}`);
        } else {
            response = await fetch(`${pathname}`);
        }

        const data = await response.json();
        setClasses(data);
    }

    const fetchStyles = async () => {
        const response = await fetch(`/dancestyles`);
        const data = await response.json();
        setStyles(data);
    }

    useEffect(() => {
        fetchClasses();
        fetchStyles();
    }, [])

    const handleChange = (event) => {
        const key =  event.target.name;
        const value = event.target.value;

        setSelection(selection => ({
            ...selection,
            [key] : value
        }));
    }

    const filter = async (event) => {
        event.preventDefault();

        const path = [];
        for(let item in selection){
            if(selection[item] !== ""){
                path.push(`${item}=${selection[item]}`)
            }
        }
        history.push(`/classes/?${path.join("&")}`);
        const response = await fetch(`/classes/?${path.join("&")}`);
        const data = await response.json();
        setClasses(data);
    }

    const clearFilter = () => {
        history.push(`/classes`);
        query = "";
        setSelection({
            "style":"",
            "partner":"",
            "day": ""
        })
        fetchClasses();
    }

    return (

        <div>
            <h4>Classes Tab</h4>
            <p>Filter Options</p>

            <form onSubmit={filter}>
                <label htmlFor="style">Style:</label>
                <select id="style" name="style" value={selection.style} onChange={(e) => handleChange(e)}>
                    <option value="" disabled>Select one</option>
                    {styles.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <label htmlFor="partner">Partner required:</label>
                <select id="partner" name="partner" value={selection.partner} onChange={handleChange}>
                    <option value="" disabled>Select one</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>

                <label htmlFor="day">Weekday:</label>
                <select id="day" name="day" value={selection.day} onChange={handleChange}>
                    <option value="" disabled>Select one</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>

                <button>Filter</button> 
            </form> 

            <button onClick={clearFilter}>Clear Filters</button>   
            
            {classes && (
                classes.map((c) => {
                return (
                <div key={c.id}>
                    <h3>name: {c.name}</h3>
                    <p>style: {c.style}</p>
                    <p>day: {c.day}</p>
                    <p>time: {c.time}</p>
                    <p>address: {c.address}</p>
                    <p>instructor: {c.instructor}</p>
                    <p>partner: {c.partner}</p>
                    <p>price: {c.price}</p>
                </div>
                )})
            )}

        </div>

    )
}
