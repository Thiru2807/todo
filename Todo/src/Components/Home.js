import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import axios from 'axios';
import profile from '../images/profile.jpg';
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    const user_id = location.state.data;

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const [submittedValues, setSubmittedValues] = useState([]);
    const [viewProfile, setViewProfile] = useState(false);
    const [viewToDo, setViewToDo] = useState(false);
    const [userId, setUserId] = useState(null);
    const [editTodoItem, setEditTodoItem] = useState(null); // State to hold todo item being edited

    const addTodoList = async (data) => {
        try {
            const todoData = {
                ...data,
                user_id: user_id
            };
            const response = await axios.post('http://localhost:4000/addtodo', todoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.status === 200) {
                throw new Error('Failed to add todo');
            }

            const responseData = response.data;
            console.log(responseData);
            setSubmittedValues([...submittedValues, { ...data, user_id: user_id }]);
            reset();
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    };

    const getUserTodoList = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/gettodo/${user_id}`);

            if (!response.status === 200) {
                throw new Error('Failed to fetch todos');
            }

            const responseData = response.data;
            setSubmittedValues(responseData);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        }
    };

    useEffect(() => {
        getUserTodoList();
    }, []);

    useEffect(() => {
        const getUserDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/${user_id}`);
                if (response.status === 200) {
                    const responseData = response.data;
                    setUserId(responseData);
                } else {
                    throw new Error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };
        if (user_id) {
            getUserDetail();
        }
    }, [user_id]);

    const updateTodo = async (id, crossed) => {
        try {
            const response = await axios.put(`http://localhost:4000/updatetodo/${id}`,
                { complete: !crossed }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.status === 200) {
                throw new Error('Failed to update todo');
            }

            const updatedValues = submittedValues.map(item =>
                item.id === id ? { ...item, complete: !crossed } : item
            );
            setSubmittedValues([...updatedValues]);
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/deleteTodo/${id}`);

            if (!response.status === 200) {
                throw new Error('Failed to delete todo');
            }

            const updatedValues = submittedValues.filter(item => item.id !== id);
            setSubmittedValues(updatedValues);
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    const profileOpen = () => {
        setViewProfile(true);
    };

    const profileClose = () => {
        setViewProfile(false);
    };

    const viewTodoData = (todoItem) => {
        setViewToDo(true);
        setEditTodoItem(todoItem);
    };

    const closeViewTodoData = () => {
        setViewToDo(false);
    };

    return (
        <>
            <div className={`w-full ${submittedValues.length === 0 ? 'h-screen' : 'h-full'} bg-slate-200`}>
                <div className="flex flex-row justify-center">
                    <h1 className="flex justify-center mt-4 font-bold text-2xl">To-Do Form</h1>
                    <img className="absolute top-0 right-4 mt-2 mr-2 w-12 h-12 ml-10 object-cover rounded-full cursor-pointer" src={profile} alt="Loading..." onClick={profileOpen} />
                    {viewProfile && (
                        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="relative bg-gradient-to-r from-gray-800 from-15% via-gray-600 via-30% to-gray-800 to-80% w-[400px] h-[240px] p-6 rounded-lg shadow-md z-50">
                                <input
                                    type="text"
                                    value={userId?.user?.user_name}
                                    className="flex w-full mb-2 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={userId?.user?.phone_number}
                                    className="flex w-full mb-2 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    readOnly
                                />
                                <input
                                    type="text"
                                    value={userId?.user?.email}
                                    className="flex w-full mb-2 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    readOnly
                                />
                                <div className="absolute bottom-0 right-0 mb-2 mr-2 flex flex-row gap-2">
                                    <button onClick={profileClose} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Close</button>
                                    <button onClick={profileClose} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-center">
                    <form onSubmit={handleSubmit(addTodoList)}>
                        <input
                            type="text"
                            placeholder="title"
                            {...register('title', { required: 'Title is required' })}
                            className="mt-4 w-[400px] h-[44px] px-2 py-1 border border-gray-300
                                placeholder-gray-500 text-gray-700 rounded-md
                                focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500"
                        />
                        <button type="submit" className="mt-4 mb-2 ml-2 px-4 h-11 w-[100px] text-white bg-violet-500 hover:bg-violet-600 rounded-md">Submit</button>
                    </form>
                </div>
                <div className="flex flex-wrap justify-center">
                    {submittedValues.map((item) => (
                        <div className="w-[380px] flex-initial mx-2 my-4 relative" key={item.id}>
                            <div className={`p-6 bg-white border border-gray-200 rounded-lg shadow ${item.complete ? 'bg-gray-300' : 'bg-gradient-to-r from-gray-800 from-15% via-gray-600 via-30% to-gray-800 to-80%'}  dark:border-gray-700`}>
                                <div className=" flex justify-center items-center rounded-full h-8 w-8 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer absolute top-0 right-0 mt-2 mr-2">
                                    <AiOutlineEdit className="h-6 w-6 fill-white hover:fill-blue-200" onClick={() => viewTodoData(item)} />
                                    {viewToDo && (
                                        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
                                            <div className="relative bg-gradient-to-r from-gray-800 from-15% via-gray-600 via-30% to-gray-800 to-80% w-[400px] h-[200px] p-6 rounded-lg shadow-md z-50">
                                                <h1 className="font-bold text-white">Title</h1>
                                                <input
                                                    type="text"
                                                    value={editTodoItem.title}
                                                    className="flex w-full mb-2 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                    readOnly
                                                />
                                                <div className="absolute bottom-0 right-0 mb-2 mr-2 flex flex-row gap-2">
                                                    <button onClick={closeViewTodoData} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Close</button>
                                                    <button onClick={closeViewTodoData} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex mb-4">
                                    <p className={`flex items-start justify-start font-bold h-10 w-full mr-10 ${item.complete ? 'text-black' : 'text-white'}  ${item.complete ? 'line-through' : ''}`}>{item.title}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button className="ml-4 h-10 w-[80px] text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center" onClick={() => updateTodo(item.id, item.complete)}>
                                        <p className="font-bold">{item.complete ? "Undo" : "Complete"}</p>
                                    </button>
                                    <button className="ml-4 h-10 w-[80px] text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center" onClick={() => deleteTodo(item.id)}>
                                        <p className="font-bold">Delete</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default Home;
