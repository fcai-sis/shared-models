# Shared Models

This NPM package contains all mongoose models, schemas and types that are reused in multiple components in the system.

## Adding Models

Adding a shared model is as simple as it gets. Imagine you have a model `Potato` that you want to use in two or more components, to make it a shared model, all you do is:

1. Create a file for the model

```bash
touch src/models/potato.model.ts
```

2. Build the model

```typescript
// src/models/potato.model.ts

import mongoose, { InferSchemaType } from 'mongoose';

const potatoSchema = new mongoose.Schema({
    // blablabla
});

const potatoModelName = 'Potato';

const PotatoModel = mongoose.model(potatoModelName, potatoSchema);

type PotatoType = InferSchemaType<typeof potatoSchema>;
```

3. Export the model and its inferred type

```typescript
// src/models/potato.model.ts

// ... at the end of the file
export { PotatoModel, PotatoType, potatoModelName };
```

4. Finally, export the file exports from `index.ts`

```typescript
// src/index.ts

// ... existing exports blablabla
export * from './models/potato.model';
```

## Usage

To use a shared model in a NodeJS component, all you need to do is install this package and viola!

```bash
npm install @fcai-sis/shared-models
```

```typescript
// some file in your NodeJS component codebase

import { PotatoModel } from "@fcai-sis/shared-models";
```

## License

This project is under the [MIT License](./LICENSE)

