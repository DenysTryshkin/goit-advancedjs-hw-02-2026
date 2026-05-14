# Topic 4. Asynchronous JavaScript and Promises. Homework

## Main steps for completing the homework

1. Create the repository `goit-advancedjs-hw-02`
2. Build the project using Vite. We have prepared a ready-made setup with all additional project configurations and recommend using it.
3. Read the tasks and complete them in your code editor.
4. Make sure the code is formatted with Prettier and there are no errors or warnings in the console when opening the live page of the task.
5. Submit the homework for review.

## Evaluation format:

Score from 0 to 100

## Submission format:

* Two links: to the source files and the live page on GitHub Pages
* Attached repository file in zip format

⚠️ Important: Review the instructions for downloading the working file from the GitHub repository.

The structure of the project folders and files inside the `src` folder should look like this:

---

# Task 1. Countdown Timer

Complete this task in the files `1-timer.html` and `1-timer.js`.
Write a timer script that performs a countdown to a specific date. Such a timer can be used in blogs, online stores, event registration pages, during maintenance, etc.
Watch the demo video of the timer.

## Interface Elements

Add the timer markup, the end date selection field, and the button that starts the timer to the HTML file. Style the interface elements according to the layout.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

## flatpickr Library

Use the `flatpickr` library to allow the user to cross-browser select an end date and time in a single interface element.
To connect the CSS code of the library to the project, add one more import in addition to the one described in the documentation.

```js
// Described in the documentation
import flatpickr from "flatpickr";
// Additional import of styles
import "flatpickr/dist/flatpickr.min.css";
```

The library expects to be initialized on an `input[type="text"]` element, so we added the `input#datetime-picker` field to the HTML document.

```html
<input type="text" id="datetime-picker" />
```

You can pass an optional configuration object as the second argument to the `flatpickr(selector, options)` function. We prepared an object for you that is required to complete the task. Understand what each property is responsible for in the "Options" documentation section and use it in your code.

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

## Date Selection

The `onClose()` method from the configuration object is called every time the interface element created by flatpickr is closed. This is where you should process the date selected by the user. The `selectedDates` parameter is an array of selected dates, so we take the first element `selectedDates[0]`.

You will need this selected date in the code outside of the `onClose()` method as well. Therefore, declare a `let` variable outside the method, for example `userSelectedDate`, and after validating it in the `onClose()` method for past/future, assign the selected date to this variable.

If the user selected a date in the past, show `window.alert()` with the text:

```txt
Please choose a date in the future
```

and make the `Start` button inactive.

If the user selected a valid date (in the future), the `Start` button becomes active.

The `Start` button should remain inactive until the user selects a future date. Note that if the user selects a valid date, does not start the timer, and then selects an invalid date, the button must become inactive again after being unlocked.

Clicking the `Start` button begins the countdown to the selected date from the moment the button is pressed.

## Countdown

When the `Start` button is clicked, the script should calculate once per second how much time is left until the specified date and update the timer interface, displaying four numbers: days, hours, minutes, and seconds in the format `xx:xx:xx:xx`.

The number of days may contain more than two digits.

The timer should stop when it reaches the end date, meaning the remaining time equals zero `00:00:00:00`.

💡 After starting the timer by clicking the `Start` button, both the `Start` button and the input become inactive so the user cannot choose a new date while the countdown is running. After the timer stops, the input becomes active again so the user can choose another date. The button remains inactive.

Use the ready-made `convertMs` function to calculate values, where `ms` is the difference between the end date and the current date in milliseconds.

```js
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
```

## Time Formatting

The `convertMs()` function returns an object with the calculated time remaining until the end date. Note that it does not format the result. That means if there are 4 minutes left, or any other time component contains one digit, the function returns `4` instead of `04`.

In the timer interface, you need to add `0` if the number contains less than two characters. Write a function, for example `addLeadingZero(value)`, which uses the string method `padStart()` and formats the values before rendering the interface.

## Notification Library

To display messages to the user, instead of `window.alert()`, use the `iziToast` library.
To connect the CSS code of the library to the project, add one more import in addition to the one described in the documentation.

```js
// Described in the documentation
import iziToast from "izitoast";
// Additional import of styles
import "izitoast/dist/css/iziToast.min.css";
```

## What the mentor will pay attention to during review:

* The `flatpickr` and `iziToast` libraries are connected.
* When the page first loads, the `Start` button is inactive.
* Clicking on the input opens a calendar where you can select a date.
* When selecting a date in the past, the `Start` button becomes inactive and a message with the text `Please choose a date in the future` appears.
* When selecting a future date, the `Start` button becomes active.
* After clicking the `Start` button, it becomes inactive, the remaining time until the selected date is displayed on the page in the format `xx:xx:xx:xx`, and the countdown begins.
* Every second the interface updates and shows the updated remaining time.
* The timer stops when it reaches the end date, meaning the remaining time equals zero and the interface looks like this `00:00:00:00`.
* The time in the interface is formatted, and if it contains less than two characters, a leading zero is added.

---

# Task 2. Promise Generator

Complete this task in the files `2-snackbar.html` and `2-snackbar.js`.
Watch the demo video of the promise generator.

Add the form markup to the HTML file. The form consists of an input field for entering the delay value in milliseconds, two radio buttons that determine how the promise will resolve, and a submit button that creates the promise when clicked.

```html
<form class="form">
  <label>
    Delay (ms)
    <input type="number" name="delay" required />
  </label>

  <fieldset>
    <legend>State</legend>
    <label>
      <input type="radio" name="state" value="fulfilled" required />
      Fulfilled
    </label>
    <label>
      <input type="radio" name="state" value="rejected" required />
      Rejected
    </label>
  </fieldset>

  <button type="submit">Create notification</button>
</form>
```

Write a script that creates a promise after submitting the form. Inside the callback of this promise, after the number of milliseconds specified by the user, the promise should either resolve (`fulfilled`) or reject (`rejected`) depending on the selected radio button option.

The value passed to the `resolve/reject` methods should be the delay value in milliseconds.

The created promise should be handled in the appropriate methods for successful/unsuccessful execution.

If the promise resolves successfully, display the following message, where `delay` is the delay value in milliseconds:

```txt
✅ Fulfilled promise in ${delay}ms
```

If the promise is rejected, display the following message, where `delay` is the promise delay value in milliseconds:

```txt
❌ Rejected promise in ${delay}ms
```

## Notification Library

To display messages, instead of `console.log()`, use the `iziToast` library.
To connect the CSS code of the library to the project, add one more import in addition to the one described in the documentation.

```js
// Described in the documentation
import iziToast from "izitoast";
// Additional import of styles
import "izitoast/dist/css/iziToast.min.css";
```

## What the mentor will pay attention to during review:

* The `iziToast` library is connected.
* When selecting a state in the radio buttons and clicking the `Create notification` button, a message with the style corresponding to the selected state appears after the number of milliseconds entered in the input.
* The displayed message contains the selected state type and the number of milliseconds according to the template in the task.

