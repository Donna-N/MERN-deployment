import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {navigate, Link} from '@reach/router'

const Update = (props) => {
    const {id} = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then(res => {
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
                setSkill3(res.data.skill3);
            })
            console.log(id)
    }, [])

const handleOnSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/pets/' + id, {
        name,
        type,
        description,
        skill1,
        skill2,
        skill3, 
    })
        .then(res => {
            console.log(res);
            navigate("/")
        })
        .catch((err) => {
            console.log(err.response)
            setErrors(err.response?.data?.errors)
        })
}

return (
    <div>
        <header>
            <Link style = {{textDecorationLine: "underline"}} to ={"/"}>
                back to home
            </Link>
            <h3>Pet Shelter</h3>
            <h5>Edit {name}</h5>
        </header>

        <form onSubmit = {handleOnSubmit} className = "form-group" style = {{display: "inline-block", border: "1px solid black", padding: "5px 20px 5px 5px"}}>
            <div className = "form-group">
                <div className = "form-group">
                    <label>Pet Name</label>
                    <input
                        type = "text"
                        name = "name"
                        value = {name}
                        onChange = {(e) => {setName(e.target.value)}}
                        className = "form-control col-12 mb-2"/>
                    { 
                        errors?.name && (
                            <p style = {{color: "red"}}>{errors.name?.message}</p>
                        )
                    }
                </div>
                <div className = "form-group">
                    <label>Pet Type</label>
                    <input
                        type = "text"
                        name = "type"
                        value = {type}
                        onChange = {(e) => {setType(e.target.value)}}
                        className = "form-control col-12 mb-2"/>
                    { 
                        errors?.type && (
                            <p style = {{color: "red"}}>{errors.type?.message}</p>
                        )
                    }                        
                </div>
                <div className = "form-group">
                    <label>Pet Description</label>
                    <input
                        type = "text"
                        name = "description"
                        value = {description}
                        onChange = {(e) => {setDescription(e.target.value)}}
                        className = "form-control col-12 mb-2"/>                    
                        { 
                            errors?.description && (
                                <p style = {{color: "red"}}>{errors.description?.message}</p>
                            )
                        }
                </div>
            </div>
            <div className = "form-group">
                <p>Skills(optional):</p>
                <div className = "form-group">
                    <label>Skill 1</label>
                    <input
                        type = "text"
                        name = "skill1"
                        value = {skill1}
                        onChange = {(e) => {setSkill1(e.target.value)}}
                        className = "form-control col-12 mb-2"/>
                </div>
                <div className = "form-group">
                    <label>Skill 2</label>
                    <input
                        type = "text"
                        name = "skill2"
                        value = {skill2}
                        onChange = {(e) => {setSkill2(e.target.value)}}
                        className = "form-control col-12 mb-2"/>
                </div>
                <div className = "form-group">
                    <label>Skill 3</label>
                    <input
                        type = "text"
                        name = "skill3"
                        value = {skill3}
                        onChange = {(e) => {setSkill3(e.target.value)}}
                        className = "form-control col-12 mb-2"/>
                </div>
            </div>
            <button className = "btn btn-primary ml-2 btn-sm" type = "submit">Edit Pet</button>
        </form>
    </div>
)
}

export default Update;