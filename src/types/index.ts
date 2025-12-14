export interface Generator {
  meta?: {
    description?: string;
  };
  run: (args: string[]) => Promise<void>;
}

export interface TemplateContext {
  name: string;
  Name: string;
  NAME: string;
  name_snake: string;
  name_kebab: string;
  [key: string]: any;
}