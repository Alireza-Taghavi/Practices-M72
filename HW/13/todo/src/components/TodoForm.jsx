import React, {useState, useEffect, useRef} from 'react';

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
                        Add todo
                    </button>
                </>
            )}
        </form>
    );
}

export default TodoForm;
