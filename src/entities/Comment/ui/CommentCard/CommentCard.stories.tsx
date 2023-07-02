import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Light = Template.bind({});
Light.args = {
    comment: { id: '1', text: 'Hello', user: { id: '1', username: 'vas' } },
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};

export const Dark = Template.bind({});
Dark.args = { comment: { id: '1', text: 'Hello', user: { id: '1', username: 'vas' } } };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
