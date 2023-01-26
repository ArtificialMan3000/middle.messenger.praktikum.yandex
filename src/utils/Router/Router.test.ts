import { expect } from 'chai';
import { IComponentConstructor } from '~/src/view/Component';
import { Router } from './Router';

describe('Router', () => {
  let mockPath: string;
  let mockComponent: IComponentConstructor;

  beforeEach(() => {
    mockPath = '/test';
    mockComponent = (() => {}) as unknown as IComponentConstructor;

    document.querySelector = () => ({});
  });

  // const mock

  it('should register route', () => {
    const router = new Router('');

    router.use(mockPath, mockComponent, {});

    expect(router.routes).to.have.lengthOf(1);
  });

  it("method 'use' should return current router instance", () => {
    const router = new Router('');

    const result = router.use(mockPath, mockComponent, {});

    expect(result).to.equal(router);
  });
});
