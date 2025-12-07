import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  // Состояние темы теперь хранится здесь
  const [currentArticleState, setCurrentArticleState] = useState(defaultArticleState);

  // Функция для применения стилей
  const applyStyles = (state: ArticleStateType) => {
    const root = document.documentElement;
    root.style.setProperty('--font-family', state.fontFamilyOption.value);
    root.style.setProperty('--font-size', state.fontSizeOption.value);
    root.style.setProperty('--font-color', state.fontColor.value);
    root.style.setProperty('--container-width', state.contentWidth.value);
    root.style.setProperty('--bg-color', state.backgroundColor.value);
    // Обновляем состояние
    setCurrentArticleState(state);
  };

  // Функция для сброса стилей
  const handleReset = () => {
    applyStyles(defaultArticleState);
  };

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': currentArticleState.fontFamilyOption.value,
          '--font-size': currentArticleState.fontSizeOption.value,
          '--font-color': currentArticleState.fontColor.value,
          '--container-width': currentArticleState.contentWidth.value,
          '--bg-color': currentArticleState.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm 
        onApply={applyStyles} 
        onReset={handleReset}
        defaultState={defaultArticleState}
      />
      <Article />
    </main>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
