import { expect } from 'chai';
import { Component } from './Component';

describe('Component tests', () => {
  class MockedComponent extends Component {
    render() {
      return new DocumentFragment();
    }
  }

  it('should create component', () => {
    expect(() => new MockedComponent({})).not.to.throw();
  });

  it('should update props', () => {
    const instance = new MockedComponent({});

    instance.setProps({ a: 'b' });

    expect(instance.props.a).to.equal('b');
  });
});
