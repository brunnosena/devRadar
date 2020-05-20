import React, { useEffect, useState } from 'react';

import './style.css';

function DevForm({ onSubmit }) {
    const [github_username, setGitHubUserName] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            err => {
                console.log(err)
            },
            {
                timeout: 30000
            }
        );
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGitHubUserName('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="input-block">
                <label htmlFor="">Usuário GitHub</label>
                <input type="text"
                    value={github_username}
                    onChange={e => setGitHubUserName(e.target.value)}
                    name="github_username"
                    id="github_username"
                    required />
            </div>

            <div className="input-block">
                <label htmlFor="">Tecnologias</label>
                <input type="text"
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                    name="techs"
                    id="techs"
                    required />
            </div>

            <div className="input-group">

                <div className="input-block">
                    <label htmlFor="">Latitude</label>
                    <input type="number"
                        onChange={e => setLatitude(e.target.value)}
                        value={latitude}
                        name="latitude"
                        id="latitude"
                        required />
                </div>

                <div className="input-block">
                    <label htmlFor="">Logintude</label>
                    <input type="number"
                        onChange={e => setLongitude(e.target.value)}
                        value={longitude}
                        name="logintude"
                        id="logintude"
                        required />
                </div>

            </div>

            <button type="submit">Salvar</button>

        </form>
    );
}

export default DevForm;