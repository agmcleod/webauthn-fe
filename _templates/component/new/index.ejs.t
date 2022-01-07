---
to: "<%= locals.redux ? (`src/${h.componentFolder(locals.p)}/${Name}/index.ts`) : null %>"
---
import { connect } from 'react-redux'

import { <%= h.componentName(Name) %> as <%= h.componentName(Name) %>Comp } from './<%= h.componentName(Name) %>'

export const <%= h.componentName(Name) %> = connect()(<%= h.componentName(Name)%>Comp)
