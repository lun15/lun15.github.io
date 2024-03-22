var btns = document.getElementsByClassName('add');
var remove = document.querySelector('.draggable');

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
};

document.getElementById('clear').addEventListener("click", function(e){
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.remove();
  })
});

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  console.log("over");
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  e.preventDefault();
  if (dragSrcEl != this) {

  //   console.log(dragSrcEl);
  //   // dragSrcEl.innerHTML = this.innerHTML;
  //   // this.innerHTML = e.dataTransfer.getData('text/html');
    
    this.parentNode.insertBefore(dragSrcEl, this.nextSibling);
  
  }
  
  
}

function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}


function handleMouseDown(e) {
  if (e.ctrlKey) {      
      var ul = e.target.parentNode;
      li = e.target.cloneNode(true);
      ul.appendChild(li);
      addEventsDragAndDrop(li);
  }
}


function addEventsDragAndDrop(el) {
  
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);  
  el.addEventListener('dragend', dragEnd, false);

  el.addEventListener('dblclick',function(e){
    e.preventDefault();
    e.target.remove();
  });
  el.addEventListener('mousedown', handleMouseDown, false);
  
}


var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

function addContainerDrop(e){
  
  e.addEventListener('drop', function(event){
    event.preventDefault();
    e.appendChild(dragSrcEl);
  }); 
  e.addEventListener('dragover',  event => event.preventDefault());
}

var listItens = document.querySelectorAll('ul');
[].forEach.call(listItens, function(item) {
  addContainerDrop(item)  
});

function addNewItem(e) {
  var newItem = e.target.parentNode.children[0].value;
  
  e.target.parentNode.children[0].value = '';
  var li = document.createElement('li');
  var attr = document.createAttribute('draggable');
  var ul = e.target.parentNode.parentNode.children[1];
  li.className = 'draggable';
  attr.value = 'true';
  li.setAttributeNode(attr);
  li.appendChild(document.createTextNode(newItem));
  ul.appendChild(li);
  addContainerDrop(ul)  
  addEventsDragAndDrop(li);


  if (newItem != '') {
    li.classList.add('full');
  }else{
    li.classList.add('blank');
  }
}

for(let i=0; i<btns.length; i++){
  btns[i].addEventListener("click", addNewItem);
  
}

