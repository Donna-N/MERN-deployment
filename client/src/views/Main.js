import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from '@reach/router';
import PetList from '../components/PetList'

const Main = () => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pets")
            .then(res=>{
                setPets(res.data)
                setLoaded(true);
            });
            console.log("'main' pets", pets)
    }, []);


    return (
        <div>
            <h3>Pet Shelter</h3>
            <Link style = {{textDecorationLine: "underline"}} to ={"/pets/new"}>
                add a pet to the shelter
            </Link>
            <p>These pets are looking for a good home</p>
            {loaded && <PetList pets = {pets}/>}
        </div>
    )
}

export default Main;