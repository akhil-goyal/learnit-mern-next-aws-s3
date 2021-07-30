import { useState } from 'react';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        console.table({ name, email, password });

    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Register</h1>

            <div className="container col-md-4 offset-md-4 pb-5">

                <form onSubmit={handleSubmit}>

                    <input
                        required
                        className="form-control mb-4 p-4"
                        placeholder="Enter Name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        required
                        className="form-control mb-4 p-4"
                        placeholder="Enter Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        required
                        className="form-control mb-4 p-4"
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit" className="btn btn-block btn-primary">Submit</button>

                </form>

            </div>

        </>
    )
}

export default Register;