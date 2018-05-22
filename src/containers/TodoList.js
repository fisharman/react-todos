import React, { Component } from 'react';
import { VisibilityFilters as VF } from '../actions';

const AddTodo = (props) => (
        <form onSubmit={props.onSubmit} style={{marginTop:'1em'}}>
            <input type='text' value={props.value} onChange={props.onChange}/>
            <button>Add Todo</button>
        </form>   
)

const List = (props) => {
    if (props.list) {
        return (
            <ul style={{display: 'inline-block', textAlign: 'left'}}>
            {props.list.map((todo, idx) => (
                <Todo key={idx} {...todo} onClick={props.onClick(idx)}/>
            ))}
            </ul>
        );
    }
}


const Todo = ({onClick, value, completed}) => (
    <li
    onClick={onClick}
    style={{textDecoration: completed ? 'line-through' : 'none' }}
    >
        {value}
    </li>
)

const DisplayOptions = ({onClick, show}) => {
    const shouldDisable = filter => {
        return show === filter ? true : false;
    } 

    return (
        <div>
            <span>Show: </span>
            <Filter onClick={onClick(VF.SHOW_ALL)} disabled={shouldDisable(VF.SHOW_ALL)}>
                All
            </Filter>
            <Filter onClick={onClick(VF.SHOW_ACTIVE)} disabled={shouldDisable(VF.SHOW_ACTIVE)}>
                Active
            </Filter>
            <Filter onClick={onClick(VF.SHOW_COMPLETE)} disabled={shouldDisable(VF.SHOW_COMPLETE)}>
                Completed
            </Filter>
        </div>
    );
}

const Filter = ({children, disabled, onClick}) => (
    <button
        disabled={disabled}
        onClick={onClick}
        style={{marginLeft: '4px'}}
    >
        {children}
    </button>
)

class TodoList extends Component {
    constructor(){
        super();
        this.state = {
            list : [],
            show: "all",
            nextTaskName: ''
        };
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.nextTaskName.trim()){
            this.setState(prevState => (
                {list : prevState.list.concat({value: prevState.nextTaskName, completed: false}),
                nextTaskName: ''}
            ))
        }
    }

    handleChange = (e) => {
        this.setState({nextTaskName: e.target.value})
    }

    handleTodoClick = idx => () =>
    (this.setState(prevState => 
        ({list: [
            ...prevState.list.slice(0,idx),
            {...prevState.list[idx],
                completed: true},
            ...prevState.list.slice(idx+1)
            ]})
        )
    );

    handleFilter = filterType => () => (
        this.setState(prevState => (
            { show: filterType }
        ))
    )

    render(){
        let currentList;
        switch(this.state.show){
            case(VF.SHOW_ALL):
                currentList = this.state.list;
                break;
            case(VF.SHOW_ACTIVE):
                currentList = this.state.list.filter(todo => !todo.completed)
                break;
            case(VF.SHOW_COMPLETE):
                currentList = this.state.list.filter(todo => todo.completed)
                break;
            default:
                throw new Error("Unknown Filter" + this.state.show)
        }

        return (
            <div>
                <AddTodo
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                value={this.state.nextTaskName}
                />
                <List
                    list={currentList}
                    onClick={this.handleTodoClick}
                 />
                 <DisplayOptions onClick={this.handleFilter} show={this.state.show}/>
            </div>
        );
    }
}

export default TodoList;
