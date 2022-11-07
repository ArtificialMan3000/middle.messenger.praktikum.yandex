export const outputForm = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  /* eslint-disable no-console */
  console.log('Данные формы:');
  Array.from(formData.entries()).forEach(([key, value]) =>
    console.log(key, ':', value)
  );
  /* eslint-enable */
};
