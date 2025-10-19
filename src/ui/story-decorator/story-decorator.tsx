import { Decorator } from "@storybook/react";

import styles from "./story-decorator.module.scss";

export const StoryDecorator: Decorator = (Story) => (
  <div className={styles.storybookContainer}>
    <Story />
  </div>
);
