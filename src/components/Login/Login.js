import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate])

    if (loading) {
        return <Loading></Loading>
    }

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
    };
    
    return (
        <form className='flex flex-col gap-11 min-h-screen items-center justify-center w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-8/12 md:w-4/12 mt-14'>
                <h1 className='text-2xl text-blue-400'>Sugar stock</h1>
                <p className='text-lg'>Welcome to! Please Login</p>
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='email'
                    placeholder='Enter your email'
                    {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='password'
                    placeholder='Enter your password'
                    {...register("password", { required: "Password must be required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <p className='text-left mb-2'>
                    {error?.message === 'Firebase: Error (auth/user-not-found).' && 'User not found'}
                    {error?.message === 'Firebase: Error (auth/wrong-password).' && 'Wrong password.Try again'}
                </p>
                <input type="submit" value='Login' className='btn btn-outline w-full' />
                <p><Link to='/signup'>Create a account?</Link></p>
            </div>
        </form>
    );
};

export default Login;