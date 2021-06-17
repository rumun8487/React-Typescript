import React from "react";
import TodoItem from "./components/TodoItem";
import './index.css';

interface TodoAppProps {}
interface TodoAppState {
  todoItems: string[];
  newTodo: string;
  date:  Date;
  
}
interface IndivIdx{
  idx: number;
}

class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);
    
    this.state = {
      todoItems: [],
      newTodo: "",
      date: new Date(),
    };
  }

  handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: e.target.value,
    });
  }


  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = this.state.todoItems.concat(this.state.newTodo)

    this.setState({
      todoItems: items,
      newTodo: "",
    })
  }

  handleDelete = (index: IndivIdx) =>{
    const copy = this.state.todoItems;
    copy.splice(index.idx, 1);
    this.setState({
      todoItems:copy
    })
  }

  
 
  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleDateString()}</h2>
        <h3>TODO</h3>
        
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">뭘 해야하나요?</label> <br />
          <input type="text" id="new-todo" value={this.state.newTodo} onChange={this.handleNewTodo} placeholder= "할 일을 입력하세요 "/> <br />
          <button>Add #{this.state.todoItems.length + 1}</button>
        </form>
        <ol>
          
          {
          
          this.state.todoItems.map((item, idx) => (
            <div>
              <TodoItem name={item} key={idx}/>
              <button onClick={() => this.handleDelete({idx: idx})}>삭제</button>
            </div>
            
          ))
          

        }
        
        </ol>

      </div>
    )
  }
}

export default TodoApp;