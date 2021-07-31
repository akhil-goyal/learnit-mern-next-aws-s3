import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import { useRouter } from 'next/router';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { state, dispatch } = useContext(Context);

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await axios.post(`/api/login`, {
                email, password
            });

            dispatch({
                type: 'LOGIN',
                payload: data
            });

            window.localStorage.setItem('user', JSON.stringify(data));

            router.push('/');

            // setLoading(false);

        } catch (err) {
            toast(err.response.data);
            setLoading(false);
        }

    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Login</h1>

            <div className="container col-md-4 offset-md-4 pb-5">

                <form onSubmit={handleSubmit}>

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

                    <button disabled={!email || !password || loading} type="submit" className="btn btn-block btn-primary">
                        {
                            loading ? <SyncOutlined spin /> : 'Submit'
                        }
                    </button>

                </form>

                <p className="text-center p-3">
                    Haven't registered yet? {" "}
                    <Link href="/register"><a>Register Now</a></Link>
                </p>

            </div>

        </>
    )
}

export default Login;