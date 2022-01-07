---
to: src/common/store/root.ts
inject: true
after: combineReducers\(\{
skip_if: <%= name %>.reducer
---
  <%= name %>: <%= name %>.reducer,