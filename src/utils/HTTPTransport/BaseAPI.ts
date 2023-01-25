export class BaseAPI {
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';

  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(...args: unknown[]) {
    throw new Error('Not implemented');
  }

  read(...args: unknown[]) {
    throw new Error('Not implemented');
  }

  update(...args: unknown[]) {
    throw new Error('Not implemented');
  }

  delete(...args: unknown[]) {
    throw new Error('Not implemented');
  }
}
