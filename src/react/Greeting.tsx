import React from 'react';

// Define the type for props
type GreetingProps = {
  name: string;
  age?: number;
};

// Functional component with TypeScript
const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>You are {age} years old.</p>}
    </div>
  );
};

export default Greeting;
