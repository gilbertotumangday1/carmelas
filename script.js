document.addEventListener("DOMContentLoaded", () => {
    const menuBox = document.querySelector('.menuBox');
    const originalContent = menuBox.innerHTML;

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
    }

    attachHoverEvents();

    menuBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('item')) {
            const itemId = e.target.id;

            let contentText = "Default content.";
            let contentHeader = "Default Header.";
            if (itemId === "item1") {
              contentText = "Item 1 content";
              contentHeader = "Item 1 header";
            } else if (itemId === "item2") {
              contentText = "Item 2 content";
              contentHeader = "Item 3 header";
            } else if (itemId === "item3") {
              contentText = "Item 3 content";
              contentHeader = "Item 3 header";
            } else if (itemId === "item4") {
                contentText = "Item 4 content";
                contentHeader = "Item 4 header";
            } else if (itemId === "item5") {
                contentText = "Item 5 content";
                contentHeader = "Item 5 header";
            } else if (itemId === "item6") {
                contentText = "Item 6 content";
                contentHeader = "Item 6 header";
            } else if(itemId == "item7"){
                contentText = "Item 7 content"
                contentHeader = "Item 7 header";
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
                if (dynamicDiv) {
                    dynamicDiv.innerText = contentText;
                    dynamicHeader.innerText = contentHeader;
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
              })
              .catch(err => console.error("Failed to load page:", err));
        }
    });
});