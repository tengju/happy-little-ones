import { html, TemplateResult } from 'lit';
import '../src/happy-little-ones.js';

export default {
  title: 'HappyLittleOnes',
  component: 'happy-little-ones',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ title, backgroundColor = 'white' }: ArgTypes) => html`
  <happy-little-ones style="--happy-little-ones-background-color: ${backgroundColor}" .title=${title}></happy-little-ones>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
