type Props = Record<string, unknown> & {
  children?: Component;
};

export type Component = (props: Props) => string;
