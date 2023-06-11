import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';

const Transporter = () => {
    const [searchInput, setSearchInput] = useState("");
    const [foundData, setIdFoundData] = useState();
    const [user, loading, error1] = useAuthState(auth);
    const [charge, setCharge] = useState();

    const { isLoading, error, data: msgAll, refetch } = useQuery({
        queryKey: ['fromManufacturer', user],
        queryFn: () =>
            fetch(`http://localhost:5000/fromManufacturer/${user.email}`).then(
                (res) => res.json(),
            ),
    })

    if (loading || isLoading) {
        return <Loading></Loading>
    }


    const handleCharge = (event) => {
        setCharge(event.target.value)
    }

    const handleSubmit = async (id) => {
        const doc = { id, charge }
        console.log(id, charge)
        await fetch("http://localhost:5000/fromManufacturer", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(doc),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch();
                toast.success("Send message successfully");
            })
    };




    const searchById = async () => {
        let foundData;
        if (msgAll) {
            foundData = await msgAll.find((item) => item._id == searchInput);
        }


        if (foundData) {
            setIdFoundData(foundData);
            console.log("ID number found: " + foundData._id);
        }
        else {
            setIdFoundData();
        }
    };

    const setResetInput = () => {
        setIdFoundData();
        // document.getElementById("searchForm").reset();
    }

    console.log(foundData)



    return (
        <div className='container h-screen'>
            <h1 className='text-center text-2xl my-5 text-sky-600'>Transporter</h1>

            <div className='flex w-11/12 md:w-4/12 mx-auto my-5'>
                <form id='searchForm' className="form-control w-full  flex-row ">
                    <input type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Enter ID number" className="input input-bordered w-full" />
                    <button className='btn' onClick={setResetInput}>✕</button>
                </form>

                <button className='btn' onClick={searchById}>Search</button>
            </div>


            <div className="overflow-x-auto w-11/12 mx-auto border rounded-lg py-3">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Quantity</th>
                            <th>Charge</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            foundData ?
                                <tr>
                                    <th>
                                        {foundData._id}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{foundData.from}</div>
                                                <div className="text-sm opacity-50">{foundData.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {foundData.role}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Transporter</span>
                                    </td>
                                    <td>{foundData.quantity} ton</td>
                                    <th>
                                        {
                                            foundData.charge ?
                                                `${foundData.charge}$`
                                                :
                                                <div >
                                                    <input onBlur={handleCharge} name='charge' type="text" placeholder="Charge amount" className="input input-bordered input-sm max-w-xs" /><br />
                                                    <button className='btn btn-sm btn-warning mt-1' onClick={() => handleSubmit(foundData._id)}>Send charge</button>
                                                </div>
                                        }
                                    </th>
                                </tr>
                                :
                                msgAll.map((msg, index) =>
                                    <tr>
                                        <th>
                                            {msg._id}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold">{msg.from}</div>
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
                                                    <div >
                                                        <input onBlur={handleCharge} name='charge' type="text" placeholder="Charge amount" className="input input-bordered input-sm max-w-xs" /><br />
                                                        <button className='btn btn-sm btn-warning mt-1' onClick={() => handleSubmit(msg._id)}>Send charge</button>
                                                    </div>
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

export default Transporter;