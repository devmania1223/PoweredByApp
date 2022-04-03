export interface AutocompleteOptions<T = any> {
  placeholder: string;
  value: T;
  options: T[];
  saveButtonText: string;
  displayFn: (val: T) => string;
  filterFn: (search: string, options: T[]) => T[];
  subTextFn: (val: T) => string;
}

export const defaultAutocompleteOptions: AutocompleteOptions<any> = {
  placeholder: 'Value',
  value: undefined,
  options: [],
  saveButtonText: 'Save',
  displayFn: (val): any => val,
  filterFn: undefined,
  subTextFn: undefined,
};
