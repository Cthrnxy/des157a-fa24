(function () {
    "use strict";


    // DOM 元素选择
    const img = document.querySelectorAll(".img");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const buttons = document.querySelectorAll(".button p");
    const track = document.getElementById("track");
    const train = document.getElementById("train");
    const sceneDt = document.querySelector("#sceneDt img");
    const dailyPictureDt = document.querySelector("#dailyPictureDt img");
    const movingScene = document.getElementById("movingScene");
    const backButton = document.getElementById("back");
    let titlesDt = ["广州", "贵阳", "成都", "香港"];
    let titlesEDt = ["Guangzhou", "Guiyang", "Chengdu", "Hongkong"];




    function updateTitles() {
        const cityContainer = document.getElementById("city");
        const cityName = titlesDt[currentIndex]; // 当前中文标题
        const cityNameE = titlesEDt[currentIndex]; // 当前英文标题
   
        // 更新 h3 和 h4 内容
        cityContainer.querySelector("h3").textContent = cityName;
        cityContainer.querySelector("h4").textContent = cityNameE;
    }
   
   




    // 定义图片组
    const sceneImages = {
        guangzhou: ["guangzhou1.png", "guangzhou2.png", "guangzhou4.png", "guangzhou5.JPG", "guangzhou6.JPG", "guangzhou1.png"],
        chengdu: ["chengdu.png", "chengdu.png", "chengdu.png", "chengdu.png", "chengdu.png"],
        guiyang: ["guiyang.png", "guiyang.png", "guiyang.png", "guiyang.png", "guiyang.png"],
        hongkong: ["hongkong1.png", "hongkong2.png", "hongkong1.png", "hongkong2.png", "hongkong1.png"]
    };


    const dailyImages = {
        guangzhou: ["gzdaily1.JPG", "gzdaily2.JPG", "gzdaily3.JPG", "gzdaily4.png", "gzdaily5.png", "gzdaily6.png"],
        chengdu: ["cddaily1.jpg", "cddaily2.jpg", "cddaily3.jpg", "cddaily1.jpg", "cddaily2.jpg"],
        guiyang: ["gydaily1.jpg", "gydaily2.jpg", "gydaily3.jpg", "gydaily1.jpg", "gydaily2.jpg"],
        hongkong: ["hkdaily1.jpg", "hkdaily2.jpg", "hkdaily3.jpg", "hkdaily1.jpg", "hkdaily2.jpg"]
    };


    let imgPositions = ['first', 'second', 'third']; // 初始化 tkt 图片的位置
    let currentIndex = 0; // 当前圆点索引
    let selectedGroup = "guangzhou"; // 当前选中的图片组，默认广州
    let trainMoving = false; // 火车移动状态
    let autoSwitchInterval; // 自动切换图片的定时器
    let currentImageIndex = 0; // 当前图片组内的图片索引
    let isTrainAnimationComplete = false; // 火车动画是否完成


    // 初始化图片和圆点状态
    function initialize() {
        img.forEach((image, i) => {
            image.id = imgPositions[i];
        });
        updateButtons(); // 更新圆点状态
        updateImages(); // 更新图片显示
    }


    // 更新圆点颜色
    function updateButtons() {
        buttons.forEach((button, i) => {
            button.style.backgroundColor = (i === currentIndex) ? "rgb(139, 216, 255)" : "silver";
        });
    }


    // 更新当前选中的图片组
    function updateSelectedGroup() {
        const groups = ["guiyang", "chengdu", "hongkong"];
        selectedGroup = groups[currentIndex] || "guangzhou"; // 根据当前索引更新图片组，默认广州
    }


    // 切换到上一张 tkt
    function prev() {
        imgPositions.unshift(imgPositions.pop());
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        updateSelectedGroup(); // 更新图片组
        updateButtons(); // 更新圆点状态
        updateTitles(); // 更新标题
        initialize();
    }


    // 切换到下一张 tkt
    function next() {
        imgPositions.push(imgPositions.shift());
        currentIndex = (currentIndex + 1) % buttons.length;
        updateSelectedGroup(); // 更新图片组
        updateButtons(); // 更新圆点状态
        updateTitles(); // 更新标题
        initialize();
    }


    // 更新图片框中的图片
    function updateImages() {
        const sceneGroup = isTrainAnimationComplete ? sceneImages[selectedGroup] : sceneImages.guangzhou;
        const dailyGroup = isTrainAnimationComplete ? dailyImages[selectedGroup] : dailyImages.guangzhou;


        if (sceneGroup && dailyGroup) {
            sceneDt.src = `images/${sceneGroup[currentImageIndex]}`;
            dailyPictureDt.src = `images/${dailyGroup[currentImageIndex]}`;
        }
    }


    // 自动切换图片逻辑
    function startAutoSwitch() {
    if (autoSwitchInterval) clearInterval(autoSwitchInterval);


    autoSwitchInterval = setInterval(() => {
        const sceneGroup = isTrainAnimationComplete ? sceneImages[selectedGroup] : sceneImages.guangzhou;
        const dailyGroup = isTrainAnimationComplete ? dailyImages[selectedGroup] : dailyImages.guangzhou;


        if (!sceneGroup || !dailyGroup) {
            console.error(`图片组不存在: ${selectedGroup}`);
            clearInterval(autoSwitchInterval);
            return;
        }


        // 当前图片滑出
        sceneDt.classList.add("slide-out");
        dailyPictureDt.classList.add("slide-out");


        // 下一张图片从左滑入
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % sceneGroup.length;


            // 更新图片源
            sceneDt.src = `images/${sceneGroup[currentImageIndex]}`;
            dailyPictureDt.src = `images/${dailyGroup[currentImageIndex]}`;


            // 重置动画状态
            sceneDt.classList.remove("slide-out");
            sceneDt.classList.add("slide-in");


            dailyPictureDt.classList.remove("slide-out");
            dailyPictureDt.classList.add("slide-in");


            // 确保动画完成后移除滑入类
            setTimeout(() => {
                sceneDt.classList.remove("slide-in");
                dailyPictureDt.classList.remove("slide-in");
            }, 1000); // 与 CSS 过渡时间一致
        }, 1000); // 等待当前图片滑出后更新
    }, 3000); // 每 3 秒切换一次图片
}


   
   
   
   


    // 火车移动逻辑
    function moveTrain() {
        if (!trainMoving) return;
   
        const trainPosition = parseInt(train.style.left || track.offsetWidth, 10);
        const newTrainPosition = trainPosition - 5;
   
        if (newTrainPosition > 0) {
            train.style.left = `${newTrainPosition}px`; // 更新火车位置
            requestAnimationFrame(moveTrain); // 继续动画
        } else {
            // 火车到达最左端，完成操作
            train.style.left = `${track.offsetWidth}px`; // 重置火车位置到轨道右侧
            movingScene.style.display = "none"; // 隐藏车窗动画
            sceneDt.parentElement.style.display = "block"; // 恢复普通图片显示
   
            if (!isTrainAnimationComplete) {
                isTrainAnimationComplete = true; // 标记动画完成
                console.log("火车动画完成");
   
                // 删除广州图片组和标题
                if (sceneImages.guangzhou && dailyImages.guangzhou) {
                    delete sceneImages.guangzhou;
                    delete dailyImages.guangzhou;
                    console.log("广州图片组已删除");
                }
   
                if (titlesDt.includes("广州")) {
                    titlesDt.shift(); // 删除广州标题
                    titlesEDt.shift(); // 删除 Guangzhou 标题
                    console.log("广州标题已删除");
                }
   
                // 更新标题为当前圆点对应的内容
                updateTitles();
            }
        }
    }
   
   


    // 长按轨道触发火车移动
    track.addEventListener("mousedown", () => {
        console.log("Track pressed, starting animation...");
        trainMoving = true;
        movingScene.style.display = "block"; // 显示车窗动画
        sceneDt.parentElement.style.display = "none"; // 隐藏普通图片
        requestAnimationFrame(moveTrain);
    });


    track.addEventListener("mouseup", () => {
        console.log("Mouse released, stopping animation...");
        trainMoving = false;
        movingScene.style.display = "none"; // 停止车窗动画
        sceneDt.parentElement.style.display = "block"; // 恢复普通图片
    });


    track.addEventListener("mouseleave", () => {
        console.log("Mouse left track, stopping animation...");
        trainMoving = false;
        movingScene.style.display = "none"; // 停止车窗动画
        sceneDt.parentElement.style.display = "block"; // 恢复普通图片
    });


    // 返回广州图片组
    backButton.addEventListener("click", () => {
        // 恢复广州图片组
        if (!sceneImages.guangzhou) {
            sceneImages.guangzhou = ["guangzhou1.png", "guangzhou2.png", "guangzhou4.png", "guangzhou5.jpg", "guangzhou6.jpg", "guangzhou1.png"];
            dailyImages.guangzhou = ["gzdaily1.jpg", "gzdaily2.jpg", "gzdaily3.jpg", "gzdaily4.png", "gzdaily5.png", "gzdaily6.png"];
            console.log("广州图片组已恢复");
        }


        // 重置状态
        isTrainAnimationComplete = false;
        selectedGroup = "guangzhou";
        currentIndex = 0;
        currentImageIndex = 0;
        updateButtons(); // 更新圆点状态
        updateImages(); // 显示广州图片组
        startAutoSwitch(); // 开启自动切换
    });


    // 左右按钮事件绑定
    left.addEventListener("click", prev);
    right.addEventListener("click", next);


    // 初始化页面
    initialize();
    startAutoSwitch();
})();



