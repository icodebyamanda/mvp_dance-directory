import React, {useState, useEffect} from 'react'

export default function Instructors() {

    const [instructors, setInstructors] = useState([]);

    const fetchInstructorsInfo = async () => {
        const response = await fetch('/instructors');
        const data = await response.json();
        setInstructors(data)
    }
    
    useEffect(() => {
        fetchInstructorsInfo();
    }, []);

    return (
        <div>
            Instructors Tab

            {instructors && 
                instructors.map((i) => {
                    return <div key={i.id}>
                        {i.name}
                        {i.introduction}
                        {i.email}
                    </div>
                })
            }
        </div>
    )
}
