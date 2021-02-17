import React, { useState } from 'react'

export default function Classes() {
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        const response = await fetch(`/classes`);
        const data = await response.json();
        setClasses(data);
    }

    useState(() => {
        fetchClasses();
    }, [])

    return (
        <div>
            Classes Tab
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
                )       
            })
            )
            }

        </div>
    )
}
