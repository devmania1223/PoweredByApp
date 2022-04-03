export interface NumberInputOptions {
  placeholder: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
}

export const defaultNumberInputOptions: NumberInputOptions = {
  placeholder: 'Value',
  value: undefined,
  min: -Infinity,
  max: Infinity,
  suffix: '',
};
