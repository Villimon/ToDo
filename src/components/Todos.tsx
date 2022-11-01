import React from 'react';
import { DataType } from '../App';


type Props = {
    todo: DataType
    isCompleted: boolean
    clicked: React.MouseEventHandler<HTMLDivElement>
}


const Todo: React.FC<Props> = ({ todo, isCompleted, clicked }) => {
    return (
        <div className="todo">
            <div className={isCompleted
                ? "todo__completed completed"
                : "todo__completed"
            } onClick={clicked} >

            </div>
            <div className={isCompleted
                ? "todo__title completed"
                : "todo__title "
            }>
                {todo.title}</div>
        </div>
    );
}

export default Todo;
