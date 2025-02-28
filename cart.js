    console.log("Корзина загружается");
    
    // Проверяем, есть ли глобальный список товаров
    let products = window.products || [
        {img: "./imges/image1.png", name: "coat", price: 149, id: 1},
        {img: "./imges/image1.png", name: "coat2", price: 149, id: 2},
    ];
    
    // Функция для показа/скрытия корзины
    const Cartt = document.querySelector(".shopping-cart--main-back");
    const toggleVisibleCart = (isVisible) => {
        if(isVisible){
            Cartt.classList.remove("visually-hidden");
        } else {
            Cartt.classList.add("visually-hidden");
        }
    };

    if(!Cartt){
        console.warn("Элемент shopping-cart--main-back не найден");
    }

    // Добавляем обработчики открытия/закрытия корзины
    document.getElementById("open-cart").addEventListener("click", function(){
        toggleVisibleCart(true);
    });

    document.getElementById("close-cart").addEventListener("click", function(){
        toggleVisibleCart(false);
    });

    // Функция для загрузки товаров из localStorage
    let get_cart = () => {
        let cart_data = localStorage.getItem("cart");
        let cart_items = cart_data ? cart_data.split(",") : [];
        let cart_map = {};
        cart_items.forEach(id => {
            cart_map[id] = (cart_map[id] || 0) + 1; // Увеличиваем количество одинаковых товаров
        });
        return cart_map;
    };

    // Функция инициализации корзины (отрисовка товаров)
    let init_cart = () => {
        let shopping_cart = document.querySelector(".shopping-cart--main");
        if (!shopping_cart) {
            console.error("Элемент shopping-cart--main не найден");
            return;
        }
        shopping_cart.innerHTML = "";

        let products_in_cart = get_cart(); // Получаем данные из localStorage
        let total_price = 0; // Общая сумма заказа

        if (Object.keys(products_in_cart).length === 0) {
            shopping_cart.innerHTML = "<p>Корзина пустая</p>";
            return;
        }

        // Проходим по товарам в корзине и отрисовываем их
        for (let item_id in products_in_cart) {
            let product = products.find(p => p.id == item_id);
            if (!product) continue;
            
            let quantity = products_in_cart[item_id]; // Количество товара
            let item_total = product.price * quantity; // Подсчет суммы за этот товар
            total_price += item_total; // Добавляем в общую сумму

            shopping_cart.insertAdjacentHTML(
                "beforeend",
                `   <div class="shopping-cart-iteam">
                        <div class="shopping-cart-iteam-radio-btn">
                            <input type="checkbox" name="drone" value="on" checked>
                        </div>
                        <img class="shopping-cart-iteam-img" src="${product.img}">
                        <p class="shopping-cart--iteam-name">Товар №${product.id}</p>
                        <p class="shopping-cart--iteam-price">Цена: ${product.price}$</p>
                        <p class="shopping-cart--iteam-quantity">Кол-во: ${quantity}</p>
                        <p class="shopping-cart--iteam-total">Сумма: ${item_total}$</p>
                    </div>`
            );
        }
        
        // Вывод общей суммы корзины
        shopping_cart.insertAdjacentHTML("beforeend", `<p class="shopping-cart--total-price">Общая сумма: ${total_price}$</p>`);
    };

    // Запускаем загрузку корзины при открытии страницы
    init_cart();
});
