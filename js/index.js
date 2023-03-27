addEventListener('load', () => {
	const iniciarJuego = document.querySelector('main');

	const start = document.querySelector('#start');
	start.onclick = function () {
		iniciarJuego.style.display = 'none';
		Game.init();
	};
});
