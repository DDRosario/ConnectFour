import * as React from 'react';

interface UsernameFormProps {}

export const UsernameForm = (props: UsernameFormProps) => {
  return (
    <span>
      <form>
        <input type="text" placeholder="Enter a name" />
        <input type="submit" placeholder="Submit" />
      </form>
    </span>
  );
};
