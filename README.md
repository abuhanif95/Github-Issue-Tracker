# Assignment-05: GitHub Issues Tracker

1️⃣ What is the difference between var, let, and const?

# Answer:

1. var is function-scoped and can be redeclared and reassigned. It is hoisted to the top of its scope and initialized with undefined.

2. let is block-scoped and cannot be redeclared in the same scope, but can be reassigned. It is hoisted but not initialized, resulting in a temporal dead zone.

3. const is block-scoped and cannot be redeclared or reassigned. It must be initialized at the time of declaration. For objects and arrays, the reference cannot change but the contents can.


2️⃣ What is the spread operator (...)?

# Answer:

The spread operator (...) allows an iterable (array, object, string) to be expanded into individual elements.


3️⃣ What is the difference between map(), filter(), and forEach()?

# Answer:

1. map() creates a new array by applying a function to each element of the original array. It returns a new array of the same length.

2. filter() creates a new array containing only the elements that pass a specified condition. It returns a new array that may be shorter than the original.

3. forEach() executes a function on each element of the array but does not return a new array. It is used for side effects like modifying existing data or performing actions.

4️⃣ What is an arrow function?

# Answer:

Arrow functions are a shorter syntax for writing function expressions.

5️⃣ What are template literals?

# Answer:

Template literals are string literals that allow embedded expressions, multi-line strings, and string interpolation using backticks (`) and ${}.
