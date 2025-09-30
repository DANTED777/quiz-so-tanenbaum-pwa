// Variables globales del quiz
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizStarted = false;
let quizCompleted = false;

// Referencias a elementos del DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const explanationScreen = document.getElementById('explanation-screen');
const resultsScreen = document.getElementById('results-screen');
const reviewScreen = document.getElementById('review-screen');
const loadingAnimation = document.getElementById('loading-animation');

const startBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
// const explanationContainer = document.getElementById('explanation-container'); // No usado

const finalScore = document.getElementById('final-score');
const resultStatus = document.getElementById('result-status');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');

const reviewContainer = document.getElementById('review-container');
const backToResultsBtn = document.getElementById('back-to-results-btn');

const explanationContent = document.getElementById('explanation-content');
const continueBtn = document.getElementById('continue-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', showReview);
    backToResultsBtn.addEventListener('click', showResults);
    continueBtn.addEventListener('click', nextQuestion);
    
    // Inicializar efectos interactivos
    addInteractiveEffects();
    
    // Mostrar la pantalla inicial con animación
    showScreen(startScreen);
});

// Funciones auxiliares para transiciones suaves con animaciones
function showLoadingAnimation() {
    loadingAnimation.classList.add('active');
}

function hideLoadingAnimation() {
    loadingAnimation.classList.remove('active');
}

function showScreen(screen, withLoading = false) {
    if (withLoading) {
        showLoadingAnimation();
        setTimeout(() => {
            hideLoadingAnimation();
            performScreenTransition(screen);
        }, 1500);
    } else {
        performScreenTransition(screen);
    }
}

function performScreenTransition(screen) {
    // Ocultar todas las pantallas primero
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    // Mostrar la pantalla seleccionada con animación
    screen.style.display = 'flex';
    screen.classList.add('fade-in');
    
    setTimeout(() => {
        screen.classList.add('active');
    }, 10);
    
    // Limpiar clases de animación después de completarse
    setTimeout(() => {
        screen.classList.remove('fade-in');
    }, 500);
}

function hideScreen(screen) {
    screen.classList.remove('active');
    setTimeout(() => {
        screen.style.display = 'none';
    }, 500);
}

// Función para agregar efectos de hover mejorados
function addInteractiveEffects() {
    // Agregar efecto de pulso constante al botón de inicio
    const startButton = document.getElementById('start-btn');
    if (startButton) {
        startButton.classList.add('pulse-glow');
    }
    
    // Agregar efectos de hover a botones importantes
    const importantButtons = document.querySelectorAll('#next-btn, #continue-btn, #restart-btn');
    importantButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
            btn.style.transition = 'transform 0.2s ease';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    // Agregar efectos a las opciones cuando se crean
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('option')) {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

// Función para iniciar el quiz
function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizCompleted = false;
    
    hideScreen(startScreen);
    setTimeout(() => showScreen(quizScreen, true), 300);
    resultsScreen.style.display = 'none';
    reviewScreen.style.display = 'none';
    
    setTimeout(() => showQuestion(), 1900);
}

// Función para mostrar la pregunta actual
function showQuestion() {
    const question = quizData[currentQuestionIndex];
    
    // Actualizar contador y barra de progreso con animación
    questionCounter.textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    questionCounter.classList.add('scale-in');
    const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    // Mostrar pregunta con animación de escritura
    questionElement.textContent = question.question;
    questionElement.classList.add('slide-in-left');
    
    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';
    // explanationContainer.style.display = 'none'; // No necesario
    
    // Crear opciones con animación escalonada
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option fade-in';
        optionElement.style.animationDelay = `${index * 0.1}s`;
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Limpiar clases de animación después de un tiempo
    setTimeout(() => {
        questionCounter.classList.remove('scale-in');
        questionElement.classList.remove('slide-in-left');
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('fade-in');
            opt.style.animationDelay = '';
        });
    }, 1000);
}

// Función para seleccionar una opción
function selectOption(selectedIndex) {
    const question = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Deshabilitar todas las opciones
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Marcar la opción seleccionada
    options[selectedIndex].classList.add('selected');
    
    // Verificar si es correcta
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        score += quizConfig.pointsPerQuestion;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }
    
    // Guardar respuesta del usuario
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedOption: selectedIndex,
        isCorrect: isCorrect
    });
    
    // Mostrar pantalla de explicación
    showExplanationScreen(isCorrect, selectedIndex);
}

// Función para mostrar la pantalla de explicación
function showExplanationScreen(isCorrect, selectedIndex) {
    const question = quizData[currentQuestionIndex];
    
    // Ocultar la pantalla del quiz con transición
    hideScreen(quizScreen);
    
    // Mostrar la pantalla de explicación con transición
    setTimeout(() => showScreen(explanationScreen), 300);
    
    let explanationHTML = '';
    
    if (isCorrect) {
        explanationHTML = `
            <h3 class="correct-result">¡Respuesta Correcta! ✅</h3>
            <div class="theory-text">
                <strong>Justificación teórica:</strong><br>
                ${question.explanation}
            </div>
        `;
    } else {
        explanationHTML = `
            <h3 class="incorrect-result">Respuesta Incorrecta ❌</h3>
            <div class="correct-answer">
                <strong>Respuesta correcta:</strong> ${question.options[question.correct]}
            </div>
            <div class="theory-text">
                <strong>Justificación teórica:</strong><br>
                ${question.explanation}
            </div>
        `;
        
        // Agregar explicación específica para la respuesta incorrecta si existe
        if (question.wrongExplanations && question.wrongExplanations[selectedIndex]) {
            explanationHTML += `
                <div class="wrong-reason">
                    <strong>¿Por qué tu respuesta es incorrecta?</strong><br>
                    ${question.wrongExplanations[selectedIndex]}
                </div>
            `;
        }
    }
    
    explanationContent.innerHTML = explanationHTML;
    
    // Ajustar tamaño de fuente después del renderizado
    setTimeout(() => {
        adjustFontSize();
    }, 100);
}

function adjustFontSize() {
    const container = explanationContent;
    const theoryTexts = container.querySelectorAll('.theory-text, .wrong-reason');
    
    if (theoryTexts.length === 0) return;
    
    // Calcular la longitud total del texto
    let totalTextLength = 0;
    theoryTexts.forEach(element => {
        totalTextLength += element.textContent.length;
    });
    
    // Determinar el tamaño de fuente basado en la longitud del texto
    let fontSize;
    let lineHeight;
    
    if (totalTextLength < 150) {
        fontSize = '16px';
        lineHeight = '1.6';
    } else if (totalTextLength < 300) {
        fontSize = '14px';
        lineHeight = '1.5';
    } else if (totalTextLength < 500) {
        fontSize = '13px';
        lineHeight = '1.4';
    } else if (totalTextLength < 700) {
        fontSize = '12px';
        lineHeight = '1.3';
    } else {
        fontSize = '11px';
        lineHeight = '1.2';
    }
    
    // Aplicar el tamaño de fuente a todos los elementos de texto
    theoryTexts.forEach(element => {
        element.style.fontSize = fontSize;
        element.style.lineHeight = lineHeight;
    });
    
    // También ajustar el título si es necesario
    const title = container.querySelector('h3');
    if (title && totalTextLength > 400) {
        title.style.fontSize = '20px';
        title.style.marginBottom = '15px';
    }
}

// Función para ir a la siguiente pregunta
function nextQuestion() {
    // Ocultar pantalla de explicación con transición
    hideScreen(explanationScreen);
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        // Mostrar pantalla de quiz con transición
        setTimeout(() => {
            showScreen(quizScreen);
            setTimeout(() => showQuestion(), 100);
        }, 300);
    } else {
        // Mostrar resultados con transición
        setTimeout(() => showResults(), 300);
    }
}

// Función para mostrar los resultados
function showResults() {
    quizCompleted = true;
    
    hideScreen(quizScreen);
    hideScreen(explanationScreen);
    hideScreen(reviewScreen);
    setTimeout(() => showScreen(resultsScreen, true), 300);
    
    // Calcular porcentaje
    const percentage = Math.round((score / 100) * 100);
    const passed = score >= quizConfig.passingScore;
    
    finalScore.textContent = `${score}/100 puntos (${percentage}%)`;
    
    if (passed) {
        resultStatus.innerHTML = `
            <div class="pass-message">
                <h3>¡Felicitaciones! <img src="party-emoji.svg" alt="Party" class="pixel-emoji"></h3>
                <p>Has aprobado el examen de Sistemas Operativos</p>
                <p>Tienes un buen dominio de los conceptos de Tanenbaum</p>
            </div>
        `;
        resultsScreen.classList.add('passed');
        resultsScreen.classList.remove('failed');
    } else {
        resultStatus.innerHTML = `
            <div class="fail-message">
                <h3>No has aprobado 📚</h3>
                <p>Necesitas al menos ${quizConfig.passingScore} puntos para aprobar</p>
                <p>Te recomendamos revisar los temas y volver a intentarlo</p>
            </div>
        `;
        resultsScreen.classList.add('failed');
        resultsScreen.classList.remove('passed');
    }
}

// Función para mostrar la revisión detallada
function showReview() {
    hideScreen(resultsScreen);
    setTimeout(() => showScreen(reviewScreen), 300);
    
    reviewContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`;
        
        reviewItem.innerHTML = `
            <div class="review-question">
                <h4>Pregunta ${index + 1}</h4>
                <p>${question.question}</p>
            </div>
            
            <div class="review-options">
                ${question.options.map((option, optIndex) => {
                    let className = 'review-option';
                    if (optIndex === question.correct) {
                        className += ' correct-answer';
                    }
                    if (optIndex === userAnswer.selectedOption && !userAnswer.isCorrect) {
                        className += ' user-incorrect';
                    }
                    if (optIndex === userAnswer.selectedOption && userAnswer.isCorrect) {
                        className += ' user-correct';
                    }
                    
                    return `<div class="${className}">${option}</div>`;
                }).join('')}
            </div>
            
            <div class="review-explanation">
                <h5>${userAnswer.isCorrect ? '✅ Correcto' : '❌ Incorrecto'}</h5>
                <p><strong>Explicación:</strong> ${question.explanation}</p>
                ${!userAnswer.isCorrect && question.wrongExplanations && question.wrongExplanations[userAnswer.selectedOption] ? 
                    `<p><strong>¿Por qué tu respuesta es incorrecta?</strong> ${question.wrongExplanations[userAnswer.selectedOption]}</p>` : ''}
            </div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

// Función para reiniciar el quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizStarted = false;
    quizCompleted = false;
    
    hideScreen(quizScreen);
    hideScreen(resultsScreen);
    hideScreen(reviewScreen);
    hideScreen(explanationScreen);
    setTimeout(() => showScreen(startScreen), 300);
    
    // Limpiar clases de resultado
    resultsScreen.classList.remove('passed', 'failed');
}

// Función para formatear texto con efectos de máquina de escribir (opcional)
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('PWA: Service Worker registrado exitosamente:', registration.scope);
                
                // Verificar si hay una actualización disponible
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Nueva versión disponible
                            console.log('PWA: Nueva versión disponible');
                            // Aquí podrías mostrar una notificación al usuario
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('PWA: Error al registrar Service Worker:', error);
            });
    });
}

// Detectar si la app se puede instalar
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA: App se puede instalar');
    e.preventDefault();
    deferredPrompt = e;
    
    // Aquí podrías mostrar un botón de instalación personalizado
    // Por ahora, el navegador mostrará su propio prompt
});

// Detectar cuando la app se instala
window.addEventListener('appinstalled', (evt) => {
    console.log('PWA: App instalada exitosamente');
    deferredPrompt = null;
});