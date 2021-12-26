# Budget Calculator

A budget calculator, built with React, which connects to an existing Google Firebase/Firestore project. This simple application provides the user with a place to input their desired budget, choose from a list of items to place into a design, and an estimated price range of the items that they have selected.

## Objectives
- [x] Create a new repository through GitHub or Bitbucket.
- [x] Start the user experience by prompting the client to enter a budget for their project.
- [x] Query the budget elements from the firebase firestore collection called "items".
- [x] Display the queried items in a list grouped by type (see item interface below). Only one item per type may be selected at any given time.
- [x] Each item has a low and high price. These prices should be displayed to the user as well as an aggregate price range of all selected items.
- [x] The application should inform the user whether their budget is over, under, or within the range of the items that they have selected.
- [x] Add functionality that allows the user to submit their checklist. Store this information however you would like in firestore.

## Development
To begin developing locally, navigate to the project directory and run the following script:
```
yarn install
yarn start
```
This should start a development server at http://localhost:3000/budget-calculator

## Production Deployment
The `deploy.yaml` workflow automatically builds and deploys this project to GitHub Pages when changes are made to the main branch.

https://daltonscharff.github.io/budget-calculator/
