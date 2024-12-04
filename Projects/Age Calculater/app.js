input = document.querySelector("input");
but = document.querySelector("button")
let b = document.querySelector("b")
let today = new Date();
let cd = String(today.getDate());
let cm = String(today.getMonth() + 1);
let cy = today.getFullYear();


today = cy + '-' + cm + '-' + cd;
input.value = today;


function agecal() {
    but.classList.add("input")
    setTimeout(() => {
        but.classList.remove("input");
    }, 50);
    let udate = new Date(input.value);
    let ud = String(udate.getDate());
    let uy = String(udate.getFullYear());
    let um = String(udate.getMonth() + 1);
    dd = cd - ud;
    mm = cm - um;
    yy = cy - uy;

    tm = yy * 12;

    if (mm == 0) {
        if (dd < 0) {
            tm = tm - 1;
        }
    }
    else {
        tm = tm + mm;
    }
    show_year = Math.floor(tm / 12);
    show_month = Math.floor(tm % 12);
    if (show_year == 0) {
        year_month = `${show_month} months old`;
    }
    else if (show_month == 0) {
        year_month = `${show_year} years old`;

    }
    else {
        year_month = `${show_year} years ${show_month} months old`;

    }
    b.innerText = `Your are ${year_month}`;
}
but.addEventListener('click', agecal);

