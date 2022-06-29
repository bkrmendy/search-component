import React from "react";
import { Handler } from "./Utils";

interface InputFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  onBlur: Handler;
  onFocus: Handler;
  forwardRef: React.RefObject<HTMLInputElement>;
}

export const InputField = (props: InputFieldProps) => {
  const { onChange } = props;
  const onChangeI = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

  return (
    <input
      ref={props.forwardRef}
      value={props.value}
      onChange={onChangeI}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    />
  );
};
