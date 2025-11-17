// App.js
import React, { useState } from 'react';

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Inline styles
  const styles = {
    gameContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #581c87 50%, #1e293b 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    },
    gameWrapper: {
      maxWidth: '56rem',
      margin: '0 auto'
    },
    headerCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      color: 'white'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    scoreDisplay: {
      textAlign: 'right'
    },
    progressBar: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '9999px',
      height: '0.75rem',
      overflow: 'hidden',
      marginBottom: '0.5rem'
    },
    progressFill: {
      background: 'linear-gradient(90deg, #4ade80 0%, #3b82f6 100%)',
      height: '100%',
      borderRadius: '9999px',
      transition: 'width 0.5s ease'
    },
    challengeCard: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      padding: '2rem'
    },
    badges: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    badge: {
      padding: '0.25rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    exampleBox: {
      background: '#f9fafb',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1.125rem',
      marginBottom: '1.5rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    btnPrimary: {
      flex: 1,
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      background: 'linear-gradient(90deg, #9333ea 0%, #3b82f6 100%)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    btnSecondary: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      border: '2px solid #d1d5db',
      background: 'white',
      color: '#374151',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    feedback: {
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'start',
      gap: '0.75rem',
      border: '2px solid'
    },
    feedbackCorrect: {
      background: '#f0fdf4',
      borderColor: '#22c55e',
      color: '#166534'
    },
    feedbackIncorrect: {
      background: '#fef2f2',
      borderColor: '#ef4444',
      color: '#991b1b'
    },
    hintBox: {
      background: '#eff6ff',
      border: '2px solid #93c5fd',
      borderRadius: '0.5rem',
      padding: '1rem',
      marginBottom: '1.5rem',
      color: '#1e40af'
    },
    completionScreen: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #581c87 50%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    completionCard: {
      background: 'white',
      borderRadius: '1.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '3rem',
      maxWidth: '28rem',
      textAlign: 'center'
    }
  };

  const getDifficultyStyle = (difficulty) => {
    const base = { ...styles.badge };
    switch(difficulty) {
      case 'Easy': return { ...base, background: '#dcfce7', color: '#15803d' };
      case 'Medium': return { ...base, background: '#fef3c7', color: '#a16207' };
      case 'Hard': return { ...base, background: '#fed7aa', color: '#c2410c' };
      case 'Expert': return { ...base, background: '#fecaca', color: '#b91c1c' };
      default: return base;
    }
  };

  const challenges = [
    {
      level: 1,
      language: 'Python',
      difficulty: 'Easy',
      title: 'Reverse a String',
      description: 'Write a function that takes a string and returns it reversed.',
      example: 'Input: "hello" → Output: "olleh"',
      hint: 'Think about slicing with [::-1] or using reversed()',
      answers: ['[::-1]', 'reversed', '.reverse', 'string[::-1]'],
      explanation: 'Python makes this easy with slicing: string[::-1] or "".join(reversed(string))'
    },
    {
      level: 2,
      language: 'C',
      difficulty: 'Easy',
      title: 'Sum of Array',
      description: 'What\'s the most efficient way to sum all elements in an array in C?',
      example: 'int arr[] = {1, 2, 3, 4, 5}; // Should return 15',
      hint: 'You need a loop and an accumulator variable',
      answers: ['for loop', 'while loop', 'loop', 'iterate'],
      explanation: 'Use a for loop to iterate through the array and add each element to a sum variable.'
    },
    {
      level: 3,
      language: 'Java',
      difficulty: 'Medium',
      title: 'Find Duplicates',
      description: 'Which data structure is best for finding duplicate elements in an array in O(n) time?',
      example: 'int[] arr = {1, 2, 3, 2, 4}; // 2 is duplicate',
      hint: 'Think about a structure that offers O(1) lookup time',
      answers: ['HashSet', 'Set', 'HashMap', 'Map', 'hash'],
      explanation: 'A HashSet provides O(1) insertion and lookup, perfect for detecting duplicates in one pass.'
    },
    {
      level: 4,
      language: 'C++',
      difficulty: 'Medium',
      title: 'Binary Search Tree',
      description: 'What\'s the average time complexity for searching in a balanced BST?',
      example: 'Tree with n nodes, searching for a value',
      hint: 'Think about how many nodes you eliminate with each comparison',
      answers: ['O(log n)', 'log n', 'logarithmic', 'O(logn)'],
      explanation: 'In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) time.'
    },
    {
      level: 5,
      language: 'Python',
      difficulty: 'Medium',
      title: 'Two Sum Problem',
      description: 'What data structure allows you to solve "find two numbers that sum to target" in O(n) time?',
      example: 'nums = [2, 7, 11, 15], target = 9 → return [0, 1]',
      hint: 'Store what you\'ve seen so far for constant-time lookups',
      answers: ['dictionary', 'dict', 'hash map', 'hashmap', 'hash table'],
      explanation: 'Use a dictionary to store seen numbers and their indices. For each number, check if (target - number) exists in the dict.'
    },
    {
      level: 6,
      language: 'C',
      difficulty: 'Medium',
      title: 'Pointer Arithmetic',
      description: 'If ptr is an int pointer (4 bytes), what does ptr + 3 actually add to the address?',
      example: 'int* ptr; ptr + 3 = ?',
      hint: 'Pointers increment by the size of their type',
      answers: ['12', '12 bytes', 'twelve'],
      explanation: 'Pointer arithmetic multiplies by sizeof(type). int is typically 4 bytes, so ptr + 3 adds 12 bytes.'
    },
    {
      level: 7,
      language: 'Java',
      difficulty: 'Hard',
      title: 'Thread Safety',
      description: 'Which keyword makes a method thread-safe by allowing only one thread to execute it at a time?',
      example: 'Multiple threads calling the same method',
      hint: 'It\'s a keyword that creates a mutex lock',
      answers: ['synchronized', 'sync'],
      explanation: 'The synchronized keyword ensures only one thread can execute the method at a time, preventing race conditions.'
    },
    {
      level: 8,
      language: 'C++',
      difficulty: 'Hard',
      title: 'Virtual Functions',
      description: 'What keyword makes a destructor virtual, enabling proper cleanup in inheritance hierarchies?',
      example: 'Base* ptr = new Derived(); delete ptr;',
      hint: 'Without this, only the base destructor runs',
      answers: ['virtual', 'virtual destructor'],
      explanation: 'Declaring a destructor virtual ensures the derived class destructor is called, preventing memory leaks.'
    },
    {
      level: 9,
      language: 'Python',
      difficulty: 'Hard',
      title: 'Decorator Pattern',
      description: 'What symbol precedes a function name to apply a decorator in Python?',
      example: '@my_decorator\ndef function(): pass',
      hint: 'It\'s a single character',
      answers: ['@', 'at symbol', 'at sign'],
      explanation: 'The @ symbol applies decorators, which are functions that modify other functions\' behavior.'
    },
    {
      level: 10,
      language: 'C',
      difficulty: 'Expert',
      title: 'Memory Alignment',
      description: 'What compiler directive ensures a struct has no padding between members?',
      example: 'struct ____ MyStruct { char a; int b; };',
      hint: 'It forces tight packing of struct members',
      answers: ['packed', '__attribute__((packed))', 'pragma pack', '#pragma pack'],
      explanation: '__attribute__((packed)) or #pragma pack(1) removes padding, making structs more compact but potentially slower.'
    }
  ];

  const currentChallenge = challenges[currentLevel];
  const progress = ((currentLevel + 1) / challenges.length) * 100;

  const checkAnswer = () => {
    const normalized = userAnswer.toLowerCase().trim();
    const isCorrect = currentChallenge.answers.some(ans => 
      normalized.includes(ans.toLowerCase())
    );

    if (isCorrect) {
      setFeedback('correct');
      setScore(score + (currentLevel + 1) * 10);
      setTimeout(() => {
        if (currentLevel < challenges.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setUserAnswer('');
          setFeedback('');
          setShowHint(false);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const skipChallenge = () => {
    if (currentLevel < challenges.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setUserAnswer('');
      setFeedback('');
      setShowHint(false);
    }
  };

  if (currentLevel >= challenges.length) {
    return (
      <div style={styles.completionScreen}>
        <div style={styles.completionCard}>
          <div style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>🏆</div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Congratulations!
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '1.5rem' }}>
            You completed all challenges!
          </p>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#9333ea', marginBottom: '2rem' }}>
            Final Score: {score}
          </div>
          <button
            onClick={() => {
              setCurrentLevel(0);
              setScore(0);
              setUserAnswer('');
              setFeedback('');
              setShowHint(false);
            }}
            style={styles.btnPrimary}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.gameContainer}>
      <div style={styles.gameWrapper}>
        <div style={styles.headerCard}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <span style={{ fontSize: '2rem' }}>💻</span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Coding Challenges</h1>
            </div>
            <div style={styles.scoreDisplay}>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Score</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{score}</div>
            </div>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            Challenge {currentLevel + 1} of {challenges.length}
          </div>
        </div>

        <div style={styles.challengeCard}>
          <div style={styles.badges}>
            <span style={getDifficultyStyle(currentChallenge.difficulty)}>
              {currentChallenge.difficulty}
            </span>
            <span style={{ ...styles.badge, background: '#dbeafe', color: '#1e40af' }}>
              {currentChallenge.language}
            </span>
          </div>

          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            {currentChallenge.title}
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '1rem' }}>
            {currentChallenge.description}
          </p>
          
          <div style={styles.exampleBox}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>
              Example:
            </div>
            <code style={{ color: '#1f2937', fontFamily: '"Courier New", monospace' }}>
              {currentChallenge.example}
            </code>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Your Answer:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Type your answer..."
              style={styles.input}
            />
          </div>

          {feedback === 'correct' && (
            <div style={{ ...styles.feedback, ...styles.feedbackCorrect }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>✓</span>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Correct! 🎉</div>
                <div style={{ fontSize: '0.875rem' }}>{currentChallenge.explanation}</div>
              </div>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div style={{ ...styles.feedback, ...styles.feedbackIncorrect }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>✗</span>
              <div style={{ fontWeight: 'bold' }}>Not quite. Try again!</div>
            </div>
          )}

          {showHint && (
            <div style={styles.hintBox}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Hint:</div>
              <div>{currentChallenge.hint}</div>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              style={{
                ...styles.btnPrimary,
                opacity: !userAnswer.trim() ? 0.5 : 1,
                cursor: !userAnswer.trim() ? 'not-allowed' : 'pointer'
              }}
            >
              Submit →
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              style={styles.btnSecondary}
            >
              {showHint ? 'Hide' : 'Show'} Hint
            </button>
            <button
              onClick={skipChallenge}
              style={styles.btnSecondary}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;