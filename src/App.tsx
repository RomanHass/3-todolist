import { v1 } from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
		{id: v1(), title: 'Redux', isDone: false},
		{id: v1(), title: 'Typescript', isDone: false},
		{id: v1(), title: 'RTK query', isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	const addTask = (taskTitle: string) => {
		setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks])
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	return (
		<div className="App">
			<Todolist title="What to learn"
			          tasks={tasksForTodolist}
			          removeTask={removeTask}
			          changeFilter={changeFilter}
								addTask={addTask} />
		</div>
	);
}

export default App;
