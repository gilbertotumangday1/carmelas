document.addEventListener("DOMContentLoaded", () => {
    const menuBox = document.querySelector('.menuBox');
    const bottomBox = document.querySelector('.bottomBox');
    const originalContent = menuBox.innerHTML;
    let items = [];

    function updateCart(){
        const cartIndicator = document.getElementById("cartIndicator");
        if(cartIndicator){
            cartIndicator.textContent = `View Order[${items.length}]`;
        }
    }

    function renderOrderContent() {
        const orderContent = document.getElementById("orderContent");
        const template = document.getElementById("orderItemTemplate");
    
        if (!orderContent || !template) return;
    
        orderContent.innerHTML = "";
    
        if (items.length === 0) {
            orderContent.innerHTML = "<p>No items in your order.</p>";
            return;
        }
    
        items.forEach(itemId => {
            const clone = template.content.cloneNode(true);
            const header = clone.querySelector(".orderItemHeader");
            const addBtn = clone.querySelector(".addBtn");
            const removeBtn = clone.querySelector(".removeBtn");
    
            let name = "";
            switch (itemId) {
                case "item1": name = "Item 1"; break;
                case "item2": name = "Item 2"; break;
                case "item3": name = "Item 3"; break;
                case "item4": name = "Item 4"; break;
                case "item5": name = "Item 5"; break;
                case "item6": name = "Item 6"; break;
                case "item7": name = "Item 7"; break;
            }
    
            header.textContent = name;
    
            if (addBtn) {
                addBtn.addEventListener("click", () => {
                    items.push(itemId);
                    updateCart();
                    renderOrderContent();
                });
            }
    
            if (removeBtn) {
                removeBtn.addEventListener("click", () => {
                    const index = items.indexOf(itemId);
                    if (index !== -1) {
                        items.splice(index, 1);
                        updateCart();
                        renderOrderContent();
                    }
                });
            }
    
            orderContent.appendChild(clone);
        });
    }
    
    function attachHoverEvents() {
        const boxes = document.querySelectorAll(".item");
        boxes.forEach(item => { item.dataset.page = 'page.html'; });
        boxes.forEach(box => {
            box.addEventListener("mouseover", () => {
                box.style.backgroundColor = "white";
                box.style.color = "black";
            });
            box.addEventListener("mouseout", () => {
                box.style.backgroundColor = "black";
                box.style.color = "white";
            });
        });

        const buttons = document.querySelectorAll(".button");
        buttons.forEach(button => {
            button.addEventListener("mouseover", () => {
                button.style.backgroundColor = "black";
                button.style.color = "white";
            });
            button.addEventListener("mouseout", () => {
                button.style.backgroundColor = "white";
                button.style.color = "black";
            });
        });

        const navigators = document.querySelectorAll(".navigator");
        navigators.forEach(nav => {
            nav.addEventListener("mouseover", () => {
                nav.style.backgroundColor = "white";
                nav.style.color = "black";
            });
            nav.addEventListener("mouseout", () => {
                nav.style.backgroundColor = "black";
                nav.style.color = "white";
            });
        });

        const carts = document.querySelectorAll(".cart");
        carts.forEach(item => { item.dataset.page = 'order.html'; });
    }

    attachHoverEvents();

    menuBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('item')) {
            const itemId = e.target.id;

            let contentText = "Default content.";
            let contentHeader = "Default Header.";
            let imageSRC = "resources/logo.jpeg";

            switch(itemId) {
                case "item1": contentText = "Item 1 content"; contentHeader = "Item 1 header"; imageSRC = "resources/food1.jpg"; break;
                case "item2": contentText = "Item 2 content"; contentHeader = "Item 2 header"; imageSRC = "resources/food2.jpg"; break;
                case "item3": contentText = "Item 3 content"; contentHeader = "Item 3 header"; imageSRC = "resources/food3.jpg"; break;
                case "item4": contentText = "Item 4 content"; contentHeader = "Item 4 header"; imageSRC = "resources/food4.jpg"; break;
                case "item5": contentText = "Item 5 content"; contentHeader = "Item 5 header"; imageSRC = "resources/food5.jpg"; break;
                case "item6": contentText = "Item 6 content"; contentHeader = "Item 6 header"; imageSRC = "resources/food6.jpg"; break;
                case "item7": contentText = "Item 7 content"; contentHeader = "Item 7 header"; imageSRC = "resources/food7.jpg"; break;
            }

            const page = e.target.dataset.page;
            const originalWidth = menuBox.offsetWidth;
            const originalHeight = menuBox.offsetHeight;
            menuBox.style.width = `${originalWidth}px`;
            menuBox.style.height = `${originalHeight}px`;

            fetch(page)
                .then(res => res.text())
                .then(html => {
                    menuBox.innerHTML = html;
                    attachHoverEvents();

                    const dynamicDiv = document.getElementById("menucontent");
                    const dynamicHeader = document.getElementById("menucontentheader");
                    const image = document.getElementById("menuImage");

                    if (dynamicDiv) dynamicDiv.innerText = contentText;
                    if (dynamicHeader) dynamicHeader.innerText = contentHeader;
                    if (image) image.src = imageSRC;

                    const backBtn = document.getElementById("backButton");
                    if (backBtn) {
                        backBtn.addEventListener("click", () => {
                            menuBox.innerHTML = originalContent;
                            menuBox.style.width = "";
                            menuBox.style.height = "";
                            attachHoverEvents();
                        });
                    }

                    const orderBtn = document.getElementById("orderButton");
                    const orderBtnRem = document.getElementById("orderRemoveButton");

                    if (orderBtn) {
                        orderBtn.addEventListener("click", () => {
                            items.push(itemId);
                            updateCart();
                        });
                    }

                    if (orderBtnRem) {
                        orderBtnRem.addEventListener("click", () => {
                            const index = items.indexOf(itemId);
                            if (index !== -1) {
                                items.splice(index, 1);
                            }
                            updateCart();
                        });
                    }
                })
                .catch(err => console.error("Failed to load page:", err));
        }
    });

    bottomBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart')) {
            const page = e.target.dataset.page;
            const originalWidth = menuBox.offsetWidth;
            const originalHeight = menuBox.offsetHeight;
            menuBox.style.width = `${originalWidth}px`;
            menuBox.style.height = `${originalHeight}px`;

            fetch(page)
                .then(res => res.text())
                .then(html => {
                    menuBox.innerHTML = html;
                    attachHoverEvents();

                    const orderContent = document.getElementById("orderContent");
                    const template = document.getElementById("orderItemTemplate");

                    renderOrderContent();

                    const backBtn = document.getElementById("backButton");
                    if (backBtn) {
                        backBtn.addEventListener("click", () => {
                            menuBox.innerHTML = originalContent;
                            menuBox.style.width = "";
                            menuBox.style.height = "";
                            attachHoverEvents();
                        });
                    }
                })
                .catch(err => console.error("Failed to load page:", err));
        }
    });
});
