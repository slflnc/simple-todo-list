import React from 'react';
import './App.css';
import { Component } from 'react';
class App extends Component{

constructor(props){
  super(props);
  this.state={
    notes:[]
  }
}

API_URL="http://localhost:3000/"

componentDidMount(){
  this.refreshNotes();
}

async refreshNotes(){
  fetch(this.API_URL+"api/todoapp/GetNotes").then(response=>response.json())
  .then(data=>{
    this.setState({notes:data});
  })
}

async addclick(){
  var newNotes=document.getElementById("newNotes").value;
  const data=new FormData();
  data.append("newNotes",newNotes);

  fetch(this.API_URL+"api/todoapp/AddNotes",{
    method: "POST",
    body:data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

async deleteclick(id){
  var newNotes=document.getElementById("newNotes").value;
  const data=new FormData();
  data.append("newNotes",newNotes);

  fetch(this.API_URL+"api/todoapp/DeleteNotes?id="+id,{
    method: "DELETE",
    body:data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

render() {
  const{notes}=this.state;
  return (
    <div className="App">
      <h2>To do list</h2>
        <input id='newNotes'/>&nbsp;
        <button onClick={()=>this.addclick()}>Add Notes</button>
      {notes.map(note=>
        <p key={note.id}>
          <b className='entries'>* {note.description}</b>&nbsp;
          <button className='delete' onClick={()=>this.deleteclick(note.id)}>Delete Notes</button>
        </p>
        )}
    </div>
  );
}
}
export default App;
