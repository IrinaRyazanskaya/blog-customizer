import { createRoot } from "react-dom/client";
import { StrictMode, CSSProperties, useState } from "react";

import { Article } from "./components/article/article";
import { ArticleParamsForm } from "./components/article-params-form/article-params-form";
import { defaultArticleState } from "./constants/article-props";
import type { ArticleStateType } from "./constants/article-props";

import styles from "./styles/styles.module.scss";
import "./styles/index.scss";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

  return (
    <main
      className={styles.main}
      style={
        {
          "--font-family": articleState.fontFamilyOption.value,
          "--font-size": articleState.fontSizeOption.value,
          "--font-color": articleState.fontColor.value,
          "--container-width": articleState.contentWidth.value,
          "--bg-color": articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm defaults={defaultArticleState} setArticleState={setArticleState} />
      <Article />
    </main>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
