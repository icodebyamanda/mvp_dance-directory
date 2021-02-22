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
            <h4>Current Teachers</h4>

            {instructors && 
                instructors.map((i) => {
                    return <div className="instructorDisplay" key={i.id}>
                        <div className="right">
                            <img src={`${i.photo}`} alt={`${i.name}`}/>
                        </div> 
                        <div className="middle">
                            <h3>{i.name}</h3>
                            <p>{i.introduction}: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                        </div>
                        <div className="right">
                            <p className="contact"><a href={`mailto:${i.email}`}>Contact</a></p>
                            
                        </div>
                                    
                    </div>
                })
            }
        </div>
    )
}
