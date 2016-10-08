class PageObserver {
  constructor(selector, callback) {
    this.selector = selector
    this.callback = callback
    this.processMutations = this.processMutations.bind(this)
  }

  observeWithMutationObserver() {
    const observer = new MutationObserver(this.processMutations)
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    })
  }

  findSignificantElements(element) {
    const elements = []
    if (element && element.nodeType === Node.ELEMENT_NODE) {
      if (element.matches(this.selector)) {
        elements.push(element)
      }
      elements.push.apply(elements, element.querySelectorAll(this.selector))
    }
    return elements
  }

  processMutations(mutations) {
    const elements = []

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const nodes = mutation.addedNodes
        nodes.forEach((node) => {
          elements.push.apply(elements, this.findSignificantElements(node))
        })
      }
    })

    return this.notify(elements)
  }

  start() {
    if (!this.started) {
      this.observeWithMutationObserver()
      this.started = true
    }
  }

  processInsertion(event) {
    const elements = this.findSignificantElements(event.target)
    return this.notify(elements)
  }

  notify(elements) {
    if (!elements.length) { return null }
    return this.callback(elements)
  }
}
