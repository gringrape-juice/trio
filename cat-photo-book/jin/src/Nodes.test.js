import {
  fireEvent,
  getByAltText,
} from '@testing-library/dom';

import root from '../assets/api/root.js';

import Nodes from './Nodes.js';

describe('Nodes', () => {
  const { body } = document;

  const handleClickFolder = jest.fn();
  const handleClickPrev = jest.fn();

  function renderNodes({ currentPath } = {}) {
    const nodes = new Nodes({
      nodes: root,
      currentPath,
      onClickFolder: handleClickFolder,
      onClickPrev: handleClickPrev,
    });
    body.appendChild(nodes);

    return nodes;
  }

  beforeEach(() => {
    handleClickFolder.mockClear();

    const { childNodes } = document.body;

    childNodes.forEach((child) => {
      document.body.removeChild(child);
    });
  });

  it('renders file and folder', () => {
    const nodes = renderNodes();

    expect(nodes).toHaveTextContent('노란고양이');
    expect(nodes).toHaveTextContent('까만고양이');
  });

  context('when click folder', () => {
    it('renders its files and folders', () => {
      const nodes = renderNodes();

      fireEvent.click(getByAltText(nodes, '노란고양이'));

      expect(handleClickFolder).toBeCalled();
    });
  });

  it('listens "prev" button click event', () => {
    const nodes = renderNodes({ currentPath: 'not-root' });

    fireEvent.click(getByAltText(nodes, 'prev'));

    expect(handleClickPrev).toBeCalled();
  });
});
