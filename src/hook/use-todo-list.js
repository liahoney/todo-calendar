import dayjs from "dayjs";
import React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultTodoList = [
  // {
  //   id: 1,
  //   content: "운동하기",
  //   date: dayjs(),
  //   isSuccess: true,
  // },
  // {
  //   id: 2,
  //   content: "코딩하기",
  //   date: dayjs(),
  //   isSuccess: false,
  // },
  // {
  //   id: 3,
  //   content: "요리하기",
  //   date: dayjs(),
  //   isSuccess: true,
  // },
];

const TODO_LIST_KEY = 'TODO_LIST_KEY';


export const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");
  const saveTodoList = (newTodoList) => {
    setTodoList(newTodoList)
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList))
  }

  const addTodo = () => {
    const len = todoList.length ;
    const lastId = len === 0 ? 0 : todoList[len-1].id

    const newTodoList = [
        ...todoList,
        {
            id: lastId + 1,
            content: input,
            date: selectedDate,
            isSuccess: false,
          }
    ]
    saveTodoList(newTodoList);
    

  }

  const removeTodo = (todoId) => {
    const newTodoList = todoList.filter(todo => todo.id !== todoId)
    saveTodoList(newTodoList);
  }

  const toggleTodo = (todoId) => {
    const newTodoList = todoList.map(todo => {
        if(todo.id !== todoId) return todo; 
        return {
            ...todo,
            isSuccess:!todo.isSuccess,
        }
    })
    saveTodoList(newTodoList)
  }

  const resetInput = () => setInput("")

  const filteredTodoList = todoList.filter( todo => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, 'date')
    return isSameDate;
  } )

  useEffect(() => {
   init();
  },[])
  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY)
    console.log('result', typeof result, result);
    if(result) {
      const newTodoList = JSON.parse(result);
      console.log('newTodoList',typeof newTodoList, newTodoList)
       setTodoList(newTodoList)
    }
    
  }

  return {
    todoList,
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput
  }
};
