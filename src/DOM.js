import { runInThisContext } from "vm";

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  for(let i=0; i<count; i++){
    const doc = document.createElement(tag);
    const newContext = document.createTextNode(content);
    doc.appendChild(newContext);
    document.body.appendChild(doc);
  }
}

function node(data){
  this.data = data;
  this.parent = null;
  this.children = [];
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  const div = document.createElement('div');
  div.classList.add('item_1');
  for(let i =2; i<=level; i++){
    let a = 'item_' + i;
    for (let j=0; j<childrenCount; j++){
      div.insertAdjacentHTML('beforeend', '<div class='+a+'></div>');
    }
  }
  const div1 = document.createElement('div');
  div1.classList.add('item_1');
  for (let i=0; i<childrenCount; i++){
    func(childrenCount, 2, level, div1);
  }
  return div1;
}

function func(count_max, lev, lev_max, prev){
  if (lev>lev_max){
    return;
  }
  else{
    const cur = document.createElement('div');
    cur.classList.add('item_'+lev);
    prev.appendChild(cur);
    for (let i=0; i<count_max; i++){
      func(count_max, lev+1, lev_max, cur);
    }
    return;
    }
  }

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  let tree = generateTree(2, 3);

  [].forEach.call(tree.querySelectorAll('div.item_2'), function(divInner){
    let sec = document.createElement('SECTION');
    sec.classList.add('item_2');
    sec.innerHTML = divInner.innerHTML;
    divInner.parentNode.replaceChild(sec,divInner);
  });
  return tree;
}
