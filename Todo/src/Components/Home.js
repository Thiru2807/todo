import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';

function Home() {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const [submittedValues, setSubmittedValues] = useState([]);

    const addTodoList = async (data) => {
        try {
            const response = await axios.post('http://localhost:4000/addtodo', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.status === 200) {
                throw new Error('Failed to add todo');
            }

            const responseData = response.data;
            console.log(responseData);
            setSubmittedValues([...submittedValues, { title: data.title, complete: data.complete }]);
            reset();
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
    };

    const getTodoList = async () => {
        try {
            const response = await axios.get('http://localhost:4000/gettodo');

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
        getTodoList();
    }, []);

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


    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-[800px] bg-slate-200">
                    <h1 className="flex justify-center mt-4 font-bold text-2xl">To-Do Form</h1>
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
                    <div className="flex justify-center">
                        <ul>
                            {submittedValues.map((item) => (
                                <div className="flex flex-row mb-2" key={item.id}>
                                    <div className={`flex items-center justify-center rounded-md h-10 w-[500px] ${item.complete ? 'bg-black' : 'bg-slate-500'} text-white ${item.complete ? 'line-through' : ''}`}>
                                        <p>{item.title}</p>
                                    </div>
                                    <button className="ml-4 h-10 w-[40px] text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center" onClick={() => updateTodo(item.id, item.complete)}>
                                        <TiTickOutline className="h-7 w-7" />
                                    </button>
                                    <button className="ml-4 h-10 w-[40px] text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center" onClick={() => deleteTodo(item.id)}>
                                        <AiOutlineDelete className="h-6 w-6" />
                                    </button>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
