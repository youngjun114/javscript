const items = document.querySelector('.items');
const input = document.querySelector('.footer-input');
const add = document.querySelector('.btn-add');
const remove = document.querySelector('.btn-remove');

/**
 * 1. get value from input
 * 2. create new item (text + remove btn)
 * 3. add an item to items container
 * 4. scroll to the recently added item
 * 5. clear input field
 */

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement('li');
  const item = document.createElement('div');
  const name = document.createElement('span');
  const btn = document.createElement('button');
  itemRow.setAttribute('class', 'item-row');
  item.setAttribute('class', 'item');
  name.setAttribute('class', 'item-name');
  name.textContent = text;
  btn.setAttribute('class', 'btn-remove');
  btn.innerHTML = '<i class="material-icons remove-icon">delete</i>';
  btn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  item.appendChild(name);
  item.appendChild(btn);

  itemRow.appendChild(item);
  return itemRow;
}

add.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});
