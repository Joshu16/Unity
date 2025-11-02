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
    console.log('navigateQuestion called:', { direction, isSkip, forceNavigate, trainerModeActive, currentQuestionIndex });
    
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
    
    const newIndex = currentQuestionIndex + direction;
    
    if (newIndex < 0 || newIndex >= allQuestions.length) {
        return;
    }
    
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
    
    // Temporarily call checkAnswers and find our specific question
    const allResults = checkAnswers();
    const questionNum = questionIndex + 1;
    const result = allResults.results.find(r => r.questionNum === questionNum);
    
    if (!result) {
        // Fallback for questions not in results (shouldn't happen)
        const questionKey = `q${questionNum}`;
        return {
            questionNum: questionNum,
            questionText: questionTexts[questionKey] || `Question ${questionNum}`,
            correct: false,
            answer: 'No answer detected',
            correctAnswer: 'Unable to determine'
        };
    }
    
    return result;
}

// Mark visual feedback on inputs
function markQuestionVisualFeedback(questionIndex, result) {
    const questionNum = questionIndex + 1;
    const question = allQuestions[questionIndex];
    if (!question) return;
    
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
    const questionKey = `q${questionNum}`;
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
    
    const questionKey = `q${questionIndex + 1}`;
    const explanation = questionExplanations[questionKey] || questionExplanations.default;
    
    const statusClass = result.correct ? 'correct' : 'incorrect';
    const statusText = result.correct ? '✓ Correct' : '✗ Incorrect';
    const statusMsg = result.correct ? 
        (currentLanguage === 'en' ? 'Great job! You got it right!' : '¡Excelente! ¡Lo hiciste bien!') :
        (currentLanguage === 'en' ? 'Not quite right. Here\'s what went wrong:' : 'No es correcto. Esto es lo que falló:');
    
    // Check if this question has visual feedback (multi-part True/False)
    const questionNum = questionIndex + 1;
    const hasVisualFeedback = correctAnswers[`q${questionNum}_1`] && correctAnswers[`q${questionNum}_2`];
    
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

