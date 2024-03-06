const addTodoList = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/addtodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            const responseData = await response.text();
            console.log(responseData);
            setSubmittedValues([...submittedValues, { title: data.title, complete: data.complete }]);
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
            setSubmittedValues(responseData);
        } catch (error) {
            console.error('Error fetching todos:', error.message);
        }
    };

    const handleCross = async (id, crossed) => {
        try {
            const response = await fetch(`http://localhost:4000/updatetodo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ complete: !crossed }),
            });
            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            const updatedValues = submittedValues.map(item =>
                item.id === id ? { ...item, complete: !crossed } : item
            );
            setSubmittedValues([...updatedValues]); // Force re-render by creating a new array reference
        } catch (error) {
            console.error('Error updating todo:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/deleteTodo/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete todo');
            }
            const updatedValues = submittedValues.filter(item => item.id !== id);
            setSubmittedValues(updatedValues);
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };
