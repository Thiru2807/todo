import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";

function ComponentA() {
    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm()
    const [submittedValues, setSubmittedValues] = useState([]);
    
    // const addTodoList = (data) => {
    //     console.log("submit button is clicked", data);
    //     setSubmittedValues([...submittedValues, { title: data.title, crossed: false }]);
    //     reset();
    // };
    const addTodoList = async (data) => {
        console.log("submit button is clicked", data);
        try {
            const response = await fetch('http://localhost:4000/addtodo',{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response.status)
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            const responseData = await response.text();
            console.log('Response :',responseData);
            setSubmittedValues([...submittedValues, { title: data.title, complete: data.complete }]);
            // setSubmittedValues([...submittedValues, responseData]);
            reset();
        } catch (error) {
            console.error('Error adding todo:', error.message);
        }
        
    };

    const getTodoList = async () => {
        try {
            const response = await fetch('http://localhost:4000/gettodo');
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            const responseData = await response.json();
            console.log(responseData);
            setSubmittedValues(responseData);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        }
    };

    useEffect(() => {
        getTodoList();
    }, []);

    // const handleCross = (index) => {
    //     console.log(index);
    //     const updatedValues = [...submittedValues];
    //     updatedValues[index].crossed = !updatedValues[index].crossed;
    //     setSubmittedValues(updatedValues);
    // };
    const handleCross = async (id, crossed) => {
        try {
            const response = await fetch(`http://localhost:4000/updatetodo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complete: !crossed }), // Toggle completion status
            });
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            const updatedValues = submittedValues.map(item =>
                item.id === id ? { ...item, title:item.title, crossed: !crossed } : item
            );
            setSubmittedValues(updatedValues);
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };
    

    // const handleDelete = (index) => {
    //     const updatedValues = [...submittedValues];
    //     updatedValues.splice(index, 1);
    //     setSubmittedValues(updatedValues);
    // };

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`http://localhost:4000/deleteTodo/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
            const resText = await response.text(); // Read response as text
            console.log('Response:', resText); // Log the response
            const updatedValues = submittedValues.filter(item => item.id !== id);
            setSubmittedValues(updatedValues);
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };
    


    return (
        <>
            <div className="flex justify-center">
                <div className="w-[800px] bg-slate-200">
                    <h1 className="mt-4 font-bold text-2xl">To-Do Form</h1>
                    <div className="flex flex-row justify-center">
                        <form onSubmit={handleSubmit(addTodoList)}>
                            <input type="text" placeholder="title" {...register('title', { required: 'Title is required' })}
                                className="mt-4 w-[400px] h-[44px] px-2 py-1 border border-gray-300
                                placeholder-gray-500 text-gray-700 rounded-md
                                focus:outline-none focus:ring-indigo-500
                                focus:border-indigo-500"></input>
                            <button type="submit" className="mt-4 mb-2 ml-2 px-4 h-11 w-[100px] text-white bg-violet-500 hover:bg-violet-600 rounded-md">Submit</button>
                        </form>
                    </div>
                    <div className="flex justify-center">
                        <ul>
                            {submittedValues.map((item) => (
                                <div className="flex flex-row mb-2" key={item.id}>
                                    <div className={`flex items-center justify-center rounded-md h-10 w-[500px] ${item.crossed ? 'bg-black' : 'bg-slate-500'} text-white ${item.crossed ? 'line-through' : ''}`}>
                                        <p>{item.title}{item.id}</p>
                                    </div>
                                    <button className="ml-4 h-10 w-[40px] text-white bg-green-500 hover:bg-green-600 rounded-md flex items-center justify-center" 
                                    onClick={() => handleCross(item.id,item.crossed)}
                                    >
                                        <TiTickOutline className="h-7 w-7"/>
                                    </button>
                                    <button className="ml-4 h-10 w-[40px] text-white bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center" onClick={() => handleDelete(item.id)}>
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

export default ComponentA;
