import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const OrderManufacturer = () => {
    const [user, loading, error1] = useAuthState(auth);
    console.log(user?.email);

    const { isLoading, error, data: msgAll, refetch } = useQuery({
        queryKey: ['manufacturer', user],
        queryFn: () =>
            fetch(`http://localhost:5000/manufacturer/${user?.email}`).then(
                (res) => res.json(),
            ),
    })


    if (loading || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='h-screen'>
            <h1 className='text-center text-2xl my-5 text-sky-600'>Order by Manufacturer</h1>
            <div className="overflow-x-auto w-11/12 md:mx-auto border rounded-lg py-3">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Transporter email</th>
                            <th>Job</th>
                            <th>Quantity</th>
                            <th>Transformer Charge</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            msgAll.map((msg, index) =>
                                <tr>
                                    <th>
                                        {msg._id}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{msg.to}</div>
                                                <div className="text-sm opacity-50">{msg.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {msg.role}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Transporter</span>
                                    </td>
                                    <td>{msg.quantity} ton</td>
                                    <th>
                                        {
                                            msg.charge ?
                                                `${msg.charge}$`
                                                :
                                                'Wait for transformer message'
                                        }
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default OrderManufacturer;