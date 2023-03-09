//   buttons
const btn_menu_mobile = document.querySelector(".menu-toggle");
const btn_open_project_slide = document.querySelector(".projects");

const scroll_up = document.querySelector(".scroll-up");

const slider = {
  slide_btns: document.querySelector(".slider-buttons "),
  left_slide_btn: document.querySelector(".left-slider"),
  right_slide_btn: document.querySelector(".right-slider"),
  slidersNumber: Array.from(document.querySelectorAll(".project-slider"))
    .length,
  // btn_close_project_slide: "",
  currentSlider: "",
};

let project_slide;
const leftSlider = () => {
  let slideNum = +slider.currentSlider.getAttribute("data-id");
  // hide currentSlider
  const current = slider.currentSlider;
  current.classList.add("hidden");
  // get previous Element
  slideNum = slideNum - 1 <= 0 ? slider.slidersNumber : slideNum - 1;
  slider.currentSlider = document.querySelector(`.project-slider-${slideNum}`);
  slider.currentSlider.classList.remove("hidden");

  // event slider close
  closeSliderCall(slider.currentSlider);
};
const rightSlider = () => {
  let slideNum = +slider.currentSlider.getAttribute("data-id");
  // hide currentSlider
  const current = slider.currentSlider;
  current.classList.add("hidden");
  // get next Element
  slideNum = slideNum + 1 > 8 ? 1 : slideNum + 1;
  slider.currentSlider = document.querySelector(`.project-slider-${slideNum}`);
  slider.currentSlider.classList.remove("hidden");

  // event slider close
  closeSliderCall(slider.currentSlider);
};

//    menus

const menu_mobile = document.querySelector(".mob-menu");
const blury_div = document.querySelector(".blury-div");

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

// event for close button for clciked
const closeSliderCall = function (slide) {
  const close_button = slide.firstElementChild;
  close_button.addEventListener("click", () => {
    slide.classList.add("hidden");
    blury_div.classList.remove("blur");
    slider.slide_btns.classList.add("hidden");
  });
};

if (btn_open_project_slide) {
  btn_open_project_slide.addEventListener("click", (e) => {
    const project_preview = e.target;
    if (!project_preview.classList.contains("project-preview")) return;
    // select the slider whichh clicked
    project_slide = project_preview.nextElementSibling;
    // show it
    project_slide.classList.remove("hidden");
    // blur background
    blury_div.classList.add("blur");

    // assign the clicked slide to slidr obj
    slider.currentSlider = project_slide;

    closeSliderCall(project_slide);
    // slider.btn_close_project_slide = project_slide.firstElementChild;

    // active slide buttons
    if (slider.slidersNumber < 2) return;
    slider.slide_btns.classList.remove("hidden");
    slider.left_slide_btn.addEventListener("click", leftSlider.bind());
    slider.right_slide_btn.addEventListener("click", rightSlider);
  });
}

// scroll up and skills animation

// skills animation
const skills = document.querySelectorAll(".skill");
// the functionality top in scroll event
const skillsAnimation = () => {
  skills.forEach((skill) => {
    const skill_name = skill.lastElementChild;
    const skill_circle = skill_name.previousElementSibling.lastElementChild;
    // add animation for each skill  progress
    /*// temp */   console.log(`progress-${skill_name.innerHTML} `);
    skill_circle.style.animationName = `progress-${skill_name.innerHTML} `;
  });
};

let first_time = true;
// skill animation ends

window.addEventListener("scroll", () => {
  // skill animation
  const skills_section = document.querySelector(".myskills");

  if (
    first_time &&
    skills_section &&
    this.scrollY >= skills_section.offsetTop
  ) {
    console.log("dd");
    skillsAnimation();
    first_time = false;
  }

  // scroll up button
  if (this.scrollY >= this.innerHeight) {
    scroll_up.classList.add("show-scroll-up");
    scroll_up.addEventListener("click", () => {
      this.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  } else {
    scroll_up.classList.remove("show-scroll-up");
  }
});

// after  loading

window.addEventListener("load", () => {
  // spinner;
  const loader = document.querySelector(".loader");
  const blackWall = document.querySelector(".black-wall");

  // actual removing it from code
  //blackWall.addEventListener("animationend", () => {
  setTimeout(()=>{
    loader.classList.add("loader-hidden");
    document.body.removeChild(document.body.firstChild);
    loader.remove();
  },750);
  //});
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

// email sending

const formMesg = document.querySelector(".send_message");
if (formMesg) {
  const sendEmail = () => {
    const emailStatue = document.getElementById("email_statue");
    const senderName = document.getElementById("senderName").value;
    const senderEmail = document.getElementById("senderEmail").value;
    const subject = document.getElementById("subject").value;
    const sentMessage = document.getElementById("sentMesg").value;
    Email.send({
      SecureToken: "7e84e6a6-0534-43e5-8d63-d724b71206fa",
      To: "mo.19.ahmed.47@gmail.com",
      From: "mo.19.ahmed.47@gmail.com",
      Subject: "subject",
      Body:
        " The Sender: " +
        senderName +
        "<br> Email: " +
        senderEmail +
        "<br> Subject: " +
        subject +
        "<br> Message: " +
        sentMessage,
    })
      .then(() => {
        emailStatue.classList.remove("fail");
        emailStatue.innerHTML = " email sent successfully";
      })
      .catch(() => {
        emailStatue.classList.add("fail");
        emailStatue.innerHTML = " email sent successfully";
      });

    setTimeout(() => {
      emailStatue.innerHTML = "";
    }, 2000);
  };

  formMesg.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
    e.target.reset();
  });
}

// title typing
const options = {
  strings: ["Mohamed Ahmed", "front end developer", "ui desginer"],
  typeSpeed: 80,
  backSpeed: 30,
  smartBackspace: false,
  loop: true,
};
if (document.querySelector('.typing') ) {
let typed = new Typed(".typing", options);
    }
