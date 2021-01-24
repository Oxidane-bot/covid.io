let js_file = document.getElementById('svg_js');
// let img = document.querySelector('img');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');

button1.addEventListener('click',function(){
    js_file.src = 'svg.js';
})


// button2.addEventListener('click',function(){
//     js_file.src = 'svg_deaths.js';
// })

button3.addEventListener('click',function(){
    js_file.src = 'svg_tests.js';
})
// button1.addEventListener('click',()=>{
//     img.src = 'test/1.png';
// })
//
//
// button2.addEventListener('click',()=>{
//     img.src = 'test/2.png';
// })
//
// button3.addEventListener('click',()=>{
//     img.src = 'test/3.png';
// })