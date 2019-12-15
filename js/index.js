
import jQuery from 'jquery'
console.log(jQuery)
console.log(jQuery('div'))

// const axios = require('axios');
import {$, $$, myAjax} from './tools'

let deleteBtn

const getList = (eve) => {
  myAjax({
    url: 'http://localhost:3000/todo',
    method: 'GET',
  }).then(res => {
    const { data } = res
    $('.list .list-group').innerHTML = ''
    data.map(item => {
      const {id, title} = item
      $('.list .list-group').innerHTML += `
      <li class="list-group-item">
        <a href="show.html?objectId=${id}">${title}</a>
        <i data-id="${id}" class="fa fa-close"></i>
      </li>
      `
    })

    deleteBtn = $$('.list-group-item i')
    deleteBtn.forEach(item => {
      item.addEventListener('click', function () {
        if (window.confirm('确定要删除此项吗？')) {
          const objectId = this.getAttribute('data-id')
          myAjax({
            url: `http://localhost:3000/todo/${objectId}`,
            method: 'DELETE',
          }).then(() => getList())
        }
      })
    })
  })
}

getList()
const todoInput = $('.form-todo input[type=text]')
//封装函数
function POSTf() {
  myAjax({
    url: 'http://localhost:3000/todo',
    method: 'POST',
    data: {
      title: todoInput.value
    }
  }).then(() => {
    todoInput.value = ''
    getList()
  }).catch(e => console.log(e))
}
$('#create-todo').addEventListener('keydown', function (e) {
  //debugger
  //console.log(e.keyCode)
 if(todoInput.value === '') {
   console.log('空')
  }else if(e.keyCode === 13) {
   POSTf()
 }
})

$('#create-todo').addEventListener('click', function () {
  //debugger
  console.log(todoInput.value.length)
  if(todoInput.value === '' || todoInput.value.length >= 10 ) {
    alert('空');
  }else{
    POSTf()
  }
})

