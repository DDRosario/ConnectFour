import * as React from 'react';

export interface AppProps {}

export class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }
  componentDidMount(): void {}

  render() {
    return (
      <span>
        <div />
        <div>Hello from React</div>
      </span>
    );
  }
}
