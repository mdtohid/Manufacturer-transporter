import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, error1] = useUpdateProfile(auth);


    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const doc = {
            name: data.name,
            email: data.email,
            address: data.address,
            role: data.role
        }
        console.log(doc);
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });

        await fetch("http://localhost:5000/user", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doc),
        })
            .then(res => res.json())
            .then(data => console.log(data))
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (loading || updating) {
        return <Loading></Loading>
    }


    return (
        <form className='flex flex-col gap-9 items-center justify-center w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-8/12 md:w-4/12 mt-14'>
                <h1 className='text-2xl text-blue-400'>Sugar stock</h1>
                <p className='text-lg'>Welcome to! Signup first</p>
            </div>
            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='text'
                    placeholder='Enter your name'
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name?.type === 'required' && <p role="alert"> Name is required</p>}
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
                <input className='input input-bordered w-full'
                    type='text'
                    placeholder='Enter your address'
                    {...register("address", { required: "Password must be required" })}
                    aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && <p role="alert">{errors.address?.message}</p>}
            </div>

            <select className="select select-bordered w-8/12 md:w-4/12"
                {...register("role", { required: "Role must be required" })}>
                <option disabled selected>Select role?</option>
                <option>Manufacturer</option>
                <option>Transporter</option>
            </select>

            <div className='w-8/12 md:w-4/12'>
                <input type="submit" value='Signup' className='btn btn-outline w-full' />
                <p><Link to='/login'>Already have a account?</Link></p>
            </div>
        </form>
    );
};

export default Signup;