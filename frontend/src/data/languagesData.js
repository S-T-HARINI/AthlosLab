/**
 * Codevora Curriculum & Data Store
 * Supports C, C++, Java, and Python
 *
 * Structure:
 * - Notes: 20 Topics per language
 * - Practice:
 *     - Section 1: Topics 1 - 10 (Fundamentals)
 *     - Section 2: Topics 11 - 20 (Advanced Mastery)
 *     - Each Topic has 4 Levels: Easy, Medium, Hard, Test Level
 *     - Each Level has 3 Questions
 *     - Each Question has 3 Test Cases (including 1 Hidden Test Case)
 */

// Helper to generate 4 tiers (3 questions each) for a given topic
const createPracticeForTopic = (topicId, topicTitle, langName, langCode) => {
  const cleanTitle = topicTitle.replace(/^\d+\.\s*/, '');

  return {
    easy: [
      {
        id: `${langCode}-t${topicId}-e1`,
        title: `${cleanTitle} - Basic Syntax & Print`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Easy',
        description: `Write a basic ${langName} program demonstrating core concepts of ${cleanTitle}. Read standard input and print formatted result.`,
        inputExample: '10 20',
        outputExample: 'Result: 30',
        testCases: [
          { id: 1, name: 'Test Case 1', input: '10 20', expected: 'Result: 30', isHidden: false },
          { id: 2, name: 'Test Case 2', input: '100 200', expected: 'Result: 300', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: '0 -5', expected: 'Result: -5', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'easy', 1)
      },
      {
        id: `${langCode}-t${topicId}-e2`,
        title: `${cleanTitle} - Value Comparison`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Easy',
        description: `Implement a simple condition check using ${cleanTitle} rules to compare values and return appropriate status.`,
        inputExample: '42',
        outputExample: 'PASS',
        testCases: [
          { id: 1, name: 'Test Case 1', input: '42', expected: 'PASS', isHidden: false },
          { id: 2, name: 'Test Case 2', input: '10', expected: 'FAIL', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: '0', expected: 'FAIL', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'easy', 2)
      },
      {
        id: `${langCode}-t${topicId}-e3`,
        title: `${cleanTitle} - Fundamental Expression`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Easy',
        description: `Calculate mathematical or logical expression using ${cleanTitle} operators and print the output.`,
        inputExample: '5 3',
        outputExample: '15',
        testCases: [
          { id: 1, name: 'Test Case 1', input: '5 3', expected: '15', isHidden: false },
          { id: 2, name: 'Test Case 2', input: '7 4', expected: '28', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: '12 0', expected: '0', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'easy', 3)
      }
    ],
    medium: [
      {
        id: `${langCode}-t${topicId}-m1`,
        title: `${cleanTitle} - Algorithmic Processing`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Medium',
        description: `Apply ${cleanTitle} features to process a sequence of elements, handling edge cases like negative values or empty inputs.`,
        inputExample: '5\n1 4 2 8 5',
        outputExample: 'Max: 8, Min: 1',
        testCases: [
          { id: 1, name: 'Test Case 1', input: '5\n1 4 2 8 5', expected: 'Max: 8, Min: 1', isHidden: false },
          { id: 2, name: 'Test Case 2', input: '3\n-10 0 10', expected: 'Max: 10, Min: -10', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: '4\n99 99 99 99', expected: 'Max: 99, Min: 99', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'medium', 1)
      },
      {
        id: `${langCode}-t${topicId}-m2`,
        title: `${cleanTitle} - Data Transformation`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Medium',
        description: `Transform input data structures according to ${cleanTitle} conventions and return formatted result.`,
        inputExample: 'hello codevora',
        outputExample: 'HELLO CODEVORA',
        testCases: [
          { id: 1, name: 'Test Case 1', input: 'hello codevora', expected: 'HELLO CODEVORA', isHidden: false },
          { id: 2, name: 'Test Case 2', input: 'c programming', expected: 'C PROGRAMMING', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: 'fastapi sqlite', expected: 'FASTAPI SQLITE', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'medium', 2)
      },
      {
        id: `${langCode}-t${topicId}-m3`,
        title: `${cleanTitle} - State Management`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Medium',
        description: `Maintain state across multiple execution iterations utilizing ${cleanTitle} patterns.`,
        inputExample: '3 iterations',
        outputExample: 'State Updated Successfully',
        testCases: [
          { id: 1, name: 'Test Case 1', input: '3 iterations', expected: 'State Updated Successfully', isHidden: false },
          { id: 2, name: 'Test Case 2', input: '5 iterations', expected: 'State Updated Successfully', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: '10 iterations', expected: 'State Updated Successfully', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'medium', 3)
      }
    ],
    hard: [
      {
        id: `${langCode}-t${topicId}-h1`,
        title: `${cleanTitle} - Optimal Memory & Speed`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Hard',
        description: `Solve complex algorithmic scenario for ${cleanTitle} in O(N) time and O(1) auxiliary memory.`,
        inputExample: '[2, 7, 11, 15], Target: 9',
        outputExample: 'Indices: [0, 1]',
        testCases: [
          { id: 1, name: 'Test Case 1', input: '[2, 7, 11, 15], Target: 9', expected: 'Indices: [0, 1]', isHidden: false },
          { id: 2, name: 'Test Case 2', input: '[3, 2, 4], Target: 6', expected: 'Indices: [1, 2]', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: '[3, 3], Target: 6', expected: 'Indices: [0, 1]', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'hard', 1)
      },
      {
        id: `${langCode}-t${topicId}-h2`,
        title: `${cleanTitle} - Complex Data Structure`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Hard',
        description: `Implement custom data structure leveraging advanced features of ${cleanTitle} with full pointer / reference safety.`,
        inputExample: 'Operations: Push, Pop, Peek',
        outputExample: 'Data Structure Integrity Verified',
        testCases: [
          { id: 1, name: 'Test Case 1', input: 'Push(10), Push(20), Pop()', expected: 'Popped: 20', isHidden: false },
          { id: 2, name: 'Test Case 2', input: 'Push(5), Peek()', expected: 'Peeked: 5', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: 'IsEmpty() Check', expected: 'Status: Empty', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'hard', 2)
      },
      {
        id: `${langCode}-t${topicId}-h3`,
        title: `${cleanTitle} - High Performance Optimizer`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Hard',
        description: `Optimize bottleneck routines in ${cleanTitle} using low-level bitwise or dynamic programming techniques.`,
        inputExample: 'N = 1000',
        outputExample: 'Execution Time: 0.002s',
        testCases: [
          { id: 1, name: 'Test Case 1', input: 'N = 1000', expected: 'Execution Time: 0.002s', isHidden: false },
          { id: 2, name: 'Test Case 2', input: 'N = 50000', expected: 'Execution Time: 0.015s', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: 'N = 1000000', expected: 'Execution Time: 0.080s', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'hard', 3)
      }
    ],
    test: [
      {
        id: `${langCode}-t${topicId}-t1`,
        title: `${cleanTitle} - Test Challenge 1`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Test Level',
        description: `Timed Assessment: Solve strict constraints challenge for ${cleanTitle} with 10 hidden test suites.`,
        inputExample: 'Test Input Vector [1..N]',
        outputExample: '10/10 Test Cases Passed',
        testCases: [
          { id: 1, name: 'Test Case 1', input: 'Test Input Vector [1..100]', expected: '10/10 Test Cases Passed', isHidden: false },
          { id: 2, name: 'Test Case 2', input: 'Test Input Vector [1..500]', expected: '10/10 Test Cases Passed', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: 'Edge Suite [Null Check]', expected: '10/10 Test Cases Passed', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'test', 1)
      },
      {
        id: `${langCode}-t${topicId}-t2`,
        title: `${cleanTitle} - Test Challenge 2`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Test Level',
        description: `Timed Assessment: Implement custom error handling & edge-case validator in ${cleanTitle}.`,
        inputExample: 'Edge Case Input Stream',
        outputExample: 'Handled 0 Edge Failures',
        testCases: [
          { id: 1, name: 'Test Case 1', input: 'Edge Case Input Stream A', expected: 'Handled 0 Edge Failures', isHidden: false },
          { id: 2, name: 'Test Case 2', input: 'Edge Case Input Stream B', expected: 'Handled 0 Edge Failures', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: 'Negative Overflow Check', expected: 'Handled 0 Edge Failures', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'test', 2)
      },
      {
        id: `${langCode}-t${topicId}-t3`,
        title: `${cleanTitle} - Final Mastery Test`,
        topic: cleanTitle,
        topicId: topicId,
        difficulty: 'Test Level',
        description: `Final Certification Challenge: Complete end-to-end implementation for ${cleanTitle}.`,
        inputExample: 'Benchmark Test Suite',
        outputExample: 'Mastery Certification Earned',
        testCases: [
          { id: 1, name: 'Test Case 1', input: 'Benchmark Suite 1', expected: 'Mastery Certification Earned', isHidden: false },
          { id: 2, name: 'Test Case 2', input: 'Benchmark Suite 2', expected: 'Mastery Certification Earned', isHidden: false },
          { id: 3, name: 'Test Case 3 (Hidden)', input: 'Stress Test Suite [Memory Lock]', expected: 'Mastery Certification Earned', isHidden: true }
        ],
        template: getStarterTemplate(langCode, cleanTitle, 'test', 3)
      }
    ]
  };
};

function getStarterTemplate(langCode, topicTitle, level, num) {
  if (langCode === 'c') {
    return `#include <stdio.h>\n\n// Topic: ${topicTitle} (${level.toUpperCase()} #${num})\nint main() {\n    // Write your C solution here\n    printf("Result: 30\\n");\n    return 0;\n}`;
  } else if (langCode === 'cpp') {
    return `#include <iostream>\nusing namespace std;\n\n// Topic: ${topicTitle} (${level.toUpperCase()} #${num})\nint main() {\n    // Write your C++ solution here\n    cout << "Result: 30" << endl;\n    return 0;\n}`;
  } else if (langCode === 'java') {
    return `import java.util.*;\n\n// Topic: ${topicTitle} (${level.toUpperCase()} #${num})\npublic class Main {\n    public static void main(String[] args) {\n        // Write your Java solution here\n        System.out.println("Result: 30");\n    }\n}`;
  } else {
    return `# Topic: ${topicTitle} (${level.toUpperCase()} #${num})\ndef main():\n    # Write your Python solution here\n    print("Result: 30")\n\nif __name__ == "__main__":\n    main()`;
  }
}

// Generate full topics and practice map for a language
const buildLanguageData = (langCode, name, tagline, color, badgeClass, description, rawTopics) => {
  const topics = rawTopics.map((t, idx) => ({
    id: idx + 1,
    title: t.title,
    summary: t.summary,
    content: t.content,
    code: t.code,
    keyPoints: t.keyPoints,
    practice: createPracticeForTopic(idx + 1, t.title, name, langCode)
  }));

  return {
    id: langCode,
    name,
    tagline,
    color,
    badgeClass,
    description,
    topics
  };
};

// Raw topics definitions
const C_TOPICS = [
  { title: '1. Introduction & Basic Syntax', summary: 'C main function, headers, and output.', content: 'C is a procedural programming language developed in 1972 by Dennis Ritchie.', code: `#include <stdio.h>\n\nint main() {\n    printf("AthlosLab C!\\n");\n    return 0;\n}`, keyPoints: ['stdio.h provides printf.', 'main() is entry point.'] },
  { title: '2. Variables & Data Types', summary: 'int, float, double, char types.', content: 'Variables store primitive data values in memory.', code: `int x = 10; float f = 3.14; char c = 'A';`, keyPoints: ['int is 4 bytes.', 'char is 1 byte.'] },
  { title: '3. Input & Output Operations', summary: 'scanf, printf, format specifiers.', content: 'scanf reads formatted input from stdin.', code: `int val;\nscanf("%d", &val);\nprintf("Val: %d\\n", val);`, keyPoints: ['& obtains variable memory address.'] },
  { title: '4. Operators & Expressions', summary: 'Arithmetic, logical, bitwise operators.', content: 'Operators compute expressions.', code: `int a = 10 % 3; // a = 1`, keyPoints: ['% works only on integers.'] },
  { title: '5. Conditional Statements', summary: 'if, else, switch-case.', content: 'Decision structures execute branches based on conditions.', code: `if (a > 0) printf("Positive\\n");`, keyPoints: ['switch operates on integral values.'] },
  { title: '6. Loops & Iteration', summary: 'for, while, do-while loops.', content: 'Loops repeat code blocks until condition fails.', code: `for(int i=0; i<5; i++) printf("%d\\n", i);`, keyPoints: ['do-while runs at least once.'] },
  { title: '7. Functions & Scope', summary: 'Parameters, return types, scope.', content: 'Functions modularize program logic.', code: `int add(int a, int b) { return a + b; }`, keyPoints: ['Parameters passed by value by default.'] },
  { title: '8. Arrays & Multidimensional Grids', summary: 'Contiguous memory indexing.', content: 'Arrays store homogeneous elements in sequence.', code: `int arr[3] = {1, 2, 3};`, keyPoints: ['Array index starts at 0.'] },
  { title: '9. Strings & Text Processing', summary: 'Null-terminated char arrays.', content: 'Strings in C end with null byte \\0.', code: `char str[] = "AthlosLab";`, keyPoints: ['strlen counts chars before \\0.'] },
  { title: '10. Pointers & Memory Addresses', summary: '*ptr, &var, pointer math.', content: 'Pointers hold memory addresses.', code: `int x = 5; int *p = &x;`, keyPoints: ['* dereferences pointer.'] },
  { title: '11. Structures & Unions', summary: 'struct, union composite types.', content: 'struct groups different data types together.', code: `struct Point { int x; int y; };`, keyPoints: ['Access struct members using . or ->'] },
  { title: '12. Dynamic Memory Allocation', summary: 'malloc, calloc, realloc, free.', content: 'Heap allocation allows dynamic runtime sizing.', code: `int *arr = malloc(5 * sizeof(int)); free(arr);`, keyPoints: ['Always free heap memory.'] },
  { title: '13. File Input & Output', summary: 'fopen, fprintf, fscanf, fclose.', content: 'File streams read and write disk files.', code: `FILE *f = fopen("data.txt", "w"); fclose(f);`, keyPoints: ['Check NULL on fopen.'] },
  { title: '14. Recursion & Call Stack', summary: 'Base cases and recursive calls.', content: 'Recursion solves subproblems repeatedly.', code: `int fact(int n) { return n<=1?1:n*fact(n-1); }`, keyPoints: ['Base case prevents infinite stack calls.'] },
  { title: '15. Preprocessor Directives', summary: '#define, #include macros.', content: 'Preprocessor modifies text before compilation.', code: `#define MAX 100`, keyPoints: ['Macros perform text replacement.'] },
  { title: '16. Linked Lists', summary: 'Pointers, dynamic node traversal.', content: 'Linked lists connect nodes via pointers.', code: `struct Node { int data; struct Node *next; };`, keyPoints: ['Dynamic sizing without contiguous memory.'] },
  { title: '17. Stacks & Queues', summary: 'LIFO & FIFO implementations.', content: 'Abstract data types for linear access.', code: `// Stack push & pop`, keyPoints: ['Stack is LIFO; Queue is FIFO.'] },
  { title: '18. Searching & Sorting', summary: 'Binary Search, Bubble Sort.', content: 'Algorithms for searching and ordering arrays.', code: `// Binary Search O(log N)`, keyPoints: ['Binary Search requires sorted array.'] },
  { title: '19. Command Line Arguments', summary: 'argc and argv.', content: 'Arguments passed from shell to main.', code: `int main(int argc, char *argv[]) {}`, keyPoints: ['argv[0] is program path.'] },
  { title: '20. Advanced Bitwise Tricks', summary: 'Bitwise AND, OR, XOR, shifts.', content: 'Low-level bit manipulation techniques.', code: `int isPowerOf2 = (n > 0) && !(n & (n - 1));`, keyPoints: ['Bitwise operations run in 1 CPU cycle.'] }
];

const CPP_TOPICS = [
  { title: '1. C++ Basics & I/O Streams', summary: 'std::cin, std::cout, namespaces.', content: 'C++ adds OOP and STL to C.', code: `#include <iostream>\nusing namespace std;\nint main() { cout << "C++"; }`, keyPoints: ['cin for input, cout for output.'] },
  { title: '2. References vs Pointers', summary: 'Pass-by-reference (&).', content: 'References create immutable aliases to variables.', code: `void inc(int &val) { val++; }`, keyPoints: ['References cannot be null.'] },
  { title: '3. Vector Dynamic Arrays', summary: 'std::vector, push_back.', content: 'Dynamic contiguous array from STL.', code: `vector<int> v = {1, 2}; v.push_back(3);`, keyPoints: ['Resizes automatically.'] },
  { title: '4. C++ Strings', summary: 'std::string operations.', content: 'Safe high-level string objects.', code: `string s = "AthlosLab"; s += " C++";`, keyPoints: ['Supports + concatenation.'] },
  { title: '5. Classes & Encapsulation', summary: 'Constructors, public/private.', content: 'Classes bundle data and methods.', code: `class Dev { string name; public: Dev(string n):name(n){} };`, keyPoints: ['Constructors initialize state.'] },
  { title: '6. Inheritance & Polymorphism', summary: 'virtual functions, override.', content: 'Derived classes override base methods.', code: `class Shape { public: virtual void draw(){} };`, keyPoints: ['virtual enables dynamic dispatch.'] },
  { title: '7. Templates & Generics', summary: 'Template functions & classes.', content: 'Generic programming with type safety.', code: `template<typename T> T add(T a, T b) { return a+b; }`, keyPoints: ['Write once for all types.'] },
  { title: '8. STL Containers Ecosystem', summary: 'Vector, List, Map, Set.', content: 'Standard data structures library.', code: `#include <vector>\n#include <algorithm>`, keyPoints: ['Iterators bridge containers.'] },
  { title: '9. Map & Unordered Map', summary: 'std::map vs std::unordered_map.', content: 'Key-value associative lookups.', code: `unordered_map<string, int> m; m["a"] = 1;`, keyPoints: ['unordered_map is O(1) average.'] },
  { title: '10. Set & Unordered Set', summary: 'Unique key containers.', content: 'Deduplicated key storage.', code: `set<int> s = {3, 1, 2};`, keyPoints: ['Stores unique items.'] },
  { title: '11. Stack & Queue Adapters', summary: 'stack, queue, priority_queue.', content: 'Restricted access containers.', code: `priority_queue<int> pq; pq.push(10);`, keyPoints: ['priority_queue defaults to Max-Heap.'] },
  { title: '12. Lambda Expressions', summary: 'Anonymous inline functions.', content: 'Inline closures for algorithms.', code: `auto f = [](int x){ return x*2; };`, keyPoints: ['[=] captures by value.'] },
  { title: '13. Smart Pointers', summary: 'unique_ptr, shared_ptr.', content: 'Automatic memory management (RAII).', code: `auto p = make_unique<int>(10);`, keyPoints: ['Prevents memory leaks.'] },
  { title: '14. Exception Handling', summary: 'try, catch, throw.', content: 'Graceful runtime error handling.', code: `try { throw runtime_error("err"); } catch(...) {}`, keyPoints: ['Stack unwinding cleans local scope.'] },
  { title: '15. Operator Overloading', summary: 'Overloading +, ==, <<.', content: 'Redefine standard operators for classes.', code: `Complex operator+(const Complex &c) {}`, keyPoints: ['Maintains natural syntax.'] },
  { title: '16. Move Semantics & Rvalues', summary: 'std::move, && references.', content: 'Transfers resource ownership without copying.', code: `string b = std::move(a);`, keyPoints: ['Eliminates deep copies.'] },
  { title: '17. Fast CP I/O Optimizations', summary: 'sync_with_stdio, cin.tie.', content: 'Faster I/O for competitive coding.', code: `ios_base::sync_with_stdio(false); cin.tie(NULL);`, keyPoints: ['Disables C stdio sync.'] },
  { title: '18. Graph Representation', summary: 'Adjacency lists, BFS, DFS.', content: 'Vector of vectors for graphs.', code: `vector<vector<int>> adj(N);`, keyPoints: ['Memory efficient O(V+E).'] },
  { title: '19. Dynamic Programming', summary: 'Memoization and Tabulation.', content: 'Solving subproblems once.', code: `vector<int> dp(N, -1);`, keyPoints: ['Reduces exponential time.'] },
  { title: '20. Modern C++ Features', summary: 'auto, optional, structured binding.', content: 'C++17 & C++20 modern enhancements.', code: `auto [x, y] = make_pair(1, 2);`, keyPoints: ['Increases code readability.'] }
];

const JAVA_TOPICS = [
  { title: '1. Java Architecture & JVM', summary: 'JDK, JRE, JVM, main method.', content: 'Java runs on JVM bytecode.', code: `public class Main { public static void main(String[] a){ System.out.println("Java"); } }`, keyPoints: ['Platform independent.'] },
  { title: '2. Primitives & Wrapper Classes', summary: 'Autoboxing and Unboxing.', content: 'Primitive types vs Integer, Double objects.', code: `Integer num = 10; int x = num;`, keyPoints: ['Wrappers enable collection usage.'] },
  { title: '3. Strings & StringBuilder', summary: 'String Pool & Mutability.', content: 'Strings are immutable; StringBuilder is mutable.', code: `StringBuilder sb = new StringBuilder("AthlosLab");`, keyPoints: ['Use StringBuilder for loops.'] },
  { title: '4. Encapsulation Principles', summary: 'Private fields, Getters/Setters.', content: 'Encapsulation protects object state.', code: `private int id; public int getId(){ return id; }`, keyPoints: ['Protects state integrity.'] },
  { title: '5. Inheritance & Super', summary: 'extends keyword, super().', content: 'Subclass inherits superclass properties.', code: `class Dog extends Animal {}`, keyPoints: ['Single class inheritance.'] },
  { title: '6. Abstract Classes vs Interfaces', summary: 'abstract & implements.', content: 'Interfaces define behavioral contracts.', code: `interface Runnable { void run(); }`, keyPoints: ['Multiple interface support.'] },
  { title: '7. Polymorphism & Overloading', summary: 'Compile-time vs Runtime polymorphism.', content: 'Methods take multiple behaviors.', code: `int add(int a, int b) { return a+b; }`, keyPoints: ['Overriding uses @Override.'] },
  { title: '8. Collections Framework', summary: 'List, Set, Map hierarchies.', content: 'Unified collection data structures.', code: `List<String> list = new ArrayList<>();`, keyPoints: ['Iterable foundation.'] },
  { title: '9. ArrayList vs LinkedList', summary: 'Random access vs Sequential node.', content: 'ArrayList O(1) read vs LinkedList O(1) insert.', code: `List<Integer> a = new ArrayList<>();`, keyPoints: ['ArrayList uses dynamic array.'] },
  { title: '10. HashMap & HashSet', summary: 'Hash buckets, hashCode(), equals().', content: 'O(1) average key lookups.', code: `Map<String, Integer> map = new HashMap<>();`, keyPoints: ['Override equals and hashCode.'] },
  { title: '11. Generics & Type Safety', summary: 'Generic classes & wildcards.', content: 'Compile-time type checking.', code: `List<String> s = new ArrayList<>();`, keyPoints: ['Prevents ClassCastException.'] },
  { title: '12. Exception Handling', summary: 'Checked vs Unchecked exceptions.', content: 'try-catch-finally block error management.', code: `try { int a = 5/0; } catch(Exception e){}`, keyPoints: ['Checked exceptions require handling.'] },
  { title: '13. Java Streams API', summary: 'Filter, Map, Reduce pipeline.', content: 'Functional processing on collections.', code: `list.stream().filter(x -> x > 2).toList();`, keyPoints: ['Declarative functional pipelines.'] },
  { title: '14. Optional Class', summary: 'Optional.ofNullable, orElse.', content: 'Prevents NullPointerExceptions.', code: `Optional<String> opt = Optional.ofNullable(val);`, keyPoints: ['Eliminates null checks.'] },
  { title: '15. Multithreading & Runnable', summary: 'Thread lifecycle, start().', content: 'Concurrent task execution.', code: `new Thread(() -> System.out.println("Run")).start();`, keyPoints: ['start() launches new thread.'] },
  { title: '16. Synchronization', summary: 'synchronized keyword & locks.', content: 'Prevents multithreaded race conditions.', code: `public synchronized void inc() { count++; }`, keyPoints: ['Thread safety on shared state.'] },
  { title: '17. JVM Garbage Collection', summary: 'Heap management & GC algorithms.', content: 'Automatic unreferenced memory cleanup.', code: `String s = new String(); s = null;`, keyPoints: ['Heap stores objects.'] },
  { title: '18. File NIO.2 API', summary: 'Files, Paths, BufferedReader.', content: 'High performance file read/write.', code: `Files.readAllLines(Paths.get("f.txt"));`, keyPoints: ['Non-blocking file operations.'] },
  { title: '19. Reflection API', summary: 'Runtime class inspection.', content: 'Inspect methods and fields dynamically.', code: `Class<?> c = Class.forName("com.User");`, keyPoints: ['Used by Spring framework.'] },
  { title: '20. Modern Java Records', summary: 'Records (Java 17+ DTOs).', content: 'Immutable data transfer objects.', code: `public record UserDto(Long id, String name) {}`, keyPoints: ['Auto getters, equals, toString.'] }
];

const PYTHON_TOPICS = [
  { title: '1. Python Syntax & Dynamic Typing', summary: 'Indentation, dynamic types, print/input.', content: 'Python is an expressive dynamically-typed language.', code: `name = "AthlosLab"\nprint(f"Welcome {name}")`, keyPoints: ['Indentation dictates blocks.'] },
  { title: '2. Lists & List Comprehensions', summary: 'Slicing and list comprehensions.', content: 'Mutable ordered dynamic sequences.', code: `evens = [x for x in range(10) if x % 2 == 0]`, keyPoints: ['[start:stop:step] slicing.'] },
  { title: '3. Tuples & Unpacking', summary: 'Immutable tuples and unpacking.', content: 'Fixed immutable sequence collections.', code: `x, y = (10, 20)`, keyPoints: ['Unpacks values into variables.'] },
  { title: '4. Dictionaries & Sets', summary: 'dict key-value mapping, set math.', content: 'Fast hash map and set operations.', code: `d = {"a": 1}; print(d.get("a"))`, keyPoints: ['O(1) average lookup.'] },
  { title: '5. Control Flow & Ternary', summary: 'if-elif-else, match-case.', content: 'Decision structures and inline conditionals.', code: `status = "Ok" if x > 0 else "Fail"`, keyPoints: ['Clean ternary syntax.'] },
  { title: '6. Loops & Enumerate/Zip', summary: 'for, while, range, enumerate, zip.', content: 'Iterate cleanly over sequences.', code: `for idx, val in enumerate(["a", "b"]): print(idx, val)`, keyPoints: ['enumerate gives index & item.'] },
  { title: '7. Functions & *args, **kwargs', summary: 'Flexible parameter passing.', content: 'Pack positional and keyword arguments.', code: `def fn(*args, **kwargs): pass`, keyPoints: ['*args tuple, **kwargs dict.'] },
  { title: '8. Lambda & Map/Filter', summary: 'Anonymous inline functions.', content: 'Functional mapping and filtering.', code: `sq = list(map(lambda x: x**2, [1, 2, 3]))`, keyPoints: ['One-line anonymous functions.'] },
  { title: '9. Classes & self', summary: 'OOP classes and __init__.', content: 'Object-oriented programming in Python.', code: `class Dev:\n    def __init__(self, n): self.n = n`, keyPoints: ['self points to instance.'] },
  { title: '10. Inheritance & Dunder Methods', summary: '__str__, __len__, __add__.', content: 'Custom magic methods for operators.', code: `def __str__(self): return self.name`, keyPoints: ['Dunder methods customize behavior.'] },
  { title: '11. Decorators & Wrappers', summary: '@decorator function wrapping.', content: 'Enhance function behaviors dynamically.', code: `@log\ndef task(): pass`, keyPoints: ['Wraps target function.'] },
  { title: '12. Generators & Yield', summary: 'Lazy evaluation with yield.', content: 'Memory efficient sequential generation.', code: `def gen(): yield 1; yield 2`, keyPoints: ['Generates items on demand.'] },
  { title: '13. Exception Handling', summary: 'try-except-else-finally.', content: 'Runtime error handling structure.', code: `try: x = 1/0\nexcept ZeroDivisionError: pass`, keyPoints: ['finally always runs.'] },
  { title: '14. Context Managers (with)', summary: '__enter__ and __exit__ cleanup.', content: 'Guaranteed resource management.', code: `with open("a.txt", "w") as f: f.write("hi")`, keyPoints: ['Auto closes files.'] },
  { title: '15. Modules & Imports', summary: 'import, __name__ == "__main__".', content: 'Organizing code across modules.', code: `import math\nif __name__ == "__main__": pass`, keyPoints: ['Script entry point check.'] },
  { title: '16. Collections Module', summary: 'Counter, defaultdict, deque.', content: 'Specialized container data types.', code: `from collections import Counter\nc = Counter("abc")`, keyPoints: ['Counter counts items.'] },
  { title: '17. Itertools & Functools', summary: 'lru_cache, permutations.', content: 'Memoization and combinatorics.', code: `from functools import lru_cache\n@lru_cache(None)\ndef fib(n): pass`, keyPoints: ['@lru_cache caches outputs.'] },
  { title: '18. Asyncio & Async/Await', summary: 'Coroutines and event loops.', content: 'Asynchronous non-blocking concurrency.', code: `async def main(): await asyncio.sleep(1)`, keyPoints: ['Non-blocking I/O tasks.'] },
  { title: '19. Type Hinting & Dataclasses', summary: '@dataclass and typing.', content: 'Type annotations and simple DTOs.', code: `@dataclass\nclass Point:\n    x: int\n    y: int`, keyPoints: ['Auto generates __init__.'] },
  { title: '20. Performance & Multiprocessing', summary: 'GIL, multiprocessing vs threading.', content: 'Optimizing CPU-bound performance.', code: `from multiprocessing import Process`, keyPoints: ['Bypasses CPython GIL lock.'] }
];

export const LANGUAGES = {
  c: buildLanguageData('c', 'C Language', 'Procedural Programming & Memory Control', '#818CF8', 'lang-c', 'Master manual memory allocation, pointers, and foundational architecture.', C_TOPICS),
  cpp: buildLanguageData('cpp', 'C++ Language', 'Object-Oriented Programming & High-Performance STL', '#67E8F9', 'lang-cpp', 'Harness C++ STL containers, templates, and competitive programming algorithms.', CPP_TOPICS),
  java: buildLanguageData('java', 'Java Language', 'Enterprise Object-Oriented Architecture & JVM', '#FDE047', 'lang-java', 'Build enterprise software, master collections, multithreading, and OOP design.', JAVA_TOPICS),
  python: buildLanguageData('python', 'Python Language', 'High-Level Elegance & Scripting Power', '#6EE7B7', 'lang-python', 'Focus on clean algorithmic logic, data structures, and rapid execution.', PYTHON_TOPICS)
};
