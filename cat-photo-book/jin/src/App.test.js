import {
  fireEvent,
  getByAltText,
  queryByAltText,
} from '@testing-library/dom';

import App from './App.js';

describe('App', () => {
  const { body } = document;

  function renderApp() {
    const app = new App();
    body.appendChild(app);

    return app;
  }

  beforeEach(() => {
    const { childNodes } = document.body;

    childNodes.forEach((child) => {
      document.body.removeChild(child);
    });
  });

  it('renders title', () => {
    const app = renderApp();

    expect(app).toHaveTextContent('고양이 사진첩');
  });

  it('renders file and folder', () => {
    const app = renderApp();

    expect(app).toHaveTextContent('노란고양이');
    expect(app).toHaveTextContent('까만고양이');
  });

  context('when click folder', () => {
    it('renders its files and folders', () => {
      const app = renderApp();

      fireEvent.click(getByAltText(app, '노란고양이'));

      expect(app).toHaveTextContent('2021/04');
      expect(app).toHaveTextContent('물 마시는 사진');
    });

    it('changes directory path', () => {
      const app = renderApp();

      fireEvent.click(getByAltText(app, '노란고양이'));
      const nav = app.querySelector('.Breadcrumb');

      expect(nav).toHaveTextContent('root - 노란고양이');
    });
  });

  context('when current path is root', () => {
    it('does not render prev ', () => {
      const app = renderApp();

      expect(queryByAltText(app, 'prev')).toBeNull();
    });
  });

  context('when click prev', () => {
    it('changes history', () => {
      const app = renderApp();
      const nav = () => app.querySelector('.Breadcrumb');

      fireEvent.click(getByAltText(app, '노란고양이'));
      expect(nav()).toHaveTextContent('root - 노란고양이');

      fireEvent.click(getByAltText(app, 'prev'));
      expect(nav()).not.toHaveTextContent('노란고양이');
    });
  });
});
