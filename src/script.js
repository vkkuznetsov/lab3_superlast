import { event } from "jquery";
import * as tmp from "../data/data.json" assert { type: "json" }

var data = JSON.parse(JSON.stringify(tmp.default));

var source = document.getElementById("template").innerHTML;

var template = Handlebars.compile(source);

document.getElementById("root").innerHTML = template(data);

var modal = document.querySelector(".modal");

var id_counter = 5;

var selector = document.getElementById("selector");
var last_class;

selector.addEventListener('change', function check_select(event) {
    var selectedColor = selector.options[selector.selectedIndex].style.backgroundColor;
    selector.style.backgroundColor = selectedColor;
    selector.style.color = "white";
    last_class = "image_" + selector.selectedIndex;
  });
  

var load_button = document.querySelector(".flex_button");

load_button.addEventListener('click', function() {
    selector.style.color = "black";
    modal.childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent = "Создать карточку";
    document.getElementById("create_name").value = "";
    document.getElementById("create_text").value = "";
    selector.style.backgroundColor = "white";
    selector.selectedIndex = 0;
});

var change_buttons = document.querySelectorAll(".btn");
var last_clicked;
var last_class;

function update_event() {
    change_buttons = document.querySelectorAll(".btn");
    change_buttons.forEach(function(elem) {
        elem.addEventListener('click', function(event) {
            selector.options[0].style.backgroundColor = "black";
            selector.style.color = "white";
            modal.childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent = "Изменить карточку";
            document.getElementById("create_name").value = event.target.parentNode.childNodes[1].textContent;
            document.getElementById("create_text").value = event.target.parentNode.childNodes[3].textContent;
            selector.style.backgroundColor = getComputedStyle(event.target.parentNode.parentNode.childNodes[1]).backgroundColor
            last_clicked = elem.id;
            last_class = event.target.parentNode.parentNode.childNodes[1].className;
        });
    });
}

update_event();

var container = document.querySelectorAll(".row")[1];

function add_card() {
    let name = document.getElementById("create_name").value;
    let text = document.getElementById("create_text").value;
    id_counter++;
    container.innerHTML += '<div class="col-sm">\n<div class="card" style="width: 300px; border-radius: 10%;">\n<div class="' + last_class + '"></div>\n<div class="card-body">\n<h5 class="card-title">' + name + '</h5>\n<p class="card-text">' + text + '</p>\n<button type="button" class="btn btn-primary" id="' + id_counter + '" data-bs-toggle="modal" data-bs-target="#exampleModal" style="background-color: #8d2fa0;">Изменить</button>\n</div>\n</div>\n</div>\n';

    document.getElementById("create_name").value = "";
    document.getElementById("create_text").value = "";
    update_event();
}

function change_card() {
    change_buttons[last_clicked - 1].parentNode.childNodes[1].textContent = document.getElementById("create_name").value;;
    change_buttons[last_clicked - 1].parentNode.childNodes[3].textContent = document.getElementById("create_text").value;
    change_buttons[last_clicked - 1].parentNode.parentNode.childNodes[1].className = last_class;
}

var save = document.getElementById("save");

save.addEventListener('click', function() {
    let name = document.getElementById("create_name").value;
    let text = document.getElementById("create_text").value;
    if (isNaN(parseInt(name[0])) && name != "" && text != "" && selector.selectedIndex != 0) {
        if (modal.childNodes[1].childNodes[1].childNodes[1].childNodes[1].textContent == "Создать карточку") {
            add_card();
        }
        else {
            change_card();
        }
    }
    else if (!isNaN(parseInt(name[0])))
        alert("Название карточки не может начинаться с цифры!");
    else if (name == "" || text == "" || selector.selectedIndex == 0)
        alert("Все поля должны быть заполнены!");
});
