### Basic Constraints

```javascript
// Constraint to number
function printNumber<T extends number>(value: T): void {
  console.log(value);
}

printNumber(42); // Works
printNumber("42"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// Constraint to an interface
interface Identifiable {
  id: number;
}

function printId<T extends Identifiable>(item: T): void {
  console.log(item.id);
}

printId({ id: 1, name: "Alice" }); // Works
printId({ name: "Bob" }); // Error: Property 'id' is missing.

// Constraint to a function
function callFunction<T extends () => void>(fn: T): void {
  fn();
}

callFunction(() => console.log("Hello")); // Works
callFunction(42); // Error: Argument of type 'number' is not assignable to parameter of type '() => void'.

// Constraint to an array of numbers
function sumNumbers<T extends number[]>(numbers: T): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(sumNumbers([1, 2, 3])); // Works
console.log(sumNumbers(["1", "2", "3"])); // Error: Argument of type 'string[]' is not assignable to parameter of type 'number[]'.

// Constraint to a key of an object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 25 };
console.log(getProperty(person, "name")); // Works
console.log(getProperty(person, "email")); // Error: Argument of type '"email"' is not assignable to parameter of type '"name" | "age"'.

// Constraint to a key with a specific type
function getStringProperty<T, K extends keyof T & string>(obj: T, key: K): string {
  return obj[key] as string;
}

const user = { name: "Alice", age: 25 };
console.log(getStringProperty(user, "name")); // Works
console.log(getStringProperty(user, "age")); // Error: Type 'number' is not assignable to type 'string'.

// Constraint to a type that extends string
type IsString<T> = T extends string ? T : never;

function printStringOnly<T extends IsString<T>>(value: T): void {
  console.log(value);
}

printStringOnly("Hello"); // Works
printStringOnly(42); // Error: Argument of type 'number' is not assignable to parameter of type 'never'.

// Constraint to Partial<T>
function updateObject<T>(obj: T, updates: Partial<T>): T {
  return { ...obj, ...updates };
}

const person = { name: "Alice", age: 25 };
console.log(updateObject(person, { age: 26 })); // Works
console.log(updateObject(person, { email: "alice@example.com" })); // Error: Argument of type '{ email: string; }' is not assignable to parameter of type 'Partial<{ name: string; age: number; }>'.
```

Constraint to Record<K, V>

```javascript
function printRecord<K extends string, V>(record: Record<K, V>): void {
  console.log(record);
}

printRecord({ name: "Alice", age: 25 }); // Works
printRecord({ 1: "Alice", 2: 25 }); // Error: Type 'number' is not assignable to type 'string'.
```

Constraint to Pick<T, K>

```javascript
function printPicked<T, K extends keyof T>(obj: T, keys: K[]): void {
  keys.forEach((key) => console.log(obj[key]));
}

const person = { name: "Alice", age: 25, email: "alice@example.com" };
printPicked(person, ["name", "age"]); // Works
printPicked(person, ["address"]); // Error: Argument of type '"address"' is not assignable to parameter of type '"name" | "age" | "email"'.
```
