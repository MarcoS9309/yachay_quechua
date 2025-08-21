// Encapsulación en módulo IIFE para evitar contaminación del scope global
(function() {
    'use strict';
    
    // Datos de vocabulario por categoría
    const vocabulario = {
        basico: [
            { quechua: "Allin", spanish: "Bueno/Bien" },
            { quechua: "Kusay", spanish: "Amor/Cariño" },
            { quechua: "Yachay", spanish: "Saber/Conocer" },
            { quechua: "Rimay", spanish: "Hablar" },
            { quechua: "Qhaway", spanish: "Ver/Mirar" },
            { quechua: "Pukllay", spanish: "Jugar" },
            { quechua: "Tusuy", spanish: "Bailar" },
            { quechua: "Takiy", spanish: "Cantar" }
        ],
        familia: [
            { quechua: "Ayllu", spanish: "Familia" },
            { quechua: "Mama", spanish: "Madre" },
            { quechua: "Tayta", spanish: "Padre" },
            { quechua: "Wawa", spanish: "Bebé/Niño" },
            { quechua: "Turi", spanish: "Hermano" },
            { quechua: "Pana", spanish: "Hermana" },
            { quechua: "Awicha", spanish: "Abuela" },
            { quechua: "Achu", spanish: "Abuelo" }
        ],
        naturaleza: [
            { quechua: "Inti", spanish: "Sol" },
            { quechua: "Killa", spanish: "Luna" },
            { quechua: "Quyllur", spanish: "Estrella" },
            { quechua: "Mayu", spanish: "Río" },
            { quechua: "Urqu", spanish: "Montaña" },
            { quechua: "Sach'a", spanish: "Árbol" },
            { quechua: "Wayra", spanish: "Viento" },
            { quechua: "Para", spanish: "Lluvia" }
        ],
        comida: [
            { quechua: "Papa", spanish: "Papa/Patata" },
            { quechua: "Sara", spanish: "Maíz" },
            { quechua: "Kinwa", spanish: "Quinua" },
            { quechua: "Uchukuta", spanish: "Ají" },
            { quechua: "Yaku", spanish: "Agua" },
            { quechua: "Aswa", spanish: "Chicha" },
            { quechua: "T'anta", spanish: "Pan" },
            { quechua: "Aycha", spanish: "Carne" }
        ]
    };

    // Datos de lecciones estructurados (sin HTML embebido)
    const lecciones = {
        saludos: {
            titulo: "Lección 1: Saludos en Quechua",
            vocabulario: [
                { quechua: "Allin p'unchay", spanish: "Buenos días", audio: "allin-punchay" },
                { quechua: "Allin tuta", spanish: "Buenas noches", audio: "allin-tuta" },
                { quechua: "Napaykullayki", spanish: "Te saludo", audio: "napaykullayki" },
                { quechua: "Tupananchiskama", spanish: "Hasta pronto", audio: "tupananchiskama" }
            ],
            descripcion: "Intenta usar estos saludos en diferentes momentos del día. El quechua es un idioma muy expresivo y cálido."
        },
        familia: {
            titulo: "Lección 2: La Familia - Ayllu",
            vocabulario: [
                { quechua: "Ayllu", spanish: "Familia", audio: "ayllu" },
                { quechua: "Mama", spanish: "Madre", audio: "mama" },
                { quechua: "Tayta", spanish: "Padre", audio: "tayta" },
                { quechua: "Wawa", spanish: "Niño/Bebé", audio: "wawa" }
            ],
            frases: [
                { quechua: "Aylluymi kusaywan kani", spanish: "Estoy con amor con mi familia" }
            ]
        },
        numeros: {
            titulo: "Lección 3: Números - Yupana",
            vocabulario: [
                { quechua: "Huk", spanish: "Uno (1)", audio: "huk" },
                { quechua: "Iskay", spanish: "Dos (2)", audio: "iskay" },
                { quechua: "Kimsa", spanish: "Tres (3)", audio: "kimsa" },
                { quechua: "Tawa", spanish: "Cuatro (4)", audio: "tawa" },
                { quechua: "Pichqa", spanish: "Cinco (5)", audio: "pichqa" },
                { quechua: "Suqta", spanish: "Seis (6)", audio: "suqta" },
                { quechua: "Qanchis", spanish: "Siete (7)", audio: "qanchis" },
                { quechua: "Pusaq", spanish: "Ocho (8)", audio: "pusaq" },
                { quechua: "Isqun", spanish: "Nueve (9)", audio: "isqun" },
                { quechua: "Chunka", spanish: "Diez (10)", audio: "chunka" }
            ]
        },
        colores: {
            titulo: "Lección 4: Colores - Llimphikuna",
            vocabulario: [
                { quechua: "Yurak", spanish: "Blanco", audio: "yurak" },
                { quechua: "Yana", spanish: "Negro", audio: "yana" },
                { quechua: "Puka", spanish: "Rojo", audio: "puka" },
                { quechua: "Q'umir", spanish: "Verde", audio: "qumir" },
                { quechua: "Anqas", spanish: "Azul", audio: "anqas" },
                { quechua: "Q'illu", spanish: "Amarillo", audio: "qillu" }
            ]
        }
    };

    // Ejercicios de traducción
    const ejerciciosTraduccion = [
        { quechua: "Allin p'unchay", opciones: ["Buenos días", "Buenas tardes", "Buenas noches"], correcta: 0 },
        { quechua: "Mama", opciones: ["Padre", "Madre", "Hermano"], correcta: 1 },
        { quechua: "Huk", opciones: ["Dos", "Tres", "Uno"], correcta: 2 },
        { quechua: "Puka", opciones: ["Verde", "Azul", "Rojo"], correcta: 2 },
        { quechua: "Inti", opciones: ["Luna", "Sol", "Estrella"], correcta: 1 }
    ];

    // Variables de estado
    let ejercicioActual = 0;
    let puntuacion = 0;
    let juegoMemoria = {
        cartasVolteadas: [],
        paresEncontrados: 0,
        cartas: []
    };

    // Utilidades para crear elementos de forma segura
    function createElement(tag, className = '', textContent = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    function createButton(text, className, clickHandler) {
        const button = createElement('button', className, text);
        button.addEventListener('click', clickHandler);
        return button;
    }

    // Función para mostrar secciones
    function mostrarSeccion(seccionId) {
        const secciones = document.querySelectorAll('.section, .hero');
        secciones.forEach(seccion => seccion.style.display = 'none');
        
        const seccionTarget = document.getElementById(seccionId);
        if (seccionTarget) {
            seccionTarget.style.display = 'block';
            seccionTarget.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Función para cambiar categoría de vocabulario (refactorizada)
    function cambiarCategoria() {
        const categoria = document.getElementById('categoriaSelect').value;
        const contenedor = document.getElementById('vocabulario-contenido');
        
        if (!vocabulario[categoria]) return;
        
        // Limpiar contenedor de forma segura
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        
        vocabulario[categoria].forEach(palabra => {
            const card = createElement('div', 'vocab-card fade-in');
            
            const quechuaDiv = createElement('div', 'vocab-quechua', palabra.quechua);
            const spanishDiv = createElement('div', 'vocab-spanish', palabra.spanish);
            
            card.appendChild(quechuaDiv);
            card.appendChild(spanishDiv);
            
            // Efecto de sonido al hacer clic
            card.addEventListener('click', function() {
                card.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            });
            
            contenedor.appendChild(card);
        });
    }

    // Función para crear contenido de lección de forma segura
    function crearContenidoLeccion(leccion) {
        const container = createElement('div');
        
        // Título
        const titulo = createElement('h2', '', leccion.titulo);
        container.appendChild(titulo);
        
        // Sección de vocabulario
        const vocabTitle = createElement('h3', '', 'Vocabulario');
        container.appendChild(vocabTitle);
        
        const vocabContainer = createElement('div', 'lesson-vocabulary');
        
        leccion.vocabulario.forEach(item => {
            const vocabItem = createElement('div', 'vocab-item');
            
            const quechuaSpan = createElement('span', 'quechua', item.quechua);
            const spanishSpan = createElement('span', 'spanish', item.spanish);
            const audioBtn = createButton('🔊', 'audio-btn', () => reproducirAudio(item.audio));
            
            vocabItem.appendChild(quechuaSpan);
            vocabItem.appendChild(spanishSpan);
            vocabItem.appendChild(audioBtn);
            
            vocabContainer.appendChild(vocabItem);
        });
        
        container.appendChild(vocabContainer);
        
        // Frases útiles si existen
        if (leccion.frases) {
            const frasesTitle = createElement('h3', '', 'Frases Útiles');
            container.appendChild(frasesTitle);
            
            leccion.frases.forEach(frase => {
                const quechuaP = createElement('p');
                const strongQ = createElement('strong', '', 'Quechua: ');
                quechuaP.appendChild(strongQ);
                quechuaP.appendChild(document.createTextNode(`"${frase.quechua}"`));
                
                const spanishP = createElement('p');
                const strongS = createElement('strong', '', 'Español: ');
                spanishP.appendChild(strongS);
                spanishP.appendChild(document.createTextNode(`"${frase.spanish}"`));
                
                container.appendChild(quechuaP);
                container.appendChild(spanishP);
            });
        }
        
        // Descripción si existe
        if (leccion.descripcion) {
            const practicaTitle = createElement('h3', '', 'Práctica');
            const descripcionP = createElement('p', '', leccion.descripcion);
            container.appendChild(practicaTitle);
            container.appendChild(descripcionP);
        }
        
        // Botón de cerrar
        const actionsDiv = createElement('div', 'lesson-actions');
        const closeBtn = createButton('Cerrar', 'cta-button', cerrarModal);
        actionsDiv.appendChild(closeBtn);
        container.appendChild(actionsDiv);
        
        return container;
    }

    // Función para abrir lección (refactorizada)
    function abrirLeccion(tipo) {
        const modal = document.getElementById('leccionModal');
        const contenido = document.getElementById('leccionDetalle');
        
        if (lecciones[tipo]) {
            // Limpiar contenido anterior
            while (contenido.firstChild) {
                contenido.removeChild(contenido.firstChild);
            }
            
            // Crear contenido de forma segura
            const contenidoLeccion = crearContenidoLeccion(lecciones[tipo]);
            contenido.appendChild(contenidoLeccion);
            
            modal.style.display = 'block';
        }
    }

    // Función para cerrar modal
    function cerrarModal() {
        document.getElementById('leccionModal').style.display = 'none';
    }

    // Función para reproducir audio (simulada pero mejorada)
    function reproducirAudio(palabra) {
        console.log(`Reproduciendo audio para: ${palabra}`);
        
        // Buscar el botón que disparó el evento de forma más segura
        const activeButton = document.activeElement;
        if (activeButton && activeButton.classList.contains('audio-btn')) {
            const originalBg = activeButton.style.backgroundColor;
            activeButton.style.backgroundColor = '#FF6B6B';
            setTimeout(() => {
                activeButton.style.backgroundColor = originalBg;
            }, 1000);
        }
    }

    // Función para iniciar ejercicios
    function iniciarEjercicio(tipo) {
        switch(tipo) {
            case 'traduccion':
                mostrarEjercicioTraduccion();
                break;
            case 'audio':
                mostrarEjercicioAudio();
                break;
            case 'memoria':
                mostrarJuegoMemoria();
                break;
        }
    }

    // Ejercicio de traducción refactorizado
    function mostrarEjercicioTraduccion() {
        const contenedor = document.getElementById('ejercicio-contenido');
        ejercicioActual = 0;
        puntuacion = 0;
        
        function mostrarPregunta() {
            // Limpiar contenedor
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
            
            if (ejercicioActual >= ejerciciosTraduccion.length) {
                const resultDiv = createElement('div', 'exercise-result');
                const title = createElement('h3', '', '¡Ejercicio Completado!');
                const score = createElement('p', '', `Tu puntuación: ${puntuacion}/${ejerciciosTraduccion.length}`);
                const retryBtn = createButton('Intentar de nuevo', 'cta-button', mostrarEjercicioTraduccion);
                
                resultDiv.appendChild(title);
                resultDiv.appendChild(score);
                resultDiv.appendChild(retryBtn);
                contenedor.appendChild(resultDiv);
                return;
            }
            
            const pregunta = ejerciciosTraduccion[ejercicioActual];
            const exerciseDiv = createElement('div', 'translation-exercise');
            
            const title = createElement('h3', '', 'Traduce la siguiente palabra:');
            const questionWord = createElement('div', 'question-word', pregunta.quechua);
            const optionsDiv = createElement('div', 'options');
            
            pregunta.opciones.forEach((opcion, index) => {
                const optionBtn = createButton(opcion, 'option-btn', () => verificarRespuesta(index));
                optionsDiv.appendChild(optionBtn);
            });
            
            const progress = createElement('p', '', `Pregunta ${ejercicioActual + 1} de ${ejerciciosTraduccion.length}`);
            
            exerciseDiv.appendChild(title);
            exerciseDiv.appendChild(questionWord);
            exerciseDiv.appendChild(optionsDiv);
            exerciseDiv.appendChild(progress);
            
            contenedor.appendChild(exerciseDiv);
        }
        
        function verificarRespuesta(indice) {
            const pregunta = ejerciciosTraduccion[ejercicioActual];
            if (indice === pregunta.correcta) {
                puntuacion++;
                alert('¡Correcto! ¡Allin!');
            } else {
                alert(`Incorrecto. La respuesta correcta es: ${pregunta.opciones[pregunta.correcta]}`);
            }
            ejercicioActual++;
            setTimeout(mostrarPregunta, 1000);
        }
        
        mostrarPregunta();
    }

    // Ejercicio de audio refactorizado
    function mostrarEjercicioAudio() {
        const contenedor = document.getElementById('ejercicio-contenido');
        
        // Limpiar contenedor
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        
        const exerciseDiv = createElement('div', 'audio-exercise');
        const title = createElement('h3', '', 'Ejercicio de Pronunciación');
        const description = createElement('p', '', 'Escucha y repite las siguientes palabras:');
        const wordsDiv = createElement('div', 'audio-words');
        
        const audioWords = [
            { text: "Allin p'unchay", audio: 'allin-punchay' },
            { text: "Napaykullayki", audio: 'napaykullayki' },
            { text: "Tupananchiskama", audio: 'tupananchiskama' }
        ];
        
        audioWords.forEach(word => {
            const wordDiv = createElement('div', 'audio-word');
            const span = createElement('span', '', word.text);
            const audioBtn = createButton('🔊', 'audio-btn', () => reproducirAudio(word.audio));
            
            wordDiv.appendChild(span);
            wordDiv.appendChild(audioBtn);
            wordsDiv.appendChild(wordDiv);
        });
        
        const note = createElement('p');
        const small = createElement('small', '', 'Nota: En una versión completa, aquí habría audio real para practicar la pronunciación.');
        note.appendChild(small);
        
        exerciseDiv.appendChild(title);
        exerciseDiv.appendChild(description);
        exerciseDiv.appendChild(wordsDiv);
        exerciseDiv.appendChild(note);
        
        contenedor.appendChild(exerciseDiv);
    }

    // Juego de memoria refactorizado
    function mostrarJuegoMemoria() {
        const contenedor = document.getElementById('ejercicio-contenido');
        const palabras = vocabulario.basico.slice(0, 6);
        
        // Reset del estado del juego
        juegoMemoria.cartasVolteadas = [];
        juegoMemoria.paresEncontrados = 0;
        juegoMemoria.cartas = [...palabras, ...palabras].sort(() => Math.random() - 0.5);
        
        // Limpiar contenedor
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        
        const gameDiv = createElement('div', 'memory-game');
        const title = createElement('h3', '', 'Juego de Memoria - Quechua');
        const description = createElement('p', '', 'Encuentra los pares de palabras');
        const gridDiv = createElement('div', 'memory-grid');
        
        juegoMemoria.cartas.forEach((carta, index) => {
            const cardDiv = createElement('div', 'memory-card');
            cardDiv.dataset.index = index;
            
            const frontDiv = createElement('div', 'card-front', '?');
            const backDiv = createElement('div', 'card-back');
            
            const quechuaDiv = createElement('div', 'card-quechua', carta.quechua);
            const spanishDiv = createElement('div', 'card-spanish', carta.spanish);
            
            backDiv.appendChild(quechuaDiv);
            backDiv.appendChild(spanishDiv);
            
            cardDiv.appendChild(frontDiv);
            cardDiv.appendChild(backDiv);
            
            // Usar delegación de eventos
            cardDiv.addEventListener('click', () => voltearCarta(index, cardDiv));
            
            gridDiv.appendChild(cardDiv);
        });
        
        gameDiv.appendChild(title);
        gameDiv.appendChild(description);
        gameDiv.appendChild(gridDiv);
        
        contenedor.appendChild(gameDiv);
        
        function voltearCarta(index, cartaElement) {
            if (juegoMemoria.cartasVolteadas.length < 2 && !cartaElement.classList.contains('volteada')) {
                cartaElement.classList.add('volteada');
                juegoMemoria.cartasVolteadas.push({
                    index,
                    carta: cartaElement,
                    palabra: juegoMemoria.cartas[index]
                });
                
                if (juegoMemoria.cartasVolteadas.length === 2) {
                    setTimeout(() => {
                        verificarPar();
                    }, 1000);
                }
            }
        }
        
        function verificarPar() {
            const [carta1, carta2] = juegoMemoria.cartasVolteadas;
            
            if (carta1.palabra.quechua === carta2.palabra.quechua) {
                // Par encontrado
                juegoMemoria.paresEncontrados++;
                juegoMemoria.cartasVolteadas = [];
                
                if (juegoMemoria.paresEncontrados === palabras.length) {
                    setTimeout(() => {
                        alert('¡Felicitaciones! ¡Has completado el juego de memoria!');
                    }, 500);
                }
            } else {
                // No es par, voltear de nuevo
                carta1.carta.classList.remove('volteada');
                carta2.carta.classList.remove('volteada');
                juegoMemoria.cartasVolteadas = [];
            }
        }
    }

    // Inicialización con delegación de eventos
    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar vocabulario
        cambiarCategoria();
        
        // Navegación móvil
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
        }
        
        // Enlaces de navegación
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                mostrarSeccion(targetId);
                navMenu.classList.remove('active');
            });
        });
        
        // Delegación de eventos para botones dinámicos
        document.addEventListener('click', function(e) {
            // Cerrar modal al hacer clic fuera
            if (e.target.id === 'leccionModal') {
                cerrarModal();
            }
        });
        
        // Mostrar todas las secciones inicialmente
        const secciones = document.querySelectorAll('.section, .hero');
        secciones.forEach(seccion => seccion.style.display = 'block');
    });

    // Exponer funciones necesarias al scope global de forma controlada
    window.QuechuaApp = {
        mostrarSeccion,
        abrirLeccion,
        cambiarCategoria,
        iniciarEjercicio,
        cerrarModal,
        reproducirAudio
    };

})(); // Fin del módulo IIFE
