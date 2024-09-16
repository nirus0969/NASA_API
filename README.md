# NASA API display

This project display information from [NASA's DONKI API](https://ccmc.gsfc.nasa.gov/tools/DONKI/) which is the space weather database of notifications, knowledge, and information. We also show off NASA's astronomy picture of the day which is rendered from the [NASA APOD API](https://apod.nasa.gov/apod/astropix.html).

## How to run the project

1. Clone the project
2. npm install
3. npm run dev

### How to run tests

1. npm install (This should be skipped if you completed step 2 in how to run the project)
2. npm run test

## Choices made in code

Use of hooks to get information from API aswell as storing information about filtering choices in sessionstorage as this is more of a short-term need for the user and saving the favorite information display from the user in localstorage as these dont change much from session to session

## What has been tested

In this project the components have been tested with component testing, but since most of our components use API we do it by mocking data. We have also implemented snapshot testing and testing appropriate rendering of the components.

### Further testing

In future development of this project it is natural to implement E2E testing to get a better understanding of how the users will interact with the website

## Choice of dataset

We were aware that NASA offers many public APIs suitable for our project, and the group thought it would be interesting to work with NASA data.
However, it became evident that working with this API was challenging due to the complexity of the data. Additionally, it became clear that user engagment became low with this dataset.
