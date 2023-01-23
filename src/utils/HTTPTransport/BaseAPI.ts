export class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(...args: unknown[]) {
    throw new Error('Not implemented');
  }

  read(...args: unknown[]) {
    throw new Error('Not implemented');
  }

  update() {
    throw new Error('Not implemented');
  }

  delete() {
    throw new Error('Not implemented');
  }
}
