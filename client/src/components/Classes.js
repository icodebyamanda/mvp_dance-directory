import React, { useState, useEffect } from 'react'

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [styles, setStyles] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);

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

        if(filterOptions.length){
            // newState.map((el) => {
            //     if(el.option === key ){
            //         el.id = value;
            //     }
            // })

            let newState = filterOptions.filter((el) => {
                return el.option !== key;

            })
            // console.log("newState after creation:")
            // console.log(newState)
            newState.push({"id":value, "option":key})
            // console.log("newState after adding item:")
            // console.log(newState)

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
        console.log(path.join("&"));
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

                <label htmlFor="weekday">Weekday:</label>
                <select id="weekday" name="weekday">
                    <option value="">Select one</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="4">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="7">Sunday</option>
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
                    <p>date: {c.date}</p>
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
