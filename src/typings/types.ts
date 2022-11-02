type Properties = Record<string, unknown> & {
  children?: Component;
};

export type Component = (properties: Properties) => string;
