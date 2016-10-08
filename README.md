# Page Observer

### Usage

```js
document.addEventListener('DOMContentLoaded', function () {
  const SELECTOR = '[data-behavior]:not([data-processed])'

  function processElements(els) {
    els.forEach((el) => {
      const behavior = el.dataset.behavior
      console.log(el) // Element
      console.log(behavior) // Name of behavior
    })
  }

  processElements(document.querySelectorAll(SELECTOR))
  new PageObserver(SELECTOR, processElements).start()
})
```
