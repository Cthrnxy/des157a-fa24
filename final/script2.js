(function () {
    "use strict";
    console.log("reading JS");


    // tkt 图片滚动
    const img = document.querySelectorAll(".img");
    const left = document.querySelector(".left");
    const right = document.querySelector(".right");
    const buttons = document.querySelectorAll("p");


    let imgPositions = ['first', 'second', 'third']; // 初始化 tkt 图片的位置
    let selectedTkt = "tkt1"; // 默认选择的 tkt


    function initialize() {
        img.forEach((image, i) => {
            image.id = imgPositions[i]; // 更新每张图片的 `id`
        });
        updateSelectedTkt(); // 更新选中的 `tkt`
        console.log("滚动初始化完成:", imgPositions);
    }
   
    function updateSelectedTkt() {
        const selectedIndex = imgPositions.indexOf('second'); // 找到中间位置的索引
        selectedTkt = `tkt${selectedIndex + 1}`; // 更新选中的 tkt
        console.log(`当前选中的 tkt 是: ${selectedTkt}`);
    }
   


    function updateButtons() {
        buttons.forEach((button, i) => {
            button.style.backgroundColor = (imgPositions[i] === 'second') ? "#8bd8ff" : "silver";
        });
    }


    function updateSelectedTkt() {
        const selectedIndex = imgPositions.indexOf('second'); // 找到中间位置的索引
        selectedTkt = `tkt${selectedIndex + 1}`; // 根据中间位置更新选择的 tkt
        console.log(`当前选择的 tkt 是: ${selectedTkt}`);
    }


    function prev() {
        imgPositions.unshift(imgPositions.pop()); // 将数组最后一个元素移动到第一位
        initialize();
    }


    function next() {
        imgPositions.push(imgPositions.shift()); // 将数组第一个元素移动到最后
        initialize();
    }


    left.addEventListener("click", prev);
    right.addEventListener("click", next);


    initialize(); // 初次初始化


    // 场景和每日图片的自动切换
    const sceneDt = document.querySelector("#sceneDt img");
    const dailyPictureDt = document.querySelector("#dailyPictureDt img");
    const movingScene = document.getElementById("movingScene"); // 动画容器
    const track = document.getElementById("track");
    const train = document.getElementById("train");
    const backButton = document.getElementById("back");


    // 定义图片组
    const sceneImages = {
        guangzhou: ["guangzhou1.png", "guangzhou2.png","guangzhou4.png", "guangzhou5.jpg", "guangzhou6.jpg"],
        tkt1: ["guiyang.png"],
        tkt2: ["hongkong1.png", "hongkong2.png"],
        tkt3: ["chengdu.png"]
    };


    const dailyImages = {
        guangzhou: ["gzdaily1.jpg", "gzdaily2.jpg", "gzdaily3.jpg", "gzdaily4.png", "gzdaily5.png", "gzdaily6.png", "gzdaily7.png", "gzdaily8.jpg"],
        tkt1: ["gydaily1.jpg", "gydaily2.jpg", "gydaily3.jpg"],
        tkt2: ["hkdaily1.jpg", "hkdaily2.jpg", "hkdaily3.jpg", "hkdaily4.jpg", "hkdaily5.jpg", "hkdaily6.png"],
        tkt3: ["cddaily1.jpg", "cddaily2.jpg", "cddaily3.jpg", "cddaily4.jpg", "cddaily5.jpg"]
    };


    let currentGroup = "guangzhou"; // 当前图片组，初始为广州组
    let currentImageIndex = 0; // 当前图片索引
    let autoSwitchInterval; // 自动切换的定时器
    let trainMoving = false; // 火车是否移动


    // 更新图片框中的图片
    function updateImages() {
        sceneDt.src = `images/${sceneImages[currentGroup][currentImageIndex]}`;
        dailyPictureDt.src = `images/${dailyImages[currentGroup][currentImageIndex]}`;
    }


    // 启动当前图片组的自动切换
    function startAutoSwitch() {
        if (autoSwitchInterval) clearInterval(autoSwitchInterval); // 清除之前的定时器


        autoSwitchInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % sceneImages[currentGroup].length;
            updateImages(); // 更新图片
        }, 2000); // 每 3 秒切换一次
    }


    // 重置到初始广州图片组
    function resetToGuangzhou() {
        clearInterval(autoSwitchInterval); // 停止自动切换
        currentGroup = "guangzhou"; // 重置为广州组
        currentImageIndex = 0; // 重置图片索引
        updateImages(); // 更新图片
        startAutoSwitch(); // 重新启动自动切换
        movingScene.style.display = "none"; // 隐藏动画
        sceneDt.style.display = "block"; // 显示场景图片
    }


    // 火车移动逻辑
    function moveTrain() {
        if (!trainMoving) return; // 如果鼠标未按下，则停止火车移动


        const trainPosition = parseInt(train.style.left || track.offsetWidth, 10);
        const newTrainPosition = trainPosition - 5; // 每次移动 5 像素


        if (newTrainPosition > 0) {
            train.style.left = `${newTrainPosition}px`;
            requestAnimationFrame(moveTrain); // 递归调用实现动画
        } else {
            train.style.left = `${track.offsetWidth}px`; // 重置火车位置
            movingScene.style.display = "none"; // 隐藏动画
            sceneDt.style.display = "block"; // 显示图片
            currentGroup = selectedTkt; // 切换到选择的 tkt 图片组
            currentImageIndex = 0; // 重置图片索引
            startAutoSwitch(); // 启动图片切换
        }
    }


    // 鼠标长按轨道触发火车移动
    track.addEventListener("mousedown", () => {
        trainMoving = true; // 启动火车移动
        movingScene.style.display = "block"; // 显示动画
        sceneDt.style.display = "none"; // 隐藏场景图片
        requestAnimationFrame(moveTrain);
    });


    track.addEventListener("mouseup", () => {
        trainMoving = false; // 停止火车移动
        resetToGuangzhou(); // 返回到广州组切换
    });


    track.addEventListener("mouseleave", () => {
        trainMoving = false; // 停止火车移动
        resetToGuangzhou(); // 返回到广州组切换
    });


    // 初始化页面
    updateImages(); // 显示初始图片
    startAutoSwitch(); // 启动初始图片组自动切换
})();



