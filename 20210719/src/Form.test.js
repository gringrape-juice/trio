import {
  queryByLabelText,
  queryByText,
  getByText,
  getByLabelText,
  fireEvent,
} from '@testing-library/dom';
import Form from './Form.js';

import '@testing-library/jest-dom';

describe('Form', () => {
  const handleSubmit = jest.fn();
  function renderForm() {
    const form = new Form({
      onSubmit: handleSubmit,
    });

    document.body.appendChild(form);

    return form;
  }

  beforeEach(() => {
    const { childNodes } = document.body;

    childNodes.forEach((child) => {
      document.body.removeChild(child);
    });
  });

  it('renders input control', () => {
    const form = renderForm();

    expect(queryByLabelText(form, 'To-do')).not.toBeNull();
    expect(queryByText(form, '등록')).not.toBeNull();
  });

  it('listens events', () => {
    const form = renderForm();

    const newTodo = '짝프하기';

    fireEvent.change(getByLabelText(form, 'To-do'), {
      target: {
        value: newTodo,
      },
    });

    expect(getByLabelText(form, 'To-do')).toHaveDisplayValue(newTodo);

    fireEvent.click(getByText(form, '등록'));

    expect(handleSubmit).toBeCalled();
  });
});
