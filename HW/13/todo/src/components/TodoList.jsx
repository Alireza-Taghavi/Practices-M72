import React, {useState, useEffect, useRef} from 'react';
import {TiEdit} from "react-icons/ti";
import {RiCloseCircleLine} from "react-icons/ri";


function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(...todos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const [title, setTitle] = useState('');

    const randomHeader = () => {
        const headers = [
            "Gonna do your first Push-up after 7 years?",
            "Feelin' Productive today?",
            "Hassani never went to Maktab",
            "A list of things you will definitely do ;)",
            "It's never too soon to write a bucket-list"
        ]
        return headers[Math.floor(Math.random() * headers.length)];
    }
    useEffect(() => {
        setTitle(randomHeader())
    }, [])


    function TodoForm(props) {
        const [input, setInput] = useState(props.edit ? props.edit.value : '');

        const inputRef = useRef(null);

        useEffect(() => {
            inputRef.current.focus();
        });

        const handleChange = e => {
            setInput(e.target.value);
        };
        const rngNumber = () => {
            return Math.floor(Math.random() * (255))
        }
        const rngSmallerNumber = () => {
            return Math.floor(Math.random() * (100))
        }
        const randomBG = () => {
            let r = rngNumber()
            let g = rngNumber()
            let b = rngNumber()
            while ((r + g + b) > 510) {
                r = rngNumber()
                g = rngNumber()
                b = rngNumber()
            }
            const rgba = `rgba(${r},${g},${b},0.8)`
            const rgba2 = `rgba(${r + rngSmallerNumber()},${g + rngSmallerNumber()},${b + rngSmallerNumber()},0.8)`
            return [rgba, rgba2]
        }
        const handleSubmit = e => {
            e.preventDefault();

            props.onSubmit({
                id: Math.floor(Math.random() * 10000),
                text: input,
                bg: randomBG()
            });
            setInput('');
        };

        return (
            <form onSubmit={handleSubmit} className='todo-form'>
                {props.edit ? (
                    <>
                        <input
                            placeholder='Update your item'
                            value={input}
                            onChange={handleChange}
                            name='text'
                            ref={inputRef}
                            className='todo-input edit'
                        />
                        <button onClick={handleSubmit} className='todo-button edit'>
                            Update
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            placeholder='Add a todo'
                            value={input}
                            onChange={handleChange}
                            name='text'
                            className='todo-input'
                            ref={inputRef}
                        />
                        <button onClick={handleSubmit} className='todo-button'>
                            Add Todo
                        </button>
                    </>
                )}
            </form>
        );
    }

    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });
    const Todo = ({todos, completeTodo, removeTodo, updateTodo}) => {

        const submitUpdate = (value) => {
            updateTodo(edit.id, value);
            setEdit({
                id: null,
                value: "",
            });
        };

        return (<>
                {(edit.id) ? (<TodoForm edit={edit} onSubmit={submitUpdate}/>) : (<TodoForm onSubmit={addTodo}/>)}

                {(todos.map((todo, index) => (
                    <div
                        className={todo.isComplete ? "todo-row complete" : "todo-row"}
                        key={index}
                        style={{background: `linear-gradient(80deg,${todo.bg[0]} 0%,${todo.bg[1]} 100%)`}}
                    >
                        <p key={todo.id} onClick={() => completeTodo(todo.id)}>
                            {todo.text}
                        </p>
                        <div className="icons">

                            <TiEdit
                                onClick={() => setEdit({id: todo.id, value: todo.text})}
                                className="edit-icon"
                            />
                            <RiCloseCircleLine
                                onClick={() => removeTodo(todo.id)}
                                className="delete-icon"
                            />
                        </div>
                    </div>

                )))}
            </>
        )


    };


    return (
        <>
            <h1>{title}</h1>
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />

        </>
    );
}

export default TodoList;
