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
    q8_3: 'true',    // onClick AddListener can be called in Update (though not recommended)
    
    // Question 9: Code snippet ordering (3,2,1,4 = C, B, A, D)
    q9_1: 'C',       // Position 1: Awake (C)
    q9_2: 'B',       // Position 2: Class definition (B)
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
    
    // Question 13: ECS True/False (T T F)
    q13_1: 'true',   // Uses Unity.Entities - TRUE
    q13_2: 'true',   // ShieldComponent uses Unity.Entities - TRUE
    q13_3: 'false',  // Regular MonoBehaviour, no ECS - FALSE
    
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
    q26_1: 'false', // Regular MonoBehaviour, no ECS
    q26_2: 'false', // Uses Unity.Entities but still MonoBehaviour, not pure ECS
    q26_3: 'true',  // ComponentSystem is ECS
    
    // Question 27: Unity naming conventions True/False
    q27_1: 'true',  // Correct Unity naming (PascalCase class, camelCase fields)
    q27_2: 'false', // Incorrect: ontriggerenter should be OnTriggerEnter, Other should be other, compareTag should be CompareTag
    q27_3: 'true',  // Correct Unity naming
    
    // Question 28: Rigidbody data type
    q28: 'Rigidbody', // GetComponent<Rigidbody>() returns Rigidbody
    
    // Question 29: GameObject null check
    q29_1: 'public GameObject projectile;', // Declaration
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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('testForm');
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('results-content');
    const retryBtn = document.getElementById('retry-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
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
        
        // Hide results, show form
        resultsDiv.classList.add('hidden');
        form.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function checkAnswers() {
        const results = [];
        let correctCount = 0;
        let totalQuestions = 0;

        // Question 1: True/False (3 parts, partial credit)
        totalQuestions++;
        const q1_1 = form.querySelector('input[name="q1_1"]:checked')?.value;
        const q1_2 = form.querySelector('input[name="q1_2"]:checked')?.value;
        const q1_3 = form.querySelector('input[name="q1_3"]:checked')?.value;
        
        const q1_1_correct = q1_1 === correctAnswers.q1_1;
        const q1_2_correct = q1_2 === correctAnswers.q1_2;
        const q1_3_correct = q1_3 === correctAnswers.q1_3;
        
        const q1_score = (q1_1_correct ? 1 : 0) + (q1_2_correct ? 1 : 0) + (q1_3_correct ? 1 : 0);
        const q1_perfect = q1_score === 3;
        
        results.push({
            questionNum: 1,
            questionText: questionTexts.q1,
            correct: q1_perfect,
            partialScore: q1_score,
            totalParts: 3,
            answer: `A: ${q1_1}, B: ${q1_2}, C: ${q1_3}`,
            correctAnswer: `A: ${correctAnswers.q1_1}, B: ${correctAnswers.q1_2}, C: ${correctAnswers.q1_3}`
        });
        
        if (q1_perfect) correctCount++;

        // Question 2: Multiple choice
        totalQuestions++;
        const q2 = form.querySelector('input[name="q2"]:checked')?.value;
        const q2_correct = q2 === correctAnswers.q2;
        
        results.push({
            questionNum: 2,
            questionText: questionTexts.q2,
            correct: q2_correct,
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
        
        results.push({
            questionNum: 3,
            questionText: questionTexts.q3,
            correct: q3_correct,
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
        
        results.push({
            questionNum: 5,
            questionText: questionTexts.q5,
            correct: q5_correct,
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
        
        results.push({
            questionNum: 8,
            questionText: questionTexts.q8,
            correct: q8_perfect,
            partialScore: q8_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 9,
            questionText: questionTexts.q9,
            correct: q9_correct,
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
        
        results.push({
            questionNum: 11,
            questionText: questionTexts.q11,
            correct: q11_perfect,
            partialScore: q11_score,
            totalParts: 4,
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
        
        results.push({
            questionNum: 12,
            questionText: questionTexts.q12,
            correct: q12_correct,
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
        
        results.push({
            questionNum: 13,
            questionText: questionTexts.q13,
            correct: q13_perfect,
            partialScore: q13_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 14,
            questionText: questionTexts.q14,
            correct: q14_correct,
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
        
        results.push({
            questionNum: 15,
            questionText: questionTexts.q15,
            correct: q15_perfect,
            partialScore: q15_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 18,
            questionText: questionTexts.q18,
            correct: q18_perfect,
            partialScore: q18_score,
            totalParts: 4,
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
        
        results.push({
            questionNum: 19,
            questionText: questionTexts.q19,
            correct: q19_correct,
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
        
        results.push({
            questionNum: 20,
            questionText: questionTexts.q20,
            correct: q20_correct,
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
        
        results.push({
            questionNum: 21,
            questionText: questionTexts.q21,
            correct: q21_perfect,
            partialScore: q21_score,
            totalParts: 5,
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
        
        results.push({
            questionNum: 23,
            questionText: questionTexts.q23,
            correct: q23_perfect,
            partialScore: q23_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 24,
            questionText: questionTexts.q24,
            correct: q24_correct,
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
        
        results.push({
            questionNum: 26,
            questionText: questionTexts.q26,
            correct: q26_perfect,
            partialScore: q26_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 27,
            questionText: questionTexts.q27,
            correct: q27_perfect,
            partialScore: q27_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 29,
            questionText: questionTexts.q29,
            correct: q29_correct,
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
        
        results.push({
            questionNum: 30,
            questionText: questionTexts.q30,
            correct: q30_correct,
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
        
        results.push({
            questionNum: 31,
            questionText: questionTexts.q31,
            correct: q31_perfect,
            partialScore: q31_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 37,
            questionText: questionTexts.q37,
            correct: q37_perfect,
            partialScore: q37_score,
            totalParts: 3,
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
        
        results.push({
            questionNum: 40,
            questionText: questionTexts.q40,
            correct: q40_perfect,
            partialScore: q40_score,
            totalParts: 4,
            answer: `A: ${q40_1 || 'No answer'}, B: ${q40_2 || 'No answer'}, C: ${q40_3 || 'No answer'}, D: ${q40_4 || 'No answer'}`,
            correctAnswer: `A: ${correctAnswers.q40_1}, B: ${correctAnswers.q40_2}, C: ${correctAnswers.q40_3}, D: ${correctAnswers.q40_4}`
        });
        
        if (q40_perfect) correctCount++;

        return {
            results: results,
            correctCount: correctCount,
            totalQuestions: totalQuestions,
            score: Math.round((correctCount / totalQuestions) * 100)
        };
    }

    function displayResults(resultsData) {
        const { results, correctCount, totalQuestions, score } = resultsData;
        
        let html = '<div class="result-summary">';
        html += `<h3>Test Results</h3>`;
        html += `<div class="score">Score: <span class="score-number">${correctCount}/${totalQuestions}</span> (${score}%)</div>`;
        html += '</div>';

        html += '<h3 style="margin-top: 30px; margin-bottom: 15px;">Question Results:</h3>';
        
        results.forEach(result => {
            const statusClass = result.correct ? 'correct' : 'incorrect';
            const statusText = result.correct ? '✓ CORRECT' : '✗ INCORRECT';
            const statusIcon = result.correct ? '✓' : '✗';
            
            html += `<div class="result-item ${statusClass}">`;
            html += `<div class="result-item-header">`;
            html += `<span class="result-question-num">Question ${result.questionNum}: ${result.questionText}</span>`;
            html += `<span class="result-status ${statusClass}">${statusText}</span>`;
            html += `</div>`;
            
            if (result.partialScore !== undefined) {
                html += `<p><strong>Your score:</strong> ${result.partialScore}/${result.totalParts} parts correct</p>`;
            }
            
            html += `<p><strong>Your answer:</strong> ${result.answer}</p>`;
            html += `<p><strong>Correct answer:</strong> ${result.correctAnswer}</p>`;
            html += `</div>`;
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

