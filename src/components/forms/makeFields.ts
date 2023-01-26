import {
  setValidityStatus,
  validationRules,
} from '~/src/controller/fieldValidation';
import { TComponentPropsType } from '~/src/typings/utils';
import { Field } from '../Field';

type TFieldData = {
  type?: string;
  id: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
};

export const makeFields = (
  fieldsData: TFieldData[],
  additionalProps?: Record<string, unknown>
) => {
  return fieldsData.map((fieldData) => {
    const fieldProps: TComponentPropsType<Field> = {
      type: fieldData.type,
      id: fieldData.id,
      name: fieldData.name,
      label: fieldData.label,
      value: fieldData.value,
      placeholder: fieldData.placeholder,
      ...additionalProps,
    };
    if (validationRules[fieldData.name]) {
      fieldProps.onFocus = (evt: Event) => {
        setValidityStatus(evt.target as HTMLInputElement);
      };
      fieldProps.onBlur = (evt: Event) => {
        setValidityStatus(evt.target as HTMLInputElement);
      };
      fieldProps.validationText = validationRules[fieldData.name].description;
    }
    return new Field(fieldProps);
  });
};
