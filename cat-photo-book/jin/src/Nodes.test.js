import {
  fireEvent,
  getByAltText,
  queryByAltText,
} from '@testing-library/dom';

import root from '../assets/api/root.js';

import Nodes from './Nodes.js';

describe('Nodes', () => {
  const { body } = document;

  const handleClickFolder = jest.fn();

  function renderNodes() {
    const currentPath = 'root';
    const nodes = new Nodes({
      nodes: root,
      currentPath,
      onClickFolder: handleClickFolder,
    });
    body.appendChild(nodes);

    return nodes;
  }

  beforeEach(() => {
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
      const Nodes = renderNodes();

      fireEvent.click(getByAltText(Nodes, '노란고양이'));

      expect(handleClickFolder).toBeCalled();
    });
  });
});

//   it('changes directory path', () => {
//     const Nodes = renderNodes();

//     fireEvent.click(getByAltText(Nodes, '노란고양이'));
//     const nav = Nodes.querySelector('.Breadcrumb');

//     expect(nav).toHaveTextContent('root - 노란고양이');
//   });
// });

// context('when current path is root', () => {
//   it('does not render prev ', () => {
//     const Nodes = renderNodes();

//     expect(queryByAltText(Nodes, 'prev')).toBeNull();
//   });
// });
// });
