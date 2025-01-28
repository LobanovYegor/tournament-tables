import { AuthContext, AuthContextProps } from '@contexts';
import type { Meta, StoryObj } from '@storybook/react';
import { FC, PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

const ContextsMock: FC<PropsWithChildren<Partial<AuthContextProps>>> = ({
  children,
  user = null,
  loading = false,
}) => (
  <MemoryRouter>
    <AuthContext.Provider value={{ loading, user }}>
      {children}
    </AuthContext.Provider>
  </MemoryRouter>
);

export const Default: Story = {
  decorators: [
    (Story) => (
      <ContextsMock>
        <Story />
      </ContextsMock>
    ),
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <ContextsMock user={{ displayName: 'Story User' }}>
        <Story />
      </ContextsMock>
    ),
  ],
};
