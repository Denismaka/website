# features

User-facing actions that combine one or more entities and produce a business
value on their own (e.g. `join-community`, `toggle-language`). A feature owns
its `ui/`, `model/`, and `api/` and exposes them through an `index.ts` barrel,
same as `entities` and `widgets`.
