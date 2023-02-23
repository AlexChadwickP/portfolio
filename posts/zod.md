---
title: 'Stop declaring types without using Zod'
author: 'Alex Chadwick'
date: '2023-02-23T18:10:00.000Z'
isPublished: true
description: "Zod is a typescript library that ensures your data always fits a certain schema at runtime"
---

## Introducing our example

Look at the following lines of a hypothetical Express application:

```typescript
type User = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
}

app.post('/new-user', (req, res) => {
    const user: User = req.body;

    // Do something with `user`
});
```

The above code does not guarantee that the fields in `user` are not going to be null. So how can Zod help us achieve runtime type-safety?

## How does Zod work?

Zod works as follows:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string(),
    password: z.string()
});

// Then you can use it like:

const user = UserSchema.parse(data);
```

If data doesn't satisfy the constraints laid out in `UserSchema`, it will throw an error. If it does it will return an object with all the fields specified. If you don't want an error to be thrown you can use `safeParse` instead of `parse`, which will return an object like: `{ success: false; error: ZodError }` or `success: true; data: [schema]`.

So, what if we still want the type from `UserSchema`? You can infer it using `z.infer` as follows:

```typescript
export type User = z.infer<typeof UserSchema>;
```

This is a very simplified explanation. Zod is _incredibly_ powerful and has all sorts of helpers for stuff like validation, coercing, etc.

## Back to the Express app
So how would our modified express app look now?

```typescript
// ...
import { z } from 'zod';
// ...

export const UserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email(),
    password: z.string().min(10)
});

export type User = z.infer<typeof UserSchema>;

app.post('/new-user', (req, res) => {
    try {
        const user: User = UserSchema.parse(req.body);

        // Use user with confidence
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: 'Invalid input', errMessage: err.message });
        }
    }
});
```

You might have noticed that after `string()` we included an `email()` function. This comes built into zod, the ability for validating basic information such as email addresses, phone numbers, etc.; which is incredibly handy as it saves you having to write your own validation rules for common things.