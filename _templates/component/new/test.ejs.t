---
to: "<%= locals.notest ? null : (`src/${h.componentFolder(locals.p)}/${Name}/__tests__/index.spec.tsx`) %>"
---
import { screen, waitFor } from '@testing-library/react'

import { render } from 'test/utils'
import { <%= h.componentName(Name) %> } from '../index'

test('<%= h.componentName(Name) %>', () => {})