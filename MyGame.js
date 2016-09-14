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
var winNumber = 5;
var field;
var arrayBut = [];
var hod = 0;
var game = false;

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
        arrayBut[i] = [];
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
            butEl.onclick = next({x:i, y:j});
            arrayBut[i][j] = butEl;
            tdElem.appendChild(arrayBut[i][j]);
        }
    }

    $('#field').animate({height: "100%", opacity: 0.5}, "slow");
    $('#field').animate({width: "100%", opacity: 1}, "slow");

    console.log(arrayBut);
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

function next(coo) {
    return function () {
        var x = coo.x;
        var y = coo.y;
        if(this.textContent == "" && !game) {
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
            game = gameOver(x, y, text.textContent);
        }
    }
}


function gameOver(x, y, str) {
    if(str != ""){
        var leftCount = leftElementCounter(x, y, str);
        var rightCount = rightElementCounter(x, y, str);
        var topCount = topElementCounter(x, y, str);
        var bottomCount = bottomElementCounter(x, y, str);
        var topLeftCount = topLeftElementCounter(x, y, str);
        var topRightCount = topRightElementCounter(x ,y, str);
        var bottomLeftCount = bottomLeftElementCounter(x ,y, str);
        var bottomRightCount = bottomRightElementCounter(x, y, str);
        console.log(topLeftCount);
        if((leftCount + rightCount) == winNumber - 1 || (topCount + bottomCount) == winNumber - 1 ||
            (topLeftCount + bottomRightCount) == winNumber - 1 || (topRightCount + bottomLeftCount) == winNumber - 1){
            function funcWin() {
                alert("Победили - "+ str);
            }
            setTimeout(funcWin, 800);
            return true;
        }
        if((leftCount + rightCount) == winNumber - 2 || (topCount + bottomCount) == winNumber - 2 ||
            (topLeftCount + bottomRightCount) == winNumber - 2 || (topRightCount + bottomLeftCount) == winNumber - 2){
            function func() {
                alert(str + " остался 1 ход до победы!");
            }
            setTimeout(func, 800);
        }
    }
}


function leftElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x][y - i].textContent != str || arrayBut[x][y - i] == null)
            break;
    }
    return i-1;
}

function rightElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x][y + i].textContent != str || arrayBut[x][y + i] == null)
            break;
    }
    return i-1;
}

function topElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x - i][y].textContent != str || arrayBut[x - i][y] == null)
            break;
    }
    return i-1;
}

function bottomElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x + i][y].textContent != str || arrayBut[x + i][y] == null)
            break;
    }
    return i-1;
}

function topLeftElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x - i][y - i].textContent != str || arrayBut[x - i][y - i] == null)
            break;
    }
    return i-1;
}

function topRightElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x - i][y + i] != null){
            if(arrayBut[x - i][y + i].textContent != str)
                break;
        }
    }
    return i-1;
}

function bottomLeftElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x + i][y - i].textContent != str || arrayBut[x + i][y - i] == null)
            break;
    }
    return i-1;
}

function bottomRightElementCounter(x, y, str) {
    var i;
    for(i = 0; i < winNumber; ++i){
        if(arrayBut[x + i][y + i].textContent != str || arrayBut[x + i][y + i] == null)
            break;
    }
    return i-1;
}
