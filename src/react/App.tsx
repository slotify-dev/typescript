import React from 'react';
import GenericList from './GenericList';

const App: React.FC = () => {
  const numbers = [1, 2, 3, 4, 5];
  const strings = ['apple', 'banana', 'cherry'];

  return (
    <div>
      <h1>Numbers</h1>
      <GenericList items={numbers} renderItem={(num) => <span>{num}</span>} />
      <h1>Fruits</h1>
      <GenericList
        items={strings}
        renderItem={(fruit) => <span>{fruit}</span>}
      />
    </div>
  );
};

export default App;
