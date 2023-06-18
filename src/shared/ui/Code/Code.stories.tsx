import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Light = Template.bind({});
Light.args = {
    text:
        'export default {\n' +
        'title: "shared/Input",\n' +
        'component: Input,\n' +
        'argTypes: {\n' +
        'backgroundColor: { control: "color" },\n' +
        ' },\n' +
        '} as ComponentMeta<typeof Input>;',
};
