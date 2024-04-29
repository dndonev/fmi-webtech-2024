1. Create a strongly typed function to calculate the area of a rectangle:

Implement a function called calculateRectangleArea that takes in two parameters, width and height, which should be of type number. The function should return the area of the rectangle as a number. Ensure the function has the appropriate type annotations.

2. Implement a type-safe currency conversion utility:

Define a custom type called Currency which is a union of string literals representing common currency codes (e.g., 'USD', 'EUR', 'JPY'). Next, create a function named convertCurrency that takes three parameters: amount (a number), fromCurrency (of type Currency), and toCurrency (also of type Currency). The function should return the converted amount as a number. You can use a simple conversion table to implement the conversions.

FOR HOMEWORK !!!
3. Create a type-safe function to filter an array of objects:

Define an interface Person with properties name (string), age (number), and city (string). Create a function called filterPeopleByAge that takes two parameters: an array of Person objects, and a minimum age number. The function should return an array of Person objects containing only those people whose age is greater than or equal to the provided minimum age. Use proper type annotations to ensure type safety.