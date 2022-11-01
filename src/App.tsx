import React, { useEffect, useState } from 'react';
import Todo from './components/Todos';
import './styles/style.scss'

export type DataType = {
  id: number | Date
  title: string
  isCompleted: boolean
  category?: number
}
type TagsType = {
  title: string
}


const data = [
  {
    id: 1,
    title: 'Откликнуться на вакансию',
    isCompleted: true,
    category: 2
  },
  {
    id: 2,
    title: 'Сделать тестовое задание',
    isCompleted: true,
    category: 2
  },
  {
    id: 3,
    title: 'Устроиться на работу',
    isCompleted: false,
    category: 0
  },

]

const tags = [
  { title: 'Все' },
  { title: 'Активные' },
  { title: 'Выполненные' },
]

type Props = {

}

const App: React.FC<Props> = () => {
  const [editMode, setEditMode] = useState(false)
  const [todos, setTodos] = useState<DataType[]>(data)
  const [tagsId, setTagsId] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [itemsLeft, setItemsLeft] = useState(todos.length)
  const [toggleState, setToggleState] = useState(0)


  useEffect(() => {
    const copy = [...todos]
    let result = copy.filter(t => t.isCompleted === false)
    setItemsLeft(result.length)
  }, [todos.length])

  const handleClick = (id: number) => {
    const copy = [...todos]
    let current = copy.find(t => t.id === id)
    if (current !== undefined) {
      current.isCompleted = !current.isCompleted
      if (current.category === 0 || current.category === 1) {
        current.category = 2
      } else {
        current.category = 0
      }
    }
    setTodos(copy)
    let result = copy.filter(t => t.isCompleted === false)
    setItemsLeft(result.length)
  }

  const addTodo = (title: string) => {
    setTodos([{
      id: new Date(),
      title,
      isCompleted: false,
      category: 0
    },
    ...todos])
    setInputValue('')
  }

  const removeTodo = () => {
    setTodos([...todos].filter(todo => todo.isCompleted === false))
  }

  const categoryChange = (index: number) => {
    setTagsId(index)
    setToggleState(index)
  }



  return (
    <div className="app">
      <div className="app__top">
        <div className="app__triangle">
          {!editMode
            ? <svg onClick={() => setEditMode(true)} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 10l6 6l6 -6h-12"></path>
            </svg>
            : <svg onClick={() => setEditMode(false)} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 14l-6 -6l-6 6h12"></path>
            </svg>
          }
        </div>
        <input
          type="text"
          className="app__input"
          placeholder='Что должно быть сделано?'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo(inputValue)}
        />
      </div>
      {toggleState === 0 && <>{!editMode && <>{todos.map((todo) => <Todo
        key={todo.id as number}
        todo={todo}
        isCompleted={todo.isCompleted}
        clicked={() => handleClick(todo.id as number)} />
      )}</>}</>}
      {toggleState === 1 && <>{!editMode && <>{todos
        .filter(todo => todo.isCompleted === false)
        .map((todo) => <Todo
          key={todo.id as number}
          todo={todo}
          isCompleted={todo.isCompleted}
          clicked={() => handleClick(todo.id as number)} />
        )}</>}</>}
      {toggleState === 2 && <>{!editMode && <>{todos
        .filter(todo => todo.category === 2)
        .map((todo) => <Todo
          key={todo.id as number}
          todo={todo}
          isCompleted={todo.isCompleted}
          clicked={() => handleClick(todo.id as number)} />
        )}</>}</>}
      <div className="app__bottom">
        <div className="app__left">Осталось выполнить {itemsLeft}</div>
        <ul className="app__tags">
          {tags.map((tag, index) => <li
            key={tag.title}
            className={tagsId === index ? "app__tag active" : "app__tag"}
            onClick={() => categoryChange(index)}
          >
            {tag.title}</li>
          )}
        </ul>
        <div onClick={removeTodo} className="app__clear">Очистить готовые</div>
      </div>
    </div>
  );
}

export default App;
