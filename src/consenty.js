// consenty.js

export class Consenty {
  constructor () {
    this.elements = {}
    this.loadProps = {}
  }

  allow (prop) {
    this.change(prop, true)
  }

  click (selector) {
    console.log(selector)
    document.querySelectorAll(selector).forEach((element) => {
      console.log(element)
      element.click()
    })
  }

  getStorage () {
    // eslint-disable-next-line no-undef
    const json = localStorage.getItem('consenty') || '{}'
    let storage
    try {
      storage = JSON.parse(json)
      if (typeof storage !== 'object') return {}
      if (!storage) return {}
      return storage
    } catch (e) {
      return {}
    }
  }

  handleChange (e) {
    const el = e.target

    // handle checkbox toggle
    if (el.type === 'checkbox' && el.hasAttribute('consenty-toggle')) {
      const prop = el.getAttribute('consenty-toggle')
      if (el.checked) this.allow(prop)
      else this.revoke(prop)
    }
  }

  handleClick (e) {
    let el
    if ((el = e.target.closest('[consenty-allow]'))) {
      // clicked on element with allow attribute
      const prop = el.getAttribute('consenty-allow')
      this.allow(prop)
    } else if ((el = e.target.closest('[consenty-revoke]'))) {
      // clicked on element with revoke attribute
      const prop = el.getAttribute('consenty-revoke')
      this.revoke(prop)
    } else if ((el = e.target.closest('[consenty-show]'))) {
      // clicked on element with show attribute
      const prop = el.getAttribute('consenty-show')
      this.load(prop)
    }

    // trigger consenty:click event if [consenty-click] was clicked
    if ((el = e.target.closest('[consenty-click]'))) {
      const prop = el.getAttribute('consenty-click')
      document.dispatchEvent(new CustomEvent('consenty:click', { detail: prop }))
      e.preventDefault()
    }
  }

  hideElement (id) {
    const element = this.elements[id]
    if (!element) {
      // console.warn(`Consenty: No element found with id ${id} in hideElement.`);
      return
    }
    if (element.new) {
      element.new.remove()
      element.new = false
      this.elements[id] = element
    }
  }

  init () {
    document.dispatchEvent(new CustomEvent('consenty:beforeinit'))
    this.reload()
    document.dispatchEvent(new CustomEvent('consenty:init'))
  }

  initCheckboxes () {
    document.querySelectorAll('[consenty-toggle]').forEach((checkbox) => {
      checkbox.checked = this.isTrue(checkbox.getAttribute('consenty-toggle'))
    })
  }

  isTrue (name) {
    const storage = this.getStorage()
    return storage && name in storage ? !!storage[name] : false
  }

  reload () {
    this.toggleIFs()
    this.initCheckboxes()
  }

  revoke (prop) {
    this.change(prop, false)
  }

  change (prop, value) {
    document.dispatchEvent(
      new CustomEvent('consenty:beforechange', {
        detail: {
          name: prop,
          from: this.isTrue(prop),
          to: !!value
        }
      })
    )
    const storage = this.getStorage()
    const from = this.isTrue(prop)
    if (!value) {
      document.dispatchEvent(new CustomEvent('consenty:beforerevoke', { detail: prop }))
      delete storage[prop]
      document.dispatchEvent(new CustomEvent('consenty:revoke', { detail: prop }))
    } else {
      document.dispatchEvent(new CustomEvent('consenty:beforeallow', { detail: prop }))
      storage[prop] = 1
      document.dispatchEvent(new CustomEvent('consenty:allow', { detail: prop }))
    }
    this.saveStorage(storage)
    document.dispatchEvent(
      new CustomEvent('consenty:change', {
        detail: {
          name: prop,
          from: from,
          to: this.isTrue(prop)
        }
      })
    )
    this.reload()
  }

  saveStorage (storage) {
    // eslint-disable-next-line no-undef
    localStorage.setItem('consenty', JSON.stringify(storage))
  }

  toggleIFs () {
    const elements = document.querySelectorAll('[consenty-if]')
    if (elements.length === 0) {
      // No elements to process
      return
    }

    elements.forEach((el) => {
      // Get property name and type
      const rawprop = el.getAttribute('consenty-if')
      const type = rawprop.startsWith('!') ? 'hideif' : 'showif'
      const prop = type === 'showif' ? rawprop : rawprop.substring(1)
      const show = this.loadProps.hasOwnProperty(prop)

      // Get or set ID of this element for later use
      let id
      if (!el.hasAttribute('data-consenty-id')) {
        id = Object.keys(this.elements).length + 1
        this.elements[id] = { old: el, new: false, prop }
        el.setAttribute('data-consenty-id', id)
      } else {
        id = el.getAttribute('data-consenty-id')
      }

      // Toggle element/code
      if (type === 'showif') {
        if (show || this.isTrue(prop)) this.loadElement(id)
        else this.hideElement(id)
      } else {
        if (show || this.isTrue(prop)) this.hideElement(id)
        else this.loadElement(id)
      }
    })
  }

  load (prop) {
    return new Promise((resolve) => {
      this.loadProps[prop] = true
      this.reload()
      resolve()
    })
  }

  loadElement (id) {
    const element = this.elements[id]
    if (!element) {
      // console.warn(`Consenty: No element found with id ${id} in hideElement.`);
      return
    }
    if (!element.new) {
      const tagName = element.old.tagName.toLowerCase()
      if (tagName !== 'template') return

      document.dispatchEvent(new CustomEvent('consenty:beforeload', { detail: id }))

      const el = element.old
      const newDiv = document.createElement(
        el.getAttribute('consenty-tag') === 'span' ? 'span' : 'div'
      )
      el.parentNode.insertBefore(newDiv, el.nextSibling)
      newDiv.appendChild(document.importNode(el.content, true))
      element.new = newDiv
      this.elements[id] = element

      document.dispatchEvent(new CustomEvent('consenty:load', { detail: id }))

      // This will make it work recursively
      this.reload()
    }
  }
}

/* automatic initialization helper
* - if Consenty is included via a script tag, attach it to the window object and
* expose `consenty` instance globally
*/
(function () {
  if (typeof window !== 'undefined' && !window.Consenty) {
    window.Consenty = Consenty
    document.addEventListener('DOMContentLoaded', () => {
      const consenty = new Consenty()
      window.consenty = consenty //
      consenty.init()

      // bind event listeners
      document.addEventListener('click', consenty.handleClick.bind(consenty))
      document.addEventListener('change', consenty.handleChange.bind(consenty))
    })
  }
})()

/*
 * Polyfill for adding CustomEvent
 * see : https://developer.mozilla.org/fr/docs/Web/API/CustomEvent
 */
if (!window.CustomEvent) { // Create only if it doesn't exist
  (function () {
    function CustomEvent (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined }
      const evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
      return evt
    }
    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
  })()
}
