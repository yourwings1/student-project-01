document.addEventListener('DOMContentLoaded', function(){
    console.log("Загружается каталог");
    
    // Глобальный массив товаров
    window.products = [
        {img: "./imges/image1.png", name: "coat", price: 149, id: 1},
        {img: "./imges/image1.png", name: "coat2", price: 149, id: 2},
    ];
    
    let catalog = document.querySelector(".staff-row");
    if (!catalog) {
        console.warn("Элемент staff-row не найден");
        return;
    }
    
    // Функция для получения корзины из localStorage
    let get_cart = () => {
        let cart_data = localStorage.getItem("cart");
        return cart_data ? cart_data.split(",") : [];
    };
    
    // Функция инициализации каталога (отрисовка товаров)
    let init_catalog = (products) => {
        catalog.innerHTML = "";
        for (let product of products) {
            catalog.insertAdjacentHTML(
                "beforeend", 
                `
                    <div id="s-i-${product.id}" class="staff-iteam">
                        <img class="staff-img" src="${product.img}">
                        <p class="staff-name">${product.name}</p>
                        <p class="staff-price">${product.price}$</p>
                        <div class="staff-moves">
                            <button data-id="${product.id}" class="staff-btn shopping-cart-btn">
                                <img class="c-i-img" style="width: 20px;height: 20px;" src="./imges/shopping-cart-notification.svg">
                            </button>
                        </div>
                    </div>
                `
            );
        }
        add_to_cart(); // Добавляем обработчики кнопок после рендеринга каталога
    };
    
    // Функция добавления товара в корзину
    let add_to_cart = () => {
        document.querySelectorAll(".shopping-cart-btn").forEach((x) => {
            x.addEventListener("click", function(){
                let product_id = this.dataset.id;
                let products_in_cart = get_cart();

                // Добавляем товар в корзину
                products_in_cart.push(product_id);

                // Сохраняем обновлённую корзину в localStorage
                localStorage.setItem("cart", products_in_cart.join(","));
                console.log("Добавлено в корзину:", localStorage.getItem("cart"));
            });
        });
    };
    
    // Запускаем инициализацию каталога при загрузке страницы
    init_catalog(window.products);
});
