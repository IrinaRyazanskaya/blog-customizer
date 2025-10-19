import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import clsx from "clsx";

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
} from "src/constants/article-props";
import type { ArticleStateType } from "src/constants/article-props";
import { ArrowButton } from "src/ui/arrow-button";
import { Button } from "src/ui/button";
import { RadioGroup } from "src/ui/radio-group";
import { Select } from "src/ui/select";
import { Separator } from "src/ui/separator";
import { Text } from "src/ui/text";

import styles from "./article-params-form.module.scss";

export type ArticleParamsFormProps = {
  defaults: ArticleStateType;
  setArticleState: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ defaults, setArticleState }: ArticleParamsFormProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [selectedFontFamily, setSelectedFontFamily] = useState(defaults.fontFamilyOption);
  const [selectedFontSize, setSelectedFontSize] = useState(defaults.fontSizeOption);
  const [selectedFontColor, setSelectedFontColor] = useState(defaults.fontColor);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(defaults.backgroundColor);
  const [selectedContentWidth, setSelectedContentWidth] = useState(defaults.contentWidth);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setArticleState({
      fontFamilyOption: selectedFontFamily,
      fontSizeOption: selectedFontSize,
      fontColor: selectedFontColor,
      backgroundColor: selectedBackgroundColor,
      contentWidth: selectedContentWidth,
    });
  };

  const handleFormReset = () => {
    setArticleState(defaults);
    setSelectedFontFamily(defaults.fontFamilyOption);
    setSelectedFontSize(defaults.fontSizeOption);
    setSelectedFontColor(defaults.fontColor);
    setSelectedBackgroundColor(defaults.backgroundColor);
    setSelectedContentWidth(defaults.contentWidth);
  };

  return (
    <div ref={wrapperRef}>
      <ArrowButton isOpen={isOpen} onClick={toggleForm} />
      <aside className={clsx(styles.container, isOpen && styles.container_open)}>
        <form className={styles.form} onReset={handleFormReset} onSubmit={handleFormSubmit}>
          <Text uppercase as="h2" size={31} weight={800}>
            Задайте параметры
          </Text>
          <Select
            selected={selectedFontFamily}
            onChange={setSelectedFontFamily}
            options={fontFamilyOptions}
            title="Шрифт"
          />
          <RadioGroup
            selected={selectedFontSize}
            name="radio"
            onChange={setSelectedFontSize}
            options={fontSizeOptions}
            title="Размер шрифта"
          />
          <Select
            selected={selectedFontColor}
            onChange={setSelectedFontColor}
            options={fontColors}
            title="Цвет шрифта"
          />
          <Separator />
          <Select
            selected={selectedBackgroundColor}
            onChange={setSelectedBackgroundColor}
            options={backgroundColors}
            title="Цвет фона"
          />
          <Select
            selected={selectedContentWidth}
            onChange={setSelectedContentWidth}
            options={contentWidthArr}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
