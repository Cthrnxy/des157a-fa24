(function(){
    "use strict"
    console.log("reading JS");
    let currentImageIndex = 0;
    let secondaryIndex = 0;
    let thirdIndex = 0;
    let titleIndex = 0;
    const mainPhotos = ["tkt1.png", "tkt3.png", "tkt2.png"];
    const titles = ["贵阳","成都","香港"];
    const titlesE=["Guiyang","Chengdu","Hongkong"];
    const secondaryPhotos = {
        "tkt1.png": ["guiyang.png"],
        "tkt2.png": ["hongkong1.png","hongkong2.png"],
        "tkt3.png": ["chengdu.png"]
    };

    const thirdPhotos= {
        "tkt1.png": ["gydaily1.jpg", "gydaily2.jpg", "gydaily3.jpg"],
        "tkt2.png": ["hkdaily1.jpg", "hkdaily2.jpg", "hkdaily3.jpg","hkdaily4.jpg","hkdaily5.jpg","hkdaily6.png"],
        "tkt3.png": ["cddaily1.jpg", "cddaily2.jpg", "cddaily3.jpg", "cddaily4.jpg", "cddaily5.jpg"]
    }

    const mainContainer = document.getElementById('ticketMb'); // 根据你的HTML ID进行更改
    const sceneContainer = document.getElementById('sceneMb'); // 确保和HTML中的ID相符
    const dailyContainer = document.getElementById('dailyPictureMb');
    const titleContainer = document.getElementById('city'); // h3元素的容器
    const nextBtn = document.getElementById('next'); // 确保和HTML中的ID相符
    const prevBtn = document.getElementById('prev'); // 确保和HTML中的ID相符
    const music=document.getElementById('backgroundMusic');

// 其他代码保持不变


    function updateImages() {
        const newMainImage = document.createElement('img');
        newMainImage.src = `images/${mainPhotos[currentImageIndex]}`;
        newMainImage.width = 200;
        mainContainer.innerHTML = '';
        mainContainer.appendChild(newMainImage);

        const secondaryArray = secondaryPhotos[mainPhotos[currentImageIndex]];
        const newSecondaryImage = document.createElement('img');
        newSecondaryImage.src = `images/${secondaryArray[secondaryIndex]}`;
        sceneContainer.innerHTML = '';
        sceneContainer.appendChild(newSecondaryImage);

        const thirdArray = thirdPhotos[mainPhotos[currentImageIndex]];
        const newThirdImage = document.createElement('img');
        newThirdImage.src = `images/${thirdArray[thirdIndex]}`;
        dailyContainer.innerHTML = '';
        dailyContainer.appendChild(newThirdImage);

        titleContainer.innerHTML = `<h3>${titles[currentImageIndex]}</h3>
                               <p>${titlesE[currentImageIndex]}</p>`;
    }

    function rotateIndices() {
        secondaryIndex = (secondaryIndex + 1) % secondaryPhotos[mainPhotos[currentImageIndex]].length;
        thirdIndex = (thirdIndex + 1) % thirdPhotos[mainPhotos[currentImageIndex]].length;
    }



    nextBtn.addEventListener('click', function(event) {
        event.preventDefault();
        currentImageIndex = (currentImageIndex + 1) % mainPhotos.length;
        secondaryIndex = 0; // Reset secondary index
        thirdIndex = 0; // Reset third index\
        titleIndex = 0;
        updateImages();
    });

    prevBtn.addEventListener('click', function(event) {
        event.preventDefault();
        currentImageIndex = (currentImageIndex - 1 + mainPhotos.length) % mainPhotos.length;
        secondaryIndex = 0; // Reset secondary index
        thirdIndex = 0; // Reset third index
        titleIndex = 0;
        updateImages();
    });

    setInterval(function() {
        rotateIndices();
        updateImages();
    }, 3000); // Rotate within the set every 3 seconds


    updateImages();

    document.getElementById('musicControl').addEventListener('click', function() {
        var music = document.getElementById('backgroundMusic');
        if (music.paused) {
            music.play();
            this.innerHTML = `<a href="#"><i class="fa-solid fa-pause"></i></a>`;  // 更新按钮文本为“暂停音乐”
        } else {
            music.pause();
            this.innerHTML = `<a href="#"><i class="fa-solid fa-play"></i></a>`;  // 更新按钮文本为“播放音乐”
        }
    });
    


    
    
})()