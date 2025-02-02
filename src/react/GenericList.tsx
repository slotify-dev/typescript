import React from 'react';

type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

// In TSX (TypeScript + JSX), the parser can get confused when you write something like <T>.
// It might interpret <T> as the start of a JSX element (like <div>) rather than a generic type parameter.
const GenericList = <T,>({ items, renderItem }: GenericListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default GenericList;
