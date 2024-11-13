(function() {
    "use strict";
    console.log('reading JS');
  
    let currentImage = 0;
    const myphotos = ["tkt1.png", "tkt3.png", "tkt2.png"];
  
    const container = document.getElementById('slides');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('previous');
    const scenes = document.getElementById('scene'); 

    nextBtn.addEventListener('click', function(event) {
        event.preventDefault();
    
        currentImage++;
        if (currentImage > myphotos.length - 1) {
          currentImage = 0;
        }
        swapImage();
    });
  

    prevBtn.addEventListener('click', function(event) {
        event.preventDefault();
    
        currentImage--;
        if (currentImage < 0) {
          currentImage = myphotos.length - 1;
        }
        swapImage();
    });
  

    function swapImage() {
        container.innerHTML = ''; 
  

        const newSlide = document.createElement('img');
        newSlide.src = `images/${myphotos[currentImage]}`;
        newSlide.className = "fadeinimg";
        newSlide.id = "myimage";
        newSlide.width = 550; 
  
        container.appendChild(newSlide); 

  
        const hotspot = document.createElement('div');
        hotspot.id = "bottomright";
        hotspot.style.width = '50%';
        hotspot.style.height = '50%';
        hotspot.style.position = 'absolute';
        hotspot.style.bottom = '0';
        hotspot.style.right = '0';
        hotspot.style.cursor = 'pointer';
        
        container.appendChild(hotspot);

    
        hotspot.addEventListener("mouseover", function() {
            newSlide.classList.add("bottomright"); 

         
            photos.style.opacity = 0.5; 
            setTimeout(function() {
        
                if (myphotos[currentImage] === 'tkt2.png') {
                    photos.src = 'images/hongkong.png';
                } else if (myphotos[currentImage] === 'tkt1.png') {
                    photos.src = 'images/guiyang.jpg';
                } else if (myphotos[currentImage] === 'tkt3.png') {
                    photos.src = 'images/chengdu.png';
                }
                photos.style.opacity = 1; 
            }, 500); 
        });

        hotspot.addEventListener("mouseout", function() {
            newSlide.classList.remove("bottomright"); 

            photos.src = 'images/sky.png';
            photos.style.opacity = 1;
        });
    }
    swapImage();

})();
