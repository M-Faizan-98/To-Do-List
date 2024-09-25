const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const counter = document.getElementById('counter');
const btn = document.getElementById('btn');
const row1 = document.getElementById('row1');

function addTask() {
  if (inputBox.value.length == '') {
    if (row1.getElementsByTagName('p').length < 1) {
      let p = document.createElement('p');
      p.classList.add('empty-input');
      p.innerHTML = 'You must write something!';
      inputBox.classList.add('input-empty');
      row1.appendChild(p);
    } else if (row1.getElementsByTagName('p').length > 1) {
      return;
    }
  } else {
    let li = document.createElement('li');
    listContainer.appendChild(li);
    li.setAttribute('draggable', 'true');

    let img = document.createElement('img');
    img.src = 'https://i.postimg.cc/y8HcH7Tn/unchecked.png';
    li.appendChild(img);

    let p = document.createElement('p');
    p.setAttribute('contenteditable', 'true');
    p.classList.add('task');
    p.innerHTML = inputBox.value;
    li.appendChild(p);

    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
  updateCounter();
}

const updateCounter = () => {
  const listItems = document.querySelectorAll('li');
  counter.innerHTML = 'Task : ' + listItems.length;
  saveData();
};

function editTask(event) {
  if (event.target.tagName === 'IMG') {
    const currentSrc = event.target.getAttribute('src');

    if (currentSrc.endsWith('https://i.postimg.cc/y8HcH7Tn/unchecked.png')) {
      event.target.setAttribute(
        'src',
        'https://i.postimg.cc/HW8y8rZB/checked.png'
      );
      event.target.nextSibling.classList.add('checked');
      event.target.nextSibling.setAttribute('contenteditable', 'false');
      saveData();
    } else if (
      currentSrc.endsWith('https://i.postimg.cc/HW8y8rZB/checked.png')
    ) {
      event.target.setAttribute(
        'src',
        'https://i.postimg.cc/y8HcH7Tn/unchecked.png'
      );
      event.target.nextSibling.classList.remove('checked');
      event.target.nextSibling.setAttribute('contenteditable', 'true');
      saveData();
    }
  } else if (event.target.tagName == 'SPAN') {
    event.target.parentElement.remove();
    saveData();
    updateCounter();
  } else if (event.target.tagName == 'P') {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach((p) => {
      p.onkeyup = function () {
        saveData();
      };
    });
  }
}

function removeAlertMsg() {
  if (inputBox.value.length >= 0) {
    const p = inputBox.nextSibling;
    inputBox.classList.remove('input-empty');
    p.remove();
  } else {
    return;
  }
}

inputBox.addEventListener('input', removeAlertMsg);
listContainer.addEventListener('click', editTask);
btn.addEventListener('click', addTask);

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
  localStorage.setItem('data2', counter.innerHTML);
}
function showData() {
  listContainer.innerHTML = localStorage.getItem('data');
  counter.innerHTML = localStorage.getItem('data2');
}
showData();
