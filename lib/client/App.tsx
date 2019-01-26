import * as React from 'react';

import { UsernameForm } from './components/UsernameForm';

export interface AppProps {}

export class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }
  componentDidMount(): void {}

  render(): JSX.Element {
    return (
      <span>
        <h1>MVP ConnectFour</h1>
        <UsernameForm />
      </span>
    );
  }
}
