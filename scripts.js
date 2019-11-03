const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let checkboxes;
  let deleteBtns;
  let userInput;
  let assignments;
  let enterPressed;


  function init(_form, _items) {
    items = _items;
    userInput = _form.querySelector('.form__input');
    checkboxes = _items.querySelectorAll('.item__checkbox');
    assignments = _items.querySelectorAll('.item__text');
    deleteBtns = _items.querySelectorAll('.item__button');

    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', finish);
      deleteBtns[i].addEventListener('click', deleteItem);
      assignments[i].addEventListener('click', edit)
      assignments[i].addEventListener('keypress', commit)
    }

    _form.addEventListener('submit', formHandler);
  }

  function formHandler(e) {
    e.preventDefault();

    const textValue = userInput.value;

    if (isWhiteSpaceOnly(textValue)) {
      return;
    }
    add(textValue);
    userInput.value = '';
  }

  function isWhiteSpaceOnly(string) {
    if (string.match(/^ *$/) !== null) {
      return true;
    }
    return false;
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    let parent = e.target.parentNode;
    if (this.checked) {
      parent.classList.add('item--done');
    }
    else {
      parent.classList.remove('item--done');
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    e.target.contentEditable = true;
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      e.target.contentEditable = false;
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const checkbox = el('input', 'item__checkbox', finish);
    checkbox.setAttribute('type', 'checkbox');

    const btn = el('button', 'item__button', deleteItem);
    btn.appendChild(document.createTextNode('Eyða'));

    const node = document.createElement('li');
    node.classList.add('item');

    const spanElement = el('span', 'item__text', edit);
    spanElement.appendChild(document.createTextNode(value));
    spanElement.addEventListener('keypress', commit)

    node.appendChild(checkbox);
    node.appendChild(spanElement);
    node.appendChild(btn);

    items.appendChild(node);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.classList.add(className);
    element.addEventListener('click', clickHandler);

    return element;
  }

  return {
    init: init
  }
})();
