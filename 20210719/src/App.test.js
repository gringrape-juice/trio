import {
  queryByLabelText,
  queryByText,
  getByLabelText,
  getAllByText,
  getByText,
  fireEvent,
} from '@testing-library/dom';

import App from './App.js';

import '@testing-library/jest-dom';

describe('App', () => {
  function renderApp() {
    const app = new App();

    document.body.appendChild(app);

    return app;
  }

  beforeEach(() => {
    const { childNodes } = document.body;

    childNodes.forEach((child) => {
      document.body.removeChild(child);
    });
  });

  it('render title', () => {
    const app = renderApp();

    expect(app).toHaveTextContent('Todo List');
  });

  it('renders input control', () => {
    const app = renderApp();

    expect(queryByLabelText(app, 'To-do')).not.toBeNull();
    expect(queryByText(app, '등록')).not.toBeNull();
  });

  it('adds todo', () => {
    const app = renderApp();

    const newTodo = '짝프하기';

    fireEvent.change(getByLabelText(app, 'To-do'), {
      target: {
        value: newTodo,
      },
    });

    expect(getByLabelText(app, 'To-do')).toHaveDisplayValue(newTodo);

    fireEvent.click(getByText(app, '등록'));

    expect(app).toHaveTextContent(newTodo);
  });

  it('delete todo', () => {
    const app = renderApp();

    const todo = '밥 먹기';

    fireEvent.change(getByLabelText(app, 'To-do'), {
      target: { value: todo },
    });
    fireEvent.click(getByText(app, '등록'));

    const removedTodo = getAllByText(app, '삭제')[0];

    expect(app).toHaveTextContent(todo);

    fireEvent.click(removedTodo);

    expect(app).not.toHaveTextContent(todo);
  });
});
