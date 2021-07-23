import {
  getAllByText,
  fireEvent,
} from '@testing-library/dom';

import TodoList from './TodoList.js';

describe('TodoList', () => {
  const handleDelete = jest.fn();

  function renderTodoList(todos) {
    const todoList = new TodoList({
      todos,
      onDelete: handleDelete,
    });

    document.body.appendChild(todoList);

    return todoList;
  }

  beforeEach(() => {
    const { childNodes } = document.body;

    childNodes.forEach((child) => {
      document.body.removeChild(child);
    });
  });

  it('renders todo list and delete button', () => {
    const todos = ['밥 먹기', '설거지하기', '청소하기'];
    const todoList = renderTodoList(todos);

    todos.forEach((todo) => {
      expect(todoList).toHaveTextContent(todo);
    });

    expect(todoList).toHaveTextContent('삭제');
  });

  it('listens click event', () => {
    const todos = ['밥 먹기', '설거지하기', '청소하기'];
    const todoList = renderTodoList(todos);

    fireEvent.click(getAllByText(todoList, '삭제')[0]);

    expect(handleDelete).toBeCalled();

    todos.forEach((todo) => {
      expect(todoList).toHaveTextContent(todo);
    });
  });
});
