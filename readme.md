# ALAB 308A.1.1 – Practical Use of the Event Loop

## 📚 Overview

This lab explores how JavaScript handles execution using the call stack, recursion, trampolines, and the event loop.

The project demonstrates:

- Measuring maximum call stack size
- Preventing stack overflow using trampolines
- Using deferred execution to allow browser rendering during long-running tasks

---

## 🧠 Concepts Covered

### 1️⃣ Call Stack & Stack Overflow
A recursive function was used to determine the approximate maximum call stack size in the current environment. The error was caught using `try/catch` to log the stack depth.

### 2️⃣ Trampolining
A recursive function was rewritten to return thunks instead of directly calling itself. A trampoline loop was implemented to safely execute deep recursion without overflowing the call stack.

### 3️⃣ Deferred Execution & Event Loop
Prime numbers were calculated and rendered to the DOM using `setTimeout(..., 0)` to allow the browser to render between calculations.


