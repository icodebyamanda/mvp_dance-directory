import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [styles, setStyles] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);

    let history = useHistory();


    //test
    const [selection, setSelection] = useState(
        {
            "style":"",
            "partner":"",
            "day": ""
        }
    )

    const fetchClasses = async () => {
        const response = await fetch(`/classes`);
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
        console.log(key);
        console.log(value);

        // setSelection(selection => {

        // }
        //     [key] = value
        //     )

        //works
        if(filterOptions.length){
            let newState = filterOptions.filter((el) => {
                return el.option !== key;

            })
            newState.push({"id":value, "option":key})
            setFilterOptions(newState)
        } else{
            setFilterOptions([...filterOptions,
                { "id":value, "option":key }
            ])
        }
    }

    const filter = async (event) => {
        event.preventDefault();
        const path = [];
        filterOptions.forEach((filter) => path.push(`${filter.option}=${filter.id}`));
        history.push(`/classes/?${path.join("&")}`);

        const response = await fetch(`/classes/?${path.join("&")}`)
        const data = await response.json();
        setClasses(data);
    }

    const clearFilter = () => {
        setFilterOptions([]);
        fetchClasses();
        //how to clear selection in dropdown? 
    }

    
    return (

        <div>
            <h4>Classes Tab</h4>
            <p>Filter Options</p>

            {/* test */}
            <form onSubmit={filter}>
                <label htmlFor="style">Style:</label>
                <select id="style" name="style" onChange={(e) => handleChange(e)}>
                    <option value="" disabled selected>Select one</option>
                    {styles.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <label htmlFor="partner">Partner required:</label>
                <select name="partner" onChange={handleChange} id="partner">
                    <option value="" disabled selected>Select one</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>

                <label htmlFor="day">Weekday:</label>
                <select id="day" name="day" onChange={handleChange}>
                    <option value="">Select one</option>
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
            {/* how to clear selection in dropdown? */}
            
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
