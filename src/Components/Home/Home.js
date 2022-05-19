import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const email = user?.email
    const [refetch, setRefetch] = useState(false)
    useEffect(() => {
        axios.get(`https://agile-atoll-35564.herokuapp.com/userData/${email}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [email, refetch])
    const token = localStorage.getItem("accessToken")
    const addData = async e => {
        e.preventDefault();
        setError("")
        setSuccess("")

        const userData = {
            name: e.target.name.value,
            description: e.target.description.value,
            email: email,
            token: token

        }
     
        axios.post(`https://agile-atoll-35564.herokuapp.com/user`, userData)
            .then(res => {
              
                setSuccess(res.data)
         
                setRefetch(!refetch)
            })
            .catch(err => {
                setError(err)
              
            })
            e.target.name.value="" 
            e.target.description.value="" 

    }
    const handleDelete = async (id) => {
        axios.delete(`https://agile-atoll-35564.herokuapp.com/delete/${id}`)
            .then(res => {
                setData(data.filter(data => data._id !== id))
            })
            .catch(err => setError(err))
    }

    const complete=e=>{
        window.alert("completed")
    }


    return (
        <div className='w-1/2 mx-auto'>
            <h1 className='text-3xl text-primary my-20 font-bold'>YOUR BEST TO DO APP</h1>
            <form onSubmit={addData}>
                <div className="mb-6">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 name" placeholder="Enter name" required />
                </div>
                <div className="mb-6">
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 description" required />
                </div>
                {error?<p className='text-red-500'>{error.message}</p>: ""}
                {success ? <p className='text-green-500'>{success.message}</p>: ""}

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <button onClick={complete} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-16 py-3 my-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Complete</button>

            <div>
                <table className='table-auto mx-auto mt-20 w-11/12 '>
                    <thead className='thead'>
                        <tr>

                            <th className='break-all'>Name</th>
                            <th className='desc'>Description</th>
                            <th className='break-all'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(singleData => {
                                return (
                                    <tr className='my-2 bor'>
                                        <td className='break-all py-2'> {singleData.name} </td>
                                        <td className='desc'>{singleData.description} </td>
                                        <td className='break-all'><button onClick={() => handleDelete(singleData._id)} className="deleteBtn">delete</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>


        </div>
    );
};

export default Home;