export type TParam = {
  param: string;
};

export type THydratedParams = Record<string, string>;

export type TParsedTemplate = (string | TParam)[];

export type TParts = string[];
