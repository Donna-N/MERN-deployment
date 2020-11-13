import React, {useEffect, useState} from 'react';
import { Link } from '@reach/router';
import axios from 'axios'


const PetList = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                setPets(res.data);
                })
    }, [])

    return (
        <dl>
            <table className = "table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope = "col">Name</th>
                        <th scope = "col">Type </th>
                        <th scope = "col">Actions</th>
                    </tr>
                </thead>
            {pets.map((pet, idx) =>  {
                return (
                    <tbody key = {idx}>
                        <tr>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td><Link to = {"/pets/" + pet._id}>Detail</Link>    |    <Link to = {"pets/" + pet._id + "/edit"}>Edit</Link></td>
                        </tr>
                    </tbody>
            )})}
            </table>
        </dl>
    )
}

export default PetList;
