module.exports = {
  helpers: {
    componentFolder(path) {
      return path || 'common/components'
    },
    componentFileName(name, connected) {
      return connected ? `${this.componentName(name)}.tsx` : 'index.tsx'
    },
    componentName(name) {
      const parts = name.split('/')
      return parts[parts.length - 1]
    },
  },
}
