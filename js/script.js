// Encapsulación en módulo IIFE para evitar contaminación del scope global
(function() {
    'use strict';
    
    // Utilidades de seguridad y validación
    const SecurityUtils = {
        sanitizeInput: function(input) {
            if (typeof input !== 'string') return '';
            return input.replace(/[<>\"'&]/g, function(match) {
                const escapeMap = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;',
                    '&': '&amp;'
                };
                return escapeMap[match];
            });
        },
        
        validateLessonData: function(lesson) {
            if (!lesson || typeof lesson !== 'object') return false;
            if (!lesson.titulo || typeof lesson.titulo !== 'string') return false;
            if (!Array.isArray(lesson.vocabulario)) return false;
            return lesson.vocabulario.every(item => 
                item && typeof item.quechua === 'string' && typeof item.spanish === 'string'
            );
        },
        
        isValidCategory: function(category) {
            return typeof category === 'string' && vocabulario.hasOwnProperty(category);
        }
    };
    
    // Utilidades para manejo de errores y logging
    const ErrorHandler = {
        log: function(error, context = '') {
            console.error(`[Yachay Quechua Error] ${context}:`, error);
        },
        
        showUserError: function(message) {
            this.showNotification(message, 'error');
        },
        
        showNotification: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification--${type}`;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            notification.textContent = SecurityUtils.sanitizeInput(message);
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }
    };
    
    // Utilidades para estado de carga
    const LoadingUtils = {
        show: function() {
            const loader = document.getElementById('loading');
            if (loader) {
                loader.classList.add('show');
                loader.setAttribute('aria-hidden', 'false');
            }
        },
        
        hide: function() {
            const loader = document.getElementById('loading');
            if (loader) {
                loader.classList.remove('show');
                loader.setAttribute('aria-hidden', 'true');
            }
        }
    };
    
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
        try {
            const element = document.createElement(tag);
            if (className) element.className = SecurityUtils.sanitizeInput(className);
            if (textContent) element.textContent = SecurityUtils.sanitizeInput(textContent);
            return element;
        } catch (error) {
            ErrorHandler.log(error, 'createElement');
            return document.createElement('div'); // Fallback seguro
        }
    }

    function createButton(text, className, clickHandler) {
        try {
            const button = createElement('button', className, text);
            if (typeof clickHandler === 'function') {
                button.addEventListener('click', function(e) {
                    try {
                        clickHandler(e);
                    } catch (error) {
                        ErrorHandler.log(error, 'Button click handler');
                        ErrorHandler.showUserError('Error al procesar la acción');
                    }
                });
            }
            return button;
        } catch (error) {
            ErrorHandler.log(error, 'createButton');
            return createElement('button', 'error-button', 'Error');
        }
    }

    // Función para mostrar secciones
    function mostrarSeccion(seccionId) {
        try {
            if (!seccionId || typeof seccionId !== 'string') {
                throw new Error('ID de sección inválido');
            }
            
            const secciones = document.querySelectorAll('.section, .hero');
            secciones.forEach(seccion => seccion.style.display = 'none');
            
            const seccionTarget = document.getElementById(SecurityUtils.sanitizeInput(seccionId));
            if (seccionTarget) {
                seccionTarget.style.display = 'block';
                seccionTarget.scrollIntoView({ behavior: 'smooth' });
                
                // Actualizar estado de navegación
                updateNavActiveState(seccionId);
            } else {
                throw new Error(`Sección no encontrada: ${seccionId}`);
            }
        } catch (error) {
            ErrorHandler.log(error, 'mostrarSeccion');
            ErrorHandler.showUserError('Error al navegar a la sección');
        }
    }
    
    // Función para actualizar estado activo de navegación
    function updateNavActiveState(activeSection) {
        try {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                }
            });
        } catch (error) {
            ErrorHandler.log(error, 'updateNavActiveState');
        }
    }

    // Función para cambiar categoría de vocabulario (refactorizada con validación)
    function cambiarCategoria() {
        try {
            const categoriaSelect = document.getElementById('categoriaSelect');
            if (!categoriaSelect) {
                throw new Error('Elemento de selección de categoría no encontrado');
            }
            
            const categoria = categoriaSelect.value;
            const contenedor = document.getElementById('vocabulario-contenido');
            
            if (!contenedor) {
                throw new Error('Contenedor de vocabulario no encontrado');
            }
            
            if (!SecurityUtils.isValidCategory(categoria)) {
                throw new Error(`Categoría inválida: ${categoria}`);
            }
            
            LoadingUtils.show();
            
            // Limpiar contenedor de forma segura
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild);
            }
            
            // Simular tiempo de carga para UX mejorada
            setTimeout(() => {
                try {
                    vocabulario[categoria].forEach((palabra, index) => {
                        const card = createElement('div', 'vocab-card fade-in');
                        card.setAttribute('tabindex', '0');
                        card.setAttribute('role', 'button');
                        card.setAttribute('aria-label', `Palabra ${index + 1}: ${palabra.quechua} significa ${palabra.spanish}`);
                        
                        const quechuaDiv = createElement('div', 'vocab-quechua', palabra.quechua);
                        quechuaDiv.setAttribute('lang', 'qu');
                        
                        const spanishDiv = createElement('div', 'vocab-spanish', palabra.spanish);
                        
                        card.appendChild(quechuaDiv);
                        card.appendChild(spanishDiv);
                        
                        // Efecto de sonido al hacer clic con accesibilidad mejorada
                        const clickHandler = function() {
                            card.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                card.style.transform = 'scale(1)';
                            }, 200);
                        };
                        
                        card.addEventListener('click', clickHandler);
                        card.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                clickHandler();
                            }
                        });
                        
                        contenedor.appendChild(card);
                    });
                    
                    LoadingUtils.hide();
                    ErrorHandler.showNotification(`Vocabulario de ${categoria} cargado exitosamente`, 'success');
                } catch (error) {
                    LoadingUtils.hide();
                    ErrorHandler.log(error, 'cambiarCategoria - rendering');
                    ErrorHandler.showUserError('Error al cargar el vocabulario');
                }
            }, 300);
            
        } catch (error) {
            LoadingUtils.hide();
            ErrorHandler.log(error, 'cambiarCategoria');
            ErrorHandler.showUserError('Error al cambiar categoría de vocabulario');
        }
    }

    // Función para crear contenido de lección de forma segura con validación
    function crearContenidoLeccion(leccion) {
        try {
            if (!SecurityUtils.validateLessonData(leccion)) {
                throw new Error('Datos de lección inválidos');
            }
            
            const container = createElement('div');
            
            // Título
            const titulo = createElement('h2', '', leccion.titulo);
            titulo.id = 'modal-title'; // Para accesibilidad del modal
            container.appendChild(titulo);
            
            // Sección de vocabulario
            const vocabTitle = createElement('h3', '', 'Vocabulario');
            container.appendChild(vocabTitle);
            
            const vocabContainer = createElement('div', 'lesson-vocabulary');
            
            leccion.vocabulario.forEach((item, index) => {
                const vocabItem = createElement('div', 'vocab-item');
                vocabItem.setAttribute('role', 'group');
                vocabItem.setAttribute('aria-label', `Término ${index + 1}`);
                
                const quechuaSpan = createElement('span', 'quechua', item.quechua);
                quechuaSpan.setAttribute('lang', 'qu');
                
                const spanishSpan = createElement('span', 'spanish', item.spanish);
                const audioBtn = createButton('🔊', 'audio-btn', () => reproducirAudio(item.audio || item.quechua));
                audioBtn.setAttribute('aria-label', `Reproducir pronunciación de ${item.quechua}`);
                
                vocabItem.appendChild(quechuaSpan);
                vocabItem.appendChild(spanishSpan);
                vocabItem.appendChild(audioBtn);
                
                vocabContainer.appendChild(vocabItem);
            });
            
            container.appendChild(vocabContainer);
            
            // Frases útiles si existen
            if (leccion.frases && Array.isArray(leccion.frases)) {
                const frasesTitle = createElement('h3', '', 'Frases Útiles');
                container.appendChild(frasesTitle);
                
                leccion.frases.forEach((frase, index) => {
                    if (frase && frase.quechua && frase.spanish) {
                        const phraseContainer = createElement('div', 'phrase-container');
                        phraseContainer.setAttribute('role', 'group');
                        phraseContainer.setAttribute('aria-label', `Frase ${index + 1}`);
                        
                        const quechuaP = createElement('p');
                        const strongQ = createElement('strong', '', 'Quechua: ');
                        quechuaP.appendChild(strongQ);
                        
                        const quechuaText = document.createTextNode(`"${SecurityUtils.sanitizeInput(frase.quechua)}"`);
                        quechuaP.appendChild(quechuaText);
                        quechuaP.setAttribute('lang', 'qu');
                        
                        const spanishP = createElement('p');
                        const strongS = createElement('strong', '', 'Español: ');
                        spanishP.appendChild(strongS);
                        
                        const spanishText = document.createTextNode(`"${SecurityUtils.sanitizeInput(frase.spanish)}"`);
                        spanishP.appendChild(spanishText);
                        
                        phraseContainer.appendChild(quechuaP);
                        phraseContainer.appendChild(spanishP);
                        container.appendChild(phraseContainer);
                    }
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
            closeBtn.setAttribute('aria-label', 'Cerrar ventana de lección');
            actionsDiv.appendChild(closeBtn);
            container.appendChild(actionsDiv);
            
            return container;
            
        } catch (error) {
            ErrorHandler.log(error, 'crearContenidoLeccion');
            const errorContainer = createElement('div', 'error-message');
            errorContainer.textContent = 'Error al cargar el contenido de la lección';
            errorContainer.setAttribute('role', 'alert');
            return errorContainer;
        }
    }

    // Función para abrir lección (refactorizada)
    // Función para abrir lección con validación y accesibilidad mejorada
    function abrirLeccion(tipo) {
        try {
            if (!tipo || typeof tipo !== 'string') {
                throw new Error('Tipo de lección inválido');
            }
            
            const leccion = lecciones[tipo];
            if (!leccion) {
                throw new Error(`Lección no encontrada: ${tipo}`);
            }
            
            LoadingUtils.show();
            
            // Simular tiempo de carga para lecciones
            setTimeout(() => {
                try {
                    const modal = document.getElementById('leccionModal');
                    const detalle = document.getElementById('leccionDetalle');
                    
                    if (!modal || !detalle) {
                        throw new Error('Elementos del modal no encontrados');
                    }
                    
                    // Limpiar contenido anterior
                    while (detalle.firstChild) {
                        detalle.removeChild(detalle.firstChild);
                    }
                    
                    const contenido = crearContenidoLeccion(leccion);
                    detalle.appendChild(contenido);
                    
                    // Configurar accesibilidad del modal
                    modal.style.display = 'block';
                    modal.setAttribute('aria-hidden', 'false');
                    document.body.classList.add('modal-open');
                    
                    // Enfocar el modal para lectores de pantalla
                    const modalTitle = detalle.querySelector('h2');
                    if (modalTitle) {
                        modalTitle.focus();
                    }
                    
                    // Trap focus en el modal
                    trapFocus(modal);
                    
                    LoadingUtils.hide();
                    ErrorHandler.showNotification(`Lección "${leccion.titulo}" cargada`, 'success');
                    
                } catch (error) {
                    LoadingUtils.hide();
                    ErrorHandler.log(error, 'abrirLeccion - modal setup');
                    ErrorHandler.showUserError('Error al abrir la lección');
                }
            }, 300);
            
        } catch (error) {
            LoadingUtils.hide();
            ErrorHandler.log(error, 'abrirLeccion');
            ErrorHandler.showUserError('Error al cargar la lección');
        }
    }

    // Función para cerrar modal con accesibilidad mejorada
    function cerrarModal() {
        try {
            const modal = document.getElementById('leccionModal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                
                // Devolver el foco al elemento que abrió el modal
                const lastFocusedElement = modal.dataset.lastFocused;
                if (lastFocusedElement) {
                    const element = document.querySelector(`[data-lesson="${lastFocusedElement}"]`);
                    if (element) {
                        element.focus();
                    }
                }
            }
        } catch (error) {
            ErrorHandler.log(error, 'cerrarModal');
        }
    }
    
    // Función para atrapar el foco en el modal (accesibilidad)
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                cerrarModal();
            }
        });
    }

    // Función para reproducir audio con mejor feedback y validación
    function reproducirAudio(palabra) {
        try {
            if (!palabra || typeof palabra !== 'string') {
                throw new Error('Palabra inválida para reproducir audio');
            }
            
            console.log(`Reproduciendo audio para: ${SecurityUtils.sanitizeInput(palabra)}`);
            
            // Buscar el botón que disparó el evento de forma más segura
            const activeButton = document.activeElement;
            if (activeButton && activeButton.classList.contains('audio-btn')) {
                const originalBg = activeButton.style.backgroundColor;
                const originalText = activeButton.textContent;
                
                // Feedback visual y de accesibilidad
                activeButton.style.backgroundColor = '#FF6B6B';
                activeButton.setAttribute('aria-pressed', 'true');
                activeButton.setAttribute('aria-label', `Reproduciendo ${palabra}`);
                
                setTimeout(() => {
                    activeButton.style.backgroundColor = originalBg;
                    activeButton.setAttribute('aria-pressed', 'false');
                    activeButton.setAttribute('aria-label', `Reproducir pronunciación de ${palabra}`);
                }, 1000);
                
                // Aquí se podría integrar un servicio de síntesis de voz real
                if ('speechSynthesis' in window) {
                    const utterance = new SpeechSynthesisUtterance(palabra);
                    utterance.lang = 'qu'; // Código de idioma quechua
                    utterance.rate = 0.8;
                    utterance.volume = 0.8;
                    
                    utterance.onerror = function() {
                        ErrorHandler.log('Error en síntesis de voz', 'reproducirAudio');
                    };
                    
                    speechSynthesis.speak(utterance);
                } else {
                    ErrorHandler.showNotification('Síntesis de voz no disponible en este navegador', 'warning');
                }
            }
        } catch (error) {
            ErrorHandler.log(error, 'reproducirAudio');
            ErrorHandler.showUserError('Error al reproducir audio');
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

    // Inicialización con delegación de eventos mejorada y manejo de errores
    document.addEventListener('DOMContentLoaded', function() {
        try {
            // Inicializar vocabulario
            cambiarCategoria();
            
            // Navegación móvil con accesibilidad mejorada
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', function() {
                    const isExpanded = navMenu.classList.toggle('active');
                    navToggle.setAttribute('aria-expanded', isExpanded.toString());
                });
            }
            
            // Enlaces de navegación
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    mostrarSeccion(targetId);
                    if (navMenu) navMenu.classList.remove('active');
                    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Delegación de eventos central para todas las interacciones
            document.addEventListener('click', function(e) {
                try {
                    const target = e.target;
                    const action = target.getAttribute('data-action');
                    
                    // Cerrar modal al hacer clic fuera
                    if (target.id === 'leccionModal') {
                        cerrarModal();
                        return;
                    }
                    
                    // Manejar acciones basadas en data-attributes
                    switch (action) {
                        case 'mostrar-seccion':
                            const sectionTarget = target.getAttribute('data-target');
                            if (sectionTarget) {
                                mostrarSeccion(sectionTarget);
                            }
                            break;
                            
                        case 'abrir-leccion':
                            const lessonType = target.getAttribute('data-lesson');
                            if (lessonType) {
                                // Guardar el elemento que abrió el modal para devolver el foco
                                const modal = document.getElementById('leccionModal');
                                if (modal) {
                                    modal.dataset.lastFocused = lessonType;
                                }
                                abrirLeccion(lessonType);
                            }
                            break;
                            
                        case 'cambiar-categoria':
                            cambiarCategoria();
                            break;
                            
                        case 'iniciar-ejercicio':
                            const exerciseType = target.getAttribute('data-exercise');
                            if (exerciseType) {
                                iniciarEjercicio(exerciseType);
                            }
                            break;
                            
                        case 'cerrar-modal':
                            cerrarModal();
                            break;
                    }
                } catch (error) {
                    ErrorHandler.log(error, 'Event delegation click handler');
                    ErrorHandler.showUserError('Error al procesar la acción');
                }
            });
            
            // Delegación de eventos para cambios en select
            document.addEventListener('change', function(e) {
                try {
                    const target = e.target;
                    const action = target.getAttribute('data-action');
                    
                    if (action === 'cambiar-categoria') {
                        cambiarCategoria();
                    }
                } catch (error) {
                    ErrorHandler.log(error, 'Event delegation change handler');
                    ErrorHandler.showUserError('Error al cambiar selección');
                }
            });
            
            // Delegación de eventos para teclado (accesibilidad)
            document.addEventListener('keydown', function(e) {
                try {
                    const target = e.target;
                    
                    // Manejar elementos con role="button"
                    if (target.getAttribute('role') === 'button' && 
                        (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        target.click();
                    }
                    
                    // Cerrar modal con Escape
                    if (e.key === 'Escape') {
                        const modal = document.getElementById('leccionModal');
                        if (modal && modal.style.display === 'block') {
                            cerrarModal();
                        }
                    }
                } catch (error) {
                    ErrorHandler.log(error, 'Event delegation keydown handler');
                }
            });
            
            // Mostrar todas las secciones inicialmente
            const secciones = document.querySelectorAll('.section, .hero');
            secciones.forEach(seccion => seccion.style.display = 'block');
            
            // Notificación de inicialización exitosa
            ErrorHandler.showNotification('¡Yachay Quechua cargado exitosamente!', 'success');
            
        } catch (error) {
            ErrorHandler.log(error, 'DOMContentLoaded initialization');
            ErrorHandler.showUserError('Error al inicializar la aplicación');
        }
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
