	console.log("JavaScript загружен!"); // Проверяем, загружается ли код

	const hamburger = document.querySelector(".hamburger");
	const navMenu = document.querySelector(".header--nav");

	if (!hamburger) {
		console.error("Ошибка: Элемент .hamburger не найден!");
		return;
	}
	if (!navMenu) {
		console.error("Ошибка: Элемент .header--nav не найден!");
		return;
	}

	hamburger.addEventListener("click", function () {
		console.log("Бургер-кнопка нажата!");
		navMenu.classList.toggle("active");
		hamburger.classList.toggle("active");
	});

	// Закрытие при клике вне меню
	document.addEventListener("click", function (event) {
		if (
			!hamburger.contains(event.target) &&
			!navMenu.contains(event.target)
		) {
			console.log("Закрываем меню...");
			navMenu.classList.remove("active");
			hamburger.classList.remove("active");
		}
	});
