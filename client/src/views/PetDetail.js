import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';

const Detail = props => {
    const [pet, setPet] = useState({});
    const [pets, setPets] = useState([]);
    const [clicked, setClicked] = useState(false)


    useEffect(()=>{
        const int = setInterval(()=> 
        axios.get('http://localhost:8000/api/pets/' + props.id)
            .then(res => {setPet(res.data)}), 500);
    return function clearInt() {
        clearInterval(int);
    }
    }, [props.id]);

    const deletePet = (petId) => {
        axios.delete('http://localhost:8000/api/pets/' + props.id)
            .then(res =>{setPets(pets.filter(pet => pet._id !== petId));
            });
        navigate("/")
    }

    if (pet == null){
        return "Loading...";
    }

    function handleLike() {
        console.log("like", pet)
        axios.put("http://localhost:8000/api/pets/" + props.id, {likeCount: pet.likeCount +1})
        .then((res) => {
            setPet(res.data);
            setClicked(true);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    
    return (
        <div>
            <header>
                <Link style = {{textDecorationLine: "underline"}} to ={"/"}>
                    back to home
                </Link>
                <h3>Pet Shelter</h3>
                <h5>Details about {pet.name}</h5>
                <button 
                    className = "btn btn-danger btn-sm mb-5" 
                    onClick = {(e) => {deletePet(pet._id)}}>
                        Adopt {pet.name}
                </button>
            </header>
            <div style = {{border: "1px solid black", padding: "5px"}}>
                <p> Name: {pet.name}</p>
                <p> Pet Type: {pet.type}</p>
                <p> Description: {pet.description}</p>
                <p> Skills:</p>
                <ul style = {{listStyleType: "none"}}>
                    {console.log(pet)}
                    <li>{pet.skill1}</li>
                    <li>{pet.skill2}</li>
                    <li>{pet.skill3}</li>
                </ul>
                {console.log("pet", pet.likeCount)}
                <button 
                    className = "btn btn-success btn-sm mb-5"
                    onClick = {(e) => {
                        handleLike(pet);
                    }}
                    disabled = {( clicked? true : false)}>
                        <p>Like {pet.name}</p>
                </button>
                <span>{pet.likeCount} like(s)</span>
            </div>
        </div>
    )
}

export default Detail;