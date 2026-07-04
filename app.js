/*=========================================================
                WAYMYTRIP V2
                    APP.JS
=========================================================*/

"use strict";

/*=========================================================
                    SELECTORS
=========================================================*/

const header = document.getElementById("header");

const menuBtn = document.getElementById("menuBtn");

const closeMenu = document.getElementById("closeMenu");

const mobileMenu = document.getElementById("mobileMenu");

const themeToggle = document.getElementById("themeToggle");

const preloader = document.getElementById("preloader");

const backToTop = document.getElementById("backToTop");

/*=========================================================
                PRELOADER
=========================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        preloader.style.opacity="0";

        preloader.style.visibility="hidden";

        preloader.style.pointerEvents="none";

    },700);

});

/*=========================================================
                STICKY HEADER
=========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});

/*=========================================================
                MOBILE MENU
=========================================================*/

menuBtn.addEventListener("click",()=>{

    mobileMenu.classList.add("active");

    document.body.style.overflow="hidden";

});

closeMenu.addEventListener("click",closeMobileMenu);

function closeMobileMenu(){

    mobileMenu.classList.remove("active");

    document.body.style.overflow="";

}

document.querySelectorAll("#mobileMenu a").forEach(link=>{

    link.addEventListener("click",closeMobileMenu);

});

/*=========================================================
                THEME
=========================================================*/

const savedTheme=localStorage.getItem("waymytrip-theme");

if(savedTheme==="dark"){

    document.body.classList.add("dark");

    themeToggle.innerHTML='<i class="fa-solid fa-sun"></i>';

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    const dark=document.body.classList.contains("dark");

    localStorage.setItem(

        "waymytrip-theme",

        dark?"dark":"light"

    );

    themeToggle.innerHTML=dark

    ?'<i class="fa-solid fa-sun"></i>'

    :'<i class="fa-solid fa-moon"></i>';

});

/*=========================================================
            SMOOTH SCROLL
=========================================================*/

document.querySelectorAll(

'a[href^="#"]'

).forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(!target) return;

        e.preventDefault();

        window.scrollTo({

            top:target.offsetTop-70,

            behavior:"smooth"

        });

    });

});

/*=========================================================
            BACK TO TOP
=========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>450){

        backToTop.classList.add("show");

    }

    else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================================
                FAQ
=========================================================*/

document.querySelectorAll(".faq-item").forEach(item=>{

    const question=item.querySelector(".faq-question");

    const answer=item.querySelector(".faq-answer");

    question.addEventListener("click",()=>{

        document.querySelectorAll(".faq-item").forEach(faq=>{

            if(faq!==item){

                faq.querySelector(".faq-answer").style.maxHeight=null;

            }

        });

        if(answer.style.maxHeight){

            answer.style.maxHeight=null;

        }

        else{

            answer.style.maxHeight=

            answer.scrollHeight+"px";

        }

    });

});

/*=========================================================
                COUNTERS
=========================================================*/

const counters=document.querySelectorAll(".counter");

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter=entry.target;

const target=+counter.dataset.target;

let current=0;

const increment=Math.ceil(target/120);

const timer=setInterval(()=>{

current+=increment;

if(current>=target){

current=target;

clearInterval(timer);

}

counter.textContent=current.toLocaleString();

},20);

counterObserver.unobserve(counter);

});

},

{

threshold:.4

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/*=========================================================
                YEAR
=========================================================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

console.log(

"WayMyTrip V2 Loaded"

);