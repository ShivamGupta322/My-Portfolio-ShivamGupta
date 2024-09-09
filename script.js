// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



var allH1=document.querySelectorAll("#about h1")
allH1.forEach(function(elem){
    var clutter=""
    var h1Text=elem.textContent
    var splittedText=h1Text.split("")
    splittedText.forEach(function(elem){
        clutter +=`<span>${elem}</span>`
        
    })
    elem.innerHTML=clutter
    
})


gsap.from("#about h1 span",{
  color: "white",
  stagger: 0.01, // Decreased stagger for faster animation
  scrollTrigger: {
      trigger: "#about h3",
      scroller: "#main",
      // markers: true,
      start: "top 110%",
      end: "top -10%",
      scrub: 0.1, // Lower scrub for faster animation
      
  }
});


const cards = gsap.utils.toArray(".card");

cards.forEach(card => {
  const anim = gsap.fromTo(
    card,
    {
      autoAlpha: 0,
      y: 100,
      x: -100,
      rotate: -10
    },
    {
      duration: 0.6,
      autoAlpha: 1,
      y: 0,
      x: 0,
      rotate: 0
    }
  );

  ScrollTrigger.create({
    trigger: card,
    animation: anim,
    start: "top 80%",  // Animation triggers when the card is in view
    end: "bottom 10%", // Marks the end of the trigger area
    toggleActions: "play none none reverse",  // Replays when re-entering
    // markers: true,  // Optional: adds markers for debugging
    
  });
});




// const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//     console.log(e)
// })

// function raf(time) {
//     lenis.raf(time)
//     requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)



let tl = gsap.timeline({
  scrollTrigger: {
      trigger: '.main-section',
      // pin: true,
      start: 'top 120%',

      

      end: '200% 50%',
      // scrub: 0.01,  
      // markers: true,
      
  }
});

tl.to("#animations", {
  opacity: 1,
  filter: "blur(0px)"
})
  .to("#logo", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#social", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#seo", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#adobe", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#reels", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#html", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#digital", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#webflow", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#figma", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#javascript", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#wordpress", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#css", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })




  
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control



// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}





const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});




var sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;

odrag.onmousedown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX, sY = e.clientY;

  this.onmousemove = function (e) {
    e = e || window.event;
    var nX = e.clientX, nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1; // Adjust sensitivity
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onmouseup = function () {
    this.onmousemove = null;
    odrag.timer = setInterval(function () {
      desX *= 0.95; // Decrease momentum gradually
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false); // Pause spinning during drag
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true); // Resume spinning after drag
      }
    }, 17);
  };
  
  return false;
};

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}





document.addEventListener('DOMContentLoaded', function() {
  // Assuming you have a button with the class `Btn-1` for the download link
  const downloadButton = document.querySelector('.Btn-1');

  if (downloadButton) {
      downloadButton.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default anchor behavior
          window.open('https://drive.google.com/uc?export=download&id=1edHxY8CW4gox6HMg5c1OxjTgtDeiSPuR', '_blank');
      });
  }
});



// window.addEventListener('scroll', function() {
//   const header = document.querySelector('header');
  
//   if (window.scrollY > 50) { // You can adjust the scroll threshold
//     // header.style.padding = '5px 0'; // Reduce padding
//     header.style.transform = 'scale(0.9)'; // Shrink the header
//     header.style.width='50%'
//     header.style.left='22vw'
   

//   } else {
//     header.style.padding = '10px 0'; // Reset padding
//     header.style.transform = 'scale(1)'; // Reset the size
//     header.style.width='100%'
//     header.style.left='0vw'
//   }
// });

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const navUl = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li a');
  const btn = document.querySelector('.Btn-1');
  
  if (window.scrollY > 50) { // Adjust the scroll threshold as needed
      // Shrink the header, remove shadow and border-radius, and move to the left
      gsap.to(header, { 
          duration: 0.5, 
          padding: '5px 0', 
          scale: 0.9,
          background: "rgba(24, 2, 2, 0)", // Set background color when scrolled
          boxShadow: 'none', // Remove shadow on scroll
          borderRadius: '0px', // Remove border-radius on scroll
          border: 'none', // Remove border
          color:"black",
          
      });
      
      // Animate the nav list to move to the left and change to column
      gsap.to(navUl, {
          duration: 0.5,
          x: '-7vw',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: '30vh',
          left: '10px',
          gap: '3vh',
          color:"black",
          // background: "rgba(24, 2, 2, 0.8)", // Set background color when scrolled
          borderRadius: '10px', // Add border-radius to nav

         background: "rgba( 24, 2, 2, 0.25 )",
         bixShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
         backdropFilter:"backdrop-filter: blur( 0 )",
        

        



      });
      
      // Animate the links to move with the nav
      gsap.to(navLinks, {
          duration: 0.5,
          color: '#fff', // Change link color on scroll
          background: "transparent", // Clear any background on the links
      });
      
      // Move the button as well
      gsap.to(btn, {
          duration: 0.5,
          x: '-52vw',
          y: '18vh',
          opacity: 0.8,
      });
  } else {
      // Reset header, nav, and links when scroll position is back to top
      gsap.to(header, { 
          duration: 0.5, 
          padding: '10px 0', 
          scale: 1,
          background: "rgba(24, 2, 2, 0.25)", // Reset background color
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Restore box shadow
          borderRadius: '10px', // Restore border-radius
      });
      
      // Reset nav list position and layout
      gsap.to(navUl, { 
          duration: 0.5, 
          x: '0vw', 
          flexDirection: 'row', 
          position: 'static',
          background: "transparent", // Reset background color for nav
      });
      
      // Reset link styles
      gsap.to(navLinks, {
          duration: 0.5,
          color: '#e1e1e1', // Reset link color
          background: "none", // Reset background for links
      });
      
      // Reset the button position
      gsap.to(btn, {
          duration: 0.5,
          x: '0vw',
          y: '0vh',
          opacity: 1,
      });
  }
});
