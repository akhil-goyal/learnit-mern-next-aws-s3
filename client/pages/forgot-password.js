import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from './../context';
import { useRouter } from 'next/router';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { state: { user } } = useContext(Context);

    const router = useRouter();

    // Redirect if user is already logged in.
    useEffect(() => {
        if (user !== null) {
            router.push('/');
        }
    }, [user]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setSuccess(true);
            const { data } = await axios.post(`/api/forgot-password`, { email });
            toast('A verification code has been sent to your email address.');
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast(err.response.data);
        }

    }

    const handleResetPassword = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await axios.post(`/api/reset-password`, { email, code, newPassword });

            setEmail('');
            setCode('');
            setNewPassword('');
            setLoading(false);
            toast('Password reset successfully!');

        } catch (err) {
            setLoading(false);
            toast(err.response.data);
        }

    }

    return (
        <>
            <h1 className="jumbotron text-center background-primary square">Forgot Password</h1>

            <div className="container col-md-4 offset-md-4 pb-5">

                <form onSubmit={success ? handleResetPassword : handleSubmit}>

                    <input
                        required
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                        className="form-control mb-4 p-4"
                        type="email"
                        value={email}
                    />

                    {
                        success && <>

                            <input
                                required
                                placeholder="Enter verification code"
                                onChange={e => setCode(e.target.value)}
                                className="form-control mb-4 p-4"
                                type="text"
                                value={code}
                            />

                            <input
                                required
                                placeholder="Enter new Password"
                                onChange={e => setNewPassword(e.target.value)}
                                className="form-control mb-4 p-4"
                                type="password"
                                value={newPassword}
                            />

                        </>
                    }

                    <button disabled={loading || !email} type="submit" className="btn btn-primary btn-block p-2">
                        {loading ? <SyncOutlined spin /> : 'Submit'}
                    </button>

                </form>

            </div>
        </>
    )

}

export default ForgotPassword;