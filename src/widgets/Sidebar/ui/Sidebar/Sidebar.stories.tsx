import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const LightAuth = Template.bind({});
LightAuth.args = {};
LightAuth.decorators = [StoreDecorator({ user: { authData: {} } })];

export const DarkNoAuth = Template.bind({});
DarkNoAuth.args = {};
DarkNoAuth.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
