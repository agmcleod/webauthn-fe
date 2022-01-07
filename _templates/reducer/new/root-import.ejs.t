---
to: src/common/store/root.ts
inject: true
after: from './currentUser'
skip_if: import { <%= name %> } from './<%= name %>'
---
import { <%= name %> } from './<%= name %>'