import React from 'react';
import './App.css';
import List from './components/List';
import Option from './components/Option';
import { TODOLIST } from './obj/lists';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      toDoList: TODOLIST,
      checkInput: "all",
      listInput: "",
      editRow: [],
      disabled: false,
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.editDesc = this.editDesc.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(event){
    this.setState({
      checkInput: event.target.value
    });
  }

  handleInputChange(event){
    this.setState({
      listInput: event.target.value
    });
  }

  handleCheck(event){
    const id = Number(event.target.value);

    this.setState(state => ({
      toDoList: state.toDoList.map(item => item.id === id? { ...item, checked: !item.checked}: item)
    }))
  }

  handleNewData(){
    const toDoList = this.state.toDoList;
    const maxId = toDoList[toDoList.length-1].id +1;

    if(this.state.listInput !== '')
    this.setState(state => ({
      listInput: "",
      toDoList: state.toDoList.concat({id: maxId, listId: "L01", desc: state.listInput, checked: false })
    }))
  }

  editDesc(desc, id){
    this.setState({
      toDoList: this.state.toDoList.map(el => (el.id === id ? Object.assign({}, el, { desc }) : el))
    })
  }

  handleDelete(event){
    const id = Number(event.target.value);
    this.setState(state => ({
      toDoList: state.toDoList.filter(item => item.id !== id)
    }))
  }


  render(){

    return(
      <div className="list-container">
        <Option handleChange={this.handleChange} />

        <List 
          toDoList={this.state.toDoList}
          editRow={this.state.editRow}
          handleCheck={this.handleCheck}
          deleteList={this.handleDelete}
          editDesc={this.editDesc}
          checkInput={this.state.checkInput} >

          <li className="list-row-show">
            <div className="list-content">
              <input 
                type="text"
                className="list-edit" 
                placeholder="Add new list"
                value={this.state.listInput}
                onChange={this.handleInputChange}
                required />
            </div>
            <div className="list-option">
              <button
                onClick={this.handleNewData}
                className="btn btn-edit">
                Save
              </button>
            </div>
          </li>

        </List>

      </div>
    )
  }
}

export default App;
