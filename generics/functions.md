### Generic Functions

Generics in functions allow you to write reusable, type-safe functions.

```javascript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const result1 = identity<string>("Hello");          // Type: string
const result2 = identity<number>(42);               // Type: number
const result3 = identity<boolean>(true);            // Type: boolean
const result4 = identity<Array<number>>([1, 2, 3]); // Type: Array<number>
```

Generic Function with Multiple Type Parameters

```javascript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Usage
const merged = merge({ name: "Alice" }, { age: 25 });
console.log(merged); // { name: "Alice", age: 25 }
```

Generic Function with Constraints

```javascript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Usage
const person = { name: "Alice", age: 25 };
console.log(getProperty(person, "name")); // "Alice"
console.log(getProperty(person, "age"));  // 25
console.log(getProperty(person, "email")); // Error: Argument of type '"email"' is not assignable to parameter of type '"name" | "age"'.
```

Generic Function with Conditional Logic

```javascript
function processInput<T>(input: T): T extends string ? string : number {
  if (typeof input === "string") {
    return input.toUpperCase() as any; // Type assertion for conditional return type
  } else {
    return (input as number) * 2 as any; // Type assertion for conditional return type
  }
}

// Usage
const result1 = processInput("hello"); // Type: string
const result2 = processInput(10);      // Type: number
console.log(result1); // "HELLO"
console.log(result2); // 20
```

Generic Function with Default Type

```javascript
function createStack<T = number>(): T[] {
  return [];
}

// Usage with default type (number)
const numberStack = createStack();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

// Usage with explicit type (string)
const stringStack = createStack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"
```

Generic Function with Mapped Types

```javascript
function makeOptional<T>(obj: T): Partial<T> {
  return { ...obj };
}

// Usage
const person = { name: "Alice", age: 25 };
const optionalPerson = makeOptional(person);

console.log(optionalPerson); // { name: "Alice", age: 25 }
optionalPerson.name = "Bob"; // Valid, since properties are optional
```

Generic Function with Recursive Types

```javascript
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Usage
const original = { name: "Alice", address: { city: "Wonderland" } };
const cloned = deepClone(original);
console.log(cloned); // { name: "Alice", address: { city: "Wonderland" } }
console.log(cloned === original); // false
console.log(cloned.address === original.address); // false
```

Generic Function with Function Overloads

```javascript
function process<T>(input: T): T;
function process(input: string): string;
function process(input: number): number;
function process(input: any): any {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input * 2;
  } else {
    return input;
  }
}

// Usage
const result1 = process("hello"); // Type: string
const result2 = process(10);      // Type: number
const result3 = process(true);    // Type: boolean

console.log(result1); // "HELLO"
console.log(result2); // 20
console.log(result3); // true
```

Generic Function with Variadic Tuples

```javascript
function concatenate<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  return [...arr1, ...arr2];
}

// Usage
const result = concatenate([1, 2], ["a", "b"]);
console.log(result); // [1, 2, "a", "b"]
```

Generic Function with Type Inference

```javascript
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Usage
const pair = createPair("Alice", 25);
console.log(pair); // ["Alice", 25]
```
