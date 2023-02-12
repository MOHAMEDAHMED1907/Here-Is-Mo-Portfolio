//   buttons
const btn_menu_mobile = document.querySelector(".menu-toggle");
const btn_open_project_slide = document.querySelector(".projects");
const blury_div = document.querySelector(".blury-div");
let btn_close_project_slide = "";

//    menus

const menu_mobile = document.querySelector(".mob-menu");
let project_slide;

// eventlisteners

btn_menu_mobile.addEventListener("click", function (e) {
  //   e.preventDefault();

  const nav = menu_mobile.parentElement;
  // mode off
  if (nav.classList.contains("d-none")) {
    // change icon btn
    btn_menu_mobile.classList.add("mode-on");
    // show mobile menu
    nav.classList.remove("d-none");
    setTimeout(() => {
      menu_mobile.classList.add("show-mob-menu");
    }, 1);
  } else {
    // change icon btn
    btn_menu_mobile.classList.remove("mode-on");
    // show mobile menu
    menu_mobile.classList.remove("show-mob-menu");
    setTimeout(() => {
      nav.classList.add("d-none");
    }, 500);
  }
});

if (btn_open_project_slide) {
  btn_open_project_slide.addEventListener("click", (e) => {
    const project_preview = e.target;
    if (!project_preview.classList.contains("project-preview")) return;
    project_slide = project_preview.nextElementSibling;
    project_slide.classList.remove("hidden");
    blury_div.classList.add("blur");
    // blur background
    btn_close_project_slide = project_slide.firstElementChild;

    btn_close_project_slide.addEventListener("click", () => {
      project_slide.classList.add("hidden");
      blury_div.classList.remove("blur");
    });
  });
}

// after  loading

window.addEventListener("load", () => {
  // spinner;
  const loader = document.querySelector(".loader");
  const blackWall = document.querySelector(".black-wall");

  // actual removing it from code
  blackWall.addEventListener("animationend", () => {
    loader.classList.add("loader-hidden");
    document.body.removeChild(document.body.firstChild);
    loader.remove();
  });
  // spinner ends
});

/// hover projects
const handleOnMouseMove = (new_mouse_pos) => {
  const { currentTarget: target } = new_mouse_pos;
  const current_pos = target.getBoundingClientRect();
  const x = new_mouse_pos.clientX - current_pos.left;
  const y = new_mouse_pos.clientX - current_pos.top;

  target.style.setProperty("--mouse-pos-x", `${x}px`);
  target.style.setProperty("--mouse-pos-y", `${y}px`);
};

const projects_holders = document.querySelectorAll(".project-preview");

for (const card of projects_holders) {
  card.onmousemove = (e) => handleOnMouseMove(e);
}
