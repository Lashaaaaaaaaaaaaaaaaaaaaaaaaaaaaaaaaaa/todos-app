import { PureComponent } from "react";
import TodoList from './TodoList';   
import DoneTasks from './DoneTasks'; 

class ClassTodo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],         
            currentTask: '',    
            doneTasks: []     
        }
    }

    handleonChange = (event) => {
        this.setState({ currentTask: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const newTask = {
            task: this.state.currentTask,
            done: false
        }

        if (this.state.currentTask.trim() !== "") {
            const tasks = [...this.state.tasks, newTask]
            this.setState({ tasks, currentTask: "" })
        }
    }

    handleDelete = (index) => {
        const tasks = [...this.state.tasks]
        tasks.splice(index, 1)
        this.setState({ tasks })
    }

    handleDone = (index) => {
        const { tasks, doneTasks } = this.state
        const updatedTasks = [...tasks]
        const completedTask = updatedTasks.splice(index, 1)[0]
        completedTask.done = true
        const completedDoneTasks = [...doneTasks, completedTask]
        this.setState({ tasks: updatedTasks, doneTasks: completedDoneTasks })
    }

    handleDoneDelete = (index) => {
        const doneTasks = [...this.state.doneTasks]
        doneTasks.splice(index, 1)
        this.setState({ doneTasks })
    }

    handleReset = (index) => {
        const { tasks, doneTasks } = this.state
        const resetTask = doneTasks.splice(index, 1)[0]
        const updatedTasks = [...tasks, resetTask]
        this.setState({ tasks: updatedTasks, doneTasks })
    }

    render() {
        const { tasks, currentTask, doneTasks } = this.state
        return (
            <div>
                <h1>Todo App</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="enter a task"
                        onChange={this.handleonChange}
                        value={currentTask}
                    />
                    <button type="submit">add task</button>
                </form>

                
                <TodoList
                    tasks={tasks}
                    handleDelete={this.handleDelete}
                    handleDone={this.handleDone}
                />

                
                <h1>done tasks</h1>
                <DoneTasks
                    doneTasks={doneTasks}
                    handleDoneDelete={this.handleDoneDelete}
                    handleReset={this.handleReset}
                />
            </div>
        )
    }
}

export default ClassTodo;
