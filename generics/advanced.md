### Conditional Types

Conditional types allow you to create types that depend on other types.

```javascript
// Example 1: Check if a Type is a String
type IsString<T> = T extends string ? true : false;

type Result1 = IsString<"hello">; // true
type Result2 = IsString<42>;      // false


// Example 2: Extract Array Type
type ExtractArrayType<T> = T extends Array<infer U> ? U : never;

type NumberArray = ExtractArrayType<number[]>; // number
type StringArray = ExtractArrayType<string[]>; // string
type BooleanArray = ExtractArrayType<boolean[]>; // boolean
type MixedArray = ExtractArrayType<(number | string)[]>; // number | string

// Example 3: Exclude Null and Undefined
type NonNullable<T> = T extends null | undefined ? never : T;
type Result = NonNullable<string | null | undefined>; // string

type FilteredArray<T> = T extends (infer U)[] ? U : never;
type FilteredResult = FilteredArray<number[] | string[]>; // number | string

// Example 4: Make All Properties Optional
type Partial<T> = { [K in keyof T]?: T[K] };

interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>; // { name?: string; age?: number }

// Example 5: Make All Properties Readonly
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type ReadonlyUser = Readonly<User>; // { readonly name: string; readonly age: number }

// Example 6: Map Properties to a New Type
type Stringify = { [K in keyof User]: string };
type StringifiedUser = Stringify; // { name: string; age: string }

// Example 7: Recursive JSON Type
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

const json: JSONValue = {
  name: "Alice",
  age: 25,
  isStudent: false,
  scores: [95, 87, 91],
  address: {
    city: "Wonderland",
    zip: "12345",
  },
};

// Example 8: Recursive Tree Structure
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

const root: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child1",
      children: [
        { value: "child1.1", children: [] },
        { value: "child1.2", children: [] },
      ],
    },
    {
      value: "child2",
      children: [
        { value: "child2.1", children: [] },
        { value: "child2.2", children: [] },
      ],
    },
  ],
};
```

### Utility Types

TypeScript provides built-in utility types, and you can create your own.

```javascript
// Example 9: Pick Specific Properties
type User = { id: number; name: string; age: number; };
type NameOnly = Pick<User, "name">; // { name: string }

// Example 10: Omit Specific Properties
type UserWithoutAge = Omit<User, "age">; // { id: number; name: string }

// Example 13: Create a Type for Event Names
type EventName = `on${Capitalize<string>}`;

const clickEvent: EventName = "onClick";
const hoverEvent: EventName = "onHover";

// Example 14: Filter Properties by Type
type StringProperties<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];
type NumberProperties<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];
type BooleanProperties<T> = { [K in keyof T]: T[K] extends boolean ? K : never }[keyof T];
type FunctionProperties<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type NonNullableProperties<T> = { [K in keyof T]: T[K] extends null | undefined ? never : K }[keyof T];

interface User {
  name: string;
  age: number;
  email: string;
}

type NumberKeys = NumberProperties<User>; // "age"
type StringKeys = StringProperties<User>; // "name" | "email"

type FilterProperties<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface MixedData {
  name: string;
  age: number;
  isStudent: boolean;
}

type StringProperties = FilterProperties<MixedData, string>; // { name: string }
type NumberProperties = FilterProperties<MixedData, number>; // { age: number }

// Example 15: Make Properties Nullable
type NullableProperties<T> = { [K in keyof T]: T[K] | null };
type NullableUser = Nullable<User>; // { name: string | null; age: number | null; email: string | null }

// Example 16: Deep Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

const user: DeepReadonly<User> = {
  name: "Alice",
  age: 25,
};

// Example 17: Deep Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const partialUser: DeepPartial<User> = {
  name: "Alice",
};

// Example 18: Extract Return Type of a Function
// infer -> assume R type where R is alias of a type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet() {
  return "Hello";
}

type GreetReturn = ReturnType<typeof greet>; // string

// Example 19: Extract Promise Type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<number>>; // number
type YetAnotherResult = UnwrapPromise<Promise<string>>; // string

// Example 20: Concatenate Tuples
type ConcatTuples<T extends any[], U extends any[]> = [...T, ...U];

type Tuple1 = [1, 2];
type Tuple2 = ["a", "b"];
type Combined = Concatenate<Tuple1, Tuple2>; // [1, 2, "a", "b"]
```
