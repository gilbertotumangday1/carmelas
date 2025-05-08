document.addEventListener("DOMContentLoaded", () => {
    const menuBox = document.querySelector('.menuBox');
    const bottomBox = document.querySelector('.bottomBox');
    const originalContent = menuBox.innerHTML;
    let numItems = 0;

    function updateCart(){
        const cartIndicator = document.getElementById("cartIndicator");
        if(cartIndicator){
            cartIndicator.textContent = `View Order[${numItems}]`;
        }
    }
    function attachHoverEvents() {
        const boxes = document.querySelectorAll(".item");
        boxes.forEach(item => {item.dataset.page = 'page.html';})
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
            nav.addEventListener("mouseover", ()=>{
                nav.style.backgroundColor = "white";
                nav.style.color = "black";
            });
            nav.addEventListener("mouseout", () =>{
                nav.style.backgroundColor = "black";
                nav.style.color = "white";
            });
        });
        const carts = document.querySelectorAll(".cart");
        carts.forEach(item => {item.dataset.page = 'order.html';})
    }

    attachHoverEvents();

    menuBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('item')) {
            const itemId = e.target.id;

            let contentText = "Default content.";
            let contentHeader = "Default Header.";
            let imageSRC = "resources/logo.jpeg"
            if (itemId === "item1") {
              contentText = "Item 1 content";
              contentHeader = "Item 1 header";
              imageSRC = "resources/food1.jpg";
            } else if (itemId === "item2") {
              contentText = "Item 2 content";
              contentHeader = "Item 2 header";
              imageSRC = "resources/food2.jpg";
            } else if (itemId === "item3") {
              contentText = "Item 3 content";
              contentHeader = "Item 3 header";
              imageSRC = "resources/food3.jpg";
            } else if (itemId === "item4") {
                contentText = "Item 4 content";
                contentHeader = "Item 4 header";
                imageSRC = "resources/food4.jpg";
            } else if (itemId === "item5") {
                contentText = "Item 5 content";
                contentHeader = "Item 5 header";
                imageSRC = "resources/food5.jpg";
            } else if (itemId === "item6") {
                contentText = "Item 6 content";
                contentHeader = "Item 6 header";
                imageSRC = "resources/food6.jpg";
            } else if(itemId == "item7"){
                contentText = "Item 7 content"
                contentHeader = "Item 7 header";
                imageSRC = "resources/food7.jpg";
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
                const image = document.getElementById("menuImage")
                if (dynamicDiv) {
                    dynamicDiv.innerText = contentText;
                }
                if(dynamicHeader){
                    dynamicHeader.innerText = contentHeader;
                }
                if(image){
                    image.src = imageSRC;
                }

                  // Reattach back button
                  const backBtn = document.getElementById("backButton");
                  if (backBtn) {
                      backBtn.addEventListener("click", () => {
                          menuBox.innerHTML = originalContent;
                          menuBox.style.width = "";
                          menuBox.style.height = "";
                          attachHoverEvents();

                      });
                  }
                  //order button
                  const orderBtn = document.getElementById("orderButton");
                  const orderBtnRem = document.getElementById("orderRemoveButton");
                  if(orderBtn){
                    orderBtn.addEventListener("click", ()=>{
                        numItems = numItems+1;
                        updateCart();
                    });
                  }
                  if(orderBtnRem){
                    orderBtnRem.addEventListener("click",()=>{
                        if(numItems > 0){
                            numItems = numItems-1;
                            updateCart();
                        }
                    })
                  }
              })
              .catch(err => console.error("Failed to load page:", err));
        }
    });
    bottomBox.addEventListener('click', (e)=>{
        if(e.target.classList.contains('cart')){
            console.log("cart clicked");
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

                  // Reattach back button
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