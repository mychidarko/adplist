import { render } from '@testing-library/react';
import { Button } from '../src';

describe('<Component /> spec', () => {
  it('renders the component', () => {
    const h = render(<Button>Hello</Button>);
    expect(h.container.firstChild).toMatchSnapshot();
  });
});
