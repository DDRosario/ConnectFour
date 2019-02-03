import * as React from 'react';

interface UsernameFormProps {
  handleChange: Function;
  handleSubmit: Function;
}

export const UsernameForm = (props: UsernameFormProps) => {
  return (
    <span>
      <form onSubmit={e => props.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter a name"
          onChange={e => props.handleChange(e)}
        />
        <input type="submit" placeholder="Submit" />
      </form>
    </span>
  );
};
