'use strict'

//--- header бургур-меню  start ---
// Очікування завершення завантаження сторінки
$(document).ready(function () {
    // Обробка кліку на пункті меню
    $(".nav-link").on("click", function () {
        // Закриваємо бургер-меню
        $("#navbarOffcanvasLg").offcanvas("hide");
    });
});

//--- header end ---


// training section start
let trainingThumbSwiper = new Swiper(".trainingThumbSwiper", {
    loop: true,
    spaceBetween: 8,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});

let trainingMainSwiper = new Swiper(".trainingMainSwiper", {
    loop: true,
    spaceBetween: 12,
    navigation: {
        nextEl: "#training .swiper-button-next",
        prevEl: "#training .swiper-button-prev",
    },
    thumbs: {
        swiper: trainingThumbSwiper,
    },
    pagination: {
        el: "#training .swiper-pagination",
        clickable: true,
    },
    allowTouchMove: true,
});

trainingMainSwiper.on('slideChange', function () {
    let videos = document.querySelectorAll(".training-swiper-container .swiper-slide iframe.video");
    for (let video of videos) {
        if (video.parentElement.classList.contains("swiper-slide-active")) {
            let videoUrl = video.src;
            video.src = videoUrl;
        }
    }
});

// training section end


// --- theResultsOfMyClients section start ---
var swiper = new Swiper(".photoSwiper", {

    direction: 'horizontal',
    loop: true,

    simulateTouch: true,
    touchAngle: 45,
    slideToClickedSlide: true,

    keyboard: {
        enabled: true,
    },
    pagination: {
        el: "#theResultsOfMyClients .swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: "#theResultsOfMyClients .swiper-button-next",
        prevEl: "#theResultsOfMyClients .swiper-button-prev",
    },

    slidesPerView: 1,
    spaceBetween: 30,

});

//--- theResultsOfMyClients section end ---

//start clearing the fields
const closeFormWindow = document.getElementById('close-form-window');
const closeSecondWindow = document.getElementById('close-second-window');
const phoneNumberInput = document.querySelector('.phone-number');
const inputName = document.querySelector('.input-name');

closeFormWindow.addEventListener('click', function () {
    phoneNumberInput.value = '';
    inputName.value = '';
});

closeSecondWindow.addEventListener('click', function () {
    phoneNumberInput.value = '';
    inputName.value = '';
});

// --- modal windows start ---
//close form window
// Function to clear error messages and styles
function clearErrors() {
    const errorInputs = document.querySelectorAll('.error-box');
    errorInputs.forEach(input => {
        input.closest('.input-wrapper').querySelector('.error-text').textContent = '';
        input.classList.remove('error-box');
        input.closest('.input-wrapper').classList.remove('error');
    });
}
document.getElementById('close-form-window').addEventListener('click', () => {
    clearErrors();
    document.getElementById('form-window').style.display = 'none';
    document.getElementById('modalWindow').style.display = 'none';
    document.body.style.overflow = 'auto';
    mobileOpen = false;
});
//close the second window
document.getElementById('close-second-window').addEventListener('click', () => {
    clearErrors();
    document.getElementById('second-window').style.display = 'none';
    document.getElementById('modalWindow').style.display = 'none';
    document.body.style.overflow = 'auto';
    //field clearing
    document.querySelectorAll('.registration-form input').forEach(elem => elem.value = "");
    //scroll to top of page
});

let isFormValid = false;
let elemForCheckCaptcha;
const lang = document.documentElement.lang;
//validation
listenSubmit();
function listenSubmit() {
    document.querySelectorAll(".check-form").forEach((elem) =>
        elem.addEventListener("click", (event) => {
            event.preventDefault();

            const form = elem.closest(".registration-form");
            elemForCheckCaptcha = form;
            // function to check the correctness of the entered project name

            function checkName() {
                const inputName = form.querySelector(".input-name");
                const regexName = /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ'`'']{2}[a-zA-Zа-яА-ЯїЇєЄіІґҐ\s'`''-]*$/;
                const containsNumber = /\d/.test(inputName.value);

                if (inputName.value.trim() == "") {
                    switch (lang) {
                        case "uk":
                            inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "Це поле є обов’язковим для заповнення";
                            break;
                        case "en":
                            inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "This field is required";
                            break;
                        default:
                            break;
                    }
                    inputName.closest(".input-wrapper").querySelector("input").classList.add("error-box");
                } else if (inputName.value.trim().length < 2) {
                    switch (lang) {
                        case "uk":
                            inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "Поле має містити не менше двох символів";
                            break;
                        case "en":
                            inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "The field must contain at least two characters";
                            break;
                        default:
                            break;
                    }
                    inputName.closest(".input-wrapper").querySelector("input").classList.add("error-box");
                    inputName.closest(".input-wrapper").classList.add("error");
                } else if (!regexName.test(inputName.value) || containsNumber) {
                    switch (lang) {
                        case "uk":
                            inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "Поле заповнено некоректно";
                            break;
                        case "en":
                            inputName.closest(".input-wrapper").querySelector(".error-text").textContent = "The field is filled out incorrectly";
                            break;
                        default:
                            break;
                    }
                    inputName.closest(".input-wrapper").querySelector("input").classList.add("error-box");
                    inputName.closest(".input-wrapper").classList.add("error");
                }
                else {
                    inputName.closest(".input-wrapper").querySelector(".error-text").innerHTML = "";
                    inputName.closest(".input-wrapper").classList.remove("error");
                    inputName.closest(".input-wrapper").querySelector("input").classList.remove("error-box");
                }
                return regexName.test(inputName.value) && !containsNumber;
            }

            // function to check the correctness of the entered phone number
            function checkPhone() {
                const inputPhone = form.querySelector(".phone-number");
                const regexPhone = /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/;
                if (inputPhone.value.trim() == "") {
                    switch (lang) {
                        case "uk":
                            inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "Це поле є обов’язковим для заповнення";
                            break;
                        case "en":
                            inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "This field is required";
                            break;
                        default:
                            break;
                    }
                    inputPhone.closest(".input-wrapper").querySelector("input").classList.add("error-box");
                } else if (!regexPhone.test(inputPhone.value)) {
                    switch (lang) {
                        case "uk":
                            inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "Поле заповнено некоректно";
                            break;
                        case "en":
                            inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "The field is filled out incorrectly";
                            break;
                        default:
                            break;
                    }
                    inputPhone.closest(".input-wrapper").classList.add("error");
                    inputPhone.closest(".input-wrapper").querySelector("input").classList.add("error-box");
                } else {
                    inputPhone.closest(".input-wrapper").querySelector(".error-text").textContent = "";
                    inputPhone.closest(".input-wrapper").querySelector("input").classList.remove("error-box");
                    inputPhone.closest(".input-wrapper").classList.remove("error");
                }
                return regexPhone.test(inputPhone.value);
            }

            checkName();
            checkPhone();
            if (checkName() && checkPhone()) {
                isFormValid = true;
            } else {
                isFormValid = false;
            }

            // submit to the server if the form is valid
            if (isFormValid) {
                grecaptcha.ready(function () {
                    grecaptcha.execute('6LcwRRUaAAAAADavxcmw5ShOEUt1xMBmRAcPf6QP', { action: 'submit' }).then(function (token) {
                        if (elemForCheckCaptcha.checkValidity()) {
                            const actionUrl = 'https://intita.com/api/v1/entrant';
                            const entrantFormData = new FormData(elemForCheckCaptcha);
                            entrantFormData.append('g-recaptcha-response', token);
                            const http = new XMLHttpRequest();
                            http.open('POST', actionUrl, true);
                            http.send(entrantFormData);
                            http.onreadystatechange = function () {
                                if (+http.readyState === 4 && +http.status === 201) {
                                    entrantSubmitResponse();
                                } else if (+http.status === 400) {
                                    switch (lang) {
                                        case 'uk':
                                            entrantSubmitResponse('Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше');
                                            break;
                                        case 'en':
                                            entrantSubmitResponse('The server is temporary busy. Please try again later');
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                            http.onload = function () {
                                if (+http.status !== 201) {
                                    switch (lang) {
                                        case 'uk':
                                            entrantSubmitResponse('Сервер тимчасово перевантажений. Будь ласка, cпробуйте пізніше');
                                            break;
                                        case 'en':
                                            entrantSubmitResponse('The server is temporary busy. Please try again later');
                                            break;
                                        default:
                                            break;
                                    }
                                    return;
                                }
                                entrantSubmitResponse();
                            }
                        }
                    }
                    );
                }
                );
            }
        })
    );
}
function entrantSubmitResponse(errorStr) {
    const secondWindow = document.getElementById("second-window");
    if (getComputedStyle(secondWindow, null).display === "none") {
        const elementAnketeText =
            document.querySelector(".form-name-content");
        if (errorStr) {
            elementAnketeText.innerText = errorStr;
            document.getElementById("modalWindow").style.display =
                "block";
            document.getElementById("form-window").style.display = "none";
            document.getElementById("second-window").style.display =
                "block";
        } else {
            switch (lang) {
                case "uk":
                    elementAnketeText.innerHTML =
                        "Дякую!<br>Я зателефоную Вам найближчим часом!";
                    break;
                case "en":
                    elementAnketeText.innerText =
                        "We will contact you shortly";
                    break;
                default:
                    break;
            }
            document.getElementById("form-window").style.display = "none";
            document.getElementById("second-window").style.display = "flex";
        }
        secondWindow.style.display = "block";
        document.getElementById("modalWindow").style.display = "block";
        document.getElementById("form-window").style.display = "none";
        document.getElementById("second-window").style.display = "block";
    }
}
// end of recaptha
//open form window
function openForm() {
    document.getElementById('form-window').style.display = 'block';
    document.getElementById('modalWindow').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

let mobileOpen = false;
function openMobileForm() {
    mobileOpen = true;
    document.getElementById('form-window').style.display = 'block';
    document.getElementById('modalWindow').style.display = 'flex';
}
//phone number mask
jQuery(".phone-number").inputmask({
    mask: "+38 (999) 999-99-99",
    greedy: false,
});

//loader start
let allResourcesLoaded = false;

function hideLoader() {
    let loaderImg = document.querySelector('.loader');
    if (localStorage.getItem('loadedOnce')) {
        loaderImg.style.display = 'flex';
    } else {
        loaderImg.style.display = 'none';
        localStorage.setItem('loadedOnce', true);
    }

    if (allResourcesLoaded) {
        let loader = document.getElementById('loader');
        loader.style.opacity = 0;
        setTimeout(() => {
            loader.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', hideLoader);

window.addEventListener('load', () => {
    allResourcesLoaded = true;
    hideLoader();
});

// loader end


// footer scroll - up start //
$(document).ready(function () {
    $(".scrollup").hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".scrollup").fadeIn();
        } else {
            $(".scrollup").fadeOut();
        }
    });

    $(".scrollup").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
