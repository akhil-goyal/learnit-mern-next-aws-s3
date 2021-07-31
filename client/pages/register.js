import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { state } = useContext(Context);
    const { user } = state;

    const router = useRouter();

    useEffect(() => {

        if (user !== null) router.push('/')

    }, [user]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await axios.post(`/api/register`, {
                name, email, password
            });

            toast('Registered Successfully! Please Login.');

            setLoading(false);

        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }

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

                    <button disabled={!name || !email || !password || loading} type="submit" className="btn btn-block btn-primary">
                        {
                            loading ? <SyncOutlined spin /> : 'Submit'
                        }
                    </button>

                </form>

                <p className="text-center p-3">
                    Already Registered? {" "}
                    <Link href="/login"><a>Login</a></Link>
                </p>

            </div>

        </>
    )
}

export default Register;