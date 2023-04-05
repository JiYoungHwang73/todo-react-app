import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, title: "Todo 1 ", done: true },
        { id: 1, title: "Todo 2 ", done: false },
      ],
    };
  }

  // add 함수 추가
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;   // key를 위한 id 추가
    item.done = false;
    thisItems.push(item);
    this.setState({ items: thisItems }); // update state
    console.log("items: ", this.state.items);
  }

  // delete 함수 추가
  delete = (item) => {
    const thisItems = this.state.items;
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      // 디버깅 콜백
      console.log("Update Items: ", this.state.items);
    });
  }

  render() {
    // todoItems에 this.state.items.length가 0보다 크다면 true이므로 && 뒤에 값을 넘겨준다.
    // todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과이다. 조건선택문 ? ternary operator
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete}/>
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