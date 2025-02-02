### Basic Syntax of Generic Classes

To define a generic class, you use angle brackets (<>) to specify one or more type parameters.
These type parameters can then be used throughout the class definition.

```javascript
class ClassName<T> {
  // Use the type parameter T in the class
}
```

Let's create a simple Box class that can hold a value of any type.

```javascript
class Box<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  setValue(newValue: T): void {
    this.value = newValue;
  }
}

// Create a Box for a number
const numberBox = new Box<number>(10);
console.log(numberBox.getValue()); // Output: 10

// Create a Box for a string
const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue()); // Output: Hello

// Create a Box for an object
const objectBox = new Box<{ name: string }>({ name: "Alice" });
console.log(objectBox.getValue()); // Output: { name: "Alice" }
```

Multiple Generic Types

```javascript
class Pair<K, V> {
  private key: K;
  private value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }

  getKey(): K {
    return this.key;
  }

  getValue(): V {
    return this.value;
  }
}

const pair = new Pair<string, number>("age", 25);
console.log(pair.getKey());   // Output: age
console.log(pair.getValue()); // Output: 25
```

Constraints on Generic Types

```javascript
interface HasLength {
  length: number;
}

class Logger<T extends HasLength> {
  log(value: T): void {
    console.log(`Length: ${value.length}, Value: ${value}`);
  }
}

const logger = new Logger<string>();
logger.log("Hello"); // Output: Length: 5, Value: Hello

const arrayLogger = new Logger<number[]>();
arrayLogger.log([1, 2, 3]); // Output: Length: 3, Value: 1,2,3

// This would cause a TypeScript error because numbers don't have a `length` property
// const invalidLogger = new Logger<number>();
// invalidLogger.log(123);
```

Generic Repository Pattern

```javascript
interface Identifiable {
  id: number;
}

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return this.items;
  }

  update(id: number, updatedItem: Partial<T>): void {
    const item = this.getById(id);
    if (item) {
      Object.assign(item, updatedItem);
    }
  }

  delete(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}

interface User extends Identifiable {
  name: string;
  age: number;
}

const userRepository = new Repository<User>();

userRepository.add({ id: 1, name: "Alice", age: 25 });
userRepository.add({ id: 2, name: "Bob", age: 30 });

console.log(userRepository.getById(1)); // Output: { id: 1, name: "Alice", age: 25 }
console.log(userRepository.getAll());   // Output: [{ id: 1, name: "Alice", age: 25 }, { id: 2, name: "Bob", age: 30 }]

userRepository.update(1, { age: 26 });
console.log(userRepository.getById(1)); // Output: { id: 1, name: "Alice", age: 26 }

userRepository.delete(2);
console.log(userRepository.getAll());   // Output: [{ id: 1, name: "Alice", age: 26 }]
```

Generic Linked List

```javascript
class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

class LinkedList<T> {
  private head: Node<T> | null = null;

  add(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  remove(value: T): void {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  print(): void {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const list = new LinkedList<number>();

list.add(1);
list.add(2);
list.add(3);

list.print(); // Output: 1, 2, 3

list.remove(2);
list.print(); // Output: 1, 3
```

Generic Event Emitter

```javascript
type Listener<T> = (event: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  removeListener(listener: Listener<T>): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  emit(event: T): void {
    this.listeners.forEach((listener) => listener(event));
  }
}

interface UserEvent {
  userId: number;
  action: string;
}

const userEventEmitter = new EventEmitter<UserEvent>();

const listener: Listener<UserEvent> = (event) => {
  console.log(`User ${event.userId} performed action: ${event.action}`);
};

userEventEmitter.addListener(listener);

userEventEmitter.emit({ userId: 1, action: "login" }); // Output: User 1 performed action: login
userEventEmitter.emit({ userId: 2, action: "logout" }); // Output: User 2 performed action: logout

userEventEmitter.removeListener(listener);
```

Generic Mapper Utility

```javascript
class Mapper<TSource, TTarget> {
  constructor(private mappingFn: (source: TSource) => TTarget) {}

  map(source: TSource): TTarget {
    return this.mappingFn(source);
  }

  mapMany(sources: TSource[]): TTarget[] {
    return sources.map(this.mappingFn);
  }
}

interface UserDto {
  id: number;
  name: string;
}

interface User {
  userId: number;
  fullName: string;
}

const userMapper = new Mapper<UserDto, User>((dto) => ({
  userId: dto.id,
  fullName: dto.name,
}));

const userDto: UserDto = { id: 1, name: "Alice" };
const user = userMapper.map(userDto);

console.log(user); // Output: { userId: 1, fullName: "Alice" }
```
