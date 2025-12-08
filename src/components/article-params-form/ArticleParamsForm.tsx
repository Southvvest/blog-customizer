import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
  onReset: () => void;
  defaultState: ArticleStateType;
};

export const ArticleParamsForm = ({ onApply, onReset, defaultState }: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultState);
  const formRef = useRef<HTMLDivElement>(null);

  // Обработчик закрытия формы при клике вне ее
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleApply = () => {
    onApply(formState);
  };

  const handleFormReset = () => {
    setFormState(defaultState);
    onReset();
  };

  return (
      <>
    <ArrowButton isOpen={isOpen} onClick={handleToggle} />
    <aside className={clsx(styles.container, isOpen && styles.container_open)} ref={formRef}>
      <div className={styles.form}>
        <h2 className={styles.title}>задайте параметры</h2>
        
        <div className={styles.sectionsContainer}>
          <div className={styles.section}>
            <Select
              title="Шрифт"
              selected={formState.fontFamilyOption}
              options={fontFamilyOptions}
              onChange={(option) => setFormState({ ...formState, fontFamilyOption: option })}
            />
            <RadioGroup
              title="Размер шрифта"
              name="fontSize"
              selected={formState.fontSizeOption}
              options={fontSizeOptions}
              onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
            />
            <Select
              title="Цвет шрифта"
              selected={formState.fontColor}
              options={fontColors}
              onChange={(option) => setFormState({ ...formState, fontColor: option })}
            />
          </div>
          
          <div className={styles.separatorWrapper}>
            <Separator />
          </div>
          
          <div className={styles.section}>
            <Select
              title="Цвет фона"
              selected={formState.backgroundColor}
              options={backgroundColors}
              onChange={(option) => setFormState({ ...formState, backgroundColor: option })}
            />
            <Select
              title="Ширина контента"
              selected={formState.contentWidth}
              options={contentWidthArr}
              onChange={(option) => setFormState({ ...formState, contentWidth: option })}
            />
          </div>
        </div>
        
        <div className={styles.bottomContainer}>
          <Button title="Сбросить" type="clear" onClick={handleFormReset} />
          <Button title="Применить" type="apply" onClick={handleApply} />
        </div>
      </div>
    </aside>
  </>
  );
};