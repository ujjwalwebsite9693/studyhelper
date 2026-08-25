const SubjectGuide = require('../models/SubjectGuide');

const guides = [
  {
    slug: 'c-programming',
    title: 'C Programming',
    branch: 'BOTH',
    semester: 1,
    introduction: `C Programming is a foundational language in computer science, created by Dennis Ritchie at Bell Labs in 1972. It is a powerful, general-purpose programming language that provides low-level memory access and a minimal set of keywords, making it extremely fast and efficient. For diploma engineering students, learning C is crucial as it forms the basis for understanding how computers execute programs at the system level. It is extensively used in developing operating systems, databases, embedded systems, and compilers. Mastering C helps students grasp fundamental concepts like variables, loops, arrays, and memory management through pointers, which are essential for learning advanced languages like C++, Java, and Python. The structured approach of C encourages logical thinking and algorithmic problem-solving. This guide is specifically tailored to the SBTE Bihar syllabus, helping students clear concepts from basics to advanced topics like file handling and dynamic memory allocation, ensuring they are well-prepared for their semester exams and future technical careers.`,
    concepts: [
      { heading: 'Variables & Data Types', explanation: 'Variables act as storage containers for data. C supports various basic data types including integers (int), characters (char), floating-point numbers (float, double), and void. Proper selection of data types optimizes memory usage and performance.' },
      { heading: 'Control Structures', explanation: 'Control structures determine the flow of program execution. They include conditional statements (if, if-else, switch) and looping constructs (for, while, do-while), allowing developers to write flexible and dynamic programs that can make decisions.' },
      { heading: 'Functions', explanation: 'Functions are reusable blocks of code that perform specific tasks. They promote modularity and code reuse. C supports both built-in library functions and user-defined functions, with mechanisms for call-by-value and call-by-reference.' },
      { heading: 'Arrays', explanation: 'An array is a collection of elements of the same data type stored in contiguous memory locations. They are used to handle large amounts of data efficiently, supporting single and multi-dimensional forms like matrices.' },
      { heading: 'Pointers', explanation: 'Pointers are variables that store memory addresses of other variables. They are a powerful feature in C, enabling dynamic memory allocation, efficient array manipulation, and complex data structures like linked lists and trees.' },
      { heading: 'File Handling', explanation: 'File handling allows C programs to read from and write to secondary storage devices. It involves functions like fopen, fclose, fprintf, and fscanf, making data persistence possible beyond the program execution lifecycle.' }
    ],
    chapters: [
      { title: 'Introduction to C', summary: 'Covers the history, structure of a C program, compilation process, and basic syntax including operators and expressions.', keyPoints: ['History of C', 'Program structure', 'Compilation steps', 'Operators'] },
      { title: 'Control Flow', summary: 'Explores decision-making and looping mechanisms essential for algorithm implementation and logic building.', keyPoints: ['if-else statements', 'switch case', 'Loops (for, while)', 'break and continue'] },
      { title: 'Functions & Recursion', summary: 'Details how to modularize code using functions, understanding scope, and the concept of recursion with examples.', keyPoints: ['Function declaration', 'Parameter passing', 'Scope rules', 'Recursion basics'] },
      { title: 'Arrays & Strings', summary: 'Focuses on storing collections of data, string manipulation using standard library functions, and character arrays.', keyPoints: ['1D and 2D arrays', 'String initialization', 'String functions (strcpy, strlen)', 'Array passing'] },
      { title: 'Pointers & Dynamic Memory', summary: 'Advanced concepts of memory addresses, pointer arithmetic, and managing memory at runtime using malloc and free.', keyPoints: ['Pointer declaration', 'Pointer arithmetic', 'malloc, calloc, free', 'Pointers and arrays'] }
    ],
    importantQuestions: [
      'Explain the compilation process of a C program.',
      'Differentiate between while and do-while loops with examples.',
      'What is recursion? Write a C program to find the factorial of a number using recursion.',
      'Explain call by value and call by reference with suitable examples.',
      'What is a pointer? How is it initialized?',
      'Write a C program to multiply two 3x3 matrices.',
      'Explain various string handling functions in C.',
      'What is dynamic memory allocation? Discuss malloc() and calloc().'
    ],
    mcqs: [
      { question: 'Who developed the C language?', options: ['Ken Thompson', 'Dennis Ritchie', 'Bjarne Stroustrup', 'James Gosling'], correctIndex: 1, explanation: 'Dennis Ritchie created C in 1972 at Bell Labs to develop the UNIX operating system.' },
      { question: 'Which keyword is used to prevent a variable from being modified?', options: ['static', 'volatile', 'const', 'extern'], correctIndex: 2, explanation: 'The const keyword makes a variable read-only, preventing any modifications after initialization.' },
      { question: 'What is the size of an int data type in a 32-bit compiler?', options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on compiler'], correctIndex: 1, explanation: 'In standard 32-bit compilers like GCC, an int typically occupies 4 bytes of memory.' },
      { question: 'Which loop is guaranteed to execute at least once?', options: ['for', 'while', 'do-while', 'None'], correctIndex: 2, explanation: 'A do-while loop evaluates its condition after execution, ensuring at least one run.' },
      { question: 'What does the function malloc() return on failure?', options: ['0', 'NULL', 'Garbage value', '-1'], correctIndex: 1, explanation: 'malloc() returns a NULL pointer if it fails to allocate the requested block of memory.' }
    ],
    previousYearContext: 'Based on SBTE Bihar previous year papers, the focus is heavily on basic programming logic, arrays, and functions. Long answer questions frequently ask for complete programs, especially matrix multiplication, string reversals, and recursive factorials. Short notes often cover pointers and dynamic memory allocation. Understanding loop structures and dry-running code is crucial as trace output questions are common.',
    examTips: [
      'Always write the structure of a C program before writing logic.',
      'Include comments in your code to explain logic to the examiner.',
      'Memorize the syntax of loops and switch cases.',
      'Practice dry-running code on paper.',
      'Do not forget semicolons at the end of statements.',
      'For pointer questions, draw memory blocks to illustrate your point.'
    ],
    pdfContents: 'The downloadable PDF contains a complete revision notes summary covering all 5 units of the SBTE C Programming syllabus. It includes heavily commented sample programs, a cheat sheet for string functions and format specifiers, and a compiled list of the last 5 years of PYQs solved step-by-step.',
    syllabusRelevance: 'This guide strictly adheres to the SBTE Bihar Semester 1/2 curriculum for Diploma in Engineering. It covers Unit 1 to Unit 5, bridging the gap between theoretical knowledge and practical lab experiments as prescribed by Government Polytechnic Gaya standards.',
    faqs: [
      { question: 'Is C programming hard for beginners?', answer: 'C introduces lower-level concepts like memory management which can be tricky, but its simple syntax makes it an excellent foundational language.' },
      { question: 'Which compiler should I use?', answer: 'For windows, MinGW with VS Code is recommended, or an online compiler like GDB for quick practice.' },
      { question: 'What is the difference between = and ==?', answer: '= is an assignment operator, while == is a relational operator used to check equality.' },
      { question: 'Do I need math for C programming?', answer: 'Basic algebra and logic are sufficient. Mathematical problem-solving helps in creating efficient algorithms.' }
    ],
    relatedTopics: [{ title: 'Data Structures', slug: 'data-structures' }, { title: 'Operating Systems', slug: 'operating-systems' }],
    examples: [
      { title: 'Hello World', content: '#include <stdio.h>\nint main() {\n  printf("Hello, World!");\n  return 0;\n}\nThis is the simplest C program. It includes the standard I/O library and prints text to the screen.' },
      { title: 'Swap Two Numbers', content: 'int a=5, b=10, temp;\ntemp=a; a=b; b=temp;\nDemonstrates the use of a temporary variable to swap values, a fundamental algorithmic concept.' }
    ],
    metaDescription: 'Complete C Programming guide for SBTE Bihar diploma students. Cover basics, arrays, pointers, functions, PYQs, and MCQs to ace your semester exams.'
  },
  {
    slug: 'data-structures',
    title: 'Data Structures using C',
    branch: 'BOTH',
    semester: 3,
    introduction: `Data Structures are fundamental to computer science, providing a way to store, organize, and manage data efficiently so it can be accessed and modified. In the context of a diploma curriculum, learning Data Structures using C acts as a bridge between basic programming and complex software development. The choice of data structure directly impacts the performance of an algorithm. This guide covers linear structures like Arrays, Stacks, Queues, and Linked Lists, as well as non-linear structures like Trees and Graphs. Understanding these concepts enables students to write optimized code that handles large data sets rapidly, a critical skill in modern software engineering. We also dive into essential operations like sorting and searching. For students at Government Polytechnic Gaya and under SBTE Bihar, mastering this subject is not just for clearing the exam but also crucial for future placements and technical interviews, where Data Structure knowledge is strictly evaluated.`,
    concepts: [
      { heading: 'Arrays & Strings', explanation: 'Arrays store elements sequentially. While access is O(1), insertions and deletions can be costly. Strings are character arrays used extensively for text processing.' },
      { heading: 'Linked Lists', explanation: 'Unlike arrays, linked lists store elements (nodes) non-contiguously, linked via pointers. This allows dynamic memory allocation and efficient insertions/deletions at any position.' },
      { heading: 'Stacks', explanation: 'A Stack follows the Last-In-First-Out (LIFO) principle. Key operations are push and pop. Stacks are used in expression evaluation, recursion, and undo mechanisms.' },
      { heading: 'Queues', explanation: 'A Queue follows First-In-First-Out (FIFO). Elements are added at the rear and removed from the front. Used in OS scheduling and breadth-first traversals.' },
      { heading: 'Trees', explanation: 'Trees represent hierarchical data. Binary Trees, Binary Search Trees (BST), and AVL trees allow efficient searching, insertion, and traversal (Inorder, Preorder, Postorder).' },
      { heading: 'Graphs', explanation: 'Graphs are networks of nodes (vertices) connected by edges. They model real-world networks like social media or maps. Traversal involves BFS and DFS algorithms.' }
    ],
    chapters: [
      { title: 'Introduction to Data Structures', summary: 'Defines data structures, ADTs (Abstract Data Types), and introduces time and space complexity (Big O notation).', keyPoints: ['Linear vs Non-linear', 'Time complexity', 'Space complexity', 'ADT basics'] },
      { title: 'Stacks and Queues', summary: 'Implementation of stacks and queues using arrays and linked lists, and their practical applications.', keyPoints: ['Push/Pop operations', 'Infix to Postfix', 'Circular queues', 'Priority queues'] },
      { title: 'Linked Lists', summary: 'Detailed study of singly, doubly, and circular linked lists, including node insertion, deletion, and traversal.', keyPoints: ['Singly linked list', 'Doubly linked list', 'Dynamic memory', 'Reversing a list'] },
      { title: 'Trees and Graphs', summary: 'Explores non-linear structures, focusing on Binary Search Trees and basic Graph representations.', keyPoints: ['Tree traversals', 'BST operations', 'Adjacency matrix', 'BFS and DFS'] },
      { title: 'Searching and Sorting', summary: 'Algorithms to search elements and order them, comparing their complexities.', keyPoints: ['Linear & Binary search', 'Bubble & Selection sort', 'Quick & Merge sort'] }
    ],
    importantQuestions: [
      'Define Data Structure. Differentiate between linear and non-linear data structures.',
      'Write an algorithm to convert an infix expression to a postfix expression using a stack.',
      'Explain the operations of a Circular Queue. How is it better than a linear queue?',
      'Write a C program to insert and delete a node from a Singly Linked List.',
      'Explain Binary Search Tree. Write the algorithm for Inorder traversal.',
      'Differentiate between BFS and DFS with suitable examples.',
      'Explain Quick Sort algorithm and discuss its time complexity.',
      'What is Hashing? Discuss hash functions and collision resolution techniques.'
    ],
    mcqs: [
      { question: 'Which data structure follows LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctIndex: 1, explanation: 'Stack uses Last-In-First-Out (LIFO) methodology.' },
      { question: 'What is the time complexity of Binary Search?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'], correctIndex: 2, explanation: 'Binary search halves the search space iteratively, leading to O(log n) time complexity.' },
      { question: 'In a queue, insertion takes place at?', options: ['Front', 'Rear', 'Anywhere', 'Middle'], correctIndex: 1, explanation: 'In a standard queue, elements are enqueued at the rear.' },
      { question: 'Which sorting algorithm uses divide and conquer?', options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'], correctIndex: 2, explanation: 'Merge sort divides the array into halves, sorts them, and merges them back.' },
      { question: 'A full binary tree with n leaves contains how many nodes?', options: ['2n - 1', 'n log n', '2n', 'n^2'], correctIndex: 0, explanation: 'A full binary tree with n leaf nodes always has 2n - 1 total nodes.' }
    ],
    previousYearContext: 'Past SBTE exams heavily prioritize Linked Lists and Stacks. You will almost certainly see a 6-mark question on Infix to Postfix conversion or evaluating a Postfix expression. Short questions often ask for time complexities of various sorting algorithms. Ensure you can write complete C functions for inserting a node in a Linked List and BST traversals.',
    examTips: [
      'Always draw diagrams (boxes for arrays, circles/arrows for lists) when explaining data structures.',
      'Memorize time and space complexities for all operations.',
      'Write algorithms step-by-step; they often carry partial marks even if code is flawed.',
      'Practice trace tables for sorting algorithms.',
      'Understand pointers thoroughly, as they are the backbone of linked lists.'
    ],
    pdfContents: 'The PDF contains algorithm cheat sheets, time complexity tables, and C code snippets for every major data structure. It includes a dedicated section on solving recursive tree traversal problems and past 5-year SBTE solved papers.',
    syllabusRelevance: 'Maps exactly to the SBTE 3rd Semester syllabus. Covers Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, and Searching, ensuring full preparation for both theory and practical examinations.',
    faqs: [
      { question: 'Why learn Data Structures in C instead of Python?', answer: 'C lacks built-in data structures, forcing you to implement them from scratch. This builds a deeper understanding of memory management.' },
      { question: 'Which sorting algorithm is best?', answer: 'It depends. Quick Sort is often fastest in practice, but Merge Sort provides guaranteed O(n log n) performance.' },
      { question: 'Is a linked list always better than an array?', answer: 'No. Arrays provide O(1) random access and better cache locality, while linked lists excel at frequent insertions/deletions.' },
      { question: 'What is a memory leak?', answer: 'Occurs when dynamically allocated memory (using malloc) is not freed, leading to resource exhaustion.' }
    ],
    relatedTopics: [{ title: 'C Programming', slug: 'c-programming' }, { title: 'OOP with Java', slug: 'oop-java' }],
    examples: [
      { title: 'Stack Push Operation', content: 'void push(int x) {\n  if(top == MAX-1) printf("Overflow");\n  else stack[++top] = x;\n}\nAdds an element to the top of the stack, checking for overflow.' },
      { title: 'Linear Search', content: 'int search(int arr[], int n, int x) {\n  for(int i=0; i<n; i++)\n    if(arr[i] == x) return i;\n  return -1;\n}\nSequentially checks each element until a match is found or the list ends.' }
    ],
    metaDescription: 'Master Data Structures for SBTE diploma! Comprehensive guide on Stacks, Queues, Linked Lists, Trees, algorithms, and PYQs for exam success.'
  },
  {
    slug: 'dbms',
    title: 'Database Management Systems',
    branch: 'BOTH',
    semester: 4,
    introduction: `A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data. As data becomes the most valuable asset in the modern digital economy, understanding how to store, retrieve, and manage it securely is essential for software engineers. This guide introduces the core principles of DBMS, tailored for diploma students. We explore the transition from traditional file-processing systems to relational databases, emphasizing the Entity-Relationship (ER) model for conceptual design. You will learn about relational algebra, SQL (Structured Query Language) for practical data manipulation, and the crucial concept of Normalization to eliminate data redundancy. Furthermore, advanced topics like transaction management, ACID properties, and concurrency control are covered. This knowledge forms the backend foundation for almost all web and enterprise applications.`,
    concepts: [
      { heading: 'Database Architecture', explanation: 'DBMS architecture is typically divided into three levels: internal (physical storage), conceptual (logical structure), and external (user views). This provides data independence.' },
      { heading: 'ER Model', explanation: 'The Entity-Relationship model uses diagrams to represent entities (objects), attributes (properties), and relationships. It is the blueprint for database design.' },
      { heading: 'Relational Model', explanation: 'Organizes data into tables (relations) of columns and rows. It uses keys (Primary, Foreign) to uniquely identify records and establish relationships between tables.' },
      { heading: 'SQL', explanation: 'Structured Query Language is used to communicate with relational databases. It includes DDL (Data Definition), DML (Data Manipulation), and DCL (Data Control) commands.' },
      { heading: 'Normalization', explanation: 'The process of organizing data to reduce redundancy and improve data integrity. Involves dividing large tables into smaller ones based on rules (1NF, 2NF, 3NF, BCNF).' },
      { heading: 'Transaction Management', explanation: 'A transaction is a logical unit of work. Transaction management ensures the ACID properties (Atomicity, Consistency, Isolation, Durability) are maintained even during system failures.' }
    ],
    chapters: [
      { title: 'Introduction to DBMS', summary: 'File systems vs DBMS, characteristics of database approach, data models, and database architecture.', keyPoints: ['DBMS advantages', 'Three-tier architecture', 'Data independence', 'DBA roles'] },
      { title: 'Data Modeling using ER', summary: 'Designing databases conceptually using ER diagrams, defining entities, attributes, and cardinality.', keyPoints: ['Entity types', 'Attributes types', 'Keys', 'Mapping constraints'] },
      { title: 'Relational Database Model', summary: 'Mapping ER models to relational tables, integrity constraints, and relational algebra operations.', keyPoints: ['Domain constraints', 'Referential integrity', 'Select, Project, Join'] },
      { title: 'SQL & Querying', summary: 'Writing SQL queries to create, read, update, and delete (CRUD) data, including aggregate functions and joins.', keyPoints: ['DDL vs DML', 'Joins (Inner, Outer)', 'Group By & Having', 'Nested queries'] },
      { title: 'Normalization & Transactions', summary: 'Eliminating anomalies via normalization forms, and ensuring data consistency through ACID properties.', keyPoints: ['Functional dependencies', '1NF, 2NF, 3NF', 'ACID properties', 'Concurrency control'] }
    ],
    importantQuestions: [
      'Discuss the disadvantages of traditional file systems compared to DBMS.',
      'Explain the three-schema architecture with a diagram.',
      'What is an ER diagram? Draw an ER diagram for a University Management System.',
      'Define Primary Key, Candidate Key, and Foreign Key with examples.',
      'What is Normalization? Explain 1NF, 2NF, and 3NF with suitable examples.',
      'Write SQL commands to create a table and insert five records into it.',
      'Explain the ACID properties of a transaction.',
      'What are the different types of joins in SQL? Explain with syntax.'
    ],
    mcqs: [
      { question: 'Which of the following is not a DDL command?', options: ['CREATE', 'ALTER', 'UPDATE', 'DROP'], correctIndex: 2, explanation: 'UPDATE is a Data Manipulation Language (DML) command used to modify existing records.' },
      { question: 'What ensures that no primary key can be NULL?', options: ['Domain Integrity', 'Entity Integrity', 'Referential Integrity', 'Key Integrity'], correctIndex: 1, explanation: 'Entity Integrity rule states that a primary key cannot have a NULL value.' },
      { question: 'Which normal form deals with partial dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctIndex: 1, explanation: 'Second Normal Form (2NF) ensures that all non-key attributes are fully functionally dependent on the primary key.' },
      { question: 'What does the "A" in ACID stand for?', options: ['Accuracy', 'Atomicity', 'Aggregation', 'Availability'], correctIndex: 1, explanation: 'Atomicity ensures that all operations within a work unit are completed successfully; otherwise, the transaction is aborted.' },
      { question: 'Which operator is used to pattern match in SQL?', options: ['MATCH', 'SIMILAR', 'LIKE', 'REGEX'], correctIndex: 2, explanation: 'The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.' }
    ],
    previousYearContext: 'SBTE exams heavily test SQL syntax and Normalization. You must be prepared to write SQL queries based on a given schema. ER diagrams for systems like Library or Hospital are standard long-answer questions. Short notes frequently ask about ACID properties, DBA responsibilities, and types of keys.',
    examTips: [
      'Draw neat ER diagrams using standard symbols (rectangles for entities, ellipses for attributes).',
      'When explaining Normal Forms, always use a table example to show before/after states.',
      'Remember the difference between DROP (DDL) and DELETE (DML).',
      'Highlight the keywords in SQL queries (SELECT, FROM, WHERE).',
      'Know the differences between inner join, left join, and right join.'
    ],
    pdfContents: 'The DBMS study PDF includes high-quality ER diagram examples, a comprehensive SQL command cheat sheet, step-by-step normalization examples up to BCNF, and solved PYQ database design problems.',
    syllabusRelevance: 'Aligns exactly with the 4th Semester SBTE syllabus for CS/IT branches, covering the theoretical foundation as well as practical SQL components required for lab examinations.',
    faqs: [
      { question: 'Do I need to know programming for DBMS?', answer: 'Not exactly. SQL is a declarative querying language, unlike procedural languages like C or Java.' },
      { question: 'Which DBMS software is best to learn?', answer: 'MySQL and PostgreSQL are open-source and widely used, making them excellent starting points.' },
      { question: 'What is a DBA?', answer: 'A Database Administrator (DBA) manages the security, performance, and integrity of a database.' },
      { question: 'Why is Normalization important?', answer: 'It prevents update anomalies and saves space by ensuring data is not unnecessarily duplicated.' }
    ],
    relatedTopics: [{ title: 'Web Technology', slug: 'web-technology' }, { title: 'Software Engineering', slug: 'software-engineering' }],
    examples: [
      { title: 'Create Table Syntax', content: 'CREATE TABLE Students (\n  ID int PRIMARY KEY,\n  Name varchar(50),\n  Age int\n);\nThis DDL statement defines the structure of a new table.' },
      { title: 'Select Query', content: 'SELECT Name FROM Students WHERE Age > 18;\nThis DML statement retrieves the names of all students older than 18 from the database.' }
    ],
    metaDescription: 'Complete DBMS study material for SBTE 4th Sem. Learn ER diagrams, SQL queries, Normalization, and Transactions with PYQs and detailed explanations.'
  },
  {
    slug: 'computer-networks',
    title: 'Computer Networks',
    branch: 'CSE',
    semester: 5,
    introduction: `Computer Networks form the backbone of modern communication and the Internet. This subject introduces diploma students to how disparate computers are connected to share resources and exchange data. We cover the fundamental architectures, primarily focusing on the OSI (Open Systems Interconnection) 7-layer model and the TCP/IP protocol suite. You will learn how data is broken down into packets, transmitted across physical mediums, routed through complex networks, and reassembled at the destination. Key topics include transmission media, switching techniques, IP addressing (IPv4/IPv6), routing algorithms, and network security protocols. Understanding computer networks is vital for anyone aiming for a career in system administration, cybersecurity, or cloud computing. This guide provides simplified explanations for SBTE Bihar syllabus topics, making complex networking concepts easy to grasp and reproduce in exams.`,
    concepts: [
      { heading: 'Network Topologies', explanation: 'Topology defines the physical or logical arrangement of a network. Common types include Star, Ring, Bus, Mesh, and Tree. Each has different reliability and cabling cost characteristics.' },
      { heading: 'OSI Model', explanation: 'A theoretical 7-layer framework (Physical, Data Link, Network, Transport, Session, Presentation, Application) standardizing network communication and helping in troubleshooting.' },
      { heading: 'Transmission Media', explanation: 'The physical pathways connecting nodes. Divided into guided (twisted pair, coaxial cable, optical fiber) and unguided (radio waves, microwaves, infrared) media.' },
      { heading: 'IP Addressing', explanation: 'Every device on a network needs a unique identifier. IPv4 uses 32-bit addresses divided into classes, while IPv6 uses 128-bit addresses to solve IP exhaustion.' },
      { heading: 'Routing', explanation: 'The process of selecting the best path for data packets across a network. Done by routers using algorithms like Distance Vector and Link State.' },
      { heading: 'Network Security', explanation: 'Involves protecting data from unauthorized access. Concepts include cryptography (symmetric/asymmetric), firewalls, VPNs, and protocols like HTTPS and IPsec.' }
    ],
    chapters: [
      { title: 'Basics of Networking', summary: 'Network types (LAN, MAN, WAN), network criteria, topologies, and transmission modes (Simplex, Half-duplex, Full-duplex).', keyPoints: ['LAN/WAN differences', 'Topologies', 'Transmission modes', 'Network hardware'] },
      { title: 'The OSI Reference Model', summary: 'In-depth look at all 7 layers of the OSI model, their functions, and the concept of encapsulation.', keyPoints: ['Layer responsibilities', 'Data units (Frame, Packet, Segment)', 'OSI vs TCP/IP'] },
      { title: 'Data Link & Network Layers', summary: 'Error detection, MAC addressing, switching techniques, IP addressing, and routing basics.', keyPoints: ['Framing', 'Error correction (CRC)', 'IPv4 Classes', 'Subnetting'] },
      { title: 'Transport & Application Layers', summary: 'TCP vs UDP, port numbers, and application layer protocols like HTTP, FTP, SMTP, and DNS.', keyPoints: ['TCP (Reliable) vs UDP', 'Port addressing', 'DNS resolution', 'Email protocols'] },
      { title: 'Network Security Basics', summary: 'Introduction to securing networks, encryption techniques, and common network attacks.', keyPoints: ['CIA triad', 'Symmetric/Asymmetric encryption', 'Firewalls', 'Malware'] }
    ],
    importantQuestions: [
      'Explain the OSI reference model with a neat diagram detailing the function of each layer.',
      'Differentiate between LAN, MAN, and WAN.',
      'What are the different types of network topologies? Discuss the advantages of Mesh topology.',
      'Compare TCP and UDP protocols.',
      'Explain IPv4 addressing and its different classes (A, B, C, D, E).',
      'What is routing? Explain the shortest path routing algorithm.',
      'Describe the various types of transmission media.',
      'What is a firewall? Explain its role in network security.'
    ],
    mcqs: [
      { question: 'Which layer of the OSI model is responsible for routing?', options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Physical Layer'], correctIndex: 1, explanation: 'The Network layer (Layer 3) handles routing of data packets using IP addresses.' },
      { question: 'Which protocol is used to send email?', options: ['FTP', 'HTTP', 'SMTP', 'POP3'], correctIndex: 2, explanation: 'Simple Mail Transfer Protocol (SMTP) is used for sending emails.' },
      { question: 'What is the size of an IPv4 address?', options: ['16 bits', '32 bits', '64 bits', '128 bits'], correctIndex: 1, explanation: 'IPv4 addresses are 32 bits long, typically written as four octets.' },
      { question: 'Which of the following uses unguided media?', options: ['Coaxial cable', 'Fiber optics', 'Bluetooth', 'Twisted pair'], correctIndex: 2, explanation: 'Bluetooth uses wireless (unguided) radio frequency waves.' },
      { question: 'The port number for HTTP is?', options: ['21', '25', '80', '443'], correctIndex: 2, explanation: 'Port 80 is the standard port for unencrypted HTTP traffic.' }
    ],
    previousYearContext: 'The OSI model is the most frequently asked 6-mark question. You must know the function of every layer. TCP vs UDP and IP address classes are also extremely common. Recent papers have started including short notes on DNS, MAC addressing, and fiber optics.',
    examTips: [
      'Draw the OSI model clearly, labeling layers from 1 (Physical) to 7 (Application).',
      'Memorize acronyms and their full forms (e.g., SMTP, HTTP, TCP, MAC).',
      'Use tables to differentiate concepts like TCP vs UDP or LAN vs WAN.',
      'Understand how subnet masks work, as numericals on IP classes occasionally appear.',
      'When discussing topologies, always draw small diagrams.'
    ],
    pdfContents: 'Includes a complete OSI/TCP-IP comparison chart, networking hardware diagrams, simplified explanations of routing algorithms, and a glossary of common networking terms and protocols for quick revision.',
    syllabusRelevance: 'Covers the CSE 5th Semester Computer Networks syllabus under SBTE, building the theoretical foundation needed for advanced courses in Network Administration and Cybersecurity.',
    faqs: [
      { question: 'What is the difference between a switch and a hub?', answer: 'A hub broadcasts data to all ports, while a switch intelligently forwards data only to the destination MAC address.' },
      { question: 'Why are we moving to IPv6?', answer: 'Because the 32-bit IPv4 space is exhausted. IPv6 provides vastly more IP addresses (128-bit).' },
      { question: 'What is a ping command used for?', answer: 'It tests the reachability of a host on an IP network and measures the round-trip time for messages.' },
      { question: 'Is the OSI model actually used?', answer: 'It is a conceptual model. The TCP/IP model is what the internet actually runs on.' }
    ],
    relatedTopics: [{ title: 'Operating Systems', slug: 'operating-systems' }, { title: 'Web Technology', slug: 'web-technology' }],
    examples: [
      { title: 'IP Class Example', content: 'IP: 192.168.1.1\nThe first octet is 192, which falls in the range 192-223. Therefore, this is a Class C IP address.' },
      { title: 'Ping output', content: 'Reply from 8.8.8.8: bytes=32 time=14ms TTL=117\nIndicates successful ICMP communication with Google DNS server with a 14 millisecond latency.' }
    ],
    metaDescription: 'Simplified Computer Networks notes for SBTE Bihar CSE students. Learn OSI model, TCP/IP, topologies, and routing with MCQs and PYQ analysis.'
  },
  {
    slug: 'operating-systems',
    title: 'Operating Systems',
    branch: 'BOTH',
    semester: 4,
    introduction: `An Operating System (OS) is the most critical software running on a computer, acting as an intermediary between the user and the computer hardware. For diploma engineering students, studying Operating Systems reveals the "magic" behind how a computer manages multiple programs, allocates memory, and handles hardware devices simultaneously. This guide covers the core responsibilities of an OS: process management (CPU scheduling), memory management (paging, segmentation, virtual memory), file systems, and device management. We also delve into complex scenarios like deadlocks and synchronization. Understanding OS concepts is essential not just for academic exams but for writing efficient software that interacts well with system resources. Familiarity with OS principles is a staple requirement for technical interviews and a prerequisite for subjects like System Programming and Cloud Computing.`,
    concepts: [
      { heading: 'Process Management', explanation: 'A process is a program in execution. The OS creates, schedules, and terminates processes. CPU scheduling algorithms (FCFS, SJF, Round Robin) determine which process runs next.' },
      { heading: 'Concurrency & Synchronization', explanation: 'When multiple processes execute concurrently, they may share resources. Synchronization tools like Semaphores and Mutexes prevent data inconsistency and race conditions.' },
      { heading: 'Deadlocks', explanation: 'A deadlock occurs when processes block each other indefinitely, each waiting for resources held by another. It requires four conditions: Mutual exclusion, Hold and wait, No preemption, and Circular wait.' },
      { heading: 'Memory Management', explanation: 'The OS allocates RAM to active processes. Techniques like Paging and Segmentation divide memory efficiently, while Virtual Memory allows executing programs larger than physical RAM.' },
      { heading: 'File Systems', explanation: 'The OS manages data storage on disks through files and directories. It handles file permissions, space allocation (contiguous, linked, indexed), and disk scheduling.' },
      { heading: 'I/O Management', explanation: 'Manages communication with hardware devices through device drivers. Handles interrupts and uses techniques like spooling and buffering to improve I/O efficiency.' }
    ],
    chapters: [
      { title: 'OS Basics & System Structure', summary: 'Types of OS (Batch, Multiprogramming, Time-sharing, Real-time), System calls, and OS architecture (Monolithic, Microkernel).', keyPoints: ['OS Functions', 'System Calls', 'Batch vs Time-sharing', 'Kernel architectures'] },
      { title: 'Process Scheduling', summary: 'Process State diagram, PCB, and various CPU scheduling algorithms with Gantt chart examples.', keyPoints: ['Process states', 'Preemptive vs Non-preemptive', 'FCFS, SJF, RR', 'Context switching'] },
      { title: 'Process Synchronization & Deadlocks', summary: 'Critical section problem, semaphores, deadlock characterization, and deadlock handling strategies (Prevention, Avoidance, Detection).', keyPoints: ['Race condition', 'Mutex/Semaphores', 'Banker Algorithm', 'Deadlock recovery'] },
      { title: 'Memory Management', summary: 'Logical vs Physical addresses, contiguous allocation, paging, segmentation, and page replacement algorithms.', keyPoints: ['Internal/External fragmentation', 'Paging', 'Virtual Memory', 'FIFO, LRU page replacement'] },
      { title: 'Storage Management', summary: 'File concepts, directory structures, disk allocation methods, and disk scheduling algorithms.', keyPoints: ['File attributes', 'Directory structures', 'Disk scheduling (FCFS, SSTF, SCAN)'] }
    ],
    importantQuestions: [
      'Define Operating System. List its main functions.',
      'Explain the various states of a process with a neat Process State Transition Diagram.',
      'What is CPU scheduling? Explain the Round Robin algorithm with an example.',
      'What is a Deadlock? Explain the necessary conditions for a deadlock to occur.',
      'Explain Banker’s Algorithm for deadlock avoidance.',
      'Differentiate between Internal and External fragmentation.',
      'What is Virtual Memory? Explain the concept of Paging.',
      'Describe different file allocation methods (Contiguous, Linked, Indexed).'
    ],
    mcqs: [
      { question: 'Which scheduling algorithm allocates the CPU first to the process that requests it first?', options: ['SJF', 'FCFS', 'Priority Scheduling', 'Round Robin'], correctIndex: 1, explanation: 'First-Come, First-Served (FCFS) schedules processes in the order they arrive.' },
      { question: 'What is a piece of code that only one thread can execute at a time called?', options: ['Critical Section', 'Mutual Exclusion', 'Deadlock', 'Semaphore'], correctIndex: 0, explanation: 'The Critical Section contains shared variables and must be executed atomically.' },
      { question: 'Thrashing occurs when:', options: ['CPU is idle', 'Too many processes are in memory', 'OS spends more time paging than executing', 'Deadlock is detected'], correctIndex: 2, explanation: 'Thrashing is a severe performance degradation where the OS is constantly swapping pages in and out of memory.' },
      { question: 'Which memory allocation prevents external fragmentation?', options: ['Contiguous', 'Paging', 'Segmentation', 'Multiple Partitions'], correctIndex: 1, explanation: 'Paging divides memory into fixed-size frames, eliminating external fragmentation completely.' },
      { question: 'Which is a system call in UNIX for creating a new process?', options: ['create()', 'fork()', 'new()', 'exec()'], correctIndex: 1, explanation: 'The fork() system call creates a new child process by duplicating the calling process.' }
    ],
    previousYearContext: 'Numerical questions on CPU Scheduling (SJF, RR with Gantt charts) and Page Replacement algorithms (LRU, FIFO) are almost guaranteed in SBTE exams. Theoretical questions focus heavily on Deadlock conditions, Paging vs Segmentation, and the Process State diagram.',
    examTips: [
      'Always draw Gantt charts for CPU scheduling problems and double-check turnaround time calculations.',
      'Memorize the four necessary conditions for Deadlock (Coffman conditions).',
      'For page replacement problems, clearly show the page frames at each step.',
      'Differentiate clearly between logical address space (generated by CPU) and physical address space.',
      'Use diagrams to explain monolithic vs microkernel architectures.'
    ],
    pdfContents: 'Includes step-by-step solved numericals for CPU Scheduling and Page Replacement algorithms. Also contains high-quality diagrams for process states, paging hardware, and a cheat sheet summarizing OS system calls and terminology.',
    syllabusRelevance: 'Strictly mapped to the SBTE 4th Semester syllabus for CS/IT, preparing students for both academic exams and basic OS-level technical interview questions.',
    faqs: [
      { question: 'What is the difference between a process and a thread?', answer: 'A process is an executing program with its own memory space. A thread is a lightweight subprocess that shares memory with other threads within the same process.' },
      { question: 'What is Virtual Memory?', answer: 'A technique that gives the illusion of a large main memory by temporarily transferring data from RAM to disk storage (swapping/paging).' },
      { question: 'Why is Round Robin considered fair?', answer: 'It gives every process a fixed time slice (quantum), ensuring no process is starved of CPU time indefinitely.' },
      { question: 'What is a Kernel?', answer: 'The core component of an OS that manages system resources and has complete control over everything in the system.' }
    ],
    relatedTopics: [{ title: 'Computer Networks', slug: 'computer-networks' }, { title: 'C Programming', slug: 'c-programming' }],
    examples: [
      { title: 'FCFS Scheduling', content: 'Processes P1(24ms), P2(3ms), P3(3ms).\nGantt: | P1 (0-24) | P2 (24-27) | P3 (27-30) |\nAverage Wait Time: (0 + 24 + 27) / 3 = 17ms.' },
      { title: 'Deadlock Example', content: 'Process A holds Printer, wants Scanner. Process B holds Scanner, wants Printer. Neither releases their resource, resulting in circular wait and deadlock.' }
    ],
    metaDescription: 'Master Operating Systems for SBTE 4th Sem. Clear concepts on CPU scheduling, memory management, deadlocks, and paging with solved numericals.'
  },

  /* ───── 6. Web Technology ───── */
  {
    slug: 'web-technology',
    title: 'Web Technology',
    branch: 'BOTH',
    semester: 5,
    introduction: 'Web Technology is an essential subject in the diploma engineering curriculum that covers the principles, tools, and techniques used to design, develop, and deploy websites and web applications. The subject begins with the basics of the Internet, URLs, and the Hypertext Transfer Protocol (HTTP) that governs communication between browsers and servers. Students learn HTML5 for structuring content, CSS3 for styling and layout, and JavaScript for adding interactivity to web pages. The course also introduces server-side programming concepts using PHP or Node.js, covering form handling, sessions, cookies, and database connectivity. Understanding the Document Object Model (DOM) is crucial as it allows developers to dynamically manipulate web page content through scripting. Modern web development practices such as responsive design, CSS Flexbox, Grid layouts, and media queries are taught to ensure websites work seamlessly across desktops, tablets, and mobile devices. Students gain hands-on experience building functional multi-page websites that integrate front-end presentation with back-end data processing. The subject also touches upon web hosting, domain management, and deployment. Mastery of web technology opens career pathways in front-end development, full-stack development, UI/UX design, and freelance web development — making it one of the most practically valuable subjects in the diploma programme.',
    concepts: [
      { heading: 'HTML5 Semantic Elements', explanation: 'HTML5 introduced semantic tags like <header>, <nav>, <section>, <article>, <aside>, and <footer> that describe the meaning of content rather than just its appearance. These elements improve accessibility for screen readers, help search engines index pages better, and make code more readable and maintainable for developers.' },
      { heading: 'CSS Flexbox & Grid', explanation: 'Flexbox provides a one-dimensional layout model for arranging items in rows or columns with flexible sizing. CSS Grid offers a two-dimensional layout system for creating complex page layouts with rows and columns simultaneously. Together they replace old float-based layouts and enable responsive designs without heavy frameworks.' },
      { heading: 'JavaScript & DOM Manipulation', explanation: 'JavaScript is a dynamic scripting language that runs in the browser. The Document Object Model (DOM) represents the HTML page as a tree of objects. JavaScript can traverse this tree, add or remove elements, change styles, and respond to user events like clicks and keystrokes, enabling interactive and dynamic web experiences.' },
      { heading: 'Responsive Web Design', explanation: 'Responsive design ensures web pages look good on all screen sizes using fluid grids, flexible images, and CSS media queries. The viewport meta tag controls how pages render on mobile devices. A mobile-first approach starts designing for small screens and progressively enhances for larger displays.' },
      { heading: 'Client-Server Architecture', explanation: 'The web follows a client-server model where the browser (client) sends HTTP requests to a web server, which processes the request and returns a response (HTML, JSON, etc.). Understanding request methods (GET, POST, PUT, DELETE), status codes (200, 404, 500), and headers is fundamental to web development.' },
      { heading: 'Server-Side Programming', explanation: 'Server-side technologies like PHP, Node.js, or Python handle business logic, database operations, authentication, and form processing on the server before sending results to the client. This separation keeps sensitive logic and data secure while allowing dynamic content generation based on user input and database queries.' }
    ],
    chapters: [
      { title: 'Internet Fundamentals & HTML', summary: 'Covers how the Internet works, HTTP protocol basics, URL structure, and core HTML tags for creating structured web pages with text, images, links, tables, and forms.', keyPoints: ['HTTP request-response cycle', 'HTML document structure: DOCTYPE, head, body', 'Form elements: input, textarea, select, button', 'Table and list tags for structured data', 'Embedding images, audio, and video'] },
      { title: 'CSS Styling & Layouts', summary: 'Explores CSS selectors, properties, the box model, positioning, Flexbox, and Grid for creating visually appealing and responsive layouts.', keyPoints: ['CSS selectors: element, class, id, pseudo-classes', 'Box model: margin, border, padding, content', 'Flexbox: justify-content, align-items, flex-wrap', 'CSS Grid: grid-template-columns, grid-gap', 'Media queries for responsive breakpoints'] },
      { title: 'JavaScript Programming', summary: 'Teaches JavaScript syntax, variables, functions, control flow, arrays, objects, DOM manipulation, and event handling for interactive web pages.', keyPoints: ['Variables: var, let, const and scoping rules', 'Functions: declarations, expressions, arrow functions', 'DOM methods: getElementById, querySelector, createElement', 'Event listeners: click, submit, keyup, load', 'Form validation using JavaScript'] },
      { title: 'Server-Side Development', summary: 'Introduces server-side programming with PHP or Node.js for processing forms, managing sessions, handling cookies, and connecting to databases.', keyPoints: ['PHP syntax: variables, arrays, string functions', 'Form handling with GET and POST methods', 'Session management and cookie operations', 'Database connectivity with MySQL/MongoDB', 'CRUD operations through web forms'] },
      { title: 'Web Hosting & Deployment', summary: 'Covers domain registration, web hosting types, FTP deployment, and basic concepts of DNS and SSL certificates.', keyPoints: ['Domain names and DNS resolution', 'Shared vs VPS vs cloud hosting', 'Deploying sites via FTP or Git', 'SSL certificates and HTTPS', 'Basic SEO and sitemap submission'] }
    ],
    importantQuestions: [
      'Explain the differences between HTML, CSS, and JavaScript with examples.',
      'What is the CSS Box Model? Describe each component with a diagram.',
      'Write a JavaScript program to validate a registration form.',
      'Explain Flexbox properties: justify-content, align-items, and flex-direction.',
      'What is the DOM? How can JavaScript manipulate DOM elements?',
      'Differentiate between GET and POST request methods.',
      'Explain responsive web design and the role of media queries.',
      'Write HTML and CSS code for a responsive navigation bar.',
      'What are cookies and sessions? How do they differ?',
      'Explain the client-server architecture of the World Wide Web.'
    ],
    mcqs: [
      { question: 'Which HTML5 tag is used to define navigation links?', options: ['<navigate>', '<nav>', '<links>', '<menu>'], correctIndex: 1, explanation: 'The <nav> tag is a semantic HTML5 element specifically designed to wrap navigation links like menus and breadcrumbs.' },
      { question: 'Which CSS property is used to make a flex container?', options: ['display: block', 'display: flex', 'display: grid', 'display: inline'], correctIndex: 1, explanation: 'Setting display: flex on a container element activates the Flexbox layout model for its direct children.' },
      { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Management', 'Digital Ordinance Map', 'Document Order Method'], correctIndex: 0, explanation: 'DOM stands for Document Object Model — a programming interface that represents HTML as a tree of objects that can be manipulated with JavaScript.' },
      { question: 'Which HTTP method is used to submit form data securely?', options: ['GET', 'POST', 'PUT', 'HEAD'], correctIndex: 1, explanation: 'POST sends data in the request body rather than the URL, making it more secure for sensitive information like passwords.' },
      { question: 'Which CSS unit is relative to the viewport width?', options: ['px', 'em', 'vw', 'rem'], correctIndex: 2, explanation: 'The vw unit equals 1% of the viewport width, making it ideal for responsive typography and layouts that scale with screen size.' },
      { question: 'What is the correct JavaScript syntax to change paragraph text?', options: ['document.getElement("p").text = "Hello"', 'document.getElementById("demo").innerHTML = "Hello"', '#demo.innerHTML = "Hello"', 'document.querySelector.innerHTML("Hello")'], correctIndex: 1, explanation: 'document.getElementById() selects an element by its id attribute, and .innerHTML sets or gets the HTML content inside that element.' }
    ],
    previousYearContext: 'SBTE web technology papers consistently test HTML form creation, CSS styling problems, and JavaScript programming. Questions on writing complete HTML pages with forms and tables appear every year. CSS box model and layout questions are very frequent. JavaScript DOM manipulation and form validation are common 10-mark questions. Server-side topics like PHP form handling and session management appear in the latter sections. Students should practice writing complete code solutions as most questions require working code.',
    examTips: [
      'Practice writing complete HTML pages from scratch — many questions require full page code.',
      'Master CSS Flexbox and Box Model — these appear in almost every paper.',
      'Learn JavaScript form validation thoroughly — it is a guaranteed question.',
      'Understand the difference between inline, internal, and external CSS.',
      'Practice creating responsive layouts with media queries.',
      'Know the difference between cookies and sessions with code examples.',
      'Draw diagrams for client-server architecture questions.',
      'Revise HTML5 semantic tags and their purposes.'
    ],
    pdfContents: 'The Web Technology PDF notes cover Internet fundamentals and HTTP protocol, complete HTML5 tag reference with examples, CSS styling including Flexbox and Grid layouts, JavaScript programming with DOM manipulation exercises, PHP server-side programming basics, form handling and validation techniques, and responsive design patterns. Includes solved previous year questions and practice coding exercises.',
    syllabusRelevance: 'This subject is part of the 5th semester curriculum for both CSE and IT branches under SBTE Bihar. It covers Internet basics (Unit 1), HTML & CSS (Unit 2-3), JavaScript & DOM (Unit 4), and server-side programming (Unit 5). The syllabus emphasizes practical coding skills alongside theoretical understanding of web architecture.',
    faqs: [
      { question: 'Do I need to memorize all HTML tags?', answer: 'No, focus on commonly used tags: headings (h1-h6), paragraphs (p), links (a), images (img), tables (table, tr, td), forms (form, input, select, textarea), divs, and semantic tags (header, nav, section, footer). These cover 90% of exam questions.' },
      { question: 'Is JavaScript difficult for beginners?', answer: 'JavaScript has a gentle learning curve for basic tasks like form validation and DOM manipulation, which is what the diploma syllabus covers. Focus on variables, functions, conditionals, loops, and document methods like getElementById and innerHTML.' },
      { question: 'Will PHP or Node.js be asked in exams?', answer: 'The syllabus primarily covers PHP for server-side programming. Focus on PHP syntax, form handling with GET/POST, sessions, cookies, and MySQL database connectivity. Node.js may be mentioned but PHP is the exam focus.' },
      { question: 'How important is responsive design?', answer: 'Very important — expect at least one question on media queries and responsive layouts. Practice creating a responsive navigation bar and a two-column layout that stacks on mobile screens.' },
      { question: 'Should I use a framework like Bootstrap for exams?', answer: 'Exams test raw HTML, CSS, and JavaScript knowledge — not frameworks. Write pure CSS for layouts. However, understanding Bootstrap concepts helps in practicals and real-world projects.' }
    ],
    relatedTopics: [{ title: 'DBMS', slug: 'dbms' }, { title: 'Software Engineering', slug: 'software-engineering' }, { title: 'OOP with Java', slug: 'oop-java' }],
    examples: [
      { title: 'Responsive Card Layout', content: 'HTML: Create a div with class "card-grid" containing 3 div.card elements, each with an img, h3 title, and p description.\nCSS: .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }\n.card { background: #fff; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }\nThis creates cards that automatically wrap to fewer columns on smaller screens.' },
      { title: 'JavaScript Form Validation', content: 'function validateForm() {\n  let name = document.getElementById("name").value;\n  let email = document.getElementById("email").value;\n  if (name.length < 3) { alert("Name must be at least 3 characters"); return false; }\n  if (!email.includes("@")) { alert("Enter a valid email"); return false; }\n  return true;\n}\nAttach to form: <form onsubmit="return validateForm()">. This prevents submission if validation fails.' },
      { title: 'PHP Form Handling', content: 'form.html: <form method="POST" action="process.php">\n<input type="text" name="username">\n<input type="submit" value="Submit">\n</form>\n\nprocess.php:\n<?php\n$name = $_POST["username"];\necho "Welcome, " . htmlspecialchars($name);\n?>\nhtmlspecialchars() prevents XSS attacks by escaping special characters in user input.' }
    ],
    metaDescription: 'Complete Web Technology guide for SBTE 5th Sem — HTML5, CSS3, JavaScript, DOM, responsive design, PHP, and server-side programming with MCQs and solved examples.'
  },

  /* ───── 7. OOP with Java ───── */
  {
    slug: 'oop-java',
    title: 'Object-Oriented Programming with Java',
    branch: 'BOTH',
    semester: 3,
    introduction: 'Object-Oriented Programming (OOP) with Java is a foundational subject in the diploma curriculum that teaches students to design and build software using the object-oriented paradigm. Java, developed by James Gosling at Sun Microsystems in 1995, is a platform-independent, robust, and secure programming language that remains one of the most widely used languages in enterprise software, Android development, and web applications. The course introduces core OOP principles — Encapsulation, Inheritance, Polymorphism, and Abstraction — which form the backbone of modern software design. Students learn to create classes and objects, define constructors, implement method overloading and overriding, and use access modifiers to control data visibility. The subject progresses to advanced topics including abstract classes, interfaces, packages, exception handling with try-catch-finally blocks, and file I/O operations. Understanding these concepts is essential for writing maintainable, reusable, and scalable code. Java\'s strong type system, automatic garbage collection, and extensive standard library make it an excellent language for learning OOP principles. The practical component involves writing Java programs that demonstrate inheritance hierarchies, polymorphic behaviour, and exception handling scenarios. This subject builds directly upon C programming knowledge from earlier semesters and prepares students for advanced topics like data structures, web development frameworks, and Android application development.',
    concepts: [
      { heading: 'Classes & Objects', explanation: 'A class is a blueprint that defines the properties (fields) and behaviours (methods) of an entity. An object is a specific instance of a class created using the new keyword. For example, a Student class may have fields like name and rollNo, and methods like display(). Multiple objects can be created from the same class, each holding different data.' },
      { heading: 'Encapsulation', explanation: 'Encapsulation bundles data (fields) and the methods that operate on that data within a single class, restricting direct access to internal state through access modifiers (private, protected, public). Getter and setter methods provide controlled access. This protects data integrity and hides implementation details from external code.' },
      { heading: 'Inheritance', explanation: 'Inheritance allows a child class (subclass) to acquire properties and methods from a parent class (superclass) using the extends keyword. This promotes code reuse — common functionality is defined once in the parent and inherited by all children. Java supports single inheritance for classes but allows multiple inheritance through interfaces.' },
      { heading: 'Polymorphism', explanation: 'Polymorphism means "many forms" — the ability of an object to take different forms. Compile-time polymorphism is achieved through method overloading (same method name, different parameters). Runtime polymorphism is achieved through method overriding (subclass provides its own implementation of a parent method), resolved via dynamic method dispatch.' },
      { heading: 'Abstraction', explanation: 'Abstraction hides complex implementation details and exposes only essential features. In Java, this is achieved through abstract classes (using the abstract keyword, cannot be instantiated, may have abstract methods) and interfaces (define method signatures without implementations). Classes that extend abstract classes must implement all abstract methods.' },
      { heading: 'Exception Handling', explanation: 'Java provides a robust mechanism to handle runtime errors using try-catch-finally blocks. Code that might throw an exception is placed in try, catch blocks handle specific exception types, and finally executes cleanup code regardless of whether an exception occurred. Custom exceptions can be created by extending the Exception class.' }
    ],
    chapters: [
      { title: 'Java Fundamentals', summary: 'Covers Java\'s history, features, JDK/JRE/JVM architecture, data types, variables, operators, control statements (if-else, switch, loops), and basic input/output.', keyPoints: ['JDK vs JRE vs JVM and their roles', 'Primitive data types: byte, short, int, long, float, double, char, boolean', 'Control structures: if-else, switch-case, for, while, do-while', 'Scanner class for user input', 'Compiling and running Java programs: javac and java commands'] },
      { title: 'Classes, Objects & Constructors', summary: 'Introduces class declaration, object creation, constructors (default, parameterized, copy), the this keyword, static members, and access modifiers.', keyPoints: ['Defining classes with fields and methods', 'Object creation using new keyword', 'Constructor overloading and constructor chaining', 'Static variables and methods belong to the class, not objects', 'Access modifiers: private, default, protected, public'] },
      { title: 'Inheritance & Polymorphism', summary: 'Explains single inheritance, multilevel inheritance, method overriding, the super keyword, and dynamic method dispatch for runtime polymorphism.', keyPoints: ['extends keyword for class inheritance', 'Method overriding rules and @Override annotation', 'super keyword to call parent constructor and methods', 'Dynamic method dispatch and virtual method invocation', 'The Object class as root of all Java classes'] },
      { title: 'Abstract Classes & Interfaces', summary: 'Covers abstraction through abstract classes and interfaces, the implements keyword, and how interfaces enable multiple inheritance in Java.', keyPoints: ['Abstract classes cannot be instantiated', 'Abstract methods have no body — must be overridden', 'Interfaces define contracts with method signatures', 'A class can implement multiple interfaces', 'Default and static methods in interfaces (Java 8+)'] },
      { title: 'Exception Handling & I/O', summary: 'Teaches Java\'s exception hierarchy, try-catch-finally, throw and throws keywords, custom exceptions, and basic file reading/writing operations.', keyPoints: ['Checked vs unchecked exceptions', 'try-catch-finally execution flow', 'throw to explicitly raise exceptions', 'throws in method signature to declare exceptions', 'FileReader, BufferedReader, FileWriter for file I/O'] }
    ],
    importantQuestions: [
      'Explain the four pillars of OOP with examples in Java.',
      'What is the difference between method overloading and method overriding?',
      'Write a Java program demonstrating single inheritance with constructor chaining.',
      'Explain abstract classes vs interfaces with code examples.',
      'What is dynamic method dispatch? Explain with a program.',
      'Write a Java program that handles ArrayIndexOutOfBoundsException and ArithmeticException.',
      'Explain access modifiers in Java with a table showing their scope.',
      'What is encapsulation? Write a Java class with private fields and public getter/setter methods.',
      'Differentiate between final, finally, and finalize in Java.',
      'Write a program to demonstrate multiple inheritance using interfaces.'
    ],
    mcqs: [
      { question: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'super'], correctIndex: 1, explanation: 'The extends keyword establishes an inheritance relationship where the subclass inherits all accessible members of the superclass.' },
      { question: 'Which OOP principle is achieved by using private fields with public getters and setters?', options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], correctIndex: 2, explanation: 'Encapsulation restricts direct access to object data by making fields private and providing controlled access through public getter and setter methods.' },
      { question: 'What is the output of: System.out.println(10/0);?', options: ['0', 'Infinity', 'ArithmeticException', 'Compilation error'], correctIndex: 2, explanation: 'Integer division by zero throws an ArithmeticException at runtime. Note: floating-point division (10.0/0) would give Infinity instead.' },
      { question: 'Which of these cannot be instantiated?', options: ['Class', 'Abstract class', 'Subclass', 'Interface object'], correctIndex: 1, explanation: 'Abstract classes are declared with the abstract keyword and cannot be instantiated directly — they must be subclassed, and the subclass must implement all abstract methods.' },
      { question: 'Method overloading is an example of:', options: ['Runtime polymorphism', 'Compile-time polymorphism', 'Encapsulation', 'Abstraction'], correctIndex: 1, explanation: 'Method overloading is resolved at compile time based on the method signature (number and type of parameters), making it compile-time polymorphism.' },
      { question: 'A class can implement how many interfaces in Java?', options: ['Only one', 'Two', 'Multiple', 'None'], correctIndex: 2, explanation: 'Java allows a class to implement multiple interfaces using comma separation: class MyClass implements Interface1, Interface2 { }. This is Java\'s way of supporting multiple inheritance.' }
    ],
    previousYearContext: 'SBTE Java papers heavily test inheritance and polymorphism concepts with coding questions. Expect at least two 10-mark questions asking you to write complete Java programs demonstrating inheritance, method overriding, or exception handling. Abstract class vs interface comparison is a guaranteed theory question. MCQ sections frequently test OOP terminology, access modifiers, and exception types. Constructor concepts and the this/super keywords are common short-answer questions.',
    examTips: [
      'Always write the complete class structure with main method in coding answers.',
      'Draw class hierarchy diagrams for inheritance questions — examiners love visual answers.',
      'Memorize the access modifier scope table: private, default, protected, public.',
      'Practice writing try-catch-finally blocks — exception handling is guaranteed in exams.',
      'Know the difference between abstract class and interface — comparison table format works best.',
      'Remember: Java does not support multiple inheritance with classes, only with interfaces.',
      'Use @Override annotation in method overriding examples to show good practice.',
      'Practice at least 5 complete programs covering each OOP pillar.'
    ],
    pdfContents: 'The OOP with Java PDF notes include Java environment setup and basics, class and object creation with constructors, inheritance hierarchies with solved programs, polymorphism examples with method overloading and overriding, abstraction using abstract classes and interfaces, exception handling with custom exceptions, and file I/O operations. Each chapter includes solved examples and previous year questions.',
    syllabusRelevance: 'OOP with Java is offered in the 3rd semester for both CSE and IT branches under SBTE Bihar. The syllabus covers Java fundamentals (Unit 1), classes and objects (Unit 2), inheritance and polymorphism (Unit 3), interfaces and packages (Unit 4), and exception handling (Unit 5). Practical lab focuses on writing and executing Java programs.',
    faqs: [
      { question: 'Do I need to know C before learning Java?', answer: 'Yes, C programming basics from 1st semester (variables, loops, functions, arrays) provide a strong foundation. Java syntax is similar to C but adds object-oriented features. Your C knowledge will make learning Java much easier.' },
      { question: 'What is the difference between JDK, JRE, and JVM?', answer: 'JVM (Java Virtual Machine) executes bytecode. JRE (Java Runtime Environment) includes JVM plus standard libraries needed to run Java programs. JDK (Java Development Kit) includes JRE plus development tools like the compiler (javac) and debugger.' },
      { question: 'Why does Java not support multiple inheritance with classes?', answer: 'To avoid the Diamond Problem — if two parent classes have the same method, the compiler cannot determine which version to inherit. Java solves this by allowing multiple inheritance only through interfaces, where the implementing class must provide its own implementation.' },
      { question: 'Is Java still relevant in 2025?', answer: 'Absolutely. Java remains one of the top 3 programming languages globally, used in Android development, enterprise applications (Spring Boot), big data (Hadoop), and banking systems. Learning Java OOP concepts also makes learning other OOP languages (C#, Python, Kotlin) much easier.' },
      { question: 'How should I practice Java for exams?', answer: 'Write programs by hand on paper — exams are written, not on computers. Practice 2-3 programs daily covering inheritance, polymorphism, and exception handling. Focus on program output prediction questions in MCQs.' }
    ],
    relatedTopics: [{ title: 'C Programming', slug: 'c-programming' }, { title: 'Data Structures', slug: 'data-structures' }, { title: 'Web Technology', slug: 'web-technology' }],
    examples: [
      { title: 'Inheritance & Method Overriding', content: 'class Animal {\n  void sound() { System.out.println("Animal makes sound"); }\n}\nclass Dog extends Animal {\n  @Override\n  void sound() { System.out.println("Dog barks"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Animal a = new Dog(); // Upcasting\n    a.sound(); // Output: Dog barks (runtime polymorphism)\n  }\n}\nThe reference type is Animal but the actual object is Dog. Java\'s dynamic dispatch calls Dog\'s sound() method at runtime.' },
      { title: 'Interface Implementation', content: 'interface Drawable {\n  void draw();\n}\ninterface Resizable {\n  void resize(int factor);\n}\nclass Circle implements Drawable, Resizable {\n  int radius = 5;\n  public void draw() { System.out.println("Drawing circle with radius " + radius); }\n  public void resize(int factor) { radius *= factor; }\n}\nThis demonstrates multiple inheritance through interfaces — Circle inherits contracts from both Drawable and Resizable.' },
      { title: 'Exception Handling', content: 'public class DivideExample {\n  public static void main(String[] args) {\n    try {\n      int result = 10 / 0;\n      System.out.println(result);\n    } catch (ArithmeticException e) {\n      System.out.println("Cannot divide by zero: " + e.getMessage());\n    } finally {\n      System.out.println("Finally block always executes");\n    }\n  }\n}\nOutput: Cannot divide by zero: / by zero\\nFinally block always executes' }
    ],
    metaDescription: 'Complete OOP with Java guide for SBTE 3rd Sem — classes, inheritance, polymorphism, abstraction, interfaces, exception handling with MCQs and programs.'
  },

  /* ───── 8. Software Engineering ───── */
  {
    slug: 'software-engineering',
    title: 'Software Engineering',
    branch: 'CSE',
    semester: 5,
    introduction: 'Software Engineering is a systematic, disciplined, and quantifiable approach to the development, operation, and maintenance of software. This subject equips diploma students with the knowledge of software development methodologies, project management principles, quality assurance practices, and testing techniques that are essential in the professional IT industry. The course begins with understanding why software engineering is needed — as software systems grow in complexity, ad-hoc coding approaches fail, leading to cost overruns, missed deadlines, and buggy products. The Software Development Life Cycle (SDLC) provides a structured framework with distinct phases: requirements gathering, system design, implementation, testing, deployment, and maintenance. Students study various process models including the traditional Waterfall model suitable for well-defined projects, the Iterative model for evolving requirements, the Spiral model combining risk analysis with iterative development, and modern Agile methodologies like Scrum and Kanban that emphasize flexibility and rapid delivery. Requirements Engineering teaches techniques for gathering, analyzing, documenting, and validating what stakeholders need from a software system. Software Design covers architectural patterns, modular design, coupling, cohesion, and UML diagrams for visual representation. The testing chapter introduces unit testing, integration testing, system testing, and acceptance testing alongside techniques like black-box and white-box testing. Project management topics include effort estimation, scheduling, risk management, and configuration management. This subject bridges the gap between programming skills and professional software development practices.',
    concepts: [
      { heading: 'Software Development Life Cycle (SDLC)', explanation: 'SDLC is a framework defining the phases involved in building software: Planning, Requirements Analysis, Design, Implementation (Coding), Testing, Deployment, and Maintenance. Each phase has specific deliverables and review processes. The chosen SDLC model (Waterfall, Agile, etc.) determines how these phases are organized and iterated.' },
      { heading: 'Waterfall vs Agile Models', explanation: 'The Waterfall model follows sequential phases where each phase must complete before the next begins — suitable for stable requirements. Agile methodologies (Scrum, Kanban) use short iterative cycles called sprints (2-4 weeks) with continuous customer feedback and adaptive planning — ideal for projects where requirements evolve frequently.' },
      { heading: 'Requirements Engineering', explanation: 'Requirements engineering involves eliciting (interviews, surveys, observation), analyzing, specifying (SRS document), and validating software requirements. Functional requirements describe what the system should do; non-functional requirements specify performance, security, usability, and reliability constraints. A well-written SRS reduces ambiguity and rework.' },
      { heading: 'Software Design Principles', explanation: 'Good software design follows principles like modularity (breaking into independent modules), high cohesion (related functionality within a module), low coupling (minimal dependencies between modules), and information hiding. UML diagrams (class diagrams, use case diagrams, sequence diagrams) visualize the design for team communication.' },
      { heading: 'Software Testing', explanation: 'Testing verifies that software meets requirements and identifies defects. Black-box testing checks functionality without knowing internal code. White-box testing examines internal logic paths. Testing levels progress from unit testing (individual functions) through integration testing (module interactions), system testing (complete system), to acceptance testing (user validation).' },
      { heading: 'Project Management', explanation: 'Software project management involves effort estimation (COCOMO model, Function Point analysis), scheduling (Gantt charts, PERT charts), risk management (identification, analysis, mitigation), and team coordination. Configuration management tracks changes to code and documents. Effective management ensures projects are delivered on time, within budget, and to quality standards.' }
    ],
    chapters: [
      { title: 'Introduction to Software Engineering', summary: 'Covers software characteristics, software crisis, the need for engineering principles, types of software, and an overview of SDLC phases.', keyPoints: ['Software characteristics: correctness, reliability, efficiency, maintainability', 'Software crisis: causes and solutions', 'Types: system software, application software, embedded software', 'SDLC phases overview and their deliverables', 'Role of a software engineer in the industry'] },
      { title: 'Process Models', summary: 'Details various software development process models — their phases, advantages, disadvantages, and appropriate use cases.', keyPoints: ['Waterfall model: sequential phases, rigid structure', 'Iterative and Incremental model: repeated cycles', 'Spiral model: risk-driven, four quadrants', 'Agile methodology: Scrum sprints, user stories, daily standups', 'V-Model: testing phase parallel to each development phase'] },
      { title: 'Requirements & Design', summary: 'Teaches requirements gathering techniques, SRS documentation, and software design using structured and object-oriented approaches with UML diagrams.', keyPoints: ['SRS document structure and IEEE 830 standard', 'Functional vs non-functional requirements', 'Use Case diagrams: actors, use cases, relationships', 'Class diagrams: classes, attributes, methods, associations', 'Design principles: coupling, cohesion, modularity'] },
      { title: 'Testing & Quality Assurance', summary: 'Covers testing strategies, techniques, and quality assurance processes to ensure software reliability and correctness.', keyPoints: ['Black-box vs white-box testing approaches', 'Unit, integration, system, and acceptance testing levels', 'Test case design: boundary value analysis, equivalence partitioning', 'Regression testing after code changes', 'Quality metrics: defect density, code coverage'] },
      { title: 'Project Management & Maintenance', summary: 'Introduces project planning, effort estimation, scheduling tools, risk management, and types of software maintenance.', keyPoints: ['COCOMO model for effort estimation', 'Gantt charts and PERT/CPM for scheduling', 'Risk identification, assessment, and mitigation strategies', 'Types of maintenance: corrective, adaptive, perfective, preventive', 'Configuration management and version control'] }
    ],
    importantQuestions: [
      'Compare Waterfall and Agile software development models with advantages and disadvantages.',
      'Explain the Software Development Life Cycle (SDLC) with a diagram.',
      'What is an SRS document? Describe its contents and importance.',
      'Differentiate between functional and non-functional requirements with examples.',
      'Draw and explain a Use Case diagram for a Library Management System.',
      'What is the difference between black-box and white-box testing?',
      'Explain the Spiral model with its four quadrants.',
      'What are coupling and cohesion? Why is high cohesion and low coupling desirable?',
      'Describe the COCOMO model for software cost estimation.',
      'What are the different types of software maintenance? Explain each.'
    ],
    mcqs: [
      { question: 'Which SDLC model is best for projects with well-defined requirements?', options: ['Agile', 'Spiral', 'Waterfall', 'Prototype'], correctIndex: 2, explanation: 'The Waterfall model works best when requirements are clearly defined upfront and unlikely to change, as it follows a strict sequential approach.' },
      { question: 'SRS stands for:', options: ['Software Requirement System', 'Software Requirement Specification', 'System Requirement Software', 'Standard Requirement Specification'], correctIndex: 1, explanation: 'SRS (Software Requirement Specification) is a document that describes what the software should do, its constraints, and expected behavior in detail.' },
      { question: 'Testing without knowledge of internal code is called:', options: ['White-box testing', 'Grey-box testing', 'Black-box testing', 'Unit testing'], correctIndex: 2, explanation: 'Black-box testing treats the software as a "black box" — testing functionality based on inputs and expected outputs without examining the internal code structure.' },
      { question: 'Which diagram shows actors and their interactions with the system?', options: ['Class diagram', 'Sequence diagram', 'Use Case diagram', 'Activity diagram'], correctIndex: 2, explanation: 'Use Case diagrams show external actors (users or systems) and the use cases (functionalities) they interact with, providing a high-level view of system behavior.' },
      { question: 'In Agile Scrum, a typical sprint lasts:', options: ['1 day', '1-4 weeks', '3-6 months', '1 year'], correctIndex: 1, explanation: 'Scrum sprints typically last 1 to 4 weeks (most commonly 2 weeks), during which a potentially shippable product increment is developed.' },
      { question: 'COCOMO model is used for:', options: ['Testing', 'Coding', 'Effort estimation', 'Requirement gathering'], correctIndex: 2, explanation: 'COCOMO (Constructive Cost Model) by Barry Boehm estimates the effort, cost, and schedule for software projects based on lines of code and project complexity factors.' }
    ],
    previousYearContext: 'SBTE Software Engineering papers emphasize SDLC models comparison (especially Waterfall vs Agile), SRS documentation, and testing concepts. UML diagram questions (Use Case, Class diagrams) are guaranteed and carry high marks. Draw neat, labeled diagrams for full marks. Short notes on specific models or testing types are common. Project management topics like COCOMO and risk management appear as 5-mark questions.',
    examTips: [
      'Learn to compare models in table format — Waterfall vs Agile, Black-box vs White-box.',
      'Practice drawing UML diagrams neatly with proper notation — they carry significant marks.',
      'Memorize SRS document structure — it appears in almost every paper.',
      'Use real-world examples when explaining concepts (e.g., ATM system for Use Case).',
      'Know at least 3 SDLC models thoroughly with their pros and cons.',
      'Understand COCOMO model formulas: Effort = a × (KLOC)^b.',
      'Practice writing test cases for simple scenarios like login form or calculator.'
    ],
    pdfContents: 'The Software Engineering PDF notes cover SDLC fundamentals, detailed comparison of process models (Waterfall, Spiral, Agile, V-Model), requirements engineering and SRS writing, UML diagram tutorials with examples, testing strategies and techniques, project management tools and estimation models, and maintenance types. Includes solved SBTE previous year questions.',
    syllabusRelevance: 'Software Engineering is a 5th semester subject for CSE students under SBTE Bihar. The syllabus covers software basics and SDLC (Unit 1), process models (Unit 2), requirements and design with UML (Unit 3), testing and quality (Unit 4), and project management and maintenance (Unit 5).',
    faqs: [
      { question: 'Is Software Engineering only theory?', answer: 'While the subject is theory-heavy, it has practical applications. Understanding SDLC helps in organizing real projects, UML diagrams help in system design, and testing knowledge is essential for quality code. Companies expect diploma graduates to understand these processes.' },
      { question: 'Which SDLC model should I study most?', answer: 'Focus on Waterfall (most fundamental), Agile/Scrum (most popular in industry), and Spiral (frequently asked in exams). Be able to compare any two models in a table format with phases, advantages, disadvantages, and use cases.' },
      { question: 'Are UML diagrams important for exams?', answer: 'Extremely important. Use Case and Class diagrams appear in almost every paper, often for 10+ marks. Practice drawing them for common systems like Library Management, ATM, Online Shopping, and Hospital Management.' },
      { question: 'What is the difference between verification and validation?', answer: 'Verification checks "Are we building the product right?" (process-oriented, through reviews and inspections). Validation checks "Are we building the right product?" (product-oriented, through testing with real users). Both are essential for software quality.' }
    ],
    relatedTopics: [{ title: 'Web Technology', slug: 'web-technology' }, { title: 'DBMS', slug: 'dbms' }, { title: 'Computer Networks', slug: 'computer-networks' }],
    examples: [
      { title: 'Use Case Diagram — ATM System', content: 'Actors: Customer, Bank Server, Maintenance Engineer.\nUse Cases: Check Balance, Withdraw Cash, Deposit Cash, Transfer Funds, Change PIN, Print Statement.\nRelationships: Customer interacts with all transaction use cases. "Withdraw Cash" includes "Verify PIN" (include relationship). "Transfer Funds" extends "Check Balance" (extend relationship). Bank Server processes all transactions. Maintenance Engineer handles "Refill Cash" and "System Maintenance" use cases.' },
      { title: 'Waterfall Model Phases', content: 'Requirements → System Design → Implementation → Testing → Deployment → Maintenance.\nExample: Government payroll system with fixed requirements.\n1. Requirements: Gather salary structure, tax rules, employee data format.\n2. Design: Database schema, calculation algorithms, report formats.\n3. Implementation: Code modules for salary calculation, tax deduction, report generation.\n4. Testing: Verify calculations with sample data, test edge cases.\n5. Deployment: Install on government servers, train staff.\n6. Maintenance: Update tax rules annually, fix reported bugs.' }
    ],
    metaDescription: 'Complete Software Engineering guide for SBTE 5th Sem CSE — SDLC models, Agile, UML diagrams, testing, project management with MCQs and solved examples.'
  },

  /* ───── 9. Digital Electronics ───── */
  {
    slug: 'digital-electronics',
    title: 'Digital Electronics',
    branch: 'BOTH',
    semester: 2,
    introduction: 'Digital Electronics is a fundamental subject that forms the building blocks of all modern computing and communication systems. This course introduces diploma students to the world of digital circuits — systems that operate on discrete binary signals (0s and 1s) rather than continuous analog signals. The subject begins with number systems (binary, octal, decimal, hexadecimal) and their inter-conversions, which are essential for understanding how computers store and process data internally. Students then study logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) — the fundamental building blocks of all digital circuits. Boolean Algebra provides the mathematical framework for simplifying logical expressions, and Karnaugh Maps (K-Maps) offer a visual simplification technique for up to four variables. The course progresses to combinational circuits — circuits whose outputs depend only on current inputs — including adders (half adder, full adder), subtractors, multiplexers, demultiplexers, encoders, and decoders. Sequential circuits introduce memory elements through flip-flops (SR, D, JK, T), which store binary data and form the basis of registers and counters. Students learn about different types of counters (asynchronous, synchronous, up, down, ring) and shift registers used in data storage and transfer. Understanding digital electronics is crucial for subsequent subjects like microprocessors, computer architecture, and embedded systems. The practical component involves designing and verifying circuits using logic gate ICs on breadboards.',
    concepts: [
      { heading: 'Number Systems & Conversions', explanation: 'Computers use binary (base-2) internally. Understanding binary, octal (base-8), decimal (base-10), and hexadecimal (base-16) number systems and converting between them is foundational. Key operations include binary addition, subtraction using 1\'s and 2\'s complement, and BCD (Binary Coded Decimal) representation where each decimal digit is encoded in 4 binary bits.' },
      { heading: 'Logic Gates', explanation: 'Logic gates are electronic circuits that perform Boolean operations. The seven basic gates are AND (output 1 when all inputs are 1), OR (output 1 when any input is 1), NOT (inverts input), NAND (AND followed by NOT), NOR (OR followed by NOT), XOR (output 1 when inputs differ), and XNOR (output 1 when inputs match). NAND and NOR are called universal gates.' },
      { heading: 'Boolean Algebra & K-Maps', explanation: 'Boolean Algebra uses laws (commutative, associative, distributive, De Morgan\'s theorems) to simplify logical expressions. Karnaugh Maps provide a graphical method to minimize Boolean functions by grouping adjacent 1s in a grid. Simplification reduces the number of gates needed, lowering cost and improving circuit speed.' },
      { heading: 'Combinational Circuits', explanation: 'Combinational circuits produce outputs solely based on current inputs with no memory. Key circuits include half adders (2 inputs, sum + carry), full adders (3 inputs including carry-in), multiplexers (select one of many inputs), demultiplexers (route one input to many outputs), encoders (convert active input to binary code), and decoders (convert binary code to active output).' },
      { heading: 'Flip-Flops', explanation: 'Flip-flops are bistable sequential elements that store one bit of data. The SR flip-flop has Set and Reset inputs. The D flip-flop captures input on clock edge. The JK flip-flop resolves the SR invalid state. The T flip-flop toggles output on each clock pulse. Flip-flops are triggered by clock signals (edge-triggered or level-triggered) and form the basis of registers and memory.' },
      { heading: 'Counters & Registers', explanation: 'Counters are sequential circuits that cycle through a specific sequence of states. Asynchronous (ripple) counters use cascaded flip-flops where each output clocks the next. Synchronous counters clock all flip-flops simultaneously for faster operation. Shift registers store and transfer data serially or in parallel, used in serial-to-parallel conversion and data buffering.' }
    ],
    chapters: [
      { title: 'Number Systems & Codes', summary: 'Covers binary, octal, decimal, and hexadecimal systems, conversions between them, binary arithmetic, complements, BCD, Gray code, and Excess-3 code.', keyPoints: ['Decimal to binary and binary to decimal conversion methods', 'Octal and hexadecimal as shorthand for binary', 'Binary addition, subtraction using 2\'s complement', 'BCD representation and its applications', 'Gray code and binary-to-Gray conversion'] },
      { title: 'Logic Gates & Boolean Algebra', summary: 'Introduces all logic gates with truth tables, Boolean laws, theorems, and expression simplification techniques using algebraic methods and K-Maps.', keyPoints: ['Truth tables for all 7 basic logic gates', 'De Morgan\'s Theorems: (A.B)\' = A\'+B\' and (A+B)\' = A\'.B\'', 'NAND and NOR as universal gates — implementing any gate using only NAND/NOR', 'Karnaugh Map grouping rules for 2, 3, and 4 variables', 'Sum of Products (SOP) and Product of Sums (POS) forms'] },
      { title: 'Combinational Circuits', summary: 'Covers design and analysis of adders, subtractors, multiplexers, demultiplexers, encoders, decoders, and code converters.', keyPoints: ['Half Adder: Sum = A XOR B, Carry = A AND B', 'Full Adder: extends half adder with carry-in input', 'Multiplexer: 2^n inputs selected by n select lines', 'Decoder: n inputs activate one of 2^n outputs', 'BCD to 7-segment decoder for display applications'] },
      { title: 'Flip-Flops', summary: 'Explains SR, D, JK, and T flip-flops with truth tables, excitation tables, timing diagrams, and applications in data storage.', keyPoints: ['SR flip-flop: Set, Reset, and invalid (S=R=1) state', 'D flip-flop: output follows data input on clock edge', 'JK flip-flop: resolves SR invalid state with toggle when J=K=1', 'T flip-flop: toggles output on every clock pulse when T=1', 'Master-Slave flip-flop for eliminating race conditions'] },
      { title: 'Counters & Registers', summary: 'Introduces asynchronous and synchronous counters, modulus counters, up/down counters, and shift register types.', keyPoints: ['Ripple counter: simple but slow due to propagation delay', 'Synchronous counter: faster, all flip-flops clocked simultaneously', 'Mod-N counter design using feedback', 'SISO, SIPO, PISO, PIPO shift register configurations', 'Ring counter and Johnson counter applications'] }
    ],
    importantQuestions: [
      'Convert the decimal number 156.375 to binary and hexadecimal.',
      'Prove De Morgan\'s Theorems using truth tables.',
      'Simplify the Boolean expression F(A,B,C,D) = Σm(0,1,2,5,7,8,10,14) using a K-Map.',
      'Design a Full Adder circuit and draw its logic diagram.',
      'Explain the working of a 4:1 Multiplexer with its truth table.',
      'Draw the circuit and truth table of a JK flip-flop. How does it solve the SR flip-flop problem?',
      'Design a synchronous 3-bit up counter using JK flip-flops.',
      'What are universal gates? Implement AND, OR, and NOT gates using only NAND gates.',
      'Explain the difference between combinational and sequential circuits.',
      'Draw and explain a 4-bit SIPO (Serial-In Parallel-Out) shift register.'
    ],
    mcqs: [
      { question: 'The binary equivalent of decimal 25 is:', options: ['10101', '11001', '11011', '10011'], correctIndex: 1, explanation: '25 = 16+8+1 = 2^4+2^3+2^0 = 11001 in binary. Verify: 1×16 + 1×8 + 0×4 + 0×2 + 1×1 = 25.' },
      { question: 'Which gate is called a universal gate?', options: ['AND', 'OR', 'XOR', 'NAND'], correctIndex: 3, explanation: 'NAND (and NOR) are universal gates because any other logic gate (AND, OR, NOT, XOR) can be constructed using only NAND gates.' },
      { question: 'A K-Map for 3 variables has how many cells?', options: ['4', '6', '8', '16'], correctIndex: 2, explanation: 'A K-Map for n variables has 2^n cells. For 3 variables: 2^3 = 8 cells arranged in a specific Gray code order.' },
      { question: 'In a JK flip-flop, when J=1 and K=1, the output:', options: ['Sets to 1', 'Resets to 0', 'Toggles', 'No change'], correctIndex: 2, explanation: 'When both J and K are 1, the JK flip-flop toggles — if Q was 0 it becomes 1, and if Q was 1 it becomes 0. This resolves the invalid state of SR flip-flop.' },
      { question: 'How many flip-flops are needed for a MOD-16 counter?', options: ['2', '3', '4', '8'], correctIndex: 2, explanation: 'A MOD-N counter needs n flip-flops where 2^n ≥ N. For MOD-16: 2^4 = 16, so 4 flip-flops are needed to count from 0 to 15.' },
      { question: 'The 2\'s complement of binary 1010 is:', options: ['0101', '0110', '1011', '0100'], correctIndex: 1, explanation: '2\'s complement: First take 1\'s complement (invert all bits): 0101, then add 1: 0101+1 = 0110. This is used for binary subtraction.' }
    ],
    previousYearContext: 'SBTE Digital Electronics papers always include number conversion problems (5-10 marks), K-Map simplification (10 marks), and combinational/sequential circuit design questions. Flip-flop truth tables and counter design are guaranteed high-mark questions. Gate-level circuit diagrams must be drawn neatly. Practice K-Map problems extensively as they appear in every paper. Binary arithmetic with 2\'s complement is a common short-answer question.',
    examTips: [
      'Practice number system conversions daily — speed and accuracy matter in exams.',
      'Memorize truth tables for all 7 logic gates and flip-flop types.',
      'Master K-Map simplification for 3 and 4 variables — practice at least 10 problems.',
      'Draw circuit diagrams neatly with proper gate symbols — marks depend on diagram quality.',
      'Remember universal gate implementations — AND, OR, NOT using NAND only.',
      'Learn to derive excitation tables for counter design problems.',
      'Practice 2\'s complement subtraction thoroughly.',
      'Know the difference between combinational and sequential circuits with examples.'
    ],
    pdfContents: 'The Digital Electronics PDF notes cover number systems with conversion examples, logic gates with truth tables and IC numbers, Boolean algebra with De Morgan\'s theorems, K-Map simplification techniques, combinational circuit designs (adders, MUX, decoders), flip-flop types with timing diagrams, counter design procedures, and shift register configurations. Includes solved SBTE previous year questions.',
    syllabusRelevance: 'Digital Electronics is a 2nd semester subject for both CSE and IT under SBTE Bihar. The syllabus covers number systems and codes (Unit 1), logic gates and Boolean algebra (Unit 2), combinational circuits (Unit 3), flip-flops (Unit 4), and counters and registers (Unit 5). Lab work involves implementing circuits on breadboards using TTL ICs.',
    faqs: [
      { question: 'Why are NAND and NOR called universal gates?', answer: 'Because any Boolean function can be implemented using only NAND gates or only NOR gates. You can build AND, OR, NOT, XOR — any gate — from combinations of just NAND (or just NOR). This simplifies manufacturing since only one type of gate IC is needed.' },
      { question: 'How do I solve K-Map problems quickly?', answer: 'Draw the K-Map grid with proper Gray code labeling. Place 1s in cells corresponding to minterms. Group adjacent 1s in powers of 2 (1, 2, 4, 8). Larger groups give simpler terms. Don\'t forget wrap-around adjacencies. Practice is the key — solve 3-4 problems daily.' },
      { question: 'What is the difference between a latch and a flip-flop?', answer: 'A latch is level-triggered — it responds to input changes whenever the enable signal is active (high or low). A flip-flop is edge-triggered — it captures input only at the rising or falling edge of the clock signal. Flip-flops provide better synchronization in sequential circuits.' },
      { question: 'Do I need to memorize IC numbers?', answer: 'Know the most common ones: 7400 (quad NAND), 7402 (quad NOR), 7404 (hex NOT), 7408 (quad AND), 7432 (quad OR), 7486 (quad XOR), 7476 (dual JK flip-flop), 7490 (decade counter). These may appear in MCQs or practical viva.' }
    ],
    relatedTopics: [{ title: 'C Programming', slug: 'c-programming' }, { title: 'Engineering Mathematics', slug: 'engineering-mathematics' }, { title: 'Computer Networks', slug: 'computer-networks' }],
    examples: [
      { title: 'K-Map Simplification', content: 'Simplify F(A,B,C) = Σm(0,1,2,4,5).\nDraw 2×4 K-Map:\n       BC=00  BC=01  BC=11  BC=10\nA=0 |  1   |  1   |  0   |  1  |\nA=1 |  1   |  1   |  0   |  0  |\n\nGroups: {m0,m1,m4,m5} = B\' (top-left quad), {m0,m2} = A\'C\' (corners of top row)\nResult: F = B\' + A\'C\'' },
      { title: 'Full Adder Design', content: 'A Full Adder adds three 1-bit inputs: A, B, and Carry-in (Cin).\nSum = A XOR B XOR Cin\nCarry-out = (A AND B) OR (Cin AND (A XOR B))\n\nTruth Table:\nA B Cin | Sum Cout\n0 0  0  |  0   0\n0 0  1  |  1   0\n0 1  0  |  1   0\n0 1  1  |  0   1\n1 0  0  |  1   0\n1 0  1  |  0   1\n1 1  0  |  0   1\n1 1  1  |  1   1\n\nA Full Adder can be built from two Half Adders and an OR gate.' }
    ],
    metaDescription: 'Complete Digital Electronics guide for SBTE 2nd Sem — number systems, logic gates, Boolean algebra, K-Maps, flip-flops, counters with MCQs and solved problems.'
  },

  /* ───── 10. Engineering Mathematics ───── */
  {
    slug: 'engineering-mathematics',
    title: 'Engineering Mathematics',
    branch: 'BOTH',
    semester: 1,
    introduction: 'Engineering Mathematics is the foundational mathematical subject in the diploma curriculum that provides the quantitative tools essential for all engineering disciplines. This course covers core mathematical concepts that students will apply throughout their engineering studies and professional careers. The subject begins with Algebra, covering matrices, determinants, and systems of linear equations — tools used extensively in computer graphics, data science, and network analysis. Trigonometry builds upon school-level knowledge with compound angles, multiple angles, and inverse trigonometric functions that are essential for signal processing and physics applications. Differential Calculus introduces the concept of limits, continuity, and derivatives — teaching students to analyze rates of change, find maxima and minima of functions, and understand the behaviour of curves. This has direct applications in optimization problems, machine learning algorithms, and computer simulations. Integral Calculus covers anti-derivatives, definite integrals, and area/volume calculations using integration techniques like substitution and partial fractions. The course also introduces Coordinate Geometry covering straight lines, circles, and conic sections. Complex Numbers and their operations provide the mathematical foundation for electrical engineering and signal analysis. Differential Equations, though introduced briefly, are critical for modelling real-world phenomena like population growth, circuit behaviour, and heat transfer. Strong mathematical foundations built in this subject directly support later courses in physics, digital electronics, data structures (algorithm analysis), computer graphics, and signal processing. Regular practice of problem-solving is essential for success in this subject.',
    concepts: [
      { heading: 'Matrices & Determinants', explanation: 'A matrix is a rectangular array of numbers arranged in rows and columns. Determinants are scalar values computed from square matrices used to solve systems of linear equations (Cramer\'s Rule), find matrix inverses, and check if a system has a unique solution. Key operations include addition, multiplication, transpose, adjoint, and inverse using the formula A⁻¹ = adj(A)/|A|.' },
      { heading: 'Differential Calculus', explanation: 'Differentiation finds the rate of change of a function. The derivative dy/dx represents the slope of the tangent to a curve at any point. Key rules include the power rule (d/dx[xⁿ] = nxⁿ⁻¹), product rule, quotient rule, and chain rule. Applications include finding maxima/minima, velocity/acceleration from displacement functions, and curve sketching.' },
      { heading: 'Integral Calculus', explanation: 'Integration is the reverse of differentiation — finding the function whose derivative is given. Definite integrals calculate the area under a curve between two limits. Techniques include substitution method, integration by parts, and partial fractions. Applications include calculating areas, volumes of revolution, mean values, and RMS values of functions.' },
      { heading: 'Trigonometry', explanation: 'Engineering trigonometry extends basic sin, cos, tan to compound angle formulas (sin(A±B)), multiple angle formulas (sin2A, cos2A), and inverse trigonometric functions. These are essential for resolving forces in physics, analyzing AC circuits, and signal processing. The unit circle and radians are fundamental concepts for engineering applications.' },
      { heading: 'Complex Numbers', explanation: 'Complex numbers have the form a + bi where i = √(-1). They can be represented in Cartesian form (a+bi), polar form (r∠θ), or Euler form (re^(iθ)). Operations include addition, multiplication, division, conjugates, and De Moivre\'s theorem for powers and roots. They are essential in electrical engineering for AC circuit analysis (impedance, phasors).' },
      { heading: 'Coordinate Geometry', explanation: 'Coordinate geometry uses algebra to study geometric shapes. The straight line section covers slope, intercept forms, distance between points, and angle between lines. The circle equation (x-h)²+(y-k)²=r² and conic sections (parabola, ellipse, hyperbola) are studied. These concepts underpin computer graphics, CAD software, and spatial computing.' }
    ],
    chapters: [
      { title: 'Algebra: Matrices & Determinants', summary: 'Covers matrix operations, types of matrices, determinant evaluation, Cramer\'s rule for solving linear equations, and matrix inverse calculation.', keyPoints: ['Matrix types: square, diagonal, identity, symmetric, skew-symmetric', 'Matrix operations: addition, scalar multiplication, matrix multiplication', 'Determinant of 2×2 and 3×3 matrices using cofactor expansion', 'Cramer\'s Rule for solving 2 and 3 variable linear systems', 'Finding inverse: A⁻¹ = adj(A) / |A|'] },
      { title: 'Trigonometry', summary: 'Covers trigonometric identities, compound and multiple angle formulas, sum/product transformations, and inverse trigonometric functions.', keyPoints: ['Fundamental identities: sin²θ + cos²θ = 1', 'Compound angles: sin(A+B) = sinA.cosB + cosA.sinB', 'Multiple angles: sin2A = 2sinA.cosA, cos2A = cos²A - sin²A', 'Inverse functions: sin⁻¹x, cos⁻¹x, tan⁻¹x domains and ranges', 'Trigonometric equations: general solutions'] },
      { title: 'Differential Calculus', summary: 'Introduces limits, continuity, differentiation rules, successive differentiation, and applications like maxima/minima and rate of change.', keyPoints: ['Limit definition and evaluation techniques', 'Differentiation rules: power, product, quotient, chain rule', 'Derivatives of trigonometric, exponential, logarithmic functions', 'Maxima and minima using first and second derivative tests', 'Applications: velocity, acceleration, rate of change problems'] },
      { title: 'Integral Calculus', summary: 'Covers indefinite and definite integrals, standard formulas, integration techniques, and applications to area and volume problems.', keyPoints: ['Standard integrals: ∫xⁿdx, ∫sinx dx, ∫eˣdx', 'Integration by substitution method', 'Integration by parts: ∫u.dv = uv - ∫v.du', 'Definite integrals and the fundamental theorem of calculus', 'Area under curves and between two curves'] },
      { title: 'Complex Numbers & Coordinate Geometry', summary: 'Introduces complex number operations, polar representation, and analytical geometry of straight lines and circles.', keyPoints: ['Complex number arithmetic: addition, multiplication, conjugate', 'Argand diagram and polar form: r(cosθ + isinθ)', 'De Moivre\'s theorem: (cosθ + isinθ)ⁿ = cos(nθ) + isin(nθ)', 'Straight line equations: slope-intercept, point-slope, two-point forms', 'Circle equation: centre-radius form and general form'] }
    ],
    importantQuestions: [
      'Solve the system of equations using Cramer\'s Rule: 2x+3y=5, 4x-y=7.',
      'Find the inverse of a 3×3 matrix using the adjoint method.',
      'Prove that sin(A+B) = sinA.cosB + cosA.sinB.',
      'Find dy/dx if y = x³.sin(2x) using the product rule.',
      'Find the maximum and minimum values of f(x) = 2x³ - 9x² + 12x + 5.',
      'Evaluate: ∫(0 to π/2) sin²x dx.',
      'Find the area bounded by y = x² and y = 2x using integration.',
      'Express the complex number (3+4i)/(1-2i) in the form a+bi.',
      'Find the equation of the circle passing through (1,2), (3,4), and (5,2).',
      'Differentiate y = e^(3x) . ln(x²+1) using the product and chain rules.'
    ],
    mcqs: [
      { question: 'The determinant of a 2×2 matrix [[a,b],[c,d]] is:', options: ['ad+bc', 'ad-bc', 'ac-bd', 'ac+bd'], correctIndex: 1, explanation: 'For a 2×2 matrix, the determinant is calculated as (a×d) - (b×c), the product of the main diagonal minus the product of the other diagonal.' },
      { question: 'The derivative of sin(x) is:', options: ['-sin(x)', 'cos(x)', '-cos(x)', 'tan(x)'], correctIndex: 1, explanation: 'The derivative of sin(x) with respect to x is cos(x). This is one of the fundamental differentiation formulas that must be memorized.' },
      { question: '∫e^x dx equals:', options: ['e^x + C', 'xe^x + C', 'e^(x+1)/(x+1) + C', 'e^x/x + C'], correctIndex: 0, explanation: 'The integral of e^x is e^x + C. The exponential function is unique in that its derivative and integral are both itself (plus constant for integral).' },
      { question: 'The value of i² (where i = √-1) is:', options: ['1', '-1', 'i', '-i'], correctIndex: 1, explanation: 'By definition, i = √(-1), so i² = (√(-1))² = -1. This is the fundamental property of the imaginary unit.' },
      { question: 'If f(x) = x³, then f\'(2) equals:', options: ['6', '8', '12', '16'], correctIndex: 2, explanation: 'f\'(x) = 3x² (power rule). f\'(2) = 3×(2)² = 3×4 = 12. The derivative gives the slope of the curve at x=2.' },
      { question: 'The slope of the line 2x + 3y = 6 is:', options: ['2/3', '-2/3', '3/2', '-3/2'], correctIndex: 1, explanation: 'Rewriting in slope-intercept form: y = -2x/3 + 2. The coefficient of x is the slope = -2/3.' }
    ],
    previousYearContext: 'SBTE Engineering Mathematics papers consistently test matrix operations and Cramer\'s rule (10-15 marks), differentiation problems (10-15 marks), and integration problems (10-15 marks). Trigonometric identity proofs and complex number operations are common short-answer questions. Maxima-minima applications and area under curves are favourite long-answer questions. Students should practice solving numerical problems step-by-step as partial marks are awarded for correct intermediate steps.',
    examTips: [
      'Memorize all standard differentiation and integration formulas — they save time in exams.',
      'Practice matrix inverse and Cramer\'s rule with 3×3 matrices — at least 5 problems each.',
      'Show all intermediate steps in calculations — partial marks are given for correct working.',
      'For maxima/minima problems, clearly state the first and second derivative tests.',
      'Practice trigonometric identity proofs — write LHS, apply formulas step by step to reach RHS.',
      'Learn integration by substitution thoroughly — it appears in every paper.',
      'For complex number division, multiply numerator and denominator by the conjugate.',
      'Use graph sketches to support area/volume integration answers.'
    ],
    pdfContents: 'The Engineering Mathematics PDF notes cover matrix algebra with solved examples, determinant evaluation and Cramer\'s rule, trigonometric formulas and identity proofs, differentiation rules with applications, integration techniques with solved problems, complex number operations, and coordinate geometry basics. Each chapter includes formula sheets, worked examples, and SBTE previous year questions with solutions.',
    syllabusRelevance: 'Engineering Mathematics is a 1st semester subject for all branches under SBTE Bihar. The syllabus covers Algebra — matrices and determinants (Unit 1), Trigonometry (Unit 2), Differential Calculus (Unit 3), Integral Calculus (Unit 4), and Coordinate Geometry with Complex Numbers (Unit 5). It provides the mathematical foundation for all subsequent technical subjects.',
    faqs: [
      { question: 'Is Engineering Math very different from school math?', answer: 'It builds upon 10th and 12th standard mathematics but goes deeper. Matrices, calculus, and complex numbers may be new topics. If your school math basics (algebra, trigonometry) are strong, you\'ll adapt quickly. Focus on understanding concepts rather than rote memorization.' },
      { question: 'How important is this subject for programming/CS?', answer: 'Very important! Matrices are used in computer graphics and machine learning. Calculus concepts appear in algorithm analysis (Big-O notation relates to growth rates). Complex numbers are used in signal processing. Boolean algebra from mathematics connects directly to digital electronics.' },
      { question: 'Should I memorize all formulas?', answer: 'Yes, differentiation and integration standard formulas must be memorized — there\'s no shortcut. Create a formula sheet and revise it daily. For trigonometric identities, understand derivations so you can re-derive if you forget. Practice problems regularly to reinforce formula recall.' },
      { question: 'How to score well in Math exams?', answer: 'Practice, practice, practice. Solve at least 5 problems from each topic daily. Show all steps clearly in exams. Start with questions you\'re confident about. Use previous year papers as practice tests under timed conditions. Focus on numericals — they carry the most marks.' },
      { question: 'Can I use a calculator in exams?', answer: 'SBTE generally allows basic scientific calculators but not programmable ones. However, practice solving problems without a calculator to build speed and accuracy. Many exam questions involve simple numbers that can be computed mentally or with basic arithmetic.' }
    ],
    relatedTopics: [{ title: 'C Programming', slug: 'c-programming' }, { title: 'Digital Electronics', slug: 'digital-electronics' }, { title: 'Data Structures', slug: 'data-structures' }],
    examples: [
      { title: 'Cramer\'s Rule — Solving 2 Variables', content: 'Solve: 3x + 2y = 12, x - y = 1\n\nD = |3  2| = 3(-1) - 2(1) = -5\n    |1 -1|\n\nDx = |12  2| = 12(-1) - 2(1) = -14\n     |1  -1|\n\nDy = |3  12| = 3(1) - 12(1) = -9\n     |1   1|\n\nx = Dx/D = -14/-5 = 2.8\ny = Dy/D = -9/-5 = 1.8\n\nVerification: 3(2.8) + 2(1.8) = 8.4 + 3.6 = 12 ✓' },
      { title: 'Maxima & Minima Application', content: 'Find the maximum value of f(x) = -x² + 4x + 5.\n\nStep 1: f\'(x) = -2x + 4\nStep 2: Set f\'(x) = 0: -2x + 4 = 0 → x = 2\nStep 3: f\'\'(x) = -2 (negative, so x=2 is a maximum)\nStep 4: f(2) = -(2)² + 4(2) + 5 = -4 + 8 + 5 = 9\n\nMaximum value is 9 at x = 2.\nThe negative coefficient of x² confirms the parabola opens downward.' },
      { title: 'Definite Integration — Area', content: 'Find the area between y = x² and the x-axis from x=0 to x=3.\n\nArea = ∫(0 to 3) x² dx\n     = [x³/3] from 0 to 3\n     = (3³/3) - (0³/3)\n     = 27/3 - 0\n     = 9 square units\n\nThis represents the area of the region bounded by the parabola y=x², the x-axis, and the vertical lines x=0 and x=3.' }
    ],
    metaDescription: 'Complete Engineering Mathematics guide for SBTE 1st Sem — matrices, calculus, trigonometry, complex numbers, coordinate geometry with MCQs and solved examples.'
  }

async function seedSubjectGuides() {
  try {
    const count = await SubjectGuide.countDocuments();
    if (count > 0) {
      console.log('Subject guides already seeded.');
      return;
    }
    await SubjectGuide.insertMany(guides);
    console.log('Subject guides seeded successfully');
  } catch (err) {
    console.error('Subject guide seeding error:', err.message);
  }
}

module.exports = seedSubjectGuides;
