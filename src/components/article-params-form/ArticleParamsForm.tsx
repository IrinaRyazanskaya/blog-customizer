import { useCallback, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleForm = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen, setIsOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, setIsOpen]);

	const [selectedFontFamilyOption, setSelectedFontFamilyOption] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSizeOption, setSelectedFontSizeOption] = useState(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		contentWidthArr[0]
	);

	return (
		<div ref={wrapperRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFontFamilyOption}
						onChange={setSelectedFontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedFontSizeOption}
						name='radio'
						onChange={setSelectedFontSizeOption}
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
