import { expect } from 'chai';
import { describe } from 'mocha';
import { set } from './functions';

describe('Utils functions', () => {
  describe('set', () => {
    let obj: object;
    let path: string;
    let value: unknown;

    beforeEach(() => {
      obj = {};
      path = 'a.b';
      value = 3;
    });

    it('should return first parameter, if it is not object', () => {
      // Arrange
      const thisObj = 1;

      // Act
      const result = set(thisObj, 'a.b', value);

      // Assert
      expect(result).to.equal(obj);
    });

    it('should return null, if null passed as first parameter', () => {
      const thisObj = null;

      const result = set(thisObj, 'a.b', value);

      expect(result).to.equal(obj);
    });

    it('should throw an error if path is not a string', () => {
      const thisPath = 1 as any;

      const fn = () => set(obj, thisPath, value);

      expect(fn).to.throw(Error);
    });

    it('should assign passed value in passed object by passed path', () => {
      const result = set(obj, path, value);

      expect((result as any).a.b).to.equal(value);
    });

    it('should not return new object', () => {
      const result = set(obj, path, value);

      expect(result).to.equal(obj);
    });
  });

  describe('isEqual', () => {});
});
