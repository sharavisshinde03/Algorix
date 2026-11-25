export interface LessonContent {
  concept: string;
  explanation: string;
  points: string[];
  javaExample: string;
  question: string;
  options: string[];
  answerIndex: number;
  answerExplanation: string;
}

export const lessonCatalog: Record<string, LessonContent> = {
  "java-intro": {
    concept: "Programming turns problems into executable instructions.",
    explanation: "A program is an ordered set of instructions. A computer receives input, processes it using logic, and produces output. Java lets us express these instructions using classes, methods and statements.",
    points: ["Identify the problem", "Design step-by-step logic", "Write Java instructions", "Compile and execute the program"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int price = 100;
        int quantity = 3;
        int total = price * quantity;
        System.out.println(total);
    }
}`,
    question: "What is the primary purpose of a computer program?",
    options: ["To provide executable instructions", "To manufacture hardware", "To increase internet speed", "To store electricity"],
    answerIndex: 0,
    answerExplanation: "A program contains instructions that a computer executes to perform a task."
  },

  "java-setup": {
    concept: "The JDK provides the tools needed to develop Java applications.",
    explanation: "The JDK includes the Java compiler and runtime tools. The compiler converts source code into bytecode. The JVM executes bytecode on a compatible platform. An IDE helps write, debug and organize code.",
    points: ["Install a compatible JDK", "Configure JAVA_HOME if needed", "Verify with java -version", "Compile using javac and run using java"],
    javaExample: `// Save as Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("Java environment ready");
    }
}

// Terminal:
// javac Main.java
// java Main`,
    question: "Which component executes Java bytecode?",
    options: ["JVM", "JDK compiler", "Text editor", "HTML parser"],
    answerIndex: 0,
    answerExplanation: "The Java Virtual Machine executes bytecode. The JDK supplies development tools, including the compiler."
  },

  "java-syntax": {
    concept: "Java syntax defines how valid programs are structured.",
    explanation: "Java programs organize code into classes and methods. Statements commonly end with semicolons, blocks use braces, and identifiers are case-sensitive. Comments document code but are ignored by the compiler.",
    points: ["Declare a class", "Define the main method", "Use braces for blocks", "Terminate statements with semicolons"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        // This is a single-line comment
        System.out.println("Valid Java syntax");
    }
}`,
    question: "Which symbol normally terminates a Java statement?",
    options: [";", ":", "#", ","],
    answerIndex: 0,
    answerExplanation: "A semicolon terminates most Java statements."
  },

  "java-variables": {
    concept: "Variables store values using declared data types.",
    explanation: "A variable is a named storage location. Java primitive types include int, double, char and boolean. Reference variables refer to objects. Choosing an appropriate type improves clarity and prevents invalid operations.",
    points: ["Declare a type and variable name", "Assign a value", "Use the variable in expressions", "Choose a type that fits the data"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        double score = 91.5;
        char grade = 'A';
        boolean passed = true;

        System.out.println(age);
        System.out.println(score);
        System.out.println(grade);
        System.out.println(passed);
    }
}`,
    question: "Which Java type stores true or false?",
    options: ["boolean", "char", "double", "String"],
    answerIndex: 0,
    answerExplanation: "The boolean primitive type stores either true or false."
  },

  "java-operators": {
    concept: "Operators combine values to produce expressions.",
    explanation: "Arithmetic operators perform calculations. Relational operators compare values. Logical operators combine boolean conditions. Assignment operators update variables, while precedence determines evaluation order.",
    points: ["Arithmetic: +, -, *, /, %", "Relational: ==, !=, <, >", "Logical: &&, ||, !", "Use parentheses to make precedence clear"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int a = 12, b = 5;
        System.out.println(a + b);
        System.out.println(a % b);
        System.out.println(a > b);
        System.out.println(a > 10 && b < 10);
    }
}`,
    question: "What is the result of 12 % 5?",
    options: ["2", "2.4", "5", "0"],
    answerIndex: 0,
    answerExplanation: "The modulus operator returns the remainder. Dividing 12 by 5 leaves a remainder of 2."
  },

  "java-input": {
    concept: "Input and output allow programs to interact with users.",
    explanation: "Scanner reads input from sources such as System.in. Methods such as nextInt and nextLine read different kinds of input. System.out.println displays output, while printf supports formatted output.",
    points: ["Import java.util.Scanner", "Create a Scanner using System.in", "Read values with suitable methods", "Close the Scanner when finished"],
    javaExample: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int number = sc.nextInt();
        System.out.println("Square = " + number * number);
        sc.close();
    }
}`,
    question: "Which Scanner method reads an integer?",
    options: ["nextInt()", "nextLine()", "nextBoolean()", "printInt()"],
    answerIndex: 0,
    answerExplanation: "Scanner.nextInt() reads the next token as an integer."
  },

  "java-conditionals": {
    concept: "Conditional statements choose which instructions execute.",
    explanation: "An if statement executes a block when a boolean condition is true. Else provides an alternative. Else-if handles multiple conditions, and switch selects among matching cases.",
    points: ["Evaluate a boolean condition", "Execute the matching branch", "Use else for alternatives", "Use switch for multiple discrete cases"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int marks = 78;

        if (marks >= 90) {
            System.out.println("A");
        } else if (marks >= 60) {
            System.out.println("B");
        } else {
            System.out.println("C");
        }
    }
}`,
    question: "Which statement handles an alternative when an if condition is false?",
    options: ["else", "break", "continue", "import"],
    answerIndex: 0,
    answerExplanation: "The else block executes when the preceding if condition is false."
  },

  "java-loops": {
    concept: "Loops repeat instructions while a condition or iteration rule applies.",
    explanation: "A for loop is useful when the iteration structure is known. A while loop checks its condition before each iteration. A do-while loop executes at least once. Nested loops place one loop inside another.",
    points: ["Initialize loop state", "Check the continuation condition", "Execute the loop body", "Update state to avoid infinite loops"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}`,
    question: "Which loop always executes its body at least once?",
    options: ["do-while", "while", "for", "enhanced for"],
    answerIndex: 0,
    answerExplanation: "A do-while loop checks its condition after executing its body."
  },

  "java-methods": {
    concept: "Methods package reusable operations behind a named interface.",
    explanation: "A method can accept parameters, execute statements and return a value. The return type describes the result. Method overloading allows multiple methods with the same name but different parameter lists.",
    points: ["Declare a return type", "Choose a method name", "Define parameters", "Return a value when required"],
    javaExample: `public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(7, 5));
    }
}`,
    question: "What does a method's return type specify?",
    options: ["The type of value it returns", "The number of classes", "The file size", "The loop count"],
    answerIndex: 0,
    answerExplanation: "The return type specifies the kind of value returned by a method. void means it returns no value."
  },

  "java-arrays": {
    concept: "Arrays store a fixed-size sequence of elements of one type.",
    explanation: "An array stores elements in indexed positions starting at zero. Its length is fixed after creation. Traversal visits elements, and accessing an invalid index causes an ArrayIndexOutOfBoundsException.",
    points: ["Declare an array type", "Create an array with a size or initializer", "Access elements using indexes", "Traverse using loops"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int[] values = {4, 8, 12, 16};
        int sum = 0;

        for (int value : values) {
            sum += value;
        }

        System.out.println(sum);
    }
}`,
    question: "What is the index of the first element in a Java array?",
    options: ["0", "1", "-1", "Depends on its size"],
    answerIndex: 0,
    answerExplanation: "Java arrays are zero-indexed, so the first element is at index 0."
  },

  "java-strings": {
    concept: "Strings represent text and are immutable in Java.",
    explanation: "String objects cannot be modified after creation. Operations such as concatenation produce new strings. Use equals to compare string contents. StringBuilder is useful when repeatedly modifying text.",
    points: ["Create strings using literals or constructors", "Compare contents with equals", "Use substring and other methods", "Use StringBuilder for repeated changes"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        String word = "Algo";
        StringBuilder result = new StringBuilder(word);
        result.append("rix");

        System.out.println(result);
        System.out.println(word.equals("Algo"));
    }
}`,
    question: "Which class is designed for efficient mutable text construction?",
    options: ["StringBuilder", "String", "Integer", "Scanner"],
    answerIndex: 0,
    answerExplanation: "StringBuilder allows a sequence of characters to be modified without creating a new String for every change."
  },

  "java-oop": {
    concept: "Object-oriented programming models software using objects and classes.",
    explanation: "A class defines fields and methods. An object is an instance of a class. Objects combine state and behavior, helping organize larger programs into reusable components.",
    points: ["Define a class", "Declare fields for state", "Add methods for behavior", "Create objects using new"],
    javaExample: `class Student {
    String name;

    void introduce() {
        System.out.println("I am " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Asha";
        s.introduce();
    }
}`,
    question: "What is an object?",
    options: ["An instance of a class", "A Java comment", "A compiler error", "A package name"],
    answerIndex: 0,
    answerExplanation: "An object is a concrete instance created from a class definition."
  },

  "java-constructors": {
    concept: "Constructors initialize newly created objects.",
    explanation: "A constructor has the same name as its class and no return type. Java provides a default constructor when no constructor is declared. Constructors can be overloaded to support different initialization options.",
    points: ["Use the class name", "Do not declare a return type", "Initialize object fields", "Overload constructors when useful"],
    javaExample: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Mira", 20);
        System.out.println(s.name);
    }
}`,
    question: "What distinguishes a constructor from an ordinary method?",
    options: ["It has the class name and no return type", "It must return int", "It must be static", "It is called only by the compiler"],
    answerIndex: 0,
    answerExplanation: "A constructor uses the class name and has no declared return type."
  },

  "java-encapsulation": {
    concept: "Encapsulation protects object state behind controlled methods.",
    explanation: "Encapsulation commonly uses private fields and public methods. Getters expose values and setters validate updates. This prevents unrelated code from changing internal state arbitrarily.",
    points: ["Make internal fields private", "Expose required operations", "Validate values in setters", "Keep object invariants consistent"],
    javaExample: `class BankAccount {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.deposit(500);
        System.out.println(account.getBalance());
    }
}`,
    question: "Which access modifier is commonly used to hide an object's fields?",
    options: ["private", "public", "protected", "static"],
    answerIndex: 0,
    answerExplanation: "Private fields cannot be accessed directly from unrelated classes, helping protect object state."
  },

  "java-inheritance": {
    concept: "Inheritance lets a class reuse and extend another class.",
    explanation: "A subclass uses extends to inherit accessible members from a superclass. The super keyword refers to superclass constructors or members. Java supports single class inheritance, while interfaces allow multiple type contracts.",
    points: ["Create a superclass", "Extend it with a subclass", "Reuse inherited behavior", "Use super to access superclass functionality"],
    javaExample: `class Animal {
    void eat() {
        System.out.println("Eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();
        dog.bark();
    }
}`,
    question: "Which keyword creates a Java class subclass?",
    options: ["extends", "implements", "inherits", "super"],
    answerIndex: 0,
    answerExplanation: "A class uses extends to inherit from another class."
  },

  "java-polymorphism": {
    concept: "Polymorphism allows one interface to represent different implementations.",
    explanation: "Overloading selects a method using its parameter list at compile time. Overriding lets a subclass provide a new implementation of an inherited method. Dynamic dispatch chooses an overridden instance method at runtime.",
    points: ["Understand method overloading", "Override inherited methods", "Use superclass references", "Observe runtime method dispatch"],
    javaExample: `class Animal {
    void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal pet = new Dog();
        pet.sound();
    }
}`,
    question: "What happens when an overridden instance method is called through a superclass reference?",
    options: ["The runtime object implementation executes", "The superclass version always executes", "The program cannot compile", "Both methods execute"],
    answerIndex: 0,
    answerExplanation: "Dynamic dispatch selects the overridden method based on the actual runtime object."
  },

  "java-abstraction": {
    concept: "Abstraction exposes essential behavior while hiding implementation details.",
    explanation: "Abstract classes can contain abstract and concrete methods. Interfaces define contracts that implementing classes must fulfill. Abstraction allows code to depend on behavior rather than implementation details.",
    points: ["Identify essential behavior", "Define an interface or abstract class", "Implement required methods", "Program against abstractions"],
    javaExample: `interface Shape {
    double area();
}

class Circle implements Shape {
    private double radius;

    Circle(double radius) {
        this.radius = radius;
    }

    public double area() {
        return Math.PI * radius * radius;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle(2);
        System.out.println(s.area());
    }
}`,
    question: "Which keyword declares that a class implements an interface?",
    options: ["implements", "extends", "interface", "abstract"],
    answerIndex: 0,
    answerExplanation: "A class uses implements to provide the behavior required by an interface."
  },

  "java-static": {
    concept: "Static members belong to the class rather than individual objects.",
    explanation: "A static field is shared by instances of a class. Static methods can be called using the class name and cannot directly access instance members. The final keyword prevents reassignment of a variable after initialization.",
    points: ["Declare class-level members with static", "Access static members using the class", "Use final for non-reassignable variables", "Keep shared state intentional"],
    javaExample: `class Counter {
    static int count = 0;

    Counter() {
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        System.out.println(Counter.count);
    }
}`,
    question: "How many copies of a static field exist per loaded class?",
    options: ["One shared class-level field", "One for every object", "One for every method call", "None"],
    answerIndex: 0,
    answerExplanation: "A static field belongs to the class and is shared by its instances."
  },

  "java-exceptions": {
    concept: "Exception handling manages errors that occur during execution.",
    explanation: "A try block contains risky operations. Catch handles matching exceptions. Finally is used for cleanup. Throw explicitly raises an exception, while throws declares possible exceptions in a method signature.",
    points: ["Identify operations that may fail", "Place them in try", "Handle expected exceptions in catch", "Release resources safely"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } finally {
            System.out.println("Finished");
        }
    }
}`,
    question: "Which block handles an exception thrown in a try block?",
    options: ["catch", "finally", "class", "package"],
    answerIndex: 0,
    answerExplanation: "A matching catch block handles the exception thrown from its associated try block."
  },

  "java-generics": {
    concept: "Generics provide reusable classes and methods with compile-time type safety.",
    explanation: "A generic type uses type parameters such as T. Collections can specify the element type they hold. Generics reduce unsafe casts and help detect type mismatches during compilation.",
    points: ["Declare a type parameter", "Use parameterized types", "Avoid unnecessary casts", "Use bounds when a type capability is required"],
    javaExample: `class Box<T> {
    private T value;

    void set(T value) {
        this.value = value;
    }

    T get() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Box<Integer> box = new Box<>();
        box.set(42);
        System.out.println(box.get());
    }
}`,
    question: "What does T commonly represent in a generic class?",
    options: ["A type parameter", "A fixed integer", "A thread", "A constructor"],
    answerIndex: 0,
    answerExplanation: "T is a conventional name for a generic type parameter."
  },

  "java-collections": {
    concept: "The Collections Framework provides reusable data structures and algorithms.",
    explanation: "List preserves order and permits duplicates. Set stores unique elements. Map associates keys with values. Choose an implementation based on ordering, lookup and update requirements.",
    points: ["Use List for ordered elements", "Use Set for uniqueness", "Use Map for key-value associations", "Select implementations based on performance needs"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Asha");
        names.add("Ravi");

        Set<String> unique = new HashSet<>(names);
        Map<Integer, String> students = new HashMap<>();
        students.put(1, "Asha");

        System.out.println(unique);
        System.out.println(students.get(1));
    }
}`,
    question: "Which collection interface stores unique elements?",
    options: ["Set", "List", "Queue", "Map"],
    answerIndex: 0,
    answerExplanation: "Set represents a collection that does not contain duplicate elements."
  },

  "java-list": {
    concept: "ArrayList and LinkedList implement the List interface with different trade-offs.",
    explanation: "ArrayList uses a resizable array, providing fast indexed access. LinkedList uses linked nodes and supports efficient operations at its ends. Inserting into the middle of an ArrayList may require shifting elements.",
    points: ["Use List as the interface", "Use ArrayList for frequent indexed access", "Use LinkedList for suitable end operations", "Measure performance for the actual workload"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> values = new ArrayList<>();
        values.add(10);
        values.add(20);
        values.add(1, 15);

        System.out.println(values.get(1));
        System.out.println(values);
    }
}`,
    question: "Which structure typically provides constant-time indexed access?",
    options: ["ArrayList", "LinkedList", "TreeSet", "HashSet"],
    answerIndex: 0,
    answerExplanation: "ArrayList uses an array internally, so indexed access is typically O(1)."
  },

  "java-stack-queue": {
    concept: "Stacks and queues organize elements according to different access rules.",
    explanation: "A stack follows last-in, first-out. A queue follows first-in, first-out. Java's Deque interface can implement both stack and queue behavior and is generally preferred over the legacy Stack class.",
    points: ["Stack: push and pop", "Queue: offer and poll", "Deque supports both ends", "Choose the structure based on processing order"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.push(20);
        System.out.println(stack.pop());

        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(10);
        queue.offer(20);
        System.out.println(queue.poll());
    }
}`,
    question: "Which structure follows FIFO order?",
    options: ["Queue", "Stack", "Binary tree", "Hash set"],
    answerIndex: 0,
    answerExplanation: "A queue processes the first element inserted before later elements: first-in, first-out."
  },

  "java-map-set": {
    concept: "HashMap and HashSet use hashing for efficient average-case lookup.",
    explanation: "HashMap stores key-value pairs and uses hash codes to locate buckets. HashSet stores unique values and is backed by a HashMap. Collisions occur when keys map to the same bucket and are handled internally.",
    points: ["Understand hashCode and equals", "Use put and get with HashMap", "Use add and contains with HashSet", "Remember that hash-based iteration order is not guaranteed"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Asha", 90);
        scores.put("Ravi", 85);

        Set<String> names = new HashSet<>(scores.keySet());

        System.out.println(scores.get("Asha"));
        System.out.println(names.contains("Ravi"));
    }
}`,
    question: "What does HashSet guarantee?",
    options: ["No duplicate elements", "Sorted elements", "Index-based access", "FIFO ordering"],
    answerIndex: 0,
    answerExplanation: "HashSet stores unique elements and does not guarantee sorted or insertion order."
  },

  "java-io": {
    concept: "Java I/O reads and writes data through streams and file APIs.",
    explanation: "Byte streams handle binary data, while character streams handle text. Buffered streams improve efficiency for repeated operations. Modern file operations can use java.nio.file.Files and Path.",
    points: ["Represent file locations with Path", "Use Files for common operations", "Handle IOException", "Use try-with-resources for automatic closing"],
    javaExample: `import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Path file = Path.of("notes.txt");
        Files.writeString(file, "Learning Java I/O");
        String content = Files.readString(file);
        System.out.println(content);
    }
}`,
    question: "Which Java class represents a file-system path?",
    options: ["Path", "Scanner", "StringBuilder", "Thread"],
    answerIndex: 0,
    answerExplanation: "java.nio.file.Path represents a path in the file system."
  },

  "ds-arrays": {
    concept: "Array operations trade fast indexing for fixed-size storage.",
    explanation: "Accessing an array element by index takes O(1). Traversal takes O(n). Inserting or deleting in the middle generally requires shifting elements and takes O(n).",
    points: ["Access by index in O(1)", "Traverse in O(n)", "Shift elements for middle insertion", "Track logical size separately when using a fixed array"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int[] a = {10, 20, 30, 40};
        int target = 30;
        int index = -1;

        for (int i = 0; i < a.length; i++) {
            if (a[i] == target) {
                index = i;
                break;
            }
        }

        System.out.println(index);
    }
}`,
    question: "What is the time complexity of accessing an array element by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    answerIndex: 0,
    answerExplanation: "An array computes the memory location of an indexed element directly, giving O(1) access."
  },

  "ds-linked-lists": {
    concept: "Linked lists connect nodes using references rather than contiguous array positions.",
    explanation: "A singly linked node stores data and a next reference. A doubly linked node also stores previous. Linked lists support flexible size, but finding an element by position requires traversal.",
    points: ["Create nodes", "Connect next references", "Traverse from the head", "Update links carefully during insertion and deletion"],
    javaExample: `class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
    }
}

public class Main {
    public static void main(String[] args) {
        Node head = new Node(10);
        head.next = new Node(20);
        head.next.next = new Node(30);

        for (Node current = head; current != null; current = current.next) {
            System.out.println(current.data);
        }
    }
}`,
    question: "What does a node in a singly linked list contain?",
    options: ["Data and a next reference", "Only an array index", "Two child nodes", "A hash table"],
    answerIndex: 0,
    answerExplanation: "A singly linked list node stores its value and a reference to the next node."
  },

  "ds-stacks": {
    concept: "A stack processes elements in last-in, first-out order.",
    explanation: "Push inserts at the top, pop removes the top, and peek inspects it. These operations are O(1) for a typical stack implementation. Stacks support undo, parsing and depth-first search.",
    points: ["Push an element", "Pop the most recent element", "Peek without removing", "Check emptiness before removal"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Deque<String> stack = new ArrayDeque<>();
        stack.push("First");
        stack.push("Second");
        System.out.println(stack.peek());
        System.out.println(stack.pop());
    }
}`,
    question: "Which element does pop remove?",
    options: ["The top element", "The oldest element", "The middle element", "A random element"],
    answerIndex: 0,
    answerExplanation: "A stack removes the most recently inserted element at its top."
  },

  "ds-queues": {
    concept: "A queue processes elements in first-in, first-out order.",
    explanation: "Enqueue adds at the rear and dequeue removes from the front. Circular queues reuse array positions by wrapping indexes. Priority queues remove elements according to priority rather than insertion order.",
    points: ["Insert at the rear", "Remove from the front", "Use circular indexing to reuse capacity", "Use a priority queue for priority-based processing"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(5);
        queue.offer(10);
        queue.offer(15);

        System.out.println(queue.poll());
        System.out.println(queue.peek());
    }
}`,
    question: "Which queue operation removes the front element?",
    options: ["poll()", "push()", "peekLast()", "addFirst()"],
    answerIndex: 0,
    answerExplanation: "Queue.poll() retrieves and removes the head, returning null if the queue is empty."
  },

  "ds-hashing": {
    concept: "Hashing maps keys to locations to support efficient lookup.",
    explanation: "A hash function transforms a key into a hash value. A table maps that value to a bucket. Collisions can be handled using chaining or open addressing. Performance depends on the hash function and load factor.",
    points: ["Compute a hash value", "Map it to a bucket", "Resolve collisions", "Resize when the load factor becomes high"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> frequency = new HashMap<>();
        String[] words = {"java", "code", "java"};

        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }

        System.out.println(frequency);
    }
}`,
    question: "What is a hash collision?",
    options: ["Different keys mapping to the same bucket", "Two arrays having equal length", "A sorting operation", "A missing loop condition"],
    answerIndex: 0,
    answerExplanation: "A collision occurs when distinct keys map to the same hash-table bucket."
  },

  "ds-trees": {
    concept: "Trees represent hierarchical relationships using connected nodes.",
    explanation: "A binary tree node has at most two children. The root is the top node, leaves have no children, and subtrees are rooted portions of a tree. Traversals include preorder, inorder, postorder and level order.",
    points: ["Identify root and child nodes", "Understand parent and leaf relationships", "Traverse recursively", "Use level-order traversal with a queue"],
    javaExample: `class Node {
    int value;
    Node left, right;

    Node(int value) {
        this.value = value;
    }
}

public class Main {
    static void inorder(Node node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.value + " ");
        inorder(node.right);
    }

    public static void main(String[] args) {
        Node root = new Node(2);
        root.left = new Node(1);
        root.right = new Node(3);
        inorder(root);
    }
}`,
    question: "How many children can a binary tree node have at most?",
    options: ["2", "1", "3", "Unlimited"],
    answerIndex: 0,
    answerExplanation: "A binary tree node has at most two children, conventionally called left and right."
  },

  "ds-bst": {
    concept: "A Binary Search Tree orders values to support efficient search.",
    explanation: "For each BST node, values in the left subtree are smaller and values in the right subtree are larger, under the chosen duplicate policy. Search, insertion and deletion take O(h), where h is tree height.",
    points: ["Compare the target with the current node", "Move left for smaller values", "Move right for larger values", "Understand that an unbalanced BST can become O(n)"],
    javaExample: `class Node {
    int value;
    Node left, right;
    Node(int value) { this.value = value; }
}

public class Main {
    static boolean search(Node root, int target) {
        while (root != null) {
            if (root.value == target) return true;
            root = target < root.value ? root.left : root.right;
        }
        return false;
    }
}`,
    question: "Where do smaller values belong in a standard BST?",
    options: ["Left subtree", "Right subtree", "Always at the root", "In a separate queue"],
    answerIndex: 0,
    answerExplanation: "A standard BST stores smaller values in the left subtree and larger values in the right subtree."
  },

  "ds-heaps": {
    concept: "A heap maintains a priority relationship between parent and child nodes.",
    explanation: "A min-heap keeps the smallest element at the root; a max-heap keeps the largest. A binary heap is commonly stored in an array. Insertion and root removal take O(log n), while inspecting the root takes O(1).",
    points: ["Maintain the heap property", "Insert and sift up", "Remove the root and sift down", "Use a priority queue for scheduling and selection"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(30);
        minHeap.offer(10);
        minHeap.offer(20);

        System.out.println(minHeap.peek());
        System.out.println(minHeap.poll());
    }
}`,
    question: "What is at the root of a Java PriorityQueue using its default ordering?",
    options: ["The smallest element", "The largest element", "The oldest element", "A random element"],
    answerIndex: 0,
    answerExplanation: "Java's default PriorityQueue is a min-priority queue under natural ordering."
  },

  "ds-graphs": {
    concept: "Graphs model relationships between vertices using edges.",
    explanation: "A graph can be directed or undirected, weighted or unweighted. An adjacency list stores each vertex's neighbors and is often space-efficient for sparse graphs. An adjacency matrix offers constant-time edge checks.",
    points: ["Identify vertices and edges", "Choose directed or undirected representation", "Use adjacency lists for sparse graphs", "Use matrices when dense edge lookup is useful"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < 4; i++) graph.add(new ArrayList<>());

        graph.get(0).add(1);
        graph.get(0).add(2);
        graph.get(1).add(3);

        System.out.println(graph.get(0));
    }
}`,
    question: "Which representation stores a list of neighbors for each vertex?",
    options: ["Adjacency list", "Stack", "Segment tree", "Hash function"],
    answerIndex: 0,
    answerExplanation: "An adjacency list stores each vertex's outgoing or incident neighbors."
  },

  "ds-search-sort": {
    concept: "Searching locates values, while sorting arranges values into an order.",
    explanation: "Linear search checks elements sequentially in O(n). Binary search repeatedly halves a sorted search interval in O(log n). Sorting algorithms differ in stability, memory use and time complexity.",
    points: ["Use linear search for general unsorted data", "Sort before applying binary search", "Maintain binary-search boundaries correctly", "Compare sorting algorithms by complexity and stability"],
    javaExample: `public class Main {
    static int binarySearch(int[] a, int target) {
        int left = 0, right = a.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (a[mid] == target) return mid;
            if (a[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(binarySearch(new int[]{2, 4, 6, 8}, 6));
    }
}`,
    question: "What condition must hold before ordinary binary search is applied?",
    options: ["The data is sorted", "The data contains no integers", "The array length is even", "Every value is unique"],
    answerIndex: 0,
    answerExplanation: "Binary search relies on sorted order to discard half of the remaining search interval."
  },

  "adv-recursion": {
    concept: "Recursion solves a problem by calling the same method on smaller inputs.",
    explanation: "A recursive method needs a base case to stop and a recursive step that moves toward it. Calls are stored on the call stack. Recurrence relations help describe recursive time complexity.",
    points: ["Define a base case", "Reduce the problem size", "Combine or return subproblem results", "Track call-stack space"],
    javaExample: `public class Main {
    static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));
    }
}`,
    question: "Why does a recursive function need a base case?",
    options: ["To stop recursive calls", "To create a new class", "To sort the input", "To allocate an array"],
    answerIndex: 0,
    answerExplanation: "The base case terminates recursion for sufficiently small inputs."
  },

  "adv-backtracking": {
    concept: "Backtracking explores choices and reverses choices when they cannot lead to a solution.",
    explanation: "Backtracking builds a candidate solution incrementally. At each step it chooses an option, explores it, and undoes the choice. Pruning avoids exploring branches that violate constraints.",
    points: ["Choose a candidate", "Check whether it is valid", "Explore recursively", "Undo the choice before trying another"],
    javaExample: `import java.util.*;

public class Main {
    static void subsets(int[] a, int index, List<Integer> path) {
        if (index == a.length) {
            System.out.println(path);
            return;
        }

        subsets(a, index + 1, path);
        path.add(a[index]);
        subsets(a, index + 1, path);
        path.remove(path.size() - 1);
    }

    public static void main(String[] args) {
        subsets(new int[]{1, 2}, 0, new ArrayList<>());
    }
}`,
    question: "What is the purpose of undoing a choice in backtracking?",
    options: ["To explore another candidate branch", "To permanently stop the search", "To sort all candidates", "To remove the base case"],
    answerIndex: 0,
    answerExplanation: "Undoing a choice restores the previous state so another candidate can be explored."
  },

  "adv-greedy": {
    concept: "Greedy algorithms make locally optimal choices according to a strategy.",
    explanation: "A greedy algorithm commits to a choice at each step. It is correct only when the problem has properties that make those local choices lead to a global optimum. Exchange arguments and greedy-choice proofs are common techniques.",
    points: ["Define the local choice rule", "Choose the best available candidate", "Prove the choice is safe", "Analyze sorting and selection costs"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] coins = {10, 5, 1};
        int amount = 28;
        int count = 0;

        for (int coin : coins) {
            count += amount / coin;
            amount %= coin;
        }

        System.out.println(count);
    }
}`,
    question: "What must be established before trusting a greedy strategy?",
    options: ["That its choices produce an optimal solution", "That recursion is used", "That the input is always random", "That every loop is constant time"],
    answerIndex: 0,
    answerExplanation: "A greedy strategy needs a correctness argument showing that local choices can produce a global optimum."
  },

  "adv-dp": {
    concept: "Dynamic programming stores solutions to overlapping subproblems.",
    explanation: "Dynamic programming is useful when subproblems overlap and the problem has optimal substructure. Memoization stores recursive results; tabulation builds results iteratively. Define a state, transition and base cases.",
    points: ["Define the DP state", "Write the recurrence or transition", "Set base cases", "Choose memoization or tabulation"],
    javaExample: `public class Main {
    public static void main(String[] args) {
        int n = 7;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        System.out.println(dp[n]);
    }
}`,
    question: "What does memoization store?",
    options: ["Previously computed subproblem results", "Only input variable names", "Every possible permutation", "Compiler warnings"],
    answerIndex: 0,
    answerExplanation: "Memoization caches results so the same subproblem does not need to be solved repeatedly."
  },

  "adv-graphs": {
    concept: "Advanced graph algorithms solve traversal, connectivity and shortest-path problems.",
    explanation: "BFS explores by distance in an unweighted graph. DFS explores deeply before backtracking. Dijkstra finds shortest paths with nonnegative edge weights. Minimum spanning tree algorithms connect all vertices with minimum total edge weight.",
    points: ["Choose BFS or DFS for traversal", "Use a visited structure", "Use Dijkstra for nonnegative weighted shortest paths", "Use Prim or Kruskal for minimum spanning trees"],
    javaExample: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<List<Integer>> graph = List.of(
            List.of(1, 2),
            List.of(0, 3),
            List.of(0),
            List.of(1)
        );

        boolean[] visited = new boolean[graph.size()];
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(0);
        visited[0] = true;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");

            for (int next : graph.get(node)) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.offer(next);
                }
            }
        }
    }
}`,
    question: "Which algorithm finds shortest paths in graphs with nonnegative edge weights?",
    options: ["Dijkstra", "Kruskal", "KMP", "QuickSelect"],
    answerIndex: 0,
    answerExplanation: "Dijkstra's algorithm finds shortest paths from a source when edge weights are nonnegative."
  },

  "algo-trie": {
    concept: "A Trie stores strings by sharing common prefixes.",
    explanation: "Each Trie node represents a prefix position and stores outgoing character links. Insertion and prefix lookup take O(L) time for a word or prefix of length L. Tries are useful for autocomplete and dictionary lookup.",
    points: ["Start at the root", "Follow or create a child per character", "Mark the end of a word", "Search prefixes by following character links"],
    javaExample: `import java.util.*;

class Trie {
    static class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean word;
    }

    private final Node root = new Node();

    void insert(String text) {
        Node node = root;
        for (char ch : text.toCharArray()) {
            node = node.children.computeIfAbsent(ch, k -> new Node());
        }
        node.word = true;
    }

    boolean hasPrefix(String prefix) {
        Node node = root;
        for (char ch : prefix.toCharArray()) {
            node = node.children.get(ch);
            if (node == null) return false;
        }
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("algorithm");
        System.out.println(trie.hasPrefix("algo"));
    }
}`,
    question: "What does a Trie share between words such as 'car' and 'cart'?",
    options: ["Their common prefix path", "Their final memory address", "Their array indexes", "Their hash codes"],
    answerIndex: 0,
    answerExplanation: "A Trie shares nodes for common prefixes, reducing repeated prefix storage."
  },

  "algo-kmp": {
    concept: "KMP searches for a pattern without repeatedly rechecking matched characters.",
    explanation: "Knuth-Morris-Pratt preprocesses the pattern into an LPS array: the longest proper prefix that is also a suffix for each prefix. On mismatch, the LPS value determines where matching resumes. Search takes O(n + m).",
    points: ["Build the LPS array", "Compare text and pattern characters", "Use LPS after a mismatch", "Avoid moving the text pointer backward"],
    javaExample: `public class Main {
    static int search(String text, String pattern) {
        int n = text.length(), m = pattern.length();
        int[] lps = new int[m];

        for (int i = 1, len = 0; i < m;) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                lps[i++] = ++len;
            } else if (len > 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }

        for (int i = 0, j = 0; i < n;) {
            if (text.charAt(i) == pattern.charAt(j)) {
                i++;
                j++;
                if (j == m) return i - j;
            } else if (j > 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(search("ababcabc", "abc"));
    }
}`,
    question: "What information does the KMP LPS array store?",
    options: ["Longest proper prefix that is also a suffix", "The sorted order of the text", "The number of unique characters", "The hash of every substring"],
    answerIndex: 0,
    answerExplanation: "LPS tells KMP how much of the matched prefix can be reused after a mismatch."
  },

  "algo-bloom": {
    concept: "A Bloom filter tests probable membership using a bit array and hash functions.",
    explanation: "Insertion sets several bit positions. A query returns definitely absent if any required bit is zero; otherwise the item may be present. Standard Bloom filters can produce false positives but not false negatives for correctly inserted items.",
    points: ["Initialize a bit array", "Hash each item to multiple positions", "Set those bits during insertion", "Interpret a positive result as possibly present"],
    javaExample: `import java.util.*;

class BloomFilter {
    private final BitSet bits = new BitSet(128);

    void add(String value) {
        bits.set(Math.floorMod(value.hashCode(), 128));
        bits.set(Math.floorMod((value + "!").hashCode(), 128));
    }

    boolean mightContain(String value) {
        return bits.get(Math.floorMod(value.hashCode(), 128))
            && bits.get(Math.floorMod((value + "!").hashCode(), 128));
    }
}

public class Main {
    public static void main(String[] args) {
        BloomFilter filter = new BloomFilter();
        filter.add("java");
        System.out.println(filter.mightContain("java"));
    }
}`,
    question: "What kind of error can a standard Bloom filter produce?",
    options: ["False positive", "False negative for an inserted item", "Guaranteed exact membership", "Sorted output"],
    answerIndex: 0,
    answerExplanation: "A Bloom filter can say an absent item might be present, which is a false positive."
  },

  "algo-dsu": {
    concept: "Disjoint Set Union maintains a collection of non-overlapping connected components.",
    explanation: "Find identifies a component representative. Union merges two components. Path compression shortens future find paths, while union by rank or size keeps trees shallow. The amortized operation cost is nearly constant.",
    points: ["Initialize each element as its own set", "Find the representative", "Union two different representatives", "Use path compression and union by size or rank"],
    javaExample: `public class Main {
    static class DSU {
        int[] parent, size;

        DSU(int n) {
            parent = new int[n];
            size = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                size[i] = 1;
            }
        }

        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }

        void union(int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b) return;
            if (size[a] < size[b]) {
                int t = a; a = b; b = t;
            }
            parent[b] = a;
            size[a] += size[b];
        }
    }

    public static void main(String[] args) {
        DSU dsu = new DSU(4);
        dsu.union(0, 1);
        dsu.union(1, 2);
        System.out.println(dsu.find(0) == dsu.find(2));
    }
}`,
    question: "What does find(x) return in a DSU?",
    options: ["The representative of x's set", "The smallest element always", "The number of graph edges", "The shortest path"],
    answerIndex: 0,
    answerExplanation: "Find returns the representative, or root, identifying the set containing x."
  },

  "algo-segment": {
    concept: "Segment trees answer range queries and support point updates efficiently.",
    explanation: "A segment tree stores information about intervals. Each internal node combines results from its children. Building takes O(n), and common range queries and point updates take O(log n).",
    points: ["Build a tree over array intervals", "Store a summary in each node", "Combine child summaries", "Update affected ancestors after a point change"],
    javaExample: `public class Main {
    static int[] tree, a;

    static void build(int node, int left, int right) {
        if (left == right) {
            tree[node] = a[left];
            return;
        }
        int mid = (left + right) / 2;
        build(node * 2, left, mid);
        build(node * 2 + 1, mid + 1, right);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

    static int query(int node, int left, int right, int ql, int qr) {
        if (qr < left || right < ql) return 0;
        if (ql <= left && right <= qr) return tree[node];
        int mid = (left + right) / 2;
        return query(node * 2, left, mid, ql, qr)
             + query(node * 2 + 1, mid + 1, right, ql, qr);
    }

    public static void main(String[] args) {
        a = new int[]{2, 4, 6, 8};
        tree = new int[4 * a.length];
        build(1, 0, a.length - 1);
        System.out.println(query(1, 0, 3, 1, 3));
    }
}`,
    question: "What is the typical time complexity of a segment-tree range query?",
    options: ["O(log n)", "O(1)", "O(n squared)", "O(2 to the n)"],
    answerIndex: 0,
    answerExplanation: "A standard segment tree visits only logarithmically many relevant nodes for a range query."
  },

  "algo-quickselect": {
    concept: "QuickSelect finds a kth order statistic without fully sorting the array.",
    explanation: "QuickSelect partitions values around a pivot. It then continues only in the partition containing the target index. Its average time is O(n), while the worst case is O(n squared) with consistently poor pivots.",
    points: ["Choose a pivot", "Partition values around it", "Compare the pivot index with k", "Continue only in the relevant partition"],
    javaExample: `import java.util.*;

public class Main {
    static int quickSelect(int[] a, int left, int right, int k) {
        int pivot = a[right];
        int p = left;

        for (int i = left; i < right; i++) {
            if (a[i] <= pivot) {
                int t = a[i]; a[i] = a[p]; a[p] = t;
                p++;
            }
        }

        int t = a[p]; a[p] = a[right]; a[right] = t;

        if (p == k) return a[p];
        if (k < p) return quickSelect(a, left, p - 1, k);
        return quickSelect(a, p + 1, right, k);
    }

    public static void main(String[] args) {
        int[] values = {7, 2, 9, 4, 1, 5};
        System.out.println(quickSelect(values, 0, values.length - 1, 2));
    }
}`,
    question: "What is the average time complexity of QuickSelect?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n squared)"],
    answerIndex: 0,
    answerExplanation: "QuickSelect has average linear time because it partitions and recurses into only one side."
  }
};
