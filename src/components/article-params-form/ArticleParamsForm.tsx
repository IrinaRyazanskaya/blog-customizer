import { useCallback, useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import type { ArticleStateType } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	defaults: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ defaults, onApply, onReset }: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleForm = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen, setIsOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, setIsOpen]);

	const [selectedFontFamily, setSelectedFontFamily] = useState(defaults.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(defaults.fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState(defaults.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(defaults.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState(defaults.contentWidth);

	const handleFormSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();

			onApply({
				fontFamilyOption: selectedFontFamily,
				fontSizeOption: selectedFontSize,
				fontColor: selectedFontColor,
				backgroundColor: selectedBackgroundColor,
				contentWidth: selectedContentWidth,
			});
		},
		[
			onApply,
			selectedFontFamily,
			selectedFontSize,
			selectedFontColor,
			selectedBackgroundColor,
			selectedContentWidth,
		]
	);

	const handleFormReset = useCallback(() => {
		onReset();
		setSelectedFontFamily(defaults.fontFamilyOption);
		setSelectedFontSize(defaults.fontSizeOption);
		setSelectedFontColor(defaults.fontColor);
		setSelectedBackgroundColor(defaults.backgroundColor);
		setSelectedContentWidth(defaults.contentWidth);
	}, [
		onReset,
		setSelectedFontFamily,
		setSelectedFontSize,
		setSelectedFontColor,
		setSelectedBackgroundColor,
		setSelectedContentWidth,
	]);

	return (
		<div ref={wrapperRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onReset={handleFormReset} onSubmit={handleFormSubmit}>
					<Text uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFontFamily}
						onChange={setSelectedFontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
