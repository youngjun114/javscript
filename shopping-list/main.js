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

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item-row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item" >
        <span class="item-name">${text}</span>
        <button class="btn-remove" >
            <i class="material-icons remove-icon" data-id=${id}>delete</i>
        </button>
    </div>`;
  id++;
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

// Event Delegation
items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDelete = document.querySelector(`.item-row[data-id="${id}"]`);
    toBeDelete.remove();
  }
});
