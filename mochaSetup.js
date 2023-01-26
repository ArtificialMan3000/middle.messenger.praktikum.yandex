const { JSDOM } = require('jsdom');
const fs = require('fs');
const Handlebars = require('handlebars');

const dom = new JSDOM(
  '<!DOCTYPE html><html><body><div id="app"></div></body></html>',
  { url: 'http://localhost:3000' }
);

global.window = dom.window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
