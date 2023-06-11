import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Manufacturer = () => {
    const [user, loading, error] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { isLoading, error1, data: user1, refetch } = useQuery({
        queryKey: ['user', user],
        queryFn: () =>
            fetch(`http://localhost:5000/user/${user.email}`,).then(
                (res) => res.json(),
            ),
    })

    const onSubmit = async (data) => {
        console.log(data);
        const msg = {
            to: data.toEmail,
            from: user.email,
            quantity: data.quantity,
            address: data.address,
            role: data.role
        }
        console.log(msg)

        await fetch("http://localhost:5000/fromManufacturer", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(msg),
        })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                reset();
                toast.success("Send message successfully");
            })
    };

    if(loading||isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='w-full h-screen	'>
            <form className='flex flex-col gap-9 items-center justify-center w-full' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-8/12 md:w-4/12 mt-14'>
                    <h1 className='text-2xl text-blue-400'>MTport</h1>
                </div>

                <div className='w-8/12 md:w-4/12'>
                    <input className='input input-bordered w-full'
                        type='email'
                        placeholder='To'
                        {...register("toEmail", { required: "Email Address is required" })}
                        aria-invalid={errors.toEmail ? "true" : "false"}
                    />
                    {errors.toEmail && <p role="alert">{errors.toEmail?.message}</p>}
                </div>


                <div className='w-8/12 md:w-4/12'>
                    <input className='input input-bordered w-full'
                        type='email'
                        placeholder='From'
                        value={user?.email}
                        disabled
                    />
                </div>

                <div className='w-8/12 md:w-4/12'>
                    <input className='input input-bordered w-full'
                        type='number'
                        placeholder='Enter quantity'
                        {...register("quantity", { required: "quantity must be required" })}
                        aria-invalid={errors.quantity ? "true" : "false"}
                    />
                    {errors.quantity && <p role="alert">{errors.quantity?.message}</p>}
                </div>

                <div className='w-8/12 md:w-4/12'>
                    <input className='input input-bordered w-full'
                        type='text'
                        value={user1.address}
                        disabled
                    />
                </div>

                <select className="select select-bordered w-8/12 md:w-4/12"
                    {...register("role", { required: "Role must be required" })}>
                    <option>Transporter1</option>
                    <option>Transporter2</option>
                </select>

                <div className='w-8/12 md:w-4/12'>
                    <input type="submit" value='Send message' className='btn btn-outline w-full' />
                </div>
            </form>
        </div>
    );
};

export default Manufacturer;