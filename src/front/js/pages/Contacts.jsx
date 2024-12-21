import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export const Contacts = () => {
    const baseURL = "https://playground.4geeks.com/contact/agendas";
    const slug = "Ricardo";



    const [contacts, setContacts] = useState([]);

    const getContacts = async () => {
        const uri = `${baseURL}/${slug}`;
        const options = {
            method: "GET"
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("error:", response.status, response.statusText);
        }
        const data = await response.json();
        setContacts(data.contacts);
    }

    const deleteContact = async (contactId) => {
        console.log(contactId);

        const uri = `${baseURL}/${slug}/contacts/${contactId}`;
        const options = {
            method: "DELETE"
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("error", response.status, response.statusText);
            return
        }
        getContacts(contacts);
    }

    useEffect(() => {
        getContacts()
    }, [])

    return (

        <div className="container-fluid bg-dark ">
            <div className="container my-2 pb-5">
                <div className="d-flex justify-content-between mx-3 ">
                    <h1 className="text-light my-4">Contacts</h1>
                    <Link to="/add-contact">
                        <button type="button" className="btn btn-success  my-4">
                            Add Contact
                        </button>
                    </Link>
                </div>
                <div className="container ">
                    <ul className="list-group rounded my-3">
                        {contacts.map((item) =>
                            <li key={item.id}
                                className="list-group-item d-flex ">
                                <div className="p-2 flex-fill">
                                    <img className="rounded-circle " src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`} alt="..." />
                                </div>
                                <div className="col-md-6 p-1 flex-fill">
                                    <h5 className="card-title mb-1">{item.name}</h5>
                                    <p className="card-text mb-1">{item.phone}</p>
                                    <p className="card-text mb-1">{item.email}</p>
                                    <p className="card-text mb-1">{item.address}</p>
                                </div>
                                <div className="d-flex align-item-end p-2 flex-fill" style={{height:"60px"}}>
                                    <button type="button" className="btn btn-secondary me-4">
                                    <i className="fas fa-edit "></i>
                                    </button>
                                    <button type="button" className="btn btn-danger" >
                                    <i onClick={() => deleteContact(item.id)} className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
