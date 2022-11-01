declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';
  const tpl: TemplateDelegate;

  export default tpl;
}
