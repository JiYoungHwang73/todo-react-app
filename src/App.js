import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo'
import {Paper, List, Container} from "@material-ui/core";
import './App.css';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
    };
  }
  // add 함수 추가
  add = (item) => {
    call("/todo","POST",item).then((response) =>
      this.setState({items:response.data})
    );
  }

  delete = (item) => {
    call("/todo","DELETE",item).then((response) =>
      this.setState({items:response.data})
    );
  }

  update = (item) => {
    call("/todo","PUT",item).then((response) =>
      this.setState({items:response.data})
    );
  }

  componentDidMount() {
    call("/todo","GET", null).then((response) =>
      this.setState({items:response.data})
    );
  }

  render() {
    // todoItems에 this.state.items.length가 0보다 크다면 true이므로 && 뒤에 값을 넘겨준다.
    // todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과이다. 조건선택문 ? ternary operator
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    // 생성된 컴포넌트 JSX를 리턴한다.
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;
