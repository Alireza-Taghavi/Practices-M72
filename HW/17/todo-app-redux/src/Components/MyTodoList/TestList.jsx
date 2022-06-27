import React from "react";
import {useDispatch, useSelector} from "react-redux";

export default function TodoList(){
    const {todos} = useSelector((store) => store.todos)
    const [sorted, setSorted] = React.useState([]);
    React.useEffect(() => {
        todos && setSorted(todos.sort((a , b) => {
            console.log(a);
            console.log(b)
        }))
    }, [todos]);


    return(
        <div>
            <input onChange={()=>{}}/>
            {/*{console.log(sorted)}*/}
            {/*{console.log(todos.sort((a, b) => a.name.length - b.name.length))}*/}
        </div>
    )
}