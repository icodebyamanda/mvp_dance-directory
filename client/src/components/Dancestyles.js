import React, { useState, useEffect } from 'react'

export default function Dancestyles() {

    const [classes, setClasses] = useState([]);

    const fetchClassInfo = async () => {
        const response = await fetch('/classes');
        const data = await response.json();
        setClasses(data)
      }
    
      useEffect(() => {
        fetchClassInfo()
      }, []);

    return (
        <div>
            Dance Styles Tab

            {classes && classes.map((c) => <p key={c.id}>{c.name}</p>)
        }
        </div>
    )
}
