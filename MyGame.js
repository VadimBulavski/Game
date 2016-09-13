/**
 * Created by admin on 13.09.2016.
 */
var cols = 10;
var rows = 10;
var cross = "X";
var toe = "O";
var divField = document.getElementById('field');
var field;

function creatField(col, row) {
    var str = "<table id='tableField' style='border-spacing: inherit'>";
    for(var i = 0; i < row; ++i){
        str += "<tr>";
        for(var j = 0; j < col; ++j){
            str += "<td style='width: 50px; height: 50px; border: 1px solid #000'>";
        }
    }
    divField.innerHTML = str;

    var table = document.getElementById('tableField');
    field = table.firstElementChild;
    for (var i = 0; i < row; ++i){
        for(var j = 0; j < col; ++j){
            var trElem = field.childNodes[i];
            var tdElem = trElem.childNodes[j];
            var butEl = document.createElement('button');
            butEl.style.width = "50px";
            butEl.style.height = "50px";
            tdElem.appendChild(butEl);
        }
    }

    $('#field').fadeIn(3000);
}

function checkInput() {
    var colsUser = document.getElementById('col').value;
    var rowsUser = document.getElementById('row').value;
    if(colsUser < cols || rowsUser < rows){
        alert("Некорректный ввод! Будут применены стандартные настройки!");
        creatField(cols, rows);
    }
    else
        creatField(colsUser, rowsUser);
}

var createButton = document.getElementById('start');
createButton.onclick = checkInput;

function next() {
    var hod
}



