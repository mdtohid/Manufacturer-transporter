import { useQuery } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const Header = () => {
    const [user, loading, error] = useAuthState(auth);

    const { isLoading, error1, data: user1, refetch } = useQuery({
        queryKey: ['user', user],
        queryFn: () =>
            fetch(`http://localhost:5000/user/${user.email}`,).then(
                (res) => res.json(),
            ),
    })

    const navigate = useNavigate();
    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login');
    }

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="navbar bg-slate-100	lg:px-10 sticky top-0 z-10">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">MTport</Link>
            </div>
            <div className="flex-none gap-2">
                {
                    user1.role === 'Transporter' ?
                        <Link to='/transporter' className='mx-5'>Transporter</Link>
                        :
                        <>
                            <Link to='/manufacturer' className='mx-5'>Manufacturer</Link>
                            <Link to='/orderManufacturer' className='mx-5'>Order</Link>
                        </>
                }


                {user ?
                    <Link className='font-semibold btn' onClick={handleSignOut}>Logout</Link>
                    :
                    <Link to='/login' className='font-semibold btn'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;