# Budget Calculator Exercise

As clients are onboarded to the Yardzen landscape design process, one challenge that we face is setting realistic expectations around budget. In order to help clients understand the cost of building and installing individual elements in their designs, we would like to build a budget calculator. As a starting point, we are thinking of a list of elements that we commonly place in landscape designs as well as a rough estimate of how much the selected items will cost.

## Your Task

Create a budget calculator using the frontend framework of your choice (we prefer React because that is what we use at Yardzen) which you will connect to an existing Google Firebase/Firestore project. We are looking for a simple application that provides the user with a place to input their desired budget, choose from a list of items to place in their design, and an estimated price range of the items that they have selected.

## Objectives

- Create a new repository through GitHub or Bitbucket and share it with us. We like to see your work as you progress.
- Start the user experience by prompting the client to enter a budget for their project
- Query the budget elements from the firebase firestore collection called "items"
- Display the queried items in a list grouped by type (see item interface below). Only one item per type may be selected at any given time.
- Each item has a low and high price. These prices should be displayed to the user as well as an aggregate price range of all selected items.
- The application should inform the user whether their budget is over, under, or within the range of the items that they have selected.

- **(Bonus)** Add functionality that allows the user to submit their checklist. Store this information however you would like in firestore, but DO NOT modify the "items" collections. Be aware that multiple candidates may be working from this database at the same time, so please prefix any collections that you create with your first and last name. Ex. `benjaminRoseBudgetResponses`.

## Things You'll Need

- **Firebase Config**
  - [Firebase Documentation](https://firebase.google.com/docs/web/setup)
  - Config Object:
  ```
  {
    apiKey: "AIzaSyD7NUVfrImccSo8FuCBG7bXVk0oLFqgE-k",
    authDomain: "yardzen-demo.firebaseapp.com",
    databaseURL: "https://yardzen-demo.firebaseio.com",
    projectId: "yardzen-demo",
    storageBucket: "yardzen-demo.appspot.com",
    messagingSenderId: "509183652730",
    appId: "1:509183652730:web:ba2208f7d8e0882f009cc3"
  }
  ```
- **"items" collection interface**
  - Each document in the collection looks like this:
  ```
  interface Item {
  type: string;
  name: string;
  lowPrice: number;
  highPrice: number;
  }
  ```
  - The `lowPrice` and `highPrice` properties are integers representing US Dollars. The last two digits of each number are cents, meaning `60000` is equal to $600.00.

## What We're Looking For
- Excellent UI design.
- A thorough understanding of JavaScript and frontend programming in general. Typescript is even better (and what we use at Yardzen).
- Use of modular, reusable components.
- Code comments explaining your thought process and choices.
