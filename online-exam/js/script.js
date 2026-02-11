/**
 * Online Exam Platform - Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const questions = [
        {
            id: 1,
            type: 'mcq',
            question: "Which of the following is NOT a principle of Design?",
            options: [
                { id: 'a', text: "Balance" },
                { id: 'b', text: "Contrast" },
                { id: 'c', text: "Coding" },
                { id: 'd', text: "Emphasis" }
            ],
            answer: null // User's answer
        },
        {
            id: 2,
            type: 'mcq',
            question: "What does HTML stand for?",
            options: [
                { id: 'a', text: "Hyper Text Markup Language" },
                { id: 'b', text: "High Tech Modern Language" },
                { id: 'c', text: "Hyper Transfer Markup Language" },
                { id: 'd', text: "Home Tool Markup Language" }
            ],
            answer: null
        },
        {
            id: 3,
            type: 'theory',
            question: "Explain the difference between padding and margin in CSS.",
            answer: ""
        },
        {
            id: 4,
            type: 'gap',
            question: "The CSS property used to change the text color is ______.",
            answer: ""
        },
        {
            id: 5,
            type: 'mcq',
            question: "Which tag is used to define an unordered list?",
            options: [
                { id: 'a', text: "<ul>" },
                { id: 'b', text: "<ol>" },
                { id: 'c', text: "<li>" },
                { id: 'd', text: "<list>" }
            ],
            answer: null
        },
        {
            id: 6,
            type: 'mcq',
            question: "What is the correct CSS syntax for making all the <p> elements bold?",
            options: [
                { id: 'a', text: "p {text-size: bold;}" },
                { id: 'b', text: "p {font-weight: bold;}" },
                { id: 'c', text: "<p style='font-size: bold;'>" },
                { id: 'd', text: "p {style: bold;}" }
            ],
            answer: null
        },
        {
            id: 7,
            type: 'theory',
            question: "Describe the purpose of the 'alt' attribute in an <img> tag.",
            answer: ""
        },
        {
            id: 8,
            type: 'gap',
            question: "To select an element with a specific ID in CSS, use the ______ character.",
            answer: ""
        },
        {
            id: 9,
            type: 'mcq',
            question: "Which property is used to change the background color?",
            options: [
                { id: 'a', text: "color" },
                { id: 'b', text: "bgcolor" },
                { id: 'c', text: "background-color" },
                { id: 'd', text: "background" }
            ],
            answer: null
        },
        {
            id: 10,
            type: 'mcq',
            question: "How do you select an element with class 'demo'?",
            options: [
                { id: 'a', text: ".demo" },
                { id: 'b', text: "#demo" },
                { id: 'c', text: "demo" },
                { id: 'd', text: "*demo" }
            ],
            answer: null
        }
    ];

    // --- State ---
    let currentQuestionIndex = 0;
    let timerInterval;
    let timeRemaining = 30 * 60; // 30 minutes in seconds

    // --- DOM Elements ---
    const questionTextEl = document.getElementById('question-text');
    const answerAreaEl = document.getElementById('answer-area');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const mobilePrevBtn = document.getElementById('mobile-prev');
    const mobileNextBtn = document.getElementById('mobile-next');
    const currentQNumEl = document.getElementById('current-question-num');
    const totalQNumEl = document.getElementById('total-questions');
    const timerEl = document.getElementById('time-remaining');
    const paletteEl = document.getElementById('question-palette');
    const mobilePaletteToggle = document.getElementById('mobile-palette-toggle');
    const sidebar = document.querySelector('.exam-sidebar');

    // --- Initialization ---
    function init() {
        totalQNumEl.textContent = questions.length;
        renderPalette();
        loadQuestion(currentQuestionIndex);
        startTimer();
        updateNavigationState();
    }

    // --- Timer Logic ---
    function startTimer() {
        timerInterval = setInterval(() => {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert('Time is up! Exam finished.');
                // Handle exam submission here
            }
        }, 1000);
    }

    // --- Render Functions ---
    function loadQuestion(index) {
        const question = questions[index];
        currentQNumEl.textContent = index + 1;
        questionTextEl.textContent = question.question;

        // Update Question Type Label
        const typeLabel = document.querySelector('.question-type');
        if (question.type === 'mcq') typeLabel.textContent = 'Multiple Choice';
        else if (question.type === 'theory') typeLabel.textContent = 'Theory';
        else if (question.type === 'gap') typeLabel.textContent = 'Fill in the Gap';

        // Render Answer Area based on type
        answerAreaEl.innerHTML = '';

        if (question.type === 'mcq') {
            question.options.forEach(opt => {
                const label = document.createElement('label');
                label.className = 'option';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'answer';
                input.value = opt.id;
                if (question.answer === opt.id) input.checked = true;

                input.addEventListener('change', () => {
                    question.answer = input.value;
                    updatePaletteStatus(index, 'answered');
                });

                const span = document.createElement('span');
                span.className = 'option-text';
                span.textContent = opt.text;

                label.appendChild(input);
                label.appendChild(span);
                answerAreaEl.appendChild(label);
            });
        } else if (question.type === 'theory') {
            const textarea = document.createElement('textarea');
            textarea.className = 'theory-input';
            textarea.placeholder = "Type your answer here...";
            textarea.value = question.answer || '';

            textarea.addEventListener('input', (e) => {
                question.answer = e.target.value;
                if (question.answer.trim().length > 0) {
                    updatePaletteStatus(index, 'answered');
                } else {
                    updatePaletteStatus(index, 'active'); // Revert if empty
                }
            });

            answerAreaEl.appendChild(textarea);
        } else if (question.type === 'gap') {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-input'; // Re-use existing class or add new one
            input.style.width = '100%';
            input.style.padding = '1rem';
            input.style.border = '1px solid var(--border-color)';
            input.style.borderRadius = '6px';
            input.placeholder = "Type the missing word...";
            input.value = question.answer || '';

            input.addEventListener('input', (e) => {
                question.answer = e.target.value;
                if (question.answer.trim().length > 0) {
                    updatePaletteStatus(index, 'answered');
                } else {
                    updatePaletteStatus(index, 'active');
                }
            });

            answerAreaEl.appendChild(input);
        }

        updatePaletteStatus(index, 'active');
    }

    function renderPalette() {
        paletteEl.innerHTML = '';
        questions.forEach((q, i) => {
            const btn = document.createElement('button');
            btn.className = 'q-btn';
            btn.textContent = i + 1;
            btn.dataset.index = i;
            if (i === currentQuestionIndex) btn.classList.add('active');

            btn.addEventListener('click', () => {
                currentQuestionIndex = i;
                loadQuestion(currentQuestionIndex);
                updateNavigationState();
                updatePaletteSelection();
                // Close mobile sidebar if open
                sidebar.classList.remove('active');
            });

            paletteEl.appendChild(btn);
        });
    }

    function updatePaletteSelection() {
        const btns = paletteEl.querySelectorAll('.q-btn');
        btns.forEach((btn, i) => {
            if (i === currentQuestionIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function updatePaletteStatus(index, status) {
        const btn = paletteEl.children[index];
        // Don't remove 'active' class here, it's handled by selection logic
        if (status === 'answered') {
            btn.classList.add('answered');
        }
    }

    function updateNavigationState() {
        prevBtn.disabled = currentQuestionIndex === 0;
        mobilePrevBtn.disabled = currentQuestionIndex === 0;

        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.textContent = 'Finish';
            mobileNextBtn.innerHTML = 'Finish <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M5 13l4 4L19 7"></path></svg>';
        } else {
            nextBtn.textContent = 'Next';
            mobileNextBtn.innerHTML = 'Next <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 18l6-6-6-6"></path></svg>';
        }
    }

    // --- Event Listeners ---
    function handleNext() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateNavigationState();
            updatePaletteSelection();
        } else {
            if (confirm("Are you sure you want to finish the exam?")) {
                alert("Exam Submitted!");
                window.location.href = 'index.html';
            }
        }
    }

    function handlePrev() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateNavigationState();
            updatePaletteSelection();
        }
    }

    nextBtn.addEventListener('click', handleNext);
    prevBtn.addEventListener('click', handlePrev);
    mobileNextBtn.addEventListener('click', handleNext);
    mobilePrevBtn.addEventListener('click', handlePrev);

    mobilePaletteToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobilePaletteToggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Start
    init();
});
