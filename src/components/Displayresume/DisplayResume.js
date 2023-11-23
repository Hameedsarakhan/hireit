// this is component was used to test the displaying of pdf from backend fetched binary data
import axios from 'axios';
import React, { useEffect, useState } from 'react';

    const DisplayResume = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/admin/getresume')
        .then(res => {
            // converting the binary resume data into link
            const linkArr = res.data.resumes.map((base64Data, index) => {
            const dataUrl = `data:application/pdf;base64,${base64Data}`;
            return (
                <div key={index}>
                <a href={dataUrl} target="_blank" rel="noopener noreferrer" >
                    Download Resume {index + 1}
                </a>
                <br />
                </div>
            );
            });
            setLinks(linkArr);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
        <p>Displaying Resumes:</p>
        {links}
        </div>
    );
    };

export default DisplayResume;
