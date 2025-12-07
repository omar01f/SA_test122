document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
});

function validateForm(id) {
    let form = document.getElementById(id);
    let inputs = form.querySelectorAll("input[type=text], input[type=email], textarea");
    for (let i of inputs) {
        if (i.value.trim() === "") {
            popup("Please fill all fields.");
            return false;
        }
    }
    popup("Thank you! Your form was submitted.");
    form.reset();
    return false;
}

function popup(msg) {
    let box = document.createElement("div");
    box.innerText = msg;
    box.style.position = "fixed";
    box.style.bottom = "20px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";
    box.style.background = "#b30000";
    box.style.color = "white";
    box.style.padding = "12px 20px";
    box.style.borderRadius = "6px";
    box.style.opacity = "0";
    box.style.transition = "0.4s";
    document.body.appendChild(box);

    setTimeout(() => { box.style.opacity = "1"; }, 50);
    setTimeout(() => {
        box.style.opacity = "0";
        setTimeout(() => { box.remove(); }, 400);
    }, 2000);
}
