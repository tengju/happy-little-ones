import { html, TemplateResult } from 'lit';
import '../src/pages/HomePage.js';

export default {
  title: 'HomePage',
  component: 'home-page',
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

const Template: Story<ArgTypes> = ({ title }: ArgTypes) => html`
  <home-page .title=${title}></home-page>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
