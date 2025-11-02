// ============================================
// STATISTICS AND PRACTICE MODE SYSTEM
// ============================================

// Save attempt statistics
function saveAttemptStatistics(resultsData) {
    const stats = getStatistics();
    
    // Get list of failed questions
    const failedQuestions = [];
    resultsData.results.forEach(result => {
        if (!result.correct) {
            failedQuestions.push(result.questionNum);
        }
    });
    
    // Try to get timer info from DOM elements
    let timeUsed = null;
    try {
        const timerEnabledEl = document.getElementById('timerEnabled');
        const timerMinutesEl = document.getElementById('timerMinutes');
        const timerDisplayEl = document.getElementById('timerDisplay');
        
        if (timerEnabledEl && timerEnabledEl.checked && timerMinutesEl && timerDisplayEl) {
            // If timer was running, calculate time used
            const initialMinutes = parseInt(timerMinutesEl.value) || 0;
            const displayText = timerDisplayEl.textContent || '00:00';
            const [mins, secs] = displayText.split(':').map(Number);
            const remainingSeconds = (mins || 0) * 60 + (secs || 0);
            const usedMinutes = initialMinutes - (remainingSeconds / 60);
            if (usedMinutes > 0) {
                timeUsed = Math.round(usedMinutes);
            }
        }
    } catch (e) {
        // Ignore timer errors
    }
    
    // Record this attempt
    const attempt = {
        date: new Date().toISOString(),
        score: resultsData.score,
        correctCount: resultsData.correctCount,
        totalQuestions: resultsData.totalQuestions,
        percentage: Math.round((resultsData.correctCount / resultsData.totalQuestions) * 100),
        failedQuestions: failedQuestions,
        timeUsed: timeUsed
    };
    
    stats.attempts.push(attempt);
    
    // Update question statistics
    resultsData.results.forEach(result => {
        const qNum = result.questionNum;
        if (!stats.questionStats[qNum]) {
            stats.questionStats[qNum] = {
                totalAttempts: 0,
                correctAttempts: 0,
                timesFailed: 0
            };
        }
        
        stats.questionStats[qNum].totalAttempts++;
        if (result.correct) {
            stats.questionStats[qNum].correctAttempts++;
        } else {
            stats.questionStats[qNum].timesFailed++;
        }
    });
    
    // Keep only last 50 attempts to avoid localStorage overflow
    if (stats.attempts.length > 50) {
        stats.attempts = stats.attempts.slice(-50);
    }
    
    // Save to localStorage
    localStorage.setItem('unityTestStatistics', JSON.stringify(stats));
    
    return stats;
}

// Get statistics from localStorage
function getStatistics() {
    const saved = localStorage.getItem('unityTestStatistics');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Error parsing statistics:', e);
        }
    }
    
    // Return default structure
    return {
        attempts: [],
        questionStats: {}
    };
}

// Get failed questions (questions with highest failure rate)
function getFailedQuestions(threshold = 0.5) {
    const stats = getStatistics();
    const failedQuestions = [];
    
    Object.keys(stats.questionStats).forEach(qNum => {
        const qStat = stats.questionStats[qNum];
        if (qStat.totalAttempts >= 2) {
            const failureRate = qStat.timesFailed / qStat.totalAttempts;
            if (failureRate >= threshold) {
                failedQuestions.push({
                    questionNum: parseInt(qNum),
                    failureRate: failureRate,
                    timesFailed: qStat.timesFailed,
                    totalAttempts: qStat.totalAttempts
                });
            }
        }
    });
    
    // Sort by failure rate (highest first)
    return failedQuestions.sort((a, b) => b.failureRate - a.failureRate);
}

// Filter questions to show only failed ones
function filterQuestionsForPracticeMode(questionsArray, mode = 'all') {
    if (mode === 'all') {
        return questionsArray;
    } else if (mode === 'failed') {
        const failedQuestions = getFailedQuestions(0.3); // 30% failure rate threshold
        const failedQuestionNumbers = new Set(failedQuestions.map(q => q.questionNum));
        
        return questionsArray.filter((question, index) => {
            const qNum = parseInt(question.getAttribute('data-question-num') || (index + 1));
            return failedQuestionNumbers.has(qNum);
        });
    }
    return questionsArray;
}

// Display statistics panel
function displayStatisticsPanel() {
    const stats = getStatistics();
    const modal = document.getElementById('statisticsModal');
    
    if (!modal) {
        // Create modal if it doesn't exist
        const modalDiv = document.createElement('div');
        modalDiv.id = 'statisticsModal';
        modalDiv.className = 'modal';
        modalDiv.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <h2>Estadísticas de Práctica</h2>
                <div id="statisticsContent"></div>
                <div class="modal-buttons" style="margin-top: 20px;">
                    <button class="modal-btn modal-btn-secondary" onclick="closeStatistics()">Cerrar</button>
                    <button class="modal-btn modal-btn-primary" onclick="clearStatistics()">Limpiar Estadísticas</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }
    
    const content = document.getElementById('statisticsContent');
    
    // Calculate summary
    const totalAttempts = stats.attempts.length;
    const avgScore = totalAttempts > 0 
        ? Math.round(stats.attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
        : 0;
    const bestScore = totalAttempts > 0 
        ? Math.max(...stats.attempts.map(a => a.score))
        : 0;
    const latestAttempt = stats.attempts[stats.attempts.length - 1];
    
    // Get failed questions
    const failedQuestions = getFailedQuestions(0.3);
    
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px;">
            <div style="padding: 15px; background: #e3f2fd; border-radius: 5px;">
                <h3 style="margin: 0 0 10px 0; color: #1976d2;">Total Intentos</h3>
                <div style="font-size: 2em; font-weight: bold; color: #1976d2;">${totalAttempts}</div>
            </div>
            <div style="padding: 15px; background: #fff3cd; border-radius: 5px;">
                <h3 style="margin: 0 0 10px 0; color: #f57c00;">Puntuación Promedio</h3>
                <div style="font-size: 2em; font-weight: bold; color: #f57c00;">${avgScore}/1000</div>
            </div>
            <div style="padding: 15px; background: #d4edda; border-radius: 5px;">
                <h3 style="margin: 0 0 10px 0; color: #155724;">Mejor Puntuación</h3>
                <div style="font-size: 2em; font-weight: bold; color: #155724;">${bestScore}/1000</div>
            </div>
            ${latestAttempt ? `
            <div style="padding: 15px; background: #f3e5f5; border-radius: 5px;">
                <h3 style="margin: 0 0 10px 0; color: #7b1fa2;">Último Intento</h3>
                <div style="font-size: 1.5em; font-weight: bold; color: #7b1fa2;">${latestAttempt.score}/1000</div>
                <div style="font-size: 0.9em; color: #666; margin-top: 5px;">${new Date(latestAttempt.date).toLocaleString('es-ES')}</div>
            </div>
            ` : ''}
        </div>
    `;
    
    // Failed questions section
    if (failedQuestions.length > 0) {
        html += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #f44336; margin-bottom: 15px;">📚 Preguntas Más Problemáticas</h3>
                <div style="background: #fff; border-radius: 5px; padding: 15px; max-height: 300px; overflow-y: auto;">
        `;
        
        failedQuestions.slice(0, 10).forEach(q => {
            const accuracy = Math.round(((q.totalAttempts - q.timesFailed) / q.totalAttempts) * 100);
            html += `
                <div style="padding: 10px; margin-bottom: 10px; background: #fff3cd; border-left: 4px solid #ff9800; border-radius: 3px;">
                    <strong>Pregunta ${q.questionNum}</strong> - 
                    Fallada ${q.timesFailed} de ${q.totalAttempts} veces 
                    (${accuracy}% de acierto)
                    <div style="margin-top: 5px; height: 6px; background: #e0e0e0; border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: ${accuracy >= 70 ? '#4caf50' : accuracy >= 50 ? '#ff9800' : '#f44336'}; width: ${accuracy}%;"></div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    // Recent attempts
    if (stats.attempts.length > 0) {
        html += `
            <div>
                <h3 style="margin-bottom: 15px;">📊 Historial de Intentos (últimos 10)</h3>
                <div style="background: #fff; border-radius: 5px; padding: 15px; max-height: 400px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f5f5f5; border-bottom: 2px solid #ddd;">
                                <th style="padding: 10px; text-align: left;">Fecha</th>
                                <th style="padding: 10px; text-align: center;">Puntuación</th>
                                <th style="padding: 10px; text-align: center;">Correctas</th>
                                <th style="padding: 10px; text-align: center;">Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        stats.attempts.slice(-10).reverse().forEach(attempt => {
            const date = new Date(attempt.date);
            const color = attempt.percentage >= 70 ? '#4caf50' : attempt.percentage >= 50 ? '#ff9800' : '#f44336';
            html += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px;">${date.toLocaleString('es-ES')}</td>
                    <td style="padding: 10px; text-align: center; font-weight: bold; color: ${color};">${attempt.score}/1000</td>
                    <td style="padding: 10px; text-align: center;">${attempt.correctCount}/${attempt.totalQuestions}</td>
                    <td style="padding: 10px; text-align: center;">${attempt.percentage}%</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        html += `
            <div style="text-align: center; padding: 40px; background: #f5f5f5; border-radius: 5px;">
                <p style="font-size: 1.2em; color: #666;">Aún no has completado ningún intento del examen.</p>
                <p style="color: #999;">Completa el examen para empezar a ver tus estadísticas.</p>
            </div>
        `;
    }
    
    content.innerHTML = html;
    
    // Show modal
    document.getElementById('statisticsModal').classList.remove('hidden');
}

// Close statistics modal
function closeStatistics() {
    const modal = document.getElementById('statisticsModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Clear statistics
function clearStatistics() {
    if (confirm('¿Estás seguro de que quieres limpiar todas las estadísticas? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('unityTestStatistics');
        displayStatisticsPanel();
        alert('Estadísticas limpiadas.');
    }
}

// Practice mode for failed questions
let practiceMode = 'all'; // 'all' or 'failed'
let filteredQuestionIndices = []; // Store indices of filtered questions

function setPracticeMode(mode) {
    practiceMode = mode;
    
    // Get the form element
    const form = document.getElementById('testForm');
    if (!form) return;
    
    // Reinitialize allQuestions
    allQuestions = Array.from(form.querySelectorAll('.question'));
    
    // Hide all questions
    allQuestions.forEach(q => {
        q.classList.remove('question-active');
        q.style.display = 'none';
    });
    
    // Filter and show only selected questions
    const filteredQuestions = filterQuestionsForPracticeMode(allQuestions, mode);
    
    if (filteredQuestions.length === 0) {
        alert('No hay preguntas para practicar en este modo. Completa el examen primero para generar estadísticas.');
        practiceMode = 'all';
        filteredQuestions.push(...allQuestions);
    }
    
    // Store filtered question indices for navigation
    filteredQuestionIndices = filteredQuestions.map(q => allQuestions.indexOf(q));
    
    // Reset to first question in filtered list
    if (filteredQuestionIndices.length > 0) {
        currentQuestionIndex = filteredQuestionIndices[0];
    } else {
        currentQuestionIndex = 0;
    }
    
    // Show first question
    if (allQuestions[currentQuestionIndex]) {
        allQuestions[currentQuestionIndex].classList.add('question-active');
        allQuestions[currentQuestionIndex].style.display = 'block';
    }
    
    // Update navigation and progress
    if (typeof updateNavigationButtons === 'function') {
        updateNavigationButtons();
    }
    if (typeof updateProgress === 'function') {
        updateProgress();
    }
    
    // Show message
    const message = mode === 'failed' 
        ? `Modo de práctica activado: ${filteredQuestions.length} preguntas problemáticas`
        : 'Modo normal: todas las preguntas';
    
    alert(message);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// END STATISTICS SYSTEM
// ============================================

// Correct answers
const correctAnswers = {
    // Question 1: True/False for Unity naming conventions
    q1_1: 'false',  // First snippet - incorrect naming
    q1_2: 'false',  // Second snippet - incorrect naming
    q1_3: 'true',   // Third snippet - correct Unity naming
    
    // Question 2: Debug.Log
    q2: 'D',        // Debug.Log("Hello World!");
    
    // Question 3: Logical operators (coins == extralife || coins == bonus)
    q3_1: '==',     // coins == extralife
    q3_2: '||',     // || (OR operator)
    q3_3: '==',     // coins == bonus
    
    // Question 4: Modulo operator comment
    q4: 'C',        // check if i is divisible by 2 with remainder 0
    
    // Question 5: UI Text code completion
    q5_1: 'option2', // using UnityEngine.Text;
    q5_2: 'option3', // public Text myText;
    q5_3: 'option1', // myText.text = ("Score: "+score.ToString());
    
    // Question 6: Random.Range comment
    q6: 'B',         // creates a number between 1 and 31
    
    // Question 7: NullReferenceException
    q7: 'B',         // coolBook.author
    
    // Question 8: UI buttons True/False
    q8_1: 'false',   // onClick in Start doesn't guarantee green color (need to see LightBulbOn method)
    q8_2: 'false',   // OnTriggerEnter2D is not needed for button presses
    q8_3: 'true',    // TRUE: AddListener CAN be called in Update (technical capability), and button2 could be set up to turn green
    
    // Question 9: Code snippet ordering (B, C, A, D)
    q9_1: 'B',       // Position 1: Class definition (B)
    q9_2: 'C',       // Position 2: Awake (C)
    q9_3: 'A',       // Position 3: OnEnable (A)
    q9_4: 'D',       // Position 4: Closing brace (D)
    
    // Question 10: Debug.Log Color
    q10: 'color', // Just "color" (not ToString())
    
    // Question 11: Unity window matching
    q11_1: '1',      // Hierarchy - list of GameObjects
    q11_2: '3',      // Scene - interactive view
    q11_3: '4',      // Project - assets management
    q11_4: '2',      // Inspector - GameObject details
    
    // Question 12: Animator SetBool
    q12_1: 'animator', // animator reference
    q12_2: '("Attacking", false)', // SetBool parameter
    
    // Question 13: ECS True/False (T F F)
    q13_1: 'true',   // Uses Unity.Entities - TRUE (horizontal/Vertical)
    q13_2: 'false',  // Wizard class with fireballs - NO Unity.Entities, regular MonoBehaviour - FALSE
    q13_3: 'false',  // Movement class with speed - NO Unity.Entities, regular MonoBehaviour - FALSE
    
    // Question 14: Material.SetColor
    q14_1: '"_Color"', // First parameter: name
    q14_2: 'Color red', // Second parameter: value
    
    // Question 15: Input methods
    q15_1: 'GetKey(KeyCode.LeftArrow)', // Held down
    q15_2: 'GetKeyDown(KeyCode.UpArrow)', // Pressed once
    q15_3: 'GetKeyUp(KeyCode.DownArrow)', // Released
    
    // Question 16: Multiple choice with 2 answers (checkboxes)
    q16: ['A', 'C'], // A: velocity along Z axis, C: instantiate at transform
    
    // Question 17: Transform.Translate
    q17: 'Translate', // Move by translation
    
    // Question 18: Animator matching
    q18_1: 'SetInt',    // ("Animation", 1) - integer
    q18_2: 'SetFloat',  // ("Animation", .5f) - float
    q18_3: 'SetBool',   // ("Animation", false) - boolean
    q18_4: 'SetTrigger', // ("Animation") - trigger
    
    // Question 19: Start/OnTriggerEnter
    q19_1: 'Start', // Initialization once
    q19_2: 'OnTriggerEnter', // Collider trigger event
    
    // Question 20: Method declaration
    q20_1: 'void', // Return type
    q20_2: 'SetMessageToDisplay', // Method name
    q20_3: 'string stringToDisplay', // Parameter
    
    // Question 21: Operators matching
    q21_1: '!=',   // not equal to
    q21_2: '++',   // increment
    q21_3: '==',   // equal to
    q21_4: '+',    // string concatenation
    q21_5: '=',    // assignment
    
    // Question 22: Mecanim Animator State
    q22: 'Empty',   // If Axis > 2, stays at Empty state
    
    // Question 23: State Machine Transitions True/False
    q23_1: 'true',  // Entry node transitions control starting state
    q23_2: 'false', // Animation states can have multiple transitions
    q23_3: 'true',  // State machines can have or not have default state
    
    // Question 24: OnMouseDown method
    q24_1: 'private', // Access modifier
    q24_2: 'void',    // Return type
    q24_3: 'OnMouseDown()', // Method name
    
    // Question 25: Compilation errors (2 answers)
    q25: ['A', 'D'], // A: dictionary == myInt (type mismatch), D: myFloat <= myString (type mismatch)
    
    // Question 26: ECS True/False
    q26_1: 'false', // Fireball - MonoBehaviour, no Unity.Entities - FALSE
    q26_2: 'true',  // ShieldComponent - Uses Unity.Entities (even though MonoBehaviour, professor considers it ECS) - TRUE
    q26_3: 'true',  // EnemyMovementSystem - ComponentSystem is ECS - TRUE
    
    // Question 27: Unity naming conventions True/False
    q27_1: 'true',  // Correct Unity naming (PascalCase class, camelCase fields)
    q27_2: 'false', // Incorrect: ontriggerenter should be OnTriggerEnter, Other should be other, compareTag should be CompareTag
    q27_3: 'true',  // Correct Unity naming
    
    // Question 28: Rigidbody data type
    q28: 'Rigidbody', // GetComponent<Rigidbody>() returns Rigidbody
    
    // Question 29: GameObject null check
    q29_1: 'Public GameObject projectile;', // Declaration (note: capital P as shown in options)
    q29_2: '(projectile == null)', // Null check
    
    // Question 30: Rigidbody.AddForce
    q30_1: 'transform.forward', // Direction object is facing
    q30_2: 'speedForce', // Public variable that can be set in inspector
    
    // Question 31: Inspector window True/False
    q31_1: 'false', // Static is for batching/optimization, not about movement
    q31_2: 'true',  // GameObject.FindGameObjectsWithTag can find multiple objects
    q31_3: 'true',  // Inspector can modify prefabs
    
    // Question 32: Rigidbody.velocity error
    q32: 'rb.velocity = transform.forward * speed;', // Need instance reference, not class
    
    // Question 34: Compile-time error line
    q34: '9', // OnCollisionEnter is outside the class (syntax error)
    
    // Question 35: Dictionary initialization (3 answers)
    q35: ['B', 'C', 'D'], // B: closing brace, C: dictionary.Add, D: foreach loop
    
    // Question 37: Scene view positioning True/False
    q37_1: 'true',  // Move tool can show local/global orientation
    q37_2: 'true',  // Transform tool combines move, rotate, scale
    q37_3: 'false', // Can be moved/rotated/scaled in 2D view too
    
    // Question 38: playerName not showing in inspector
    q38: 'A', // Should be public (or [SerializeField])
    
    // Question 39: GetChildren return type
    q39: 'List&lt;Transform&gt;', // Returns List<Transform>
    
    // Question 40: Functions True/False
    q40_1: 'false', // void means no return, not null
    q40_2: 'true',  // Functions can have multiple parameters of different types
    q40_3: 'true',  // Functions must be called to execute
    q40_4: 'true'   // Functions that return values must use return keyword
};

// Question texts for results
const questionTexts = {
    q1: 'Question 1: Unity naming conventions',
    q2: 'Question 2: Console logging',
    q3: 'Question 3: Logical operators',
    q4: 'Question 4: Modulo operator',
    q5: 'Question 5: UI Text display',
    q6: 'Question 6: Random.Range comment',
    q7: 'Question 7: NullReferenceException',
    q8: 'Question 8: UI button onClick',
    q9: 'Question 9: Code snippet ordering',
    q10: 'Question 10: Debug.Log Color',
    q11: 'Question 11: Unity window matching',
    q12: 'Question 12: Animator SetBool',
    q13: 'Question 13: ECS True/False',
    q14: 'Question 14: Material.SetColor',
    q15: 'Question 15: Input methods',
    q16: 'Question 16: Code comments',
    q17: 'Question 17: Transform.Translate',
    q18: 'Question 18: Animator matching',
    q19: 'Question 19: Start/OnTriggerEnter',
    q20: 'Question 20: Method declaration',
    q21: 'Question 21: Operators matching',
    q22: 'Question 22: Mecanim Animator State',
    q23: 'Question 23: State Machine Transitions',
    q24: 'Question 24: OnMouseDown method',
    q25: 'Question 25: Compilation errors',
    q26: 'Question 26: ECS True/False',
    q27: 'Question 27: Unity naming conventions',
    q28: 'Question 28: Rigidbody data type',
    q29: 'Question 29: GameObject null check',
    q30: 'Question 30: Rigidbody.AddForce',
    q31: 'Question 31: Inspector window',
    q32: 'Question 32: Rigidbody.velocity error',
    q34: 'Question 34: Compile-time error line',
    q35: 'Question 35: Dictionary initialization',
    q37: 'Question 37: Scene view positioning',
    q38: 'Question 38: playerName inspector',
    q39: 'Question 39: GetChildren return type',
    q40: 'Question 40: Functions True/False'
};

// Utility function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Randomize options in questions
function randomizeQuestions() {
    // Randomize code snippet rows (entire rows with code + radio buttons)
    // This shuffles the order of snippets for True/False questions
    document.querySelectorAll('.true-false-content').forEach(container => {
        const rows = Array.from(container.querySelectorAll('.code-snippet-row'));
        const shuffled = shuffleArray(rows);
        container.innerHTML = '';
        shuffled.forEach(row => container.appendChild(row));
    });

    // Randomize multiple choice options
    document.querySelectorAll('.multiple-choice').forEach(container => {
        const choices = Array.from(container.querySelectorAll('.choice'));
        const shuffled = shuffleArray(choices);
        container.innerHTML = '';
        shuffled.forEach(choice => container.appendChild(choice));
    });

    // Randomize checkbox choices
    document.querySelectorAll('.checkbox-choice').forEach(container => {
        const choices = Array.from(container.querySelectorAll('.choice'));
        const shuffled = shuffleArray(choices);
        container.innerHTML = '';
        shuffled.forEach(choice => container.appendChild(choice));
    });

    // Randomize matching items
    document.querySelectorAll('.matching-left').forEach(container => {
        const items = Array.from(container.querySelectorAll('.match-item'));
        const shuffled = shuffleArray(items);
        container.innerHTML = '';
        shuffled.forEach(item => container.appendChild(item));
    });
}

// Global function for hints
function toggleHint(questionId) {
    const hint = document.getElementById(`hint-${questionId}`);
    if (hint) {
        hint.classList.toggle('hidden');
    }
}

// Progress tracking
function updateProgress() {
    const form = document.getElementById('testForm');
    if (!form) return;
    
    const totalQuestions = 38;
    
    // Count unique answered questions
    const answeredQuestions = new Set();
    
    // Count radio buttons (True/False and multiple choice)
    form.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        const name = input.name.split('_')[0]; // Get question number
        answeredQuestions.add(name);
    });
    
    // Count checkboxes (multiple answer questions)
    form.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
        const name = input.name.split('_')[0];
        if (!answeredQuestions.has(name)) {
            answeredQuestions.add(name);
        }
    });
    
    // Count selects - only if they have a value AND it's not the default empty option
    form.querySelectorAll('select').forEach(select => {
        if (select.value && select.value !== '' && 
            select.value !== '--- Select ---' && 
            select.value !== '---' &&
            select.value !== '--- Select Option ---') {
            const name = select.name.split('_')[0];
            answeredQuestions.add(name);
        }
    });
    
    const answered = answeredQuestions.size;
    
    const progressBar = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const percentage = (answered / totalQuestions) * 100;
    
    if (progressBar) progressBar.style.width = percentage + '%';
    if (progressText) progressText.textContent = `${answered}/${totalQuestions} questions answered`;
    
    // Check for unanswered questions
    const unansweredWarning = document.getElementById('unansweredWarning');
    if (answered < totalQuestions && unansweredWarning) {
        unansweredWarning.classList.remove('hidden');
    } else if (unansweredWarning) {
        unansweredWarning.classList.add('hidden');
    }
    
    // Save progress to localStorage (but only if we have a valid currentQuestionIndex set)
    // This prevents overwriting saved progress during initial load
    if (typeof currentQuestionIndex !== 'undefined' && currentQuestionIndex >= 0) {
        saveProgress();
    }
}

// Save progress to localStorage
function saveProgress() {
    const form = document.getElementById('testForm');
    if (!form) return; // Don't save if form doesn't exist yet
    
    const answers = {};
    
    // Save all form inputs
    form.querySelectorAll('input, select').forEach(input => {
        if (input.type === 'radio' && input.checked) {
            answers[input.name] = input.value;
        } else if (input.type === 'checkbox' && input.checked) {
            if (!answers[input.name]) answers[input.name] = [];
            answers[input.name].push(input.value);
        } else if (input.tagName === 'SELECT' && input.value) {
            answers[input.name] = input.value;
        }
    });
    
    // Always save if we have a currentQuestionIndex set (even if no answers yet)
    // This allows saving progress even when just navigating without answering
    localStorage.setItem('unityTestProgress', JSON.stringify({
        answers: answers,
        currentQuestionIndex: currentQuestionIndex,
        timestamp: Date.now()
    }));
    console.log('Progress saved:', { answersCount: Object.keys(answers).length, currentIndex: currentQuestionIndex });
}

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('unityTestProgress');
    if (!saved) return null;
    
    try {
        const data = JSON.parse(saved);
        // Check if saved data is less than 7 days old
        if (Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
            localStorage.removeItem('unityTestProgress');
            return null;
        }
        return {
            answers: data.answers,
            currentQuestionIndex: data.currentQuestionIndex !== undefined ? data.currentQuestionIndex : 0
        };
    } catch (e) {
        return null;
    }
}

// Clear saved progress
function clearProgress() {
    localStorage.removeItem('unityTestProgress');
}

// Question explanations (English and Spanish)
const questionExplanations = {
    q1: {
        en: "Unity naming conventions: Classes use PascalCase (PlayerScript), fields use camelCase (playerLight), methods use PascalCase (PlayerFunction). C# keywords are lowercase.",
        es: "Convenciones de nombres de Unity: Las clases usan PascalCase (PlayerScript), los campos usan camelCase (playerLight), los métodos usan PascalCase (PlayerFunction). Las palabras clave de C# están en minúsculas."
    },
    q2: {
        en: "Debug.Log() is the correct method to log messages to the Unity console. Console.Log is not a Unity method.",
        es: "Debug.Log() es el método correcto para registrar mensajes en la consola de Unity. Console.Log no es un método de Unity."
    },
    q3: {
        en: "When the question says 'if coins is equivalent to extralife, or bonus, or both', it means: if coins equals extralife OR if coins equals bonus OR if coins equals both. This requires the || (OR) operator. The == operator checks for equality. Note: 'or both' means we want to execute if EITHER condition is true (OR), not only when BOTH are true (AND).",
        es: "Cuando la pregunta dice 'si coins es equivalente a extralife, o bonus, o ambos', significa: si coins es igual a extralife O si coins es igual a bonus O si coins es igual a ambos. Esto requiere el operador || (OR). El operador == verifica la igualdad. Nota: 'o ambos' significa que queremos ejecutar si CUALQUIERA de las condiciones es verdadera (OR), no solo cuando AMBAS son verdaderas (AND)."
    },
    q4: {
        en: "The modulo operator (%) returns the remainder of a division. If i % 2 == 0, it means the number is divisible by 2 with no remainder (even number).",
        es: "El operador módulo (%) devuelve el resto de una división. Si i % 2 == 0, significa que el número es divisible por 2 sin resto (número par)."
    },
    q5: {
        en: "To use UI Text in Unity, you need 'using UnityEngine.UI;', declare a public Text variable, and set the text property with myText.text = value.",
        es: "Para usar UI Text en Unity, necesitas 'using UnityEngine.UI;', declarar una variable pública Text, y establecer la propiedad text con myText.text = valor."
    },
    q6: {
        en: "Random.Range(1, 32) generates a random integer between 1 (inclusive) and 32 (exclusive), so the range is 1 to 31.",
        es: "Random.Range(1, 32) genera un entero aleatorio entre 1 (inclusive) y 32 (exclusivo), por lo que el rango es de 1 a 31."
    },
    q7: {
        en: "NullReferenceException occurs when trying to access a member of a null object. In this case, coolBook is null, so accessing coolBook.author would throw an exception.",
        es: "NullReferenceException ocurre cuando intentas acceder a un miembro de un objeto nulo. En este caso, coolBook es nulo, por lo que acceder a coolBook.author lanzaría una excepción."
    },
    q8: {
        en: "UI Button onClick: In the code shown, only button1 has AddListener called in Start(). While AddListener CAN technically be called in Update(), this is possible (though not recommended as it would add listeners every frame). The statement about button2 is technically TRUE because AddListener can be called in Update - the code capability exists even if not shown. OnTriggerEnter2D is for collider physics, not UI buttons - buttons use onClick events.",
        es: "UI Button onClick: En el código mostrado, solo button1 tiene AddListener llamado en Start(). Aunque AddListener técnicamente PUEDE ser llamado en Update(), esto es posible (aunque no recomendado ya que agregaría listeners cada frame). La afirmación sobre button2 es técnicamente TRUE porque AddListener puede ser llamado en Update - la capacidad del código existe incluso si no se muestra. OnTriggerEnter2D es para física de colliders, no para botones UI - los botones usan eventos onClick."
    },
    q9: {
        en: "Code snippet ordering: In Unity, component initialization follows a specific lifecycle. Awake() is called when the script instance is loaded, before Start(). OnEnable() is called every time the GameObject becomes active. For pooled objects, initialization should happen once in Awake() or Start(), while activation behavior happens in OnEnable(). The proper order is: class definition, Awake (initialization), OnEnable (activation), closing brace.",
        es: "Orden de fragmentos de código: En Unity, la inicialización de componentes sigue un ciclo de vida específico. Awake() se llama cuando se carga la instancia del script, antes de Start(). OnEnable() se llama cada vez que el GameObject se vuelve activo. Para objetos en pool, la inicialización debe ocurrir una vez en Awake() o Start(), mientras que el comportamiento de activación ocurre en OnEnable(). El orden correcto es: definición de clase, Awake (inicialización), OnEnable (activación), llave de cierre."
    },
    q10: {
        en: "Debug.Log Color: When concatenating a Color variable with a string in Debug.Log(), Unity automatically calls ToString() on the Color. Simply using 'color' (without .ToString()) will automatically convert it to the string representation showing RGBA values like '(0.258,0.525,0.956,1)'. Adding .ToString() explicitly also works, but it's redundant.",
        es: "Debug.Log Color: Al concatenar una variable Color con una cadena en Debug.Log(), Unity automáticamente llama a ToString() en el Color. Simplemente usar 'color' (sin .ToString()) automáticamente lo convertirá a la representación de cadena mostrando valores RGBA como '(0.258,0.525,0.956,1)'. Agregar .ToString() explícitamente también funciona, pero es redundante."
    },
    q11: {
        en: "Unity window matching: The Hierarchy window shows all GameObjects in the current Scene. The Scene view is the interactive 3D viewport where you can manipulate objects. The Project window contains all assets (scripts, prefabs, materials, etc.) in your project. The Inspector window displays details and properties of the selected GameObject, allowing you to modify components and their values.",
        es: "Coincidencia de ventanas de Unity: La ventana Hierarchy muestra todos los GameObjects en la Escena actual. La vista Scene es la ventana gráfica 3D interactiva donde puedes manipular objetos. La ventana Project contiene todos los assets (scripts, prefabs, materiales, etc.) de tu proyecto. La ventana Inspector muestra detalles y propiedades del GameObject seleccionado, permitiéndote modificar componentes y sus valores."
    },
    q12: {
        en: "Animator SetBool: To set an Animator boolean parameter, you need a reference to the Animator component and call SetBool() with two parameters: the parameter name as a string (e.g., 'Attacking') and the boolean value (true or false). The syntax is: animator.SetBool('Attacking', false);",
        es: "Animator SetBool: Para establecer un parámetro booleano del Animator, necesitas una referencia al componente Animator y llamar SetBool() con dos parámetros: el nombre del parámetro como cadena (ej., 'Attacking') y el valor booleano (true o false). La sintaxis es: animator.SetBool('Attacking', false);"
    },
    q13: {
        en: "ECS (Entity Component System): ECS is Unity's data-oriented programming approach. Code using ECS will have 'using Unity.Entities;' and typically uses IComponentData for components and ComponentSystem or SystemBase for systems. Regular MonoBehaviour classes are NOT ECS - they are the traditional object-oriented approach. Only the first snippet uses Unity.Entities, making it ECS. The others are standard MonoBehaviour scripts.",
        es: "ECS (Entity Component System): ECS es el enfoque de programación orientado a datos de Unity. El código que usa ECS tendrá 'using Unity.Entities;' y típicamente usa IComponentData para componentes y ComponentSystem o SystemBase para sistemas. Las clases MonoBehaviour regulares NO son ECS - son el enfoque orientado a objetos tradicional. Solo el primer fragmento usa Unity.Entities, haciéndolo ECS. Los otros son scripts MonoBehaviour estándar."
    },
    q14: {
        en: "Material.SetColor: According to the API documentation, SetColor() requires two parameters: a string for the property name (e.g., '_Color') and a Color value. The first parameter must be the property name as a string, and the second parameter must be a Color value like 'Color.red', not a string.",
        es: "Material.SetColor: Según la documentación de la API, SetColor requiere dos parámetros: una cadena para el nombre de la propiedad (ej., '_Color') y un valor Color. El primer parámetro debe ser el nombre de la propiedad como cadena, y el segundo parámetro debe ser un valor Color como 'Color.red', no una cadena."
    },
    q15: {
        en: "Input methods: GetKey() returns true while the key is held down (continuous). GetKeyDown() returns true only on the frame when the key is first pressed (once). GetKeyUp() returns true only on the frame when the key is released. For 'held down', use GetKey. For 'pressed once', use GetKeyDown. For 'released', use GetKeyUp.",
        es: "Métodos de Input: GetKey() devuelve true mientras la tecla está presionada (continuo). GetKeyDown() devuelve true solo en el frame cuando la tecla se presiona por primera vez (una vez). GetKeyUp() devuelve true solo en el frame cuando se suelta la tecla. Para 'mantener presionado', usa GetKey. Para 'presionado una vez', usa GetKeyDown. Para 'soltado', usa GetKeyUp."
    },
    q16: {
        en: "Code comments: The code creates a Rigidbody variable 'clone' and sets its velocity. The comment 'Give the cloned object an initial velocity along the current object's Z axis' is accurate because TransformDirection(Vector3.forward) transforms the forward direction to world space. 'Instantiate the projectile at the position and rotation of this transform' is also accurate, though the instantiation would happen before the velocity assignment. The other comments are incorrect.",
        es: "Comentarios de código: El código crea una variable Rigidbody 'clone' y establece su velocidad. El comentario 'Dar al objeto clonado una velocidad inicial a lo largo del eje Z del objeto actual' es preciso porque TransformDirection(Vector3.forward) transforma la dirección hacia adelante al espacio mundial. 'Instanciar el proyectil en la posición y rotación de este transform' también es preciso, aunque la instanciación ocurriría antes de la asignación de velocidad. Los otros comentarios son incorrectos."
    },
    q17: {
        en: "Transform.Translate: The Translate() method moves the GameObject by the given translation. This is the correct method for moving an object based on input and speed. SetPositionAndRotation sets both position and rotation. TransformDirection and TransformVector transform vectors but don't move the object.",
        es: "Transform.Translate: El método Translate() mueve el GameObject según la traducción dada. Este es el método correcto para mover un objeto basado en input y velocidad. SetPositionAndRotation establece tanto posición como rotación. TransformDirection y TransformVector transforman vectores pero no mueven el objeto."
    },
    q18: {
        en: "Animator functions: SetInt() is for integer parameters like 1. SetFloat() is for float parameters like 0.5f. SetBool() is for boolean parameters like false. SetTrigger() is for trigger parameters (no value, just the name). Match each function call to the correct parameter type based on the value type being passed.",
        es: "Funciones del Animator: SetInt() es para parámetros enteros como 1. SetFloat() es para parámetros float como 0.5f. SetBool() es para parámetros booleanos como false. SetTrigger() es para parámetros trigger (sin valor, solo el nombre). Empareja cada llamada de función con el tipo de parámetro correcto basado en el tipo de valor que se pasa."
    },
    q19: {
        en: "Start vs OnTriggerEnter: Start() is called once when the script starts, perfect for one-time initialization like finding components. OnTriggerEnter() is called when a collider enters the trigger, used for collision detection and response. In this case, initialization (finding PowerUp_Manager) should happen once in Start(), while collision handling should happen in OnTriggerEnter().",
        es: "Start vs OnTriggerEnter: Start() se llama una vez cuando el script inicia, perfecto para inicialización única como encontrar componentes. OnTriggerEnter() se llama cuando un collider entra en el trigger, usado para detección y respuesta de colisiones. En este caso, la inicialización (encontrar PowerUp_Manager) debe ocurrir una vez en Start(), mientras que el manejo de colisiones debe ocurrir en OnTriggerEnter()."
    },
    q20: {
        en: "Method declaration: A method declaration requires: access modifier (private/public), return type (void for no return), method name (SetMessageToDisplay), and parameters (string stringToDisplay). Based on the class context showing textToDisplay.text usage, the method should accept a string parameter to set the text.",
        es: "Declaración de método: Una declaración de método requiere: modificador de acceso (private/public), tipo de retorno (void para sin retorno), nombre del método (SetMessageToDisplay), y parámetros (string stringToDisplay). Basado en el contexto de la clase que muestra uso de textToDisplay.text, el método debe aceptar un parámetro string para establecer el texto."
    },
    q21: {
        en: "Operators matching: != means 'not equal to'. ++ is the increment operator (adds 1). == checks equality. + can concatenate strings or add numbers. = is assignment. Match each operator to its correct meaning and usage in the given code context.",
        es: "Coincidencia de operadores: != significa 'no igual a'. ++ es el operador de incremento (suma 1). == verifica igualdad. + puede concatenar cadenas o sumar números. = es asignación. Empareja cada operador con su significado y uso correcto en el contexto del código dado."
    },
    q22: {
        en: "Mecanim Animator State: In Unity's Animator State Machine, if a condition (like Axis > 2) is checked and no transition condition is met, the animator stays in the current state. If the current state is 'Empty', it will remain in 'Empty' state until a valid transition condition is met.",
        es: "Estado del Animator Mecanim: En la máquina de estados del Animator de Unity, si se verifica una condición (como Axis > 2) y no se cumple ninguna condición de transición, el animator permanece en el estado actual. Si el estado actual es 'Empty', permanecerá en el estado 'Empty' hasta que se cumpla una condición de transición válida."
    },
    q23: {
        en: "State Machine Transitions: Entry node transitions determine the initial state when entering the state machine. Animation states CAN have multiple transitions to different states (this is FALSE - states can have multiple transitions). State machines may or may not have a default state - both configurations are valid.",
        es: "Transiciones de máquina de estados: Las transiciones del nodo Entry determinan el estado inicial al entrar a la máquina de estados. Los estados de animación PUEDEN tener múltiples transiciones a diferentes estados (esto es FALSE - los estados pueden tener múltiples transiciones). Las máquinas de estados pueden o no tener un estado por defecto - ambas configuraciones son válidas."
    },
    q24: {
        en: "OnMouseDown method: OnMouseDown() is a Unity event method that detects mouse clicks on GameObjects. The method should be private (access modifier), void (no return type needed), and named OnMouseDown() with empty parentheses. It's called automatically by Unity when the mouse button is pressed down on a GameObject with a collider.",
        es: "Método OnMouseDown: OnMouseDown() es un método de evento de Unity que detecta clics del mouse en GameObjects. El método debe ser private (modificador de acceso), void (no necesita tipo de retorno), y nombrado OnMouseDown() con paréntesis vacíos. Es llamado automáticamente por Unity cuando se presiona el botón del mouse en un GameObject con collider."
    },
    q25: {
        en: "Compilation errors: Type mismatches cause compile-time errors in C#. Comparing a dictionary to an int (dictionary == myInt) is invalid - they are different types. Comparing a float to a string with <= (myFloat <= myString) is also invalid - these types cannot be compared. The other comparisons (int to int, float to float) are valid.",
        es: "Errores de compilación: Las incompatibilidades de tipo causan errores en tiempo de compilación en C#. Comparar un diccionario con un int (dictionary == myInt) es inválido - son tipos diferentes. Comparar un float con un string usando <= (myFloat <= myString) también es inválido - estos tipos no pueden compararse. Las otras comparaciones (int a int, float a float) son válidas."
    },
    q26: {
        en: "ECS True/False: ECS uses Unity.Entities namespace. Fireball is a standard MonoBehaviour script - NOT ECS. ShieldComponent uses Unity.Entities namespace (IComponentData), making it ECS even if it inherits from MonoBehaviour. EnemyMovementSystem uses ComponentSystem from Unity.Entities, making it ECS. Only snippets with Unity.Entities are ECS.",
        es: "ECS True/False: ECS usa el namespace Unity.Entities. Fireball es un script MonoBehaviour estándar - NO es ECS. ShieldComponent usa el namespace Unity.Entities (IComponentData), haciéndolo ECS incluso si hereda de MonoBehaviour. EnemyMovementSystem usa ComponentSystem de Unity.Entities, haciéndolo ECS. Solo los fragmentos con Unity.Entities son ECS."
    },
    q27: {
        en: "Unity naming conventions: Unity follows C# conventions: classes use PascalCase, fields use camelCase, methods use PascalCase. Unity-specific method names like OnTriggerEnter, CompareTag must use correct capitalization. The first snippet follows conventions correctly. The second has errors: ontriggerenter should be OnTriggerEnter, Other should be other (camelCase for fields), compareTag should be CompareTag (PascalCase for methods).",
        es: "Convenciones de nombres de Unity: Unity sigue las convenciones de C#: las clases usan PascalCase, los campos usan camelCase, los métodos usan PascalCase. Los nombres de métodos específicos de Unity como OnTriggerEnter, CompareTag deben usar la capitalización correcta. El primer fragmento sigue las convenciones correctamente. El segundo tiene errores: ontriggerenter debe ser OnTriggerEnter, Other debe ser other (camelCase para campos), compareTag debe ser CompareTag (PascalCase para métodos)."
    },
    q28: {
        en: "Rigidbody data type: GetComponent<Rigidbody>() returns a Rigidbody type. This is the component type, not GameObject or Transform. The generic GetComponent<T>() method returns the type specified in the angle brackets, which in this case is Rigidbody.",
        es: "Tipo de dato Rigidbody: GetComponent<Rigidbody>() devuelve un tipo Rigidbody. Este es el tipo de componente, no GameObject o Transform. El método genérico GetComponent<T>() devuelve el tipo especificado en los corchetes angulares, que en este caso es Rigidbody."
    },
    q29: {
        en: "GameObject null check: To check if a GameObject is null, you first declare it (e.g., 'public GameObject projectile;'), then use the comparison 'if (projectile == null)'. The null check prevents NullReferenceException when trying to use the GameObject. Note: The declaration should match the exact capitalization shown in the question.",
        es: "Verificación de null de GameObject: Para verificar si un GameObject es null, primero lo declaras (ej., 'public GameObject projectile;'), luego usas la comparación 'if (projectile == null)'. La verificación de null previene NullReferenceException al intentar usar el GameObject. Nota: La declaración debe coincidir con la capitalización exacta mostrada en la pregunta."
    },
    q30: {
        en: "Rigidbody.AddForce: AddForce() requires a Vector3 direction. transform.forward gives the forward direction of the object as a Vector3. The speed/force magnitude should be multiplied (speedForce). The correct syntax is: rb.AddForce(transform.forward * speedForce); This applies force in the direction the object is facing, scaled by the speed variable.",
        es: "Rigidbody.AddForce: AddForce() requiere una dirección Vector3. transform.forward da la dirección hacia adelante del objeto como Vector3. La magnitud de velocidad/fuerza debe multiplicarse (speedForce). La sintaxis correcta es: rb.AddForce(transform.forward * speedForce); Esto aplica fuerza en la dirección que mira el objeto, escalada por la variable de velocidad."
    },
    q31: {
        en: "Inspector window: The 'Static' checkbox in the Inspector is used for static batching and optimization, not for preventing movement - GameObjects can still be moved programmatically. GameObject.FindGameObjectsWithTag() can find multiple objects (note the plural 'GameObjects'), while FindGameObjectWithTag() finds only one. The Inspector can modify prefab instances and the modifications can affect the prefab asset.",
        es: "Ventana Inspector: La casilla 'Static' en el Inspector se usa para static batching y optimización, no para prevenir movimiento - los GameObjects aún pueden moverse programáticamente. GameObject.FindGameObjectsWithTag() puede encontrar múltiples objetos (nota el plural 'GameObjects'), mientras que FindGameObjectWithTag() encuentra solo uno. El Inspector puede modificar instancias de prefab y las modificaciones pueden afectar el asset del prefab."
    },
    q32: {
        en: "Rigidbody.velocity error: Rigidbody.velocity cannot be accessed as a static property. You need an instance reference (e.g., 'rb' which is a Rigidbody variable). The correct syntax is 'rb.velocity = transform.forward * speed;' where 'rb' is the Rigidbody component reference. Without an instance, you cannot modify velocity.",
        es: "Error de Rigidbody.velocity: Rigidbody.velocity no puede accederse como una propiedad estática. Necesitas una referencia de instancia (ej., 'rb' que es una variable Rigidbody). La sintaxis correcta es 'rb.velocity = transform.forward * speed;' donde 'rb' es la referencia al componente Rigidbody. Sin una instancia, no puedes modificar la velocidad."
    },
    q34: {
        en: "Compile-time error: OnCollisionEnter() is placed outside the class definition (after the closing brace). This causes a syntax error because methods must be inside the class. The error occurs at line 9 where OnCollisionEnter is declared outside the Player class scope. All methods must be within the class braces.",
        es: "Error en tiempo de compilación: OnCollisionEnter() está colocado fuera de la definición de la clase (después de la llave de cierre). Esto causa un error de sintaxis porque los métodos deben estar dentro de la clase. El error ocurre en la línea 9 donde OnCollisionEnter se declara fuera del alcance de la clase Player. Todos los métodos deben estar dentro de las llaves de la clase."
    },
    q35: {
        en: "Dictionary initialization: A Dictionary requires proper initialization syntax. You need a closing brace to close the dictionary initialization block. dictionary.Add() is the method to add key-value pairs to a Dictionary. A foreach loop can iterate through Dictionary entries. These are the three essential parts for properly initializing and using a Dictionary in C#.",
        es: "Inicialización de Dictionary: Un Dictionary requiere sintaxis de inicialización adecuada. Necesitas una llave de cierre para cerrar el bloque de inicialización del diccionario. dictionary.Add() es el método para agregar pares clave-valor a un Dictionary. Un bucle foreach puede iterar a través de las entradas del Dictionary. Estas son las tres partes esenciales para inicializar y usar correctamente un Dictionary en C#."
    },
    q37: {
        en: "Scene view positioning: The Move tool in Unity can display both local and global orientation through the tool handle's pivot mode. The Transform tool (position/rotation/scale combined) combines move, rotate, and scale functionality. GameObjects CAN be moved, rotated, and scaled in 2D view as well - 2D view is just a different camera perspective, not a restriction on transformations.",
        es: "Posicionamiento en Scene view: La herramienta Move en Unity puede mostrar orientación local y global a través del modo pivot del handle de la herramienta. La herramienta Transform (posición/rotación/escala combinadas) combina funcionalidad de mover, rotar y escalar. Los GameObjects PUEDEN moverse, rotarse y escalarse en la vista 2D también - la vista 2D es solo una perspectiva de cámara diferente, no una restricción en las transformaciones."
    },
    q38: {
        en: "playerName inspector: For a variable to appear in the Unity Inspector, it must be public (or marked with [SerializeField] attribute). Private variables are not visible in the Inspector by default. Making it public allows Unity's Inspector to display and allow editing of the variable value in the editor.",
        es: "playerName inspector: Para que una variable aparezca en el Inspector de Unity, debe ser pública (o marcada con el atributo [SerializeField]). Las variables privadas no son visibles en el Inspector por defecto. Hacerla pública permite que el Inspector de Unity muestre y permita editar el valor de la variable en el editor."
    },
    q39: {
        en: "GetChildren return type: GetChildren() methods in Unity typically return a List<Transform> because they collect multiple child Transforms. It's not a single Transform, GameObject, or array - it's a List collection containing all child Transform components.",
        es: "Tipo de retorno de GetChildren: Los métodos GetChildren() en Unity típicamente devuelven List<Transform> porque recolectan múltiples Transforms hijos. No es un Transform único, GameObject, o array - es una colección List que contiene todos los componentes Transform hijos."
    },
    q40: {
        en: "Functions True/False: void means a function returns nothing, not null - void is the absence of a return type. Functions CAN have multiple parameters of different types - this is a core feature of C#. Functions must be CALLED to execute - just defining them doesn't run the code. Functions that return values MUST use the return keyword to provide the return value.",
        es: "Funciones True/False: void significa que una función no devuelve nada, no null - void es la ausencia de un tipo de retorno. Las funciones PUEDEN tener múltiples parámetros de diferentes tipos - esta es una característica fundamental de C#. Las funciones deben ser LLAMADAS para ejecutarse - solo definirlas no ejecuta el código. Las funciones que devuelven valores DEBEN usar la palabra clave return para proporcionar el valor de retorno."
    },
    // Generic explanation for questions without specific explanations
    default: {
        en: "Review your answer and the correct solution carefully. Make sure you understand the concepts involved.",
        es: "Revisa tu respuesta y la solución correcta cuidadosamente. Asegúrate de entender los conceptos involucrados."
    }
};

// Global variables for navigation
let currentQuestionIndex = 0;
let allQuestions = [];
let trainerModeActive = false;
let currentLanguage = 'en';

// Navigation function
window.navigateQuestion = function(direction, isSkip = false, forceNavigate = false) {
    console.log('navigateQuestion called:', { direction, isSkip, forceNavigate, trainerModeActive, currentQuestionIndex, practiceMode });
    
    // Make sure allQuestions is initialized
    if (!allQuestions || allQuestions.length === 0) {
        const form = document.getElementById('testForm');
        if (form) {
            allQuestions = Array.from(form.querySelectorAll('.question'));
        }
        if (!allQuestions || allQuestions.length === 0) {
            return;
        }
    }
    
    // If in practice mode with filtered questions, use filtered indices
    let availableIndices = [];
    if (practiceMode === 'failed' && filteredQuestionIndices.length > 0) {
        availableIndices = filteredQuestionIndices;
    } else {
        availableIndices = allQuestions.map((_, idx) => idx);
    }
    
    // Find current position in available indices
    let currentPosition = availableIndices.indexOf(currentQuestionIndex);
    if (currentPosition === -1 && availableIndices.length > 0) {
        currentPosition = 0;
        currentQuestionIndex = availableIndices[0];
    }
    
    // Hide feedback if visible (will be shown again if needed)
    const trainerFeedback = document.getElementById('trainerFeedback');
    
    // If feedback is already visible and user clicks Next, hide feedback and navigate
    if (trainerFeedback && !trainerFeedback.classList.contains('hidden') && !forceNavigate) {
        console.log('Feedback visible, hiding and navigating');
        // User wants to navigate - hide feedback first
        trainerFeedback.classList.add('hidden');
        // Clear visual feedback marks
        const question = allQuestions[currentQuestionIndex];
        if (question) {
            question.querySelectorAll('.answer-feedback').forEach(el => el.remove());
            question.querySelectorAll('.radio-label, .choice, select').forEach(el => {
                el.classList.remove('answer-correct', 'answer-incorrect');
            });
        }
        // Continue with navigation using forceNavigate to bypass trainer check
        return navigateQuestion(direction, isSkip, true);
    }
    
    console.log('Checking trainer mode:', { 
        isSkip, 
        forceNavigate, 
        trainerModeActive, 
        direction, 
        shouldCheck: !isSkip && !forceNavigate && trainerModeActive && direction > 0 
    });
    
    if (!isSkip && !forceNavigate && trainerModeActive && direction > 0) {
        // Check if question has been answered before checking
        const questionNum = currentQuestionIndex + 1;
        const question = allQuestions[currentQuestionIndex];
        const form = document.getElementById('testForm');
        let hasAnswer = false;
        
        if (question) {
            // FIRST: Check directly in form by name pattern (MOST RELIABLE for nested selects like q12, q14, etc.)
            // This works even if selects are deeply nested in code snippets
            // Do this FIRST before querySelector to ensure we catch nested selects
            // NOTE: We trust that question names are unique, so we don't need to check question.contains()
            const questionKey = `q${questionNum}`;
            if (form) {
                let foundAnySelect = false;
                for (let i = 1; i <= 10; i++) {
                    const selectByName = form.querySelector(`select[name="${questionKey}_${i}"]`);
                    if (selectByName) {
                        foundAnySelect = true;
                        const val = selectByName.value;
                        const isValid = val && 
                               val !== '' && 
                               val !== '--- Select ---' &&
                               val !== '---' &&
                               val !== '--- Select Window Type ---' &&
                               val !== '--- Select Operator ---' &&
                               val !== '--- Select Option ---';
                        console.log(`Question ${questionNum} - Checking select ${questionKey}_${i}: value="${val}", isValid=${isValid}`);
                        if (isValid) {
                            console.log(`Question ${questionNum} - ✅ Found VALID select by name: ${questionKey}_${i} = "${val}"`);
                            hasAnswer = true;
                            break; // Found at least one, that's enough
                        }
                    }
                }
                if (!foundAnySelect) {
                    console.log(`Question ${questionNum} - No selects found with name pattern ${questionKey}_1 to ${questionKey}_10`);
                }
            } else {
                console.log(`Question ${questionNum} - Form not found!`);
            }
            
            // SECOND: Check for radio buttons and checkboxes
            const checkedRadio = question.querySelector('input[type="radio"]:checked');
            const checkedCheckbox = question.querySelector('input[type="checkbox"]:checked');
            
            // THIRD: Check for selects via querySelector (fallback)
            let selects = question.querySelectorAll('select');
            console.log(`Question ${questionNum} - Found ${selects.length} selects via querySelector`);
            
            console.log(`Question ${questionNum} - Found ${selects.length} selects in question, ${checkedRadio ? 1 : 0} radios, ${checkedCheckbox ? 1 : 0} checkboxes`);
            
            if (selects.length > 0 && !hasAnswer) {
                // Check if at least one select has a valid value
                // For trainer mode, we want to show feedback if ANY part is answered
                const validSelects = Array.from(selects).filter(select => {
                    const val = select.value;
                    const isValid = val && 
                           val !== '' && 
                           val !== '--- Select ---' &&
                           val !== '---' &&
                           val !== '--- Select Window Type ---' &&
                           val !== '--- Select Operator ---' &&
                           val !== '--- Select Option ---';
                    if (!isValid && val) {
                        console.log(`Select ${select.name || 'unnamed'} has invalid value: "${val}"`);
                    }
                    return isValid;
                });
                
                console.log(`Question ${questionNum} - Valid selects from querySelector: ${validSelects.length} out of ${selects.length}`);
                
                // If there's at least one valid select, we have an answer to check
                hasAnswer = validSelects.length > 0;
            } else if (!hasAnswer) {
                // For radio/checkbox questions, just check if any is selected
                hasAnswer = !!(checkedRadio || checkedCheckbox);
            }
            
            console.log(`Question ${questionNum} - hasAnswer check:`, {
                checkedRadio: !!checkedRadio,
                checkedCheckbox: !!checkedCheckbox,
                selectsCount: selects.length,
                validSelectsCount: selects.length > 0 ? Array.from(selects).filter(s => {
                    const val = s.value;
                    return val && val !== '' && val !== '--- Select ---' && val !== '---' &&
                           val !== '--- Select Window Type ---' && val !== '--- Select Operator ---' &&
                           val !== '--- Select Option ---';
                }).length : 0,
                hasAnswer: hasAnswer,
                selectValues: selects.length > 0 ? Array.from(selects).map(s => s.value) : []
            });
        }
        
        // Only check and show feedback if question has been answered
        if (hasAnswer) {
            console.log(`Question ${questionNum} - hasAnswer is TRUE, calling checkSingleQuestion`);
            try {
                const result = checkSingleQuestion(currentQuestionIndex);
                console.log(`Question ${questionNum} - checkSingleQuestion returned:`, result);
                
                // Show feedback if we have a valid result
                // Always show feedback if we detected an answer and got a result
                if (result) {
                    // Only skip if explicitly says "No answer detected"
                    const answerText = result.answer || '';
                    const isTrulyEmpty = answerText.toLowerCase().includes('no answer detected');
                    
                    console.log(`Question ${questionNum} - Result check: answerText="${answerText}", isTrulyEmpty=${isTrulyEmpty}`);
                    
                    if (!isTrulyEmpty) {
                        console.log(`Question ${questionNum} - About to call showTrainerFeedback`);
                        // Show feedback (for both correct and incorrect answers)
                        showTrainerFeedback(currentQuestionIndex, result);
                        console.log(`Question ${questionNum} - showTrainerFeedback called, should be visible now`);
                        
                        // Don't navigate yet - wait for user to see feedback and click Continue
                        return;
                    } else {
                        console.log(`Question ${questionNum} - Answer is truly empty, allowing navigation`);
                    }
                } else {
                    console.log(`Question ${questionNum} - No result returned from checkSingleQuestion, allowing navigation`);
                }
            } catch (error) {
                console.error(`Error checking question ${questionNum}:`, error);
                console.error('Error stack:', error.stack);
                // If there's an error, allow navigation anyway
            }
        } else {
            console.log(`Question ${questionNum} - No answer detected (hasAnswer=${hasAnswer}), allowing navigation`);
            console.log(`Question ${questionNum} - DEBUG: question element exists:`, !!question);
            if (question && form) {
                // Last resort: try to find ANY input with a value in this question
                const allInputs = question.querySelectorAll('input, select');
                console.log(`Question ${questionNum} - All inputs in question:`, Array.from(allInputs).map(el => ({
                    type: el.type || el.tagName,
                    name: el.name,
                    value: el.value,
                    checked: el.checked
                })));
            }
        }
        // If no answer detected or error, allow navigation (skip trainer feedback)
    }
    
    // Hide feedback if visible (when navigating normally)
    if (trainerFeedback) {
        trainerFeedback.classList.add('hidden');
    }
    
    // Calculate new position in available indices
    let newPosition = currentPosition + direction;
    
    if (newPosition < 0 || newPosition >= availableIndices.length) {
        return; // Can't go before first or after last question
    }
    
    // Get the new index from available indices
    let newIndex = availableIndices[newPosition];
    
    // Hide current question
    if (allQuestions[currentQuestionIndex]) {
        allQuestions[currentQuestionIndex].classList.remove('question-active');
        allQuestions[currentQuestionIndex].style.display = 'none';
    }
    
    // Update index
    currentQuestionIndex = newIndex;
    
    // Show new question
    if (allQuestions[currentQuestionIndex]) {
        allQuestions[currentQuestionIndex].classList.add('question-active');
        allQuestions[currentQuestionIndex].style.display = 'block';
    }
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update progress (this calls saveProgress internally)
    if (typeof updateProgress === 'function') {
        updateProgress();
    }
    
    // Explicitly save progress after navigation to ensure currentQuestionIndex is saved
    if (typeof saveProgress === 'function') {
        saveProgress();
    }
};

// Update navigation buttons state
function updateNavigationButtons() {
    allQuestions.forEach((question, index) => {
        const backBtn = question.querySelector('.nav-btn-back');
        if (backBtn) {
            backBtn.disabled = index === 0;
        }
    });
}

// Check single question - uses the full checkAnswers logic but only returns one result
function checkSingleQuestion(questionIndex) {
    // Make sure allQuestions is initialized
    if (!allQuestions || allQuestions.length === 0) {
        const form = document.getElementById('testForm');
        if (form) {
            allQuestions = Array.from(form.querySelectorAll('.question'));
        }
    }
    
    // Get the actual question ID from the HTML element instead of calculating from index
    // This fixes the issue where question 33 is missing and causes misalignment
    const questionElement = allQuestions[questionIndex];
    const actualQuestionId = questionElement ? questionElement.id : null;
    const questionNumFromId = actualQuestionId ? parseInt(actualQuestionId.replace('q', '')) : questionIndex + 1;
    
    // Temporarily call checkAnswers and find our specific question
    const allResults = checkAnswers();
    const result = allResults.results.find(r => r.questionNum === questionNumFromId);
    
    if (!result) {
        // Fallback for questions not in results (shouldn't happen)
        const questionKey = actualQuestionId || `q${questionNumFromId}`;
        return {
            questionNum: questionNumFromId,
            questionText: questionTexts[questionKey] || `Question ${questionNumFromId}`,
            correct: false,
            answer: 'No answer detected',
            correctAnswer: 'Unable to determine'
        };
    }
    
    return result;
}

// Mark visual feedback on inputs
function markQuestionVisualFeedback(questionIndex, result) {
    const question = allQuestions[questionIndex];
    if (!question) return;
    
    // Get the actual question ID from the HTML element instead of calculating from index
    // This fixes the issue where question 33 is missing and causes misalignment
    const actualQuestionId = question.id;
    const questionKey = actualQuestionId || `q${questionIndex + 1}`;
    
    // Remove any existing visual feedback
    question.querySelectorAll('.answer-feedback').forEach(el => el.remove());
    question.querySelectorAll('.radio-label').forEach(label => {
        label.classList.remove('answer-correct', 'answer-incorrect');
    });
    question.querySelectorAll('.choice').forEach(choice => {
        choice.classList.remove('answer-correct', 'answer-incorrect');
    });
    question.querySelectorAll('select').forEach(select => {
        select.classList.remove('answer-correct', 'answer-incorrect');
    });
    
    // Check if this is a multi-part True/False question
    const part1Key = `${questionKey}_1`;
    const part2Key = `${questionKey}_2`;
    
    if (correctAnswers[part1Key] && correctAnswers[part2Key]) {
        // Multi-part question (could be True/False with radios, or dropdowns with selects)
        const parts = [];
        let partNum = 1;
        while (correctAnswers[`${questionKey}_${partNum}`] !== undefined) {
            parts.push(`${questionKey}_${partNum}`);
            partNum++;
        }
        
        // Mark each part
        parts.forEach(name => {
            const correctValue = correctAnswers[name];
            
            // Try select first (for questions like q12, q14 with dropdowns)
            const userSelect = question.querySelector(`select[name="${name}"]`);
            if (userSelect) {
                // It's a select dropdown
                const userValue = userSelect.value;
                const isCorrect = userValue === correctValue;
                userSelect.classList.add(isCorrect ? 'answer-correct' : 'answer-incorrect');
            } else {
                // It's a radio button
                const userInput = question.querySelector(`input[name="${name}"]:checked`);
                if (userInput) {
                    const userValue = userInput.value;
                    const isCorrect = userValue === correctValue;
                    const label = userInput.closest('.radio-label');
                    
                    if (label) {
                        label.classList.add(isCorrect ? 'answer-correct' : 'answer-incorrect');
                        
                        // Add checkmark or X
                        const feedback = document.createElement('span');
                        feedback.className = `answer-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
                        feedback.textContent = isCorrect ? '✓' : '✗';
                        label.appendChild(feedback);
                    }
                    
                    // Also mark the correct answer if user got it wrong
                    if (!isCorrect) {
                        try {
                            const correctInput = question.querySelector(`input[name="${name}"][value="${CSS.escape(correctValue)}"]`);
                            if (correctInput && correctInput !== userInput) {
                                const correctLabel = correctInput.closest('.radio-label');
                                if (correctLabel) {
                                    correctLabel.classList.add('answer-correct');
                                    const correctFeedback = document.createElement('span');
                                    correctFeedback.className = 'answer-feedback feedback-correct';
                                    correctFeedback.textContent = '✓';
                                    correctLabel.appendChild(correctFeedback);
                                }
                            }
                        } catch (e) {
                            console.warn(`Could not mark correct answer for ${name}:`, e);
                        }
                    }
                } else {
                    // No answer selected - mark correct one for radio buttons only
                    try {
                        const correctInput = question.querySelector(`input[name="${name}"][value="${CSS.escape(correctValue)}"]`);
                        if (correctInput) {
                            const correctLabel = correctInput.closest('.radio-label');
                            if (correctLabel) {
                                correctLabel.classList.add('answer-correct');
                                const correctFeedback = document.createElement('span');
                                correctFeedback.className = 'answer-feedback feedback-correct';
                                correctFeedback.textContent = '✓';
                                correctLabel.appendChild(correctFeedback);
                            }
                        }
                    } catch (e) {
                        // Silently fail if querySelector fails (e.g., for selects or invalid values)
                    }
                }
            }
        });
    } else {
        // For other question types (single answer), mark based on result
        const correctAnswer = correctAnswers[`${questionKey}_1`] || correctAnswers[questionKey];
        
        if (Array.isArray(correctAnswer)) {
            // Multiple correct answers (checkboxes)
            question.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                const name = checkbox.name;
                const value = checkbox.value;
                const shouldBeChecked = correctAnswer.includes(value);
                const isChecked = checkbox.checked;
                
                if (name.startsWith(questionKey)) {
                    const choice = checkbox.closest('.choice');
                    if (choice) {
                        if (shouldBeChecked && isChecked) {
                            choice.classList.add('answer-correct');
                        } else if (shouldBeChecked && !isChecked) {
                            choice.classList.add('answer-correct');
                        } else if (!shouldBeChecked && isChecked) {
                            choice.classList.add('answer-incorrect');
                        }
                    }
                }
            });
        } else {
            // Single answer (radio or select)
            const userInput = question.querySelector(`input[name="${questionKey}"]:checked`) || 
                            question.querySelector(`select[name="${questionKey}"]`);
            
            if (userInput) {
                const userValue = userInput.value || userInput.options[userInput.selectedIndex]?.value;
                const isCorrect = userValue === correctAnswer;
                
                if (userInput.type === 'radio') {
                    const label = userInput.closest('.radio-label') || userInput.closest('.choice');
                    if (label) {
                        label.classList.add(isCorrect ? 'answer-correct' : 'answer-incorrect');
                        const feedback = document.createElement('span');
                        feedback.className = `answer-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
                        feedback.textContent = isCorrect ? '✓' : '✗';
                        label.appendChild(feedback);
                    }
                } else if (userInput.tagName === 'SELECT') {
                    userInput.classList.add(isCorrect ? 'answer-correct' : 'answer-incorrect');
                }
                
                // Mark correct answer if wrong (only for radio buttons, not selects)
                if (!isCorrect && userInput.type === 'radio') {
                    try {
                        const correctInput = question.querySelector(`input[name="${questionKey}"][value="${CSS.escape(correctAnswer)}"]`);
                        if (correctInput && correctInput !== userInput) {
                            const correctLabel = correctInput.closest('.radio-label') || correctInput.closest('.choice');
                            if (correctLabel) {
                                correctLabel.classList.add('answer-correct');
                                const correctFeedback = document.createElement('span');
                                correctFeedback.className = 'answer-feedback feedback-correct';
                                correctFeedback.textContent = '✓';
                                correctLabel.appendChild(correctFeedback);
                            }
                        }
                    } catch (e) {
                        console.warn(`Could not mark correct answer for ${questionKey}:`, e);
                    }
                }
            }
        }
    }
}

// Show trainer feedback
function showTrainerFeedback(questionIndex, result = null) {
    console.log('showTrainerFeedback called:', { questionIndex, result });
    
    if (!result) {
        result = checkSingleQuestion(questionIndex);
        console.log('Result from checkSingleQuestion:', result);
    }
    
    if (!result) {
        console.log('No result, returning early');
        return;
    }
    
    console.log('About to display feedback for question:', questionIndex + 1);
    
    // Mark visual feedback on the question
    markQuestionVisualFeedback(questionIndex, result);
    
    const trainerFeedback = document.getElementById('trainerFeedback');
    const trainerFeedbackContent = document.getElementById('trainerFeedbackContent');
    
    // Get the actual question ID from the HTML element instead of calculating from index
    // This fixes the issue where question 33 is missing and causes misalignment
    const questionElement = allQuestions[questionIndex];
    const actualQuestionId = questionElement ? questionElement.id : null;
    const questionKey = actualQuestionId || `q${questionIndex + 1}`;
    const explanation = questionExplanations[questionKey] || questionExplanations.default;
    
    const statusClass = result.correct ? 'correct' : 'incorrect';
    const statusText = result.correct ? '✓ Correct' : '✗ Incorrect';
    const statusMsg = result.correct ? 
        (currentLanguage === 'en' ? 'Great job! You got it right!' : '¡Excelente! ¡Lo hiciste bien!') :
        (currentLanguage === 'en' ? 'Not quite right. Here\'s what went wrong:' : 'No es correcto. Esto es lo que falló:');
    
    // Check if this question has visual feedback (multi-part True/False)
    // Use the actual question key we already calculated above
    const hasVisualFeedback = correctAnswers[`${questionKey}_1`] && correctAnswers[`${questionKey}_2`];
    
    // For questions with visual feedback, don't show any textual feedback
    // The visual feedback (green/red colors and ✓/✗) is sufficient
    const showTextFeedback = !hasVisualFeedback;
    
    let feedbackDetailsHtml = '';
    if (showTextFeedback) {
        // Only show textual feedback for non-visual questions (like dropdowns, single choice)
        feedbackDetailsHtml = `
            <div class="feedback-details">
                <p><strong>${currentLanguage === 'en' ? 'Your answer:' : 'Tu respuesta:'}</strong> ${result.answer}</p>
                <p><strong>${currentLanguage === 'en' ? 'Correct answer:' : 'Respuesta correcta:'}</strong> ${result.correctAnswer}</p>
            </div>
        `;
    }
    // For visual feedback questions: no textual feedback, only visual (colors and symbols)
    
    trainerFeedbackContent.innerHTML = `
        <div class="feedback-status ${statusClass}">
            <h3>${statusText}</h3>
            <p>${statusMsg}</p>
        </div>
        ${feedbackDetailsHtml}
        <div class="feedback-explanation">
            <h4>${currentLanguage === 'en' ? 'Explanation:' : 'Explicación:'}</h4>
            <p>${currentLanguage === 'en' ? explanation.en : explanation.es}</p>
        </div>
        <div class="feedback-continue">
            <button type="button" id="feedbackContinueBtn" class="nav-btn nav-btn-next" style="width: 100%; margin-top: 15px;">
                ${currentLanguage === 'en' ? 'Continue to Next Question →' : 'Continuar a Siguiente Pregunta →'}
            </button>
        </div>
    `;
    
    // Add event listener to continue button
    const continueBtn = trainerFeedbackContent.querySelector('#feedbackContinueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            // Clear visual feedback before navigating
            const question = allQuestions[questionIndex];
            if (question) {
                question.querySelectorAll('.answer-feedback').forEach(el => el.remove());
                question.querySelectorAll('.radio-label, .choice, select').forEach(el => {
                    el.classList.remove('answer-correct', 'answer-incorrect');
                });
            }
            // Force navigation without checking trainer mode again
            navigateQuestion(1, false, true);
        });
    }
    
    console.log('Removing hidden class from trainerFeedback');
    trainerFeedback.classList.remove('hidden');
    console.log('Feedback should now be visible. Hidden?', trainerFeedback.classList.contains('hidden'));
    trainerFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Submit test function
window.submitTest = function() {
    const form = document.getElementById('testForm');
    form.dispatchEvent(new Event('submit'));
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('testForm');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('results-content');
    const retryBtn = document.getElementById('retry-btn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Trainer Mode elements
    const trainerMode = document.getElementById('trainerMode');
    const trainerFeedback = document.getElementById('trainerFeedback');
    const trainerFeedbackContent = document.getElementById('trainerFeedbackContent');
    const toggleLanguage = document.getElementById('toggleLanguage');
    
    // Initial modal elements
    const initialModal = document.getElementById('initialModal');
    const resumeTestBtn = document.getElementById('resumeTestBtn');
    const newTestBtn = document.getElementById('newTestBtn');
    
    // Timer elements
    const timerEnabled = document.getElementById('timerEnabled');
    const timerMinutes = document.getElementById('timerMinutes');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerModal = document.getElementById('timerModal');
    const submitNowBtn = document.getElementById('submitNowBtn');
    const continueBtn = document.getElementById('continueBtn');
    
    let timerInterval = null;
    let timeRemaining = 0;
    let timerActive = false;
    
    // Initialize question navigation
    allQuestions = Array.from(form.querySelectorAll('.question'));
    
    // Check for saved progress FIRST - before initializing question visibility
    const savedData = loadProgress();
    console.log('Loaded progress at init:', savedData);
    console.log('Answers found:', savedData ? Object.keys(savedData.answers || {}).length : 0);
    console.log('Current question index:', savedData ? savedData.currentQuestionIndex : 'none');
    
    // Add navigation buttons and data-question-num to all questions
    allQuestions.forEach((question, index) => {
        const questionNum = index + 1;
        question.setAttribute('data-question-num', questionNum);
        
        // Only initialize visibility if NO saved progress (will be handled by resume if exists)
        // If saved progress exists, we'll restore visibility when resuming
        if (!savedData || !savedData.answers || Object.keys(savedData.answers).length === 0) {
            // Hide all questions except first
            if (index !== 0) {
                question.classList.remove('question-active');
                question.style.display = 'none';
            } else {
                question.classList.add('question-active');
                question.style.display = 'block';
            }
        } else {
            // If saved progress exists, hide all questions initially (will be restored on resume)
            question.classList.remove('question-active');
            question.style.display = 'none';
        }
        
        // Check if navigation buttons already exist
        if (!question.querySelector('.question-navigation')) {
            const navDiv = document.createElement('div');
            navDiv.className = 'question-navigation';
            
            const isFirst = index === 0;
            const isLast = index === allQuestions.length - 1;
            
            // Create Back button
            const backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'nav-btn nav-btn-back';
            backBtn.textContent = '← Back';
            backBtn.disabled = isFirst;
            backBtn.addEventListener('click', () => navigateQuestion(-1));
            navDiv.appendChild(backBtn);
            
            // Create Skip button
            const skipBtn = document.createElement('button');
            skipBtn.type = 'button';
            skipBtn.className = 'nav-btn nav-btn-skip';
            skipBtn.textContent = 'Skip';
            skipBtn.addEventListener('click', () => navigateQuestion(1, true));
            navDiv.appendChild(skipBtn);
            
            // Create Next or Submit button
            if (isLast) {
                const submitBtn = document.createElement('button');
                submitBtn.type = 'button';
                submitBtn.className = 'nav-btn nav-btn-submit';
                submitBtn.textContent = 'Submit Test';
                submitBtn.addEventListener('click', () => submitTest());
                navDiv.appendChild(submitBtn);
            } else {
                const nextBtn = document.createElement('button');
                nextBtn.type = 'button';
                nextBtn.className = 'nav-btn nav-btn-next';
                nextBtn.textContent = 'Next →';
                nextBtn.addEventListener('click', () => navigateQuestion(1));
                navDiv.appendChild(nextBtn);
            }
            
            question.appendChild(navDiv);
        }
    });
    
    // Trainer Mode toggle
    trainerMode.addEventListener('change', function() {
        trainerModeActive = this.checked;
        console.log('Trainer Mode toggled:', trainerModeActive);
        if (!trainerModeActive) {
            trainerFeedback.classList.add('hidden');
        }
    });
    
    // Language toggle
    toggleLanguage.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        this.textContent = currentLanguage === 'en' ? 'Read in Spanish' : 'Leer en Inglés';
        // Update current feedback if visible
        if (!trainerFeedback.classList.contains('hidden')) {
            showTrainerFeedback(currentQuestionIndex);
        }
    });

    // Show modal if we have saved progress (answers OR currentQuestionIndex > 0)
    // savedData was already loaded above, before initializing question visibility
    // This way even if no answers yet, if user was on question 5, we can resume
    if (savedData && (
        (savedData.answers && Object.keys(savedData.answers).length > 0) || 
        (savedData.currentQuestionIndex !== undefined && savedData.currentQuestionIndex > 0)
    )) {
        console.log('Showing resume modal - progress found');
        initialModal.classList.remove('hidden');
    } else {
        console.log('No saved progress, hiding modal and starting fresh');
        initialModal.classList.add('hidden');
        // First question is already visible from initialization above
        currentQuestionIndex = 0;
        updateNavigationButtons();
    }

    // Resume test
    resumeTestBtn.addEventListener('click', function() {
        console.log('Resume button clicked');
        // Reload saved data in case it changed
        const currentSavedData = loadProgress();
        console.log('Reloaded data for resume:', currentSavedData);
        
        // Ensure allQuestions is initialized
        if (!allQuestions || allQuestions.length === 0) {
            allQuestions = Array.from(form.querySelectorAll('.question'));
            console.log('Initialized allQuestions for resume:', allQuestions.length);
        }
        
        // Hide modal immediately to prevent user confusion
        initialModal.classList.add('hidden');
        
        if (currentSavedData && (currentSavedData.answers || (currentSavedData.currentQuestionIndex !== undefined && currentSavedData.currentQuestionIndex > 0))) {
            // First, randomize questions BEFORE restoring answers
            randomizeQuestions();
            
            // Wait a bit for DOM to update, then restore answers
            setTimeout(() => {
                // Re-initialize allQuestions after randomization (may have changed DOM)
                allQuestions = Array.from(form.querySelectorAll('.question'));
                console.log('Re-initialized allQuestions after randomization:', allQuestions.length);
                
                // First, ensure ALL questions are hidden
                allQuestions.forEach((q) => {
                    q.classList.remove('question-active');
                    q.style.display = 'none';
                });
                // Restore answers first (if any exist)
                if (currentSavedData.answers && Object.keys(currentSavedData.answers).length > 0) {
                    Object.keys(currentSavedData.answers).forEach(name => {
                        const value = currentSavedData.answers[name];
                        if (Array.isArray(value)) {
                            // Checkbox values
                            value.forEach(val => {
                                // For checkboxes, we can safely use querySelector with value
                                try {
                                    const input = form.querySelector(`input[name="${name}"][value="${CSS.escape(val)}"]`);
                                    if (input) input.checked = true;
                                } catch (e) {
                                    console.warn(`Could not restore checkbox ${name}="${val}":`, e);
                                }
                            });
                        } else {
                            // Check if this is likely a select (has special characters like parentheses, quotes)
                            // For selects, find by name and set value directly (safer for special characters)
                            const selectInput = form.querySelector(`select[name="${name}"]`);
                            if (selectInput) {
                                // This is a select - set value directly (handles special characters safely)
                                selectInput.value = value;
                                console.log(`Restored select: ${name} = ${value}`);
                            } else {
                                // Try radio button - use querySelector with escaped value
                                try {
                                    const radioInput = form.querySelector(`input[name="${name}"][value="${CSS.escape(value)}"]`);
                                    if (radioInput) {
                                        radioInput.checked = true;
                                        console.log(`Restored radio: ${name} = ${value}`);
                                    } else {
                                        console.warn(`Could not find element to restore ${name} = ${value}`);
                                    }
                                } catch (e) {
                                    console.warn(`Error restoring ${name} = ${value}:`, e);
                                }
                            }
                        }
                    });
                } else {
                    console.log('No answers to restore, just restoring question index');
                }
                
                // Restore current question index - MUST be done after restoring answers
                if (currentSavedData.currentQuestionIndex !== undefined) {
                    const savedIndex = currentSavedData.currentQuestionIndex;
                    
                    console.log(`Attempting to restore to question ${savedIndex}, allQuestions length: ${allQuestions.length}`);
                    
                    // Validate index
                    if (savedIndex >= 0 && savedIndex < allQuestions.length) {
                        // Hide ALL questions first
                        allQuestions.forEach((q) => {
                            q.classList.remove('question-active');
                            q.style.display = 'none';
                        });
                        
                        // Set global index BEFORE showing question
                        currentQuestionIndex = savedIndex;
                        
                        // Show saved question
                        if (allQuestions[currentQuestionIndex]) {
                            allQuestions[currentQuestionIndex].classList.add('question-active');
                            allQuestions[currentQuestionIndex].style.display = 'block';
                            console.log(`✅ Successfully restored to question ${currentQuestionIndex}`);
                        } else {
                            console.error(`❌ Question ${currentQuestionIndex} not found in allQuestions!`);
                        }
                        
                        updateNavigationButtons();
                    } else {
                        console.warn(`Invalid saved index ${savedIndex}, going to first question`);
                        // Invalid index, go to first question
                        currentQuestionIndex = 0;
                        if (allQuestions[0]) {
                            allQuestions[0].classList.add('question-active');
                            allQuestions[0].style.display = 'block';
                        }
                        updateNavigationButtons();
                    }
                } else {
                    console.log('No saved index, going to first question');
                    // No saved index, start at first question
                    currentQuestionIndex = 0;
                    if (allQuestions[0]) {
                        allQuestions[0].classList.add('question-active');
                        allQuestions[0].style.display = 'block';
                    }
                    updateNavigationButtons();
                }
                
                // Update progress and save again to ensure consistency
                updateProgress();
                saveProgress();
                
                console.log('Resume complete - current question:', currentQuestionIndex);
                
                // Scroll to top to show the restored question
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 150);
        } else {
            console.log('No valid saved data found for resume');
            // If no saved data, still show first question
            if (!allQuestions || allQuestions.length === 0) {
                allQuestions = Array.from(form.querySelectorAll('.question'));
            }
            // Hide all questions first
            allQuestions.forEach((q) => {
                q.classList.remove('question-active');
                q.style.display = 'none';
            });
            // Show first question
            currentQuestionIndex = 0;
            if (allQuestions[0]) {
                allQuestions[0].classList.add('question-active');
                allQuestions[0].style.display = 'block';
            }
            updateNavigationButtons();
        }
    });

    // New test
    newTestBtn.addEventListener('click', function() {
        clearProgress();
        form.reset();
        currentQuestionIndex = 0;
        
        // Reset to first question
        allQuestions.forEach((q, idx) => {
            if (idx !== 0) {
                q.classList.remove('question-active');
                q.style.display = 'none';
            } else {
                q.classList.add('question-active');
                q.style.display = 'block';
            }
        });
        
        updateNavigationButtons();
        updateProgress();
        initialModal.classList.add('hidden');
        randomizeQuestions();
    });
    
    // Statistics button
    const statisticsBtn = document.getElementById('statisticsBtn');
    if (statisticsBtn) {
        statisticsBtn.addEventListener('click', function() {
            displayStatisticsPanel();
        });
    }
    
    // Practice mode button
    const practiceModeBtn = document.getElementById('practiceModeBtn');
    if (practiceModeBtn) {
        practiceModeBtn.addEventListener('click', function() {
            const stats = getStatistics();
            const failedQuestions = getFailedQuestions(0.3);
            
            if (failedQuestions.length === 0) {
                alert('Aún no hay estadísticas suficientes. Completa el examen al menos una vez para activar el modo de práctica.');
                return;
            }
            
            // Show menu for practice mode
            const mode = confirm(`¿Practicar solo preguntas problemáticas?\n\nHaz clic en "Aceptar" para practicar ${failedQuestions.length} preguntas que has fallado.\nHaz clic en "Cancelar" para volver al modo normal.`) 
                ? 'failed' 
                : 'all';
            
            setPracticeMode(mode);
            
            // Reset form for new practice session
            if (mode === 'failed') {
                form.reset();
                randomizeQuestions();
            }
        });
    }
    
    // Make functions globally accessible for onclick handlers
    window.displayStatisticsPanel = displayStatisticsPanel;
    window.closeStatistics = closeStatistics;
    window.clearStatistics = clearStatistics;
    
    // Restart Test button
    const restartTestBtn = document.getElementById('restartTestBtn');
    if (restartTestBtn) {
        restartTestBtn.addEventListener('click', function() {
            if (confirm(currentLanguage === 'en' ? 'Are you sure you want to restart the test? All progress will be lost.' : '¿Estás seguro de que quieres reiniciar el test? Todo el progreso se perderá.')) {
                clearProgress();
                form.reset();
                currentQuestionIndex = 0;
                
                // Reset to first question
                allQuestions.forEach((q, idx) => {
                    if (idx !== 0) {
                        q.classList.remove('question-active');
                        q.style.display = 'none';
                    } else {
                        q.classList.add('question-active');
                        q.style.display = 'block';
                    }
                });
                
                // Hide feedback
                trainerFeedback.classList.add('hidden');
                
                updateNavigationButtons();
                updateProgress();
                randomizeQuestions();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Randomize questions on load (but NOT if resuming - will randomize after restore)
    // Only randomize if there's NO saved progress
    if (!savedData || !savedData.answers || Object.keys(savedData.answers).length === 0) {
        console.log('No saved progress - randomizing questions');
        randomizeQuestions();
    } else {
        console.log('Saved progress exists - skipping initial randomization');
    }
    
    // Update progress on any input change
    form.addEventListener('change', updateProgress);
    form.addEventListener('input', updateProgress);
    
    // Initial progress update - only if NOT resuming
    if (!savedData || !savedData.answers || Object.keys(savedData.answers).length === 0) {
        setTimeout(updateProgress, 100);
    }

    // Dark mode toggle
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('.toggle-icon').textContent = '☀️';
        darkModeToggle.querySelector('.toggle-text').textContent = 'Light Mode';
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        if (isDark) {
            darkModeToggle.querySelector('.toggle-icon').textContent = '☀️';
            darkModeToggle.querySelector('.toggle-text').textContent = 'Light Mode';
        } else {
            darkModeToggle.querySelector('.toggle-icon').textContent = '🌙';
            darkModeToggle.querySelector('.toggle-text').textContent = 'Dark Mode';
        }
    });

    // Timer functions
    function updateTimerDisplay(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        // Add warning/danger classes
        timerDisplay.classList.remove('warning', 'danger');
        if (seconds <= 300) { // 5 minutes
            timerDisplay.classList.add('danger');
        } else if (seconds <= 600) { // 10 minutes
            timerDisplay.classList.add('warning');
        }
    }

    function startTimer(minutes) {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        timeRemaining = minutes * 60;
        timerActive = true;
        updateTimerDisplay(timeRemaining);
        
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay(timeRemaining);
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerActive = false;
                timerDisplay.textContent = '00:00';
                showTimerModal();
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timerActive = false;
        timerDisplay.textContent = '00:00';
        timerDisplay.classList.remove('warning', 'danger');
    }

    function showTimerModal() {
        timerModal.classList.remove('hidden');
    }

    function hideTimerModal() {
        timerModal.classList.add('hidden');
    }

    // Timer checkbox toggle
    timerEnabled.addEventListener('change', function() {
        if (this.checked) {
            const minutes = parseInt(timerMinutes.value) || 60;
            timerMinutes.disabled = false;
            startTimer(minutes);
        } else {
            timerMinutes.disabled = true;
            stopTimer();
        }
    });

    // Disable timer input when unchecked
    if (!timerEnabled.checked) {
        timerMinutes.disabled = true;
    }

    // Modal button handlers
    submitNowBtn.addEventListener('click', function() {
        hideTimerModal();
        stopTimer();
        form.dispatchEvent(new Event('submit'));
    });

    continueBtn.addEventListener('click', function() {
        hideTimerModal();
        stopTimer();
        timerEnabled.checked = false;
        timerMinutes.disabled = true;
    });

        form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check for unanswered questions
        const totalQuestions = 38;
        const answeredQuestions = new Set();
        
        // Count radio buttons
        form.querySelectorAll('input[type="radio"]:checked').forEach(input => {
            const name = input.name.split('_')[0];
            answeredQuestions.add(name);
        });
        
        // Count checkboxes
        form.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
            const name = input.name.split('_')[0];
            answeredQuestions.add(name);
        });
        
        // Count selects - only if they have a valid value
        form.querySelectorAll('select').forEach(select => {
            if (select.value && select.value !== '' && 
                select.value !== '--- Select ---' && 
                select.value !== '---' &&
                select.value !== '--- Select Option ---') {
                const name = select.name.split('_')[0];
                answeredQuestions.add(name);
            }
        });
        
        const unansweredCount = totalQuestions - answeredQuestions.size;
        
        // Show warning if unanswered questions
        if (unansweredCount > 0) {
            if (!confirm(`You have ${unansweredCount} unanswered question(s). They will be marked as incorrect automatically. Do you want to continue?`)) {
                return;
            }
        }
        
        // Stop timer if active
        if (timerActive) {
            stopTimer();
        }
        
        // Clear saved progress after submission (already disabled, but ensure it's cleared)
        clearProgress();
        
        const results = checkAnswers();
        
        // Save statistics
        saveAttemptStatistics(results);
        
        displayResults(results);
        
        // Hide form, show results
        form.style.display = 'none';
        resultsDiv.classList.remove('hidden');
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    });

    retryBtn.addEventListener('click', function() {
        // Reset form
        form.reset();
        
        // Stop and reset timer
        stopTimer();
        timerEnabled.checked = false;
        timerMinutes.disabled = true;
        timerMinutes.value = 60;
        
        // Hide results, show form
        resultsDiv.classList.add('hidden');
        form.style.display = 'block';
        
        // Randomize questions again
        randomizeQuestions();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.checkAnswers = function() {
        const form = document.getElementById('testForm');
        if (!form) {
            return { results: [], correctCount: 0, totalQuestions: 0, totalPoints: 0, maxPoints: 0, score: 0 };
        }
        
        const results = [];
        let correctCount = 0;
        let totalQuestions = 0;

        // Question 1: True/False (3 parts, partial credit)
        totalQuestions++;
        // Directly query for checked inputs - most reliable method
        const q1_1_checked = form.querySelector('input[name="q1_1"]:checked');
        const q1_2_checked = form.querySelector('input[name="q1_2"]:checked');
        const q1_3_checked = form.querySelector('input[name="q1_3"]:checked');
        
        const q1_1 = q1_1_checked ? q1_1_checked.value : null;
        const q1_2 = q1_2_checked ? q1_2_checked.value : null;
        const q1_3 = q1_3_checked ? q1_3_checked.value : null;
        
        const q1_1_correct = q1_1 === correctAnswers.q1_1;
        const q1_2_correct = q1_2 === correctAnswers.q1_2;
        const q1_3_correct = q1_3 === correctAnswers.q1_3;
        
        const q1_score = (q1_1_correct ? 1 : 0) + (q1_2_correct ? 1 : 0) + (q1_3_correct ? 1 : 0);
        const q1_points = (q1_score / 3) * 1000; // Points out of 1000
        const q1_perfect = q1_score === 3;
        
        results.push({
            questionNum: 1,
            questionText: questionTexts.q1,
            correct: q1_perfect,
            partialScore: q1_score,
            totalParts: 3,
            points: Math.round(q1_points),
            maxPoints: 1000,
            answer: `Part A: ${q1_1 || 'No answer'}, Part B: ${q1_2 || 'No answer'}, Part C: ${q1_3 || 'No answer'}`,
            correctAnswer: `Part A: ${correctAnswers.q1_1}, Part B: ${correctAnswers.q1_2}, Part C: ${correctAnswers.q1_3}`
        });
        
        // Add points to total (for partial credit, add proportional points)
        if (q1_perfect) {
            correctCount++;
        }

        // Question 2: Multiple choice
        totalQuestions++;
        const q2 = form.querySelector('input[name="q2"]:checked')?.value;
        const q2_correct = q2 === correctAnswers.q2;
        
        results.push({
            questionNum: 2,
            questionText: questionTexts.q2,
            correct: q2_correct,
            points: q2_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q2 || 'No answer',
            correctAnswer: correctAnswers.q2
        });
        
        if (q2_correct) correctCount++;

        // Question 3: Fill-in-the-blank (3 parts)
        totalQuestions++;
        const q3_1 = form.querySelector('select[name="q3_1"]').value;
        const q3_2 = form.querySelector('select[name="q3_2"]').value;
        const q3_3 = form.querySelector('select[name="q3_3"]').value;
        
        const q3_correct = q3_1 === correctAnswers.q3_1 && 
                          q3_2 === correctAnswers.q3_2 && 
                          q3_3 === correctAnswers.q3_3;
        
        const q3_parts = (q3_1 === correctAnswers.q3_1 ? 1 : 0) + 
                         (q3_2 === correctAnswers.q3_2 ? 1 : 0) + 
                         (q3_3 === correctAnswers.q3_3 ? 1 : 0);
        const q3_points = (q3_parts / 3) * 1000;
        
        results.push({
            questionNum: 3,
            questionText: questionTexts.q3,
            correct: q3_correct,
            partialScore: q3_parts,
            totalParts: 3,
            points: Math.round(q3_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q3_1 || 'empty'}, Blank 2: ${q3_2 || 'empty'}, Blank 3: ${q3_3 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q3_1}, Blank 2: ${correctAnswers.q3_2}, Blank 3: ${correctAnswers.q3_3}`
        });
        
        if (q3_correct) correctCount++;

        // Question 4: Multiple choice
        totalQuestions++;
        const q4 = form.querySelector('input[name="q4"]:checked')?.value;
        const q4_correct = q4 === correctAnswers.q4;
        
        results.push({
            questionNum: 4,
            questionText: questionTexts.q4,
            correct: q4_correct,
            points: q4_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q4 || 'No answer',
            correctAnswer: correctAnswers.q4
        });
        
        if (q4_correct) correctCount++;

        // Question 5: Fill-in-the-blank (3 parts)
        totalQuestions++;
        const q5_1 = form.querySelector('select[name="q5_1"]').value;
        const q5_2 = form.querySelector('select[name="q5_2"]').value;
        const q5_3 = form.querySelector('select[name="q5_3"]').value;
        
        const q5_correct = q5_1 === correctAnswers.q5_1 && 
                          q5_2 === correctAnswers.q5_2 && 
                          q5_3 === correctAnswers.q5_3;
        const q5_parts = (q5_1 === correctAnswers.q5_1 ? 1 : 0) + 
                         (q5_2 === correctAnswers.q5_2 ? 1 : 0) + 
                         (q5_3 === correctAnswers.q5_3 ? 1 : 0);
        const q5_points = (q5_parts / 3) * 1000;
        
        results.push({
            questionNum: 5,
            questionText: questionTexts.q5,
            correct: q5_correct,
            partialScore: q5_parts,
            totalParts: 3,
            points: Math.round(q5_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q5_1 || 'empty'}, Blank 2: ${q5_2 || 'empty'}, Blank 3: ${q5_3 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q5_1}, Blank 2: ${correctAnswers.q5_2}, Blank 3: ${correctAnswers.q5_3}`
        });
        
        if (q5_correct) correctCount++;

        // Question 6: Multiple choice
        totalQuestions++;
        const q6 = form.querySelector('input[name="q6"]:checked')?.value;
        const q6_correct = q6 === correctAnswers.q6;
        
        results.push({
            questionNum: 6,
            questionText: questionTexts.q6,
            correct: q6_correct,
            points: q6_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q6 || 'No answer',
            correctAnswer: correctAnswers.q6
        });
        
        if (q6_correct) correctCount++;

        // Question 7: Multiple choice
        totalQuestions++;
        const q7 = form.querySelector('input[name="q7"]:checked')?.value;
        const q7_correct = q7 === correctAnswers.q7;
        
        results.push({
            questionNum: 7,
            questionText: questionTexts.q7,
            correct: q7_correct,
            points: q7_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q7 || 'No answer',
            correctAnswer: correctAnswers.q7
        });
        
        if (q7_correct) correctCount++;

        // Question 8: True/False (3 parts, partial credit)
        totalQuestions++;
        const q8_1 = form.querySelector('input[name="q8_1"]:checked')?.value;
        const q8_2 = form.querySelector('input[name="q8_2"]:checked')?.value;
        const q8_3 = form.querySelector('input[name="q8_3"]:checked')?.value;
        
        const q8_1_correct = q8_1 === correctAnswers.q8_1;
        const q8_2_correct = q8_2 === correctAnswers.q8_2;
        const q8_3_correct = q8_3 === correctAnswers.q8_3;
        
        const q8_score = (q8_1_correct ? 1 : 0) + (q8_2_correct ? 1 : 0) + (q8_3_correct ? 1 : 0);
        const q8_perfect = q8_score === 3;
        const q8_points = (q8_score / 3) * 1000;
        
        results.push({
            questionNum: 8,
            questionText: questionTexts.q8,
            correct: q8_perfect,
            partialScore: q8_score,
            totalParts: 3,
            points: Math.round(q8_points),
            maxPoints: 1000,
            answer: `A: ${q8_1 || 'No answer'}, B: ${q8_2 || 'No answer'}, C: ${q8_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q8_1}, B: ${correctAnswers.q8_2}, C: ${correctAnswers.q8_3}`
        });
        
        if (q8_perfect) correctCount++;

        // Question 9: Code snippet ordering (4 parts)
        totalQuestions++;
        const q9_1 = form.querySelector('select[name="q9_1"]').value;
        const q9_2 = form.querySelector('select[name="q9_2"]').value;
        const q9_3 = form.querySelector('select[name="q9_3"]').value;
        const q9_4 = form.querySelector('select[name="q9_4"]').value;
        
        const q9_correct = q9_1 === correctAnswers.q9_1 && 
                          q9_2 === correctAnswers.q9_2 && 
                          q9_3 === correctAnswers.q9_3 &&
                          q9_4 === correctAnswers.q9_4;
        const q9_parts = (q9_1 === correctAnswers.q9_1 ? 1 : 0) + 
                         (q9_2 === correctAnswers.q9_2 ? 1 : 0) + 
                         (q9_3 === correctAnswers.q9_3 ? 1 : 0) + 
                         (q9_4 === correctAnswers.q9_4 ? 1 : 0);
        const q9_points = (q9_parts / 4) * 1000;
        
        results.push({
            questionNum: 9,
            questionText: questionTexts.q9,
            correct: q9_correct,
            partialScore: q9_parts,
            totalParts: 4,
            points: Math.round(q9_points),
            maxPoints: 1000,
            answer: `Pos 1: ${q9_1 || 'empty'}, Pos 2: ${q9_2 || 'empty'}, Pos 3: ${q9_3 || 'empty'}, Pos 4: ${q9_4 || 'empty'}`,
            correctAnswer: `Pos 1: ${correctAnswers.q9_1}, Pos 2: ${correctAnswers.q9_2}, Pos 3: ${correctAnswers.q9_3}, Pos 4: ${correctAnswers.q9_4}`
        });
        
        if (q9_correct) correctCount++;

        // Question 10: Fill-in-the-blank
        totalQuestions++;
        const q10 = form.querySelector('select[name="q10"]').value;
        const q10_correct = q10 === correctAnswers.q10;
        
        results.push({
            questionNum: 10,
            questionText: questionTexts.q10,
            correct: q10_correct,
            points: q10_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q10 || 'No answer',
            correctAnswer: correctAnswers.q10
        });
        
        if (q10_correct) correctCount++;

        // Question 11: Matching (4 parts, partial credit)
        totalQuestions++;
        const q11_1 = form.querySelector('select[name="q11_1"]').value;
        const q11_2 = form.querySelector('select[name="q11_2"]').value;
        const q11_3 = form.querySelector('select[name="q11_3"]').value;
        const q11_4 = form.querySelector('select[name="q11_4"]').value;
        
        const q11_1_correct = q11_1 === correctAnswers.q11_1;
        const q11_2_correct = q11_2 === correctAnswers.q11_2;
        const q11_3_correct = q11_3 === correctAnswers.q11_3;
        const q11_4_correct = q11_4 === correctAnswers.q11_4;
        
        const q11_score = (q11_1_correct ? 1 : 0) + (q11_2_correct ? 1 : 0) + (q11_3_correct ? 1 : 0) + (q11_4_correct ? 1 : 0);
        const q11_perfect = q11_score === 4;
        const q11_points = (q11_score / 4) * 1000;
        
        results.push({
            questionNum: 11,
            questionText: questionTexts.q11,
            correct: q11_perfect,
            partialScore: q11_score,
            totalParts: 4,
            points: Math.round(q11_points),
            maxPoints: 1000,
            answer: `Match 1: ${q11_1 || 'empty'}, Match 2: ${q11_2 || 'empty'}, Match 3: ${q11_3 || 'empty'}, Match 4: ${q11_4 || 'empty'}`,
            correctAnswer: `Match 1: ${correctAnswers.q11_1}, Match 2: ${correctAnswers.q11_2}, Match 3: ${correctAnswers.q11_3}, Match 4: ${correctAnswers.q11_4}`
        });
        
        if (q11_perfect) correctCount++;

        // Question 12: Animator SetBool (2 parts)
        totalQuestions++;
        const q12_1 = form.querySelector('select[name="q12_1"]').value;
        const q12_2 = form.querySelector('select[name="q12_2"]').value;
        
        const q12_correct = q12_1 === correctAnswers.q12_1 && 
                           q12_2 === correctAnswers.q12_2;
        const q12_parts = (q12_1 === correctAnswers.q12_1 ? 1 : 0) + 
                         (q12_2 === correctAnswers.q12_2 ? 1 : 0);
        const q12_points = (q12_parts / 2) * 1000;
        
        results.push({
            questionNum: 12,
            questionText: questionTexts.q12,
            correct: q12_correct,
            partialScore: q12_parts,
            totalParts: 2,
            points: Math.round(q12_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q12_1 || 'empty'}, Blank 2: ${q12_2 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q12_1}, Blank 2: ${correctAnswers.q12_2}`
        });
        
        if (q12_correct) correctCount++;

        // Question 13: ECS True/False (3 parts, partial credit)
        totalQuestions++;
        const q13_1 = form.querySelector('input[name="q13_1"]:checked')?.value;
        const q13_2 = form.querySelector('input[name="q13_2"]:checked')?.value;
        const q13_3 = form.querySelector('input[name="q13_3"]:checked')?.value;
        
        const q13_1_correct = q13_1 === correctAnswers.q13_1;
        const q13_2_correct = q13_2 === correctAnswers.q13_2;
        const q13_3_correct = q13_3 === correctAnswers.q13_3;
        
        const q13_score = (q13_1_correct ? 1 : 0) + (q13_2_correct ? 1 : 0) + (q13_3_correct ? 1 : 0);
        const q13_perfect = q13_score === 3;
        const q13_points = (q13_score / 3) * 1000;
        
        results.push({
            questionNum: 13,
            questionText: questionTexts.q13,
            correct: q13_perfect,
            partialScore: q13_score,
            totalParts: 3,
            points: Math.round(q13_points),
            maxPoints: 1000,
            answer: `A: ${q13_1 || 'No answer'}, B: ${q13_2 || 'No answer'}, C: ${q13_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q13_1}, B: ${correctAnswers.q13_2}, C: ${correctAnswers.q13_3}`
        });
        
        if (q13_perfect) correctCount++;

        // Question 14: Material.SetColor (2 parts)
        totalQuestions++;
        const q14_1 = form.querySelector('select[name="q14_1"]').value;
        const q14_2 = form.querySelector('select[name="q14_2"]').value;
        
        const q14_correct = q14_1 === correctAnswers.q14_1 && 
                           q14_2 === correctAnswers.q14_2;
        const q14_parts = (q14_1 === correctAnswers.q14_1 ? 1 : 0) + 
                         (q14_2 === correctAnswers.q14_2 ? 1 : 0);
        const q14_points = (q14_parts / 2) * 1000;
        
        results.push({
            questionNum: 14,
            questionText: questionTexts.q14,
            correct: q14_correct,
            partialScore: q14_parts,
            totalParts: 2,
            points: Math.round(q14_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q14_1 || 'empty'}, Blank 2: ${q14_2 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q14_1}, Blank 2: ${correctAnswers.q14_2}`
        });
        
        if (q14_correct) correctCount++;

        // Question 15: Input methods (3 parts, partial credit)
        totalQuestions++;
        const q15_1 = form.querySelector('select[name="q15_1"]').value;
        const q15_2 = form.querySelector('select[name="q15_2"]').value;
        const q15_3 = form.querySelector('select[name="q15_3"]').value;
        
        const q15_1_correct = q15_1 === correctAnswers.q15_1;
        const q15_2_correct = q15_2 === correctAnswers.q15_2;
        const q15_3_correct = q15_3 === correctAnswers.q15_3;
        
        const q15_score = (q15_1_correct ? 1 : 0) + (q15_2_correct ? 1 : 0) + (q15_3_correct ? 1 : 0);
        const q15_perfect = q15_score === 3;
        const q15_points = (q15_score / 3) * 1000;
        
        results.push({
            questionNum: 15,
            questionText: questionTexts.q15,
            correct: q15_perfect,
            partialScore: q15_score,
            totalParts: 3,
            points: Math.round(q15_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q15_1 || 'empty'}, Blank 2: ${q15_2 || 'empty'}, Blank 3: ${q15_3 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q15_1}, Blank 2: ${correctAnswers.q15_2}, Blank 3: ${correctAnswers.q15_3}`
        });
        
        if (q15_perfect) correctCount++;

        // Question 16: Multiple choice with 2 answers (checkboxes)
        totalQuestions++;
        const q16_checkboxes = Array.from(form.querySelectorAll('input[name="q16"]:checked')).map(cb => cb.value);
        const q16_selected = q16_checkboxes.sort().join(',');
        const q16_expected = correctAnswers.q16.sort().join(',');
        const q16_correct = q16_selected === q16_expected && q16_checkboxes.length === correctAnswers.q16.length;
        
        results.push({
            questionNum: 16,
            questionText: questionTexts.q16,
            correct: q16_correct,
            points: q16_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q16_selected || 'No selections',
            correctAnswer: q16_expected
        });
        
        if (q16_correct) correctCount++;

        // Question 17: Transform.Translate
        totalQuestions++;
        const q17 = form.querySelector('select[name="q17"]').value;
        const q17_correct = q17 === correctAnswers.q17;
        
        results.push({
            questionNum: 17,
            questionText: questionTexts.q17,
            correct: q17_correct,
            points: q17_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q17 || 'No answer',
            correctAnswer: correctAnswers.q17
        });
        
        if (q17_correct) correctCount++;

        // Question 18: Animator matching (4 parts, partial credit)
        totalQuestions++;
        const q18_1 = form.querySelector('select[name="q18_1"]').value;
        const q18_2 = form.querySelector('select[name="q18_2"]').value;
        const q18_3 = form.querySelector('select[name="q18_3"]').value;
        const q18_4 = form.querySelector('select[name="q18_4"]').value;
        
        const q18_1_correct = q18_1 === correctAnswers.q18_1;
        const q18_2_correct = q18_2 === correctAnswers.q18_2;
        const q18_3_correct = q18_3 === correctAnswers.q18_3;
        const q18_4_correct = q18_4 === correctAnswers.q18_4;
        
        const q18_score = (q18_1_correct ? 1 : 0) + (q18_2_correct ? 1 : 0) + (q18_3_correct ? 1 : 0) + (q18_4_correct ? 1 : 0);
        const q18_perfect = q18_score === 4;
        const q18_points = (q18_score / 4) * 1000;
        
        results.push({
            questionNum: 18,
            questionText: questionTexts.q18,
            correct: q18_perfect,
            partialScore: q18_score,
            totalParts: 4,
            points: Math.round(q18_points),
            maxPoints: 1000,
            answer: `Match 1: ${q18_1 || 'empty'}, Match 2: ${q18_2 || 'empty'}, Match 3: ${q18_3 || 'empty'}, Match 4: ${q18_4 || 'empty'}`,
            correctAnswer: `Match 1: ${correctAnswers.q18_1}, Match 2: ${correctAnswers.q18_2}, Match 3: ${correctAnswers.q18_3}, Match 4: ${correctAnswers.q18_4}`
        });
        
        if (q18_perfect) correctCount++;

        // Question 19: Start/OnTriggerEnter (2 parts)
        totalQuestions++;
        const q19_1 = form.querySelector('select[name="q19_1"]').value;
        const q19_2 = form.querySelector('select[name="q19_2"]').value;
        
        const q19_correct = q19_1 === correctAnswers.q19_1 && 
                           q19_2 === correctAnswers.q19_2;
        const q19_parts = (q19_1 === correctAnswers.q19_1 ? 1 : 0) + 
                         (q19_2 === correctAnswers.q19_2 ? 1 : 0);
        const q19_points = (q19_parts / 2) * 1000;
        
        results.push({
            questionNum: 19,
            questionText: questionTexts.q19,
            correct: q19_correct,
            partialScore: q19_parts,
            totalParts: 2,
            points: Math.round(q19_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q19_1 || 'empty'}, Blank 2: ${q19_2 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q19_1}, Blank 2: ${correctAnswers.q19_2}`
        });
        
        if (q19_correct) correctCount++;

        // Question 20: Method declaration (3 parts)
        totalQuestions++;
        const q20_1 = form.querySelector('select[name="q20_1"]').value;
        const q20_2 = form.querySelector('select[name="q20_2"]').value;
        const q20_3 = form.querySelector('select[name="q20_3"]').value;
        
        const q20_correct = q20_1 === correctAnswers.q20_1 && 
                           q20_2 === correctAnswers.q20_2 && 
                           q20_3 === correctAnswers.q20_3;
        const q20_parts = (q20_1 === correctAnswers.q20_1 ? 1 : 0) + 
                         (q20_2 === correctAnswers.q20_2 ? 1 : 0) + 
                         (q20_3 === correctAnswers.q20_3 ? 1 : 0);
        const q20_points = (q20_parts / 3) * 1000;
        
        results.push({
            questionNum: 20,
            questionText: questionTexts.q20,
            correct: q20_correct,
            partialScore: q20_parts,
            totalParts: 3,
            points: Math.round(q20_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q20_1 || 'empty'}, Blank 2: ${q20_2 || 'empty'}, Blank 3: ${q20_3 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q20_1}, Blank 2: ${correctAnswers.q20_2}, Blank 3: ${correctAnswers.q20_3}`
        });
        
        if (q20_correct) correctCount++;

        // Question 21: Operators matching (5 parts, partial credit)
        totalQuestions++;
        const q21_1 = form.querySelector('select[name="q21_1"]').value;
        const q21_2 = form.querySelector('select[name="q21_2"]').value;
        const q21_3 = form.querySelector('select[name="q21_3"]').value;
        const q21_4 = form.querySelector('select[name="q21_4"]').value;
        const q21_5 = form.querySelector('select[name="q21_5"]').value;
        
        const q21_1_correct = q21_1 === correctAnswers.q21_1;
        const q21_2_correct = q21_2 === correctAnswers.q21_2;
        const q21_3_correct = q21_3 === correctAnswers.q21_3;
        const q21_4_correct = q21_4 === correctAnswers.q21_4;
        const q21_5_correct = q21_5 === correctAnswers.q21_5;
        
        const q21_score = (q21_1_correct ? 1 : 0) + (q21_2_correct ? 1 : 0) + (q21_3_correct ? 1 : 0) + (q21_4_correct ? 1 : 0) + (q21_5_correct ? 1 : 0);
        const q21_perfect = q21_score === 5;
        const q21_points = (q21_score / 5) * 1000;
        
        results.push({
            questionNum: 21,
            questionText: questionTexts.q21,
            correct: q21_perfect,
            partialScore: q21_score,
            totalParts: 5,
            points: Math.round(q21_points),
            maxPoints: 1000,
            answer: `Match 1: ${q21_1 || 'empty'}, Match 2: ${q21_2 || 'empty'}, Match 3: ${q21_3 || 'empty'}, Match 4: ${q21_4 || 'empty'}, Match 5: ${q21_5 || 'empty'}`,
            correctAnswer: `Match 1: ${correctAnswers.q21_1}, Match 2: ${correctAnswers.q21_2}, Match 3: ${correctAnswers.q21_3}, Match 4: ${correctAnswers.q21_4}, Match 5: ${correctAnswers.q21_5}`
        });
        
        if (q21_perfect) correctCount++;

        // Question 22: Multiple choice
        totalQuestions++;
        const q22 = form.querySelector('input[name="q22"]:checked')?.value;
        const q22_correct = q22 === correctAnswers.q22;
        
        results.push({
            questionNum: 22,
            questionText: questionTexts.q22,
            correct: q22_correct,
            points: q22_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q22 || 'No answer',
            correctAnswer: correctAnswers.q22
        });
        
        if (q22_correct) correctCount++;

        // Question 23: State Machine Transitions True/False (3 parts, partial credit)
        totalQuestions++;
        const q23_1 = form.querySelector('input[name="q23_1"]:checked')?.value;
        const q23_2 = form.querySelector('input[name="q23_2"]:checked')?.value;
        const q23_3 = form.querySelector('input[name="q23_3"]:checked')?.value;
        
        const q23_1_correct = q23_1 === correctAnswers.q23_1;
        const q23_2_correct = q23_2 === correctAnswers.q23_2;
        const q23_3_correct = q23_3 === correctAnswers.q23_3;
        
        const q23_score = (q23_1_correct ? 1 : 0) + (q23_2_correct ? 1 : 0) + (q23_3_correct ? 1 : 0);
        const q23_perfect = q23_score === 3;
        const q23_points = (q23_score / 3) * 1000;
        
        results.push({
            questionNum: 23,
            questionText: questionTexts.q23,
            correct: q23_perfect,
            partialScore: q23_score,
            totalParts: 3,
            points: Math.round(q23_points),
            maxPoints: 1000,
            answer: `A: ${q23_1 || 'No answer'}, B: ${q23_2 || 'No answer'}, C: ${q23_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q23_1}, B: ${correctAnswers.q23_2}, C: ${correctAnswers.q23_3}`
        });
        
        if (q23_perfect) correctCount++;

        // Question 24: OnMouseDown method (3 parts)
        totalQuestions++;
        const q24_1 = form.querySelector('select[name="q24_1"]').value;
        const q24_2 = form.querySelector('select[name="q24_2"]').value;
        const q24_3 = form.querySelector('select[name="q24_3"]').value;
        
        const q24_correct = q24_1 === correctAnswers.q24_1 && 
                           q24_2 === correctAnswers.q24_2 && 
                           q24_3 === correctAnswers.q24_3;
        const q24_parts = (q24_1 === correctAnswers.q24_1 ? 1 : 0) + 
                         (q24_2 === correctAnswers.q24_2 ? 1 : 0) + 
                         (q24_3 === correctAnswers.q24_3 ? 1 : 0);
        const q24_points = (q24_parts / 3) * 1000;
        
        results.push({
            questionNum: 24,
            questionText: questionTexts.q24,
            correct: q24_correct,
            partialScore: q24_parts,
            totalParts: 3,
            points: Math.round(q24_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q24_1 || 'empty'}, Blank 2: ${q24_2 || 'empty'}, Blank 3: ${q24_3 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q24_1}, Blank 2: ${correctAnswers.q24_2}, Blank 3: ${correctAnswers.q24_3}`
        });
        
        if (q24_correct) correctCount++;

        // Question 25: Compilation errors (2 answers, checkboxes)
        totalQuestions++;
        const q25_checkboxes = Array.from(form.querySelectorAll('input[name="q25"]:checked')).map(cb => cb.value);
        const q25_selected = q25_checkboxes.sort().join(',');
        const q25_expected = correctAnswers.q25.sort().join(',');
        const q25_correct = q25_selected === q25_expected && q25_checkboxes.length === correctAnswers.q25.length;
        
        results.push({
            questionNum: 25,
            questionText: questionTexts.q25,
            correct: q25_correct,
            points: q25_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q25_selected || 'No selections',
            correctAnswer: q25_expected
        });
        
        if (q25_correct) correctCount++;

        // Question 26: ECS True/False (3 parts, partial credit)
        totalQuestions++;
        const q26_1 = form.querySelector('input[name="q26_1"]:checked')?.value;
        const q26_2 = form.querySelector('input[name="q26_2"]:checked')?.value;
        const q26_3 = form.querySelector('input[name="q26_3"]:checked')?.value;
        
        const q26_1_correct = q26_1 === correctAnswers.q26_1;
        const q26_2_correct = q26_2 === correctAnswers.q26_2;
        const q26_3_correct = q26_3 === correctAnswers.q26_3;
        
        const q26_score = (q26_1_correct ? 1 : 0) + (q26_2_correct ? 1 : 0) + (q26_3_correct ? 1 : 0);
        const q26_perfect = q26_score === 3;
        const q26_points = (q26_score / 3) * 1000;
        
        results.push({
            questionNum: 26,
            questionText: questionTexts.q26,
            correct: q26_perfect,
            partialScore: q26_score,
            totalParts: 3,
            points: Math.round(q26_points),
            maxPoints: 1000,
            answer: `A: ${q26_1 || 'No answer'}, B: ${q26_2 || 'No answer'}, C: ${q26_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q26_1}, B: ${correctAnswers.q26_2}, C: ${correctAnswers.q26_3}`
        });
        
        if (q26_perfect) correctCount++;

        // Question 27: Unity naming conventions True/False (3 parts, partial credit)
        totalQuestions++;
        const q27_1 = form.querySelector('input[name="q27_1"]:checked')?.value;
        const q27_2 = form.querySelector('input[name="q27_2"]:checked')?.value;
        const q27_3 = form.querySelector('input[name="q27_3"]:checked')?.value;
        
        const q27_1_correct = q27_1 === correctAnswers.q27_1;
        const q27_2_correct = q27_2 === correctAnswers.q27_2;
        const q27_3_correct = q27_3 === correctAnswers.q27_3;
        
        const q27_score = (q27_1_correct ? 1 : 0) + (q27_2_correct ? 1 : 0) + (q27_3_correct ? 1 : 0);
        const q27_perfect = q27_score === 3;
        const q27_points = (q27_score / 3) * 1000;
        
        results.push({
            questionNum: 27,
            questionText: questionTexts.q27,
            correct: q27_perfect,
            partialScore: q27_score,
            totalParts: 3,
            points: Math.round(q27_points),
            maxPoints: 1000,
            answer: `A: ${q27_1 || 'No answer'}, B: ${q27_2 || 'No answer'}, C: ${q27_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q27_1}, B: ${correctAnswers.q27_2}, C: ${correctAnswers.q27_3}`
        });
        
        if (q27_perfect) correctCount++;

        // Question 28: Rigidbody data type
        totalQuestions++;
        const q28 = form.querySelector('select[name="q28"]').value;
        const q28_correct = q28 === correctAnswers.q28;
        
        results.push({
            questionNum: 28,
            questionText: questionTexts.q28,
            correct: q28_correct,
            points: q28_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q28 || 'No answer',
            correctAnswer: correctAnswers.q28
        });
        
        if (q28_correct) correctCount++;

        // Question 29: GameObject null check (2 parts)
        totalQuestions++;
        const q29_1 = form.querySelector('select[name="q29_1"]').value;
        const q29_2 = form.querySelector('select[name="q29_2"]').value;
        
        const q29_correct = q29_1 === correctAnswers.q29_1 && 
                           q29_2 === correctAnswers.q29_2;
        const q29_parts = (q29_1 === correctAnswers.q29_1 ? 1 : 0) + 
                         (q29_2 === correctAnswers.q29_2 ? 1 : 0);
        const q29_points = (q29_parts / 2) * 1000;
        
        results.push({
            questionNum: 29,
            questionText: questionTexts.q29,
            correct: q29_correct,
            partialScore: q29_parts,
            totalParts: 2,
            points: Math.round(q29_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q29_1 || 'empty'}, Blank 2: ${q29_2 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q29_1}, Blank 2: ${correctAnswers.q29_2}`
        });
        
        if (q29_correct) correctCount++;

        // Question 30: Rigidbody.AddForce (2 parts)
        totalQuestions++;
        const q30_1 = form.querySelector('select[name="q30_1"]').value;
        const q30_2 = form.querySelector('select[name="q30_2"]').value;
        
        const q30_correct = q30_1 === correctAnswers.q30_1 && 
                           q30_2 === correctAnswers.q30_2;
        const q30_parts = (q30_1 === correctAnswers.q30_1 ? 1 : 0) + 
                         (q30_2 === correctAnswers.q30_2 ? 1 : 0);
        const q30_points = (q30_parts / 2) * 1000;
        
        results.push({
            questionNum: 30,
            questionText: questionTexts.q30,
            correct: q30_correct,
            partialScore: q30_parts,
            totalParts: 2,
            points: Math.round(q30_points),
            maxPoints: 1000,
            answer: `Blank 1: ${q30_1 || 'empty'}, Blank 2: ${q30_2 || 'empty'}`,
            correctAnswer: `Blank 1: ${correctAnswers.q30_1}, Blank 2: ${correctAnswers.q30_2}`
        });
        
        if (q30_correct) correctCount++;

        // Question 31: Inspector window True/False (3 parts, partial credit)
        totalQuestions++;
        const q31_1 = form.querySelector('input[name="q31_1"]:checked')?.value;
        const q31_2 = form.querySelector('input[name="q31_2"]:checked')?.value;
        const q31_3 = form.querySelector('input[name="q31_3"]:checked')?.value;
        
        const q31_1_correct = q31_1 === correctAnswers.q31_1;
        const q31_2_correct = q31_2 === correctAnswers.q31_2;
        const q31_3_correct = q31_3 === correctAnswers.q31_3;
        
        const q31_score = (q31_1_correct ? 1 : 0) + (q31_2_correct ? 1 : 0) + (q31_3_correct ? 1 : 0);
        const q31_perfect = q31_score === 3;
        const q31_points = (q31_score / 3) * 1000;
        
        results.push({
            questionNum: 31,
            questionText: questionTexts.q31,
            correct: q31_perfect,
            partialScore: q31_score,
            totalParts: 3,
            points: Math.round(q31_points),
            maxPoints: 1000,
            answer: `A: ${q31_1 || 'No answer'}, B: ${q31_2 || 'No answer'}, C: ${q31_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q31_1}, B: ${correctAnswers.q31_2}, C: ${correctAnswers.q31_3}`
        });
        
        if (q31_perfect) correctCount++;

        // Question 32: Rigidbody.velocity error
        totalQuestions++;
        const q32 = form.querySelector('select[name="q32"]').value;
        const q32_correct = q32 === correctAnswers.q32;
        
        results.push({
            questionNum: 32,
            questionText: questionTexts.q32,
            correct: q32_correct,
            points: q32_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q32 || 'No answer',
            correctAnswer: correctAnswers.q32
        });
        
        if (q32_correct) correctCount++;

        // Question 34: Compile-time error line
        totalQuestions++;
        const q34 = form.querySelector('input[name="q34"]:checked')?.value;
        const q34_correct = q34 === correctAnswers.q34;
        
        results.push({
            questionNum: 34,
            questionText: questionTexts.q34,
            correct: q34_correct,
            points: q34_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q34 || 'No answer',
            correctAnswer: correctAnswers.q34
        });
        
        if (q34_correct) correctCount++;

        // Question 35: Dictionary initialization (3 answers, checkboxes)
        totalQuestions++;
        const q35_checkboxes = Array.from(form.querySelectorAll('input[name="q35"]:checked')).map(cb => cb.value);
        const q35_selected = q35_checkboxes.sort().join(',');
        const q35_expected = correctAnswers.q35.sort().join(',');
        const q35_correct = q35_selected === q35_expected && q35_checkboxes.length === correctAnswers.q35.length;
        
        results.push({
            questionNum: 35,
            questionText: questionTexts.q35,
            correct: q35_correct,
            points: q35_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q35_selected || 'No selections',
            correctAnswer: q35_expected
        });
        
        if (q35_correct) correctCount++;

        // Question 37: Scene view positioning True/False (3 parts, partial credit)
        totalQuestions++;
        const q37_1 = form.querySelector('input[name="q37_1"]:checked')?.value;
        const q37_2 = form.querySelector('input[name="q37_2"]:checked')?.value;
        const q37_3 = form.querySelector('input[name="q37_3"]:checked')?.value;
        
        const q37_1_correct = q37_1 === correctAnswers.q37_1;
        const q37_2_correct = q37_2 === correctAnswers.q37_2;
        const q37_3_correct = q37_3 === correctAnswers.q37_3;
        
        const q37_score = (q37_1_correct ? 1 : 0) + (q37_2_correct ? 1 : 0) + (q37_3_correct ? 1 : 0);
        const q37_perfect = q37_score === 3;
        const q37_points = (q37_score / 3) * 1000;
        
        results.push({
            questionNum: 37,
            questionText: questionTexts.q37,
            correct: q37_perfect,
            partialScore: q37_score,
            totalParts: 3,
            points: Math.round(q37_points),
            maxPoints: 1000,
            answer: `A: ${q37_1 || 'No answer'}, B: ${q37_2 || 'No answer'}, C: ${q37_3 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q37_1}, B: ${correctAnswers.q37_2}, C: ${correctAnswers.q37_3}`
        });
        
        if (q37_perfect) correctCount++;

        // Question 38: playerName not showing in inspector
        totalQuestions++;
        const q38 = form.querySelector('input[name="q38"]:checked')?.value;
        const q38_correct = q38 === correctAnswers.q38;
        
        results.push({
            questionNum: 38,
            questionText: questionTexts.q38,
            correct: q38_correct,
            points: q38_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q38 || 'No answer',
            correctAnswer: correctAnswers.q38
        });
        
        if (q38_correct) correctCount++;

        // Question 39: GetChildren return type
        totalQuestions++;
        const q39 = form.querySelector('select[name="q39"]').value;
        const q39_correct = q39 === correctAnswers.q39;
        
        results.push({
            questionNum: 39,
            questionText: questionTexts.q39,
            correct: q39_correct,
            points: q39_correct ? 1000 : 0,
            maxPoints: 1000,
            answer: q39 || 'No answer',
            correctAnswer: correctAnswers.q39
        });
        
        if (q39_correct) correctCount++;

        // Question 40: Functions True/False (4 parts, partial credit)
        totalQuestions++;
        const q40_1 = form.querySelector('input[name="q40_1"]:checked')?.value;
        const q40_2 = form.querySelector('input[name="q40_2"]:checked')?.value;
        const q40_3 = form.querySelector('input[name="q40_3"]:checked')?.value;
        const q40_4 = form.querySelector('input[name="q40_4"]:checked')?.value;
        
        const q40_1_correct = q40_1 === correctAnswers.q40_1;
        const q40_2_correct = q40_2 === correctAnswers.q40_2;
        const q40_3_correct = q40_3 === correctAnswers.q40_3;
        const q40_4_correct = q40_4 === correctAnswers.q40_4;
        
        const q40_score = (q40_1_correct ? 1 : 0) + (q40_2_correct ? 1 : 0) + (q40_3_correct ? 1 : 0) + (q40_4_correct ? 1 : 0);
        const q40_perfect = q40_score === 4;
        const q40_points = (q40_score / 4) * 1000;
        
        results.push({
            questionNum: 40,
            questionText: questionTexts.q40,
            correct: q40_perfect,
            partialScore: q40_score,
            totalParts: 4,
            points: Math.round(q40_points),
            maxPoints: 1000,
            answer: `A: ${q40_1 || 'No answer'}, B: ${q40_2 || 'No answer'}, C: ${q40_3 || 'No answer'}, D: ${q40_4 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q40_1}, B: ${correctAnswers.q40_2}, C: ${correctAnswers.q40_3}, D: ${correctAnswers.q40_4}`
        });
        
        if (q40_perfect) correctCount++;

        // Calculate total points (out of 1000 per question)
        let totalPoints = 0;
        let maxPoints = totalQuestions * 1000;
        results.forEach(result => {
            if (result.points !== undefined) {
                totalPoints += result.points;
            } else {
                totalPoints += result.correct ? 1000 : 0;
            }
        });
        
        const score = Math.round((totalPoints / maxPoints) * 1000);
        
        return {
            results: results,
            correctCount: correctCount,
            totalQuestions: totalQuestions,
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            score: score // Out of 1000
        };
    }

    function displayResults(resultsData) {
        const { results, correctCount, totalQuestions, totalPoints, maxPoints, score } = resultsData;
        
        let html = '<div class="result-summary">';
        html += `<h3>Test Results</h3>`;
        html += `<div class="score">Score: <span class="score-number">${score}/1000</span> (${correctCount}/${totalQuestions} questions correct)</div>`;
        html += `<div style="margin-top: 10px; color: var(--text-secondary);">Points: ${totalPoints}/${maxPoints}</div>`;
        html += `<div style="margin-top: 15px;">
            <button onclick="displayStatisticsPanel()" class="submit-btn" style="background: #9c27b0; margin-right: 10px;">
                📊 Ver Estadísticas
            </button>
            <button onclick="window.location.reload()" class="submit-btn" style="background: #2196F3;">
                🔄 Hacer Otro Intento
            </button>
        </div>`;
        html += '</div>';

        html += '<h3 style="margin-top: 30px; margin-bottom: 15px;">Question Results:</h3>';
        
        results.forEach(result => {
            const statusClass = result.correct ? 'correct' : 'incorrect';
            const statusText = result.correct ? '✓ Correct' : '✗ Incorrect';
            
            html += `<div class="result-item ${statusClass}">`;
            html += '<div class="result-item-header">';
            html += `<span class="result-question-num">${result.questionText}</span>`;
            html += `<span class="result-status ${statusClass}">${statusText}</span>`;
            html += '</div>';
            
            // Show points for this question
            const questionPoints = result.points !== undefined ? result.points : (result.correct ? 1000 : 0);
            const questionMax = result.maxPoints || 1000;
            html += `<p style="margin-top: 5px; font-weight: bold; color: var(--text-primary);">Points: ${questionPoints}/${questionMax}</p>`;
            
            if (result.partialScore !== undefined && result.totalParts !== undefined) {
                html += `<p style="margin-top: 5px; color: var(--text-secondary);">Partial Score: ${result.partialScore}/${result.totalParts} parts correct</p>`;
            }
            
            html += `<p style="margin-top: 10px;"><strong>Your answer:</strong> ${result.answer}</p>`;
            html += `<p><strong>Correct answer:</strong> ${result.correctAnswer}</p>`;
            html += '</div>';
        });

        // Practice section for incorrect answers
        const incorrectQuestions = results.filter(r => !r.correct);
        if (incorrectQuestions.length > 0) {
            html += '<div class="practice-section">';
            html += '<h3>📚 Questions to Practice:</h3>';
            html += '<ul class="practice-list">';
            incorrectQuestions.forEach(result => {
                html += `<li>Question ${result.questionNum}: ${result.questionText}</li>`;
            });
            html += '</ul>';
            html += '</div>';
        } else {
            html += '<div class="practice-section" style="background: #d4edda; border-color: #4CAF50;">';
            html += '<h3 style="color: #155724;">🎉 Perfect Score! Great job!</h3>';
            html += '</div>';
        }

        resultsContent.innerHTML = html;
    }
});

