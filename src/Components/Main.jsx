import React, { useEffect, useState } from 'react'
import Tasks from './Tasks'

const Main = () => {

    const initial = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []

    const [tasks, setTasks] = useState(initial)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const Submit = (e) => {
        e.preventDefault()
        setTasks([...tasks, { title, desc }])
        setTitle('')
        setDesc('')
    }
    const deleteTask = (index) => {
        const filterTasks = tasks.filter((val, i) => {
            return index !== i
        })
        setTasks(filterTasks)
    }
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])
    return (
        <div className='main'>
            <h1>Daily Goals</h1>
            <form onSubmit={Submit}>
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title' />
                <textarea
                    placeholder='Description'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}></textarea>
                <button type='submit'>Submit</button>
            </form>
            {
                tasks.map((item, index) => (
                    <Tasks key={index}
                        title={item.title}
                        desc={item.desc}
                        index={index}
                        deleteTask={deleteTask} />
                ))
            }
        </div>
    )
}

export default Main
