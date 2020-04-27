import React, { Component } from 'react'

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            tasks: [], //este lo agregue para que el componentDidMount() lo llene con los datos de mi base y lo plasme en el formulario cuando arranca la app
            _id: ""
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this)
    };

    handleChange(e){ //modifica el estado que luego sera POSTEADO//
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    addTask(e) {
        if ( this.state._id) {
            fetch("/api/tasks" + id,{
                method:"UPDATE",
                body: JSON.stringify(this.state),
                headers: {
                    'accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: "task updated"})
                this.setState({title: "" , description: "" , _id: "" })
                this.fetchTask()
            })
        } else {
            fetch('/api/tasks',{//aca lo que pongo es "Postman"
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
                M.toast({html: 'task saved'})//mensaje de guardado
                this.setState({title : "", description: ""})//vuelve en blanco el formulario
                this.fetchTask()// esto es para que cuando agregue tareas automaticamente se actualize el formulario
            .catch(err => console.error(err))

        }
        e.prevenDefault()
    }

    deleteTask(id){
     if(confirm('are you sure you want to deleted')){
        fetch("/api/tasks/" + id, {
            method: "DELETE",
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: "task deleted"})
            this.fetchTask()
        })
      }
    }

    editTask(id) {
        fetch("/api/tasks" + id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                title: data.title,
                description: data.description,
                id:  data._id
            })
        })
    }

    componentDidMount(){
        this.fetchTask();//esto es para que aparesca, cuando es montado el componente, todos lo datos de la base en el formulario sl lado del login
    }    

    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json)
        .then(data => {
            this.setState({tasks:data})
        });
    }

    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/"> MERN Stack</a>
                    </div>
                </nav>
            
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text"
                                                    name="title" //importante
                                                    onChange={this.handleChange} //importante
                                                    value={this.state.title} //importante
                                                    placeholder="task title"
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea 
                                                    placeholder="task description" 
                                                    name="description" //importante
                                                    onChange={this.handleChange}//importante
                                                    value={this.state.description} // importante
                                                    className=" materialize-textarea"> 
                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick ={() => this.deleteTask(task._id)}>
                                                            Delete
                                                        </button>
                                                        <button onClick={() => editTask(task._id)}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};
export default App;