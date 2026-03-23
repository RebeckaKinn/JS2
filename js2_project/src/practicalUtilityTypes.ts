/*
- Use Partial<T> to make all properties of a type optional.
- Use Required<T> to make all properties of a type required.
- Use Pick<T, K> to create a new type by selecting specific properties from an existing type.
- Use Omit<T, K> to create a new type by removing specific properties from an existing type.
*/

/*
    Partial<T>
    -   The Partial<T> utility type takes a type T and constructs a new type where all of T's properties 
        are set to optional. This is incredibly useful for scenarios like update operations where you 
        might only be sending the fields that have changed.
*/
interface Todo {
  title: string;
  description: string;
  isComplete: boolean;
}

// PartialTodo will have the shape: { title?: string; description?: string; isComplete?: boolean; }
type PartialTodo = Partial<Todo>;

const update: PartialTodo = {
  description: "Finish the lesson task.",
};

//PRACTICAL EXAMPLE
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, data: Partial<User>): User {
  // In a real app, you would fetch the existing user and merge the updates.
  const existingUser2: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  };
  const updatedUser = { ...existingUser2, ...data };
  return updatedUser;
}

// We can send just the 'name' property without TypeScript complaining.
const result = updateUser(1, { name: "Alice Smith" });
console.log(result); // { id: 1, name: 'Alice Smith', email: 'alice@example.com' }

/*
    Required<T>
    -   Required<T> is the opposite of Partial<T>. 
        It takes a type T that may have optional properties and constructs a new 
        type where all properties are required.
*/

interface Config {
  apiUrl?: string;
  apiKey?: string;
}

// RequiredConfig will have the shape: { apiUrl: string; apiKey: string; }
type RequiredConfig = Required<Config>;

//PRACTICAL EXAMPLE
interface AppConfig {
  theme?: "dark" | "light";
  fontSize?: number;
}

const defaultConfig: Required<AppConfig> = {
  theme: "light",
  fontSize: 16,
};

function finalizeConfig(userConfig: AppConfig): Required<AppConfig> {
  return { ...defaultConfig, ...userConfig };
}

const finalConfig = finalizeConfig({ theme: "dark" });
// finalConfig is guaranteed to have both 'theme' and 'fontSize'.
console.log(finalConfig); // { theme: 'dark', fontSize: 16 }

/*
    Pick<T, K>
    -   The Pick<T, K> utility type creates a new type by "picking" 
        a set of properties K from an existing type T. K is a union of string literal keys that must exist on T.
*/
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// ProductPreview will have the shape: { name: string; price: number; }
type ProductPreview = Pick<Product, "name" | "price">;
/*
This is extremely useful when you only need a subset of data for a specific component. 
For example, a user avatar component only needs the user’s name and their avatar URL, not their entire profile.
*/
interface User3 {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

// We only need the properties relevant to the avatar component.
type AvatarProps = Pick<User3, "name" | "avatarUrl">;

function UserAvatar(props: AvatarProps) {
  // return JSX for an avatar component
  console.log(`Displaying avatar for ${props.name}`);
  // We can't access props.email here, which prevents bugs.
}

/*
    Omit<T, K>
    -   Omit<T, K> is the opposite of Pick<T, K>. It creates a new type by taking all the 
        properties from T and then removing the keys specified in K.
*/
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// SensitiveInfoRemoved will have all properties from Product EXCEPT 'id' and 'price'.
type SensitiveInfoRemoved = Omit<Product, "id" | "price">;

/*
This is a very common pattern for typing the data needed to create a new resource. 
When you create a new user, you provide a name and email, 
but you do not provide an id because the database generates it.
*/

interface User2 {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// The data needed to create a new user is the User type, but without the 'id' and 'createdAt' fields.
type NewUserInput = Omit<User2, "id" | "createdAt">;

function createUser(data: NewUserInput): User2 {
  const newUser = {
    ...data,
    id: Math.floor(Math.random() * 1000), // Server generates ID
    createdAt: new Date(), // Server sets timestamp
  };
  return newUser;
}

const newUserData: NewUserInput = {
  name: "Bob",
  email: "bob@example.com",
};

const createdUser = createUser(newUserData);
console.log(createdUser);
