import React, { useState } from 'react';
import TodoForm from'./TodoForm';
import Todo from './Todo';

function TodoList() {
    const [ todos, setTodos ] = useState([]);
    const addTodo = todo => { // addTOdo는 입력된 텍스트를 useState에 데이터값으로 저장하는 함수다.
        if(!todo.text || /^\s*$/.test(todo.text)){ // input에 글자가 아닌 것을 입력 시 표시하지 않겠다는 코드.
            return;
        }
        const newTodos = [ todo, ...todos ]; // todos의 값들을 배열에 넣어 newTodos라는 변수에 복사.
        setTodos(newTodos); // 위에 저장된 todos를 useState 배열에 데이터값으로 저장.
        console.log(...todos);
    }

    //아래 Todo컴포넌트에 들어있는 props값을 아래와 같이 정의한다.
    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    } 
    //아래 Todo컴포넌트에 들어있는 props값을 아래와 같이 정의한다.
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removeArr);
    }
    //아래 Todo컴포넌트에 들어있는 props값을 아래와 같이 정의한다.
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos);
    }

    return (
        <div>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo 
            todos={todos} 
            completeTodo={completeTodo} 
            removeTodo={removeTodo} 
            updateTodo={updateTodo}
            />
        </div>
    )
}

export default TodoList
