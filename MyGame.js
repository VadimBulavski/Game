/**
 * Created by admin on 13.09.2016.
 */
var colsMin = 15;
var rowsMin = 15;
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
var message = document.getElementById('message');
var messageBox = document.getElementById('divMessage');
var createButton = document.getElementById('start');
var leftRightArray = [];
var topBottomArray = [];
var topLeftBottomRightArray = [];
var bottomLeftTopRightArray = [];
var winArray = [];

class direct{
    constructor(el, num){
        this.element = el;
        this.number = num;
    }
}
// var direct = {};


createButton.onclick = select;


function select() {
    if(createButton.value == 'играть'){
        checkInput();
        this.value = this.value != 'заново'?'заново':'играть';
    }
    else{
        $('#field').animate({width: "0%", opacity: 0}, 2000);
        this.value = this.value != 'заново'?'заново':'играть';
    }

}

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
            butEl.style.backgroundColor = "chocolate";
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

    $('#field').animate({height: "100%", opacity: 0.5}, 2000);
    $('#field').animate({width: "100%", opacity: 1}, 2000);

    console.log(arrayBut);
}

function checkInput() {
    var colsUser = document.getElementById('col').value;
    var rowsUser = document.getElementById('row').value;
    if(colsUser < colsMin || rowsUser < rowsMin || colsUser > colsMax || rowsUser > rowsMax){
        displayMessage("Некорректный ввод! Будут применены стандартные настройки!");
        function redyField() {
            creatField(colsMin, rowsMin);
            colsUser.value = colsMin;
            rowsUser.value = rowsMin;
        }
        setTimeout(redyField, 3000);
    }
    else
        creatField(colsUser, rowsUser);

}

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
                text.style.color = "crimson";
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
            gameOver(x, y, text.textContent);
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

        isWin(leftRightArray, leftCount, rightCount, str);
        isWin(topBottomArray, topCount, bottomCount, str);;
        isWin(topLeftBottomRightArray, topLeftCount, bottomRightCount, str);
        console.log(topLeftBottomRightArray);
        isWin(bottomLeftTopRightArray, bottomLeftCount, topRightCount, str);
        console.log(bottomLeftTopRightArray);
        if((leftCount + rightCount) == winNumber - 2 || (topCount + bottomCount) == winNumber - 2 ||
            (topLeftCount + bottomRightCount) == winNumber - 2 || (topRightCount + bottomLeftCount) == winNumber - 2){
            displayMessage(str +"-кам"+ " остался 1 ход до победы!");
        }
    }
}

function isWin(array, cooX, cooY, str) {
    if((cooX + cooY) == winNumber - 1){
        displayMessage("Победили: "+ str + "-ки");
        console.log(array);
        editElements(array, str);
        game = true;
    }
    return false;
}

function editElements(array, str) {
    for(var i = 0; i < array.length; ++i){
        if(array[i].element.textContent == str){
            winArray.push(array[i]);
        }
    }
    var numberOne = 0;
    var numberTwo = 0;
    var numberThree = 0;
    var numberFour = 0;
    var numberOneArray = [];
    var numberTwoArray = [];
    var numberThreeArray = [];
    var numberFhourArray = [];
    for(var i = 0; i < winArray.length; ++i){
        if(winArray[i].number == 1){
            numberOneArray.push(winArray[i]);
            numberOne++;
        }
        else if(winArray[i].number == 2){
            numberTwoArray.push(winArray[i]);
            numberTwo++;
        }
        else if(winArray[i].number == 3){
            numberThreeArray.push(winArray[i]);
            numberThree++;
        }
        else  if(winArray[i].number == 4){
            numberFhourArray.push(winArray[i]);
            numberFour++;
        }
    }
    if(numberOne >= 5){
        for(var i = 0; i < numberOneArray.length; ++i)
            numberOneArray[i].element.style.backgroundColor = "darkslategray";
    }
    else if(numberTwo >= 5){
        for(var i = 0; i < numberTwoArray.length; ++i)
            numberTwoArray[i].element.style.backgroundColor = "darkslategray";
    }
    else if(numberThree >= 5){
        for(var i = 0; i < numberThreeArray.length; ++i)
            numberThreeArray[i].element.style.backgroundColor = "darkslategray";
    }
    else if(numberFour >= 5){
        for(var i = 0; i < numberFhourArray.length; ++i)
            numberFhourArray.element.style.backgroundColor = "darkslategray";
    }

}

function displayMessage(str) {
    message.textContent = str;
    messageBox.style.display = "block";
    $(messageBox).animate({opacity: 1}, 2000);
    function timeMessage() {
        $(messageBox).animate({opacity: 0}, 2000);
    }
    setTimeout(timeMessage, 3000);

    function hiddenBox() {
        messageBox.style.display = "none";
    }
    setTimeout(hiddenBox, 5000);
}


function leftElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(y - i >=0 && arrayBut[x][y - i].textContent == str){
            count ++;
            leftRightArray.push(new direct(arrayBut[x][y-i], 1));
        }
    }
    return count-1;
}

function rightElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(y + i < arrayBut[x].length &&
            arrayBut[x][y + i].textContent == str){
            count ++;
            leftRightArray.push(new direct(arrayBut[x][y+i], 1));
        }
    }
    return count-1;
}

function topElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(x - i >=0 && arrayBut[x - i][y].textContent == str){
            count ++;
            topBottomArray.push(new direct(arrayBut[x - i][y], 2));
        }
    }
    return count-1;
}

function bottomElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(x + i < arrayBut.length &&
            arrayBut[x + i][y].textContent == str){
            count ++;
            topBottomArray.push(new direct(arrayBut[x + i][y], 2));
        }
    }
    return count-1;
}

function topLeftElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(x - i >=0 && y - i >=0 &&
            arrayBut[x - i][y - i].textContent == str){
            count ++;
            topLeftBottomRightArray.push(new direct(arrayBut[x - i][y - i], 3));
        }
    }
    return count-1;
}

function topRightElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(x - i >=0 && y + i < arrayBut[x].length &&
            arrayBut[x - i][y + i].textContent == str){
            count ++;
            bottomLeftTopRightArray.push(new direct(arrayBut[x - i][y + i], 4));
        }
    }
    return count-1;
}

function bottomLeftElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(x + i < arrayBut.length && y - i >=0 &&
            arrayBut[x + i][y - i].textContent == str){
            count ++;
            bottomLeftTopRightArray.push(new direct(arrayBut[x + i][y - i], 4));
        }
    }
    return count-1;
}

function bottomRightElementCounter(x, y, str) {
    var count = 0;
    for(var i = 0; i < winNumber; ++i){
        if(x + i < arrayBut.length && y + i < arrayBut[x].length &&
            arrayBut[x + i][y + i].textContent == str){
            direct.element = arrayBut[x + i][y + i];
            direct.number = 3;
            count ++;
            topLeftBottomRightArray.push(new direct(arrayBut[x + i][y + i], 3));
        }
    }
    return count-1;
}
