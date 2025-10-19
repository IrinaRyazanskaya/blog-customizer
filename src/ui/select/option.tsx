import clsx from "clsx";
import { useRef } from "react";
import type { MouseEventHandler } from "react";

import { Text } from "src/ui/text";
import { OptionType } from "src/constants/article-props";
import { isFontFamilyClass } from "./helpers/is-font-family-class";
import { useEnterOptionSubmit } from "./hooks/use-enter-option-submit";

import styles from "./select.module.scss";

type OptionProps = {
  option: OptionType;
  onClick: (value: OptionType["value"]) => void;
};

export const Option = (props: OptionProps) => {
  const {
    option: { value, title, optionClassName, className },
    onClick,
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: OptionType["value"]): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEnterOptionSubmit({
    optionRef,
    value,
    onClick,
  });

  return (
    <li
      className={clsx(styles.option, styles[optionClassName || ""])}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      data-testid={`select-option-${value}`}
      ref={optionRef}
    >
      <Text family={isFontFamilyClass(className) ? className : undefined}>{title}</Text>
    </li>
  );
};
