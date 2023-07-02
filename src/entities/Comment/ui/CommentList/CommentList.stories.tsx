import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentList } from './CommentList';

export default {
    title: 'entities/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Light = Template.bind({});
Light.args = {
    comments: [
        { id: '1', text: 'Hello', user: { id: '1', username: 'vas' } },
        { id: '2', text: 'Hell', user: { id: '2', username: 'mis' } },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    comments: [
        { id: '1', text: 'Hello', user: { id: '1', username: 'vas' } },
        { id: '2', text: 'Hell', user: { id: '2', username: 'mis' } },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
