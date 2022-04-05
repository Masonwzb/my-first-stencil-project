import { Component, State, h, Fragment, Element } from '@stencil/core';

type ToDoItem = {
  text: string,
  completed: boolean
}

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @State()
  listItems = [
    { text: 'Start Lit tutorial', completed: true },
    { text: 'Make to-do list', completed: false }
  ];

  @State()
  hideCompleted = false;

  @Element() el: HTMLElement;

  private addToDo = () => {
    const inputNode: HTMLInputElement = this.el.shadowRoot.querySelector('#newitem')

    if (!inputNode.value) {
      inputNode.focus()
      return
    }

    this.listItems = [
      ...this.listItems,
      { text: inputNode.value, completed: false }
    ]
    inputNode.value = ''
  }

  private toggleCompleted = (item: ToDoItem) => {
    this.listItems = this.listItems.map(i => {
      if(item.text === i.text) {
        Object.assign(i, { completed: !item.completed })
      }
      return i
    })
  }

  private setHideCompleted = (e: Event) => {
    this.hideCompleted = (e.target as HTMLInputElement).checked;
  }

  render() {
    const items = this.hideCompleted
      ? this.listItems.filter((item) => !item.completed)
      : this.listItems;

    const todos = (<ul>
      {items.map((item) =>  (
        <li class={item.completed ? 'completed' : ''} onClick={() => this.toggleCompleted(item)}>{item.text}</li>
      ))}
    </ul>);

    const caughtUpMessage = <p>You're all caught up!</p>;
    const todosOrMessage = items.length > 0
      ? todos
      : caughtUpMessage;

    return (
      <Fragment>
        <h2>To Do</h2>
        {todosOrMessage}
        <input id="newitem" aria-label="New item" /> <button onClick={this.addToDo}>Add</button>
        <br />
        <label>
          <input type="checkbox" onChange={this.setHideCompleted} checked={this.hideCompleted}/>
          Hide completed
        </label>
      </Fragment>
    );
  }

}
