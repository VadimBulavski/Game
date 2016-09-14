/**
 * Created by admin on 13.09.2016.
 */
var colsMin = 10;
var rowsMin = 10;
var colsMax = 100;
var rowsMax = 100;
var cross = "X";
var toe = "O";
var divField = document.getElementById('field');
var field;
var hod = 0;

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
            var butEl = document.createElement('div');
            butEl.style.width = "50px";
            butEl.style.height = "50px";
            butEl.style.position = "relative";
            butEl.style.backgroundColor = "orange";
            butEl.style.border = "1px solid";
            butEl.style.textAlign = "center";
            butEl.style.lineHeight = "50px";
            butEl.style.fontFamily = "Times New Roman";
            butEl.style.fontSize = "26pt";
            butEl.style.fontWeight = "900";
            butEl.onclick = next;
            tdElem.appendChild(butEl);
        }
    }

    $('#field').animate({height: "100%", opacity: 0.5}, "slow");
    $('#field').animate({width: "100%", opacity: 1}, "slow");//fadeIn(3000);
}

function checkInput() {
    var colsUser = document.getElementById('col').value;
    var rowsUser = document.getElementById('row').value;
    if(colsUser < colsMin || rowsUser < rowsMin || colsUser > colsMax || rowsUser > rowsMax){
        alert("Некорректный ввод! Будут применены стандартные настройки!");
        creatField(colsMin, rowsMin);
    }
    else
        creatField(colsUser, rowsUser);
}

var createButton = document.getElementById('start');
createButton.onclick = checkInput;

function next() {
    if(this.textContent == "") {
        var text = document.createElement('p');
        text.style.margin = "0%";
        text.style.display = "none";
        this.appendChild(text);
        $(this).animate({left: "50%", width: "2px"});
        if (hod % 2 == 0) {
            text.textContent = cross;
            text.style.color = "red";
            $(this).animate({width: "50px", left: "0%"});
            $(text).fadeIn(1000);
            hod++;
        }
        else {
            text.textContent = toe;
            text.style.color = "green";
            $(this).animate({width: "50px", left: "0%"});
            $(text).fadeIn(1000);
            hod++;
        }
    }
}



