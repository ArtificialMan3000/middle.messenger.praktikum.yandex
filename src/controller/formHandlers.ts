import { outputForm } from '~src/model/features/outputForm';

export const submitFormHandlers = [
  (evt: Event) => {
    evt.preventDefault();
    if (evt.target) {
      outputForm(evt.target as HTMLFormElement);
    }
  },
];
