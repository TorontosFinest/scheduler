# Interview Scheduler

Interview Scheduler is a webapp created with react where you are able to schedule interview appointments between lighthouse lab students and a list of lighthouse mentors. By clicking on any empty time slot and entering a student name, followed by selecting a mentor from the given list of mentors, you will be able to book the appointment. Should you want to edit your booking, or perhaps cancel it, you are able to.

## Setup

- Install dependencies with `npm install`.
- Start up scheduler-api server so you can make requests to the api

List of dependencies:

- axios: :0.25.0,
- classnames:^2.2.6,
- normalize.css:^8.0.1,
- react:^16.9.0,
- react-dom:^16.9.0,
- react-test-renderer:^16.9.0
- @testing-library/react-hooks:^7.0.2,

## Screenshots

### Add Appointment

![](https://i.gyazo.com/57fb4f85aa5dd21288445f98a8a3c5c5.gif)

### Edit Appointment

![](https://i.gyazo.com/231a01e6dda3e7e986726e36a7d0ff40.gif)

#### Delete Appointment

![](https://i.gyazo.com/0a21a3e6068b347cca1903e08979dd64.gif)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
