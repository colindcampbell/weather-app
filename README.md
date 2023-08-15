# Weather App

## Running Locally

Backend: See README in root folder to start the backend.

Frontend:

- CD to the "frontend" folder. Run nvm use or install and use node v16.16.0

```js
nvm use
```

- Install packages and start server

```js
npm i && npm run dev
```

- Go to http://127.0.0.1:5173/

- Run unit tests

```js
npm test
```

## Tools Used

- HTTP client: [Axios](https://axios-http.com/)
- Caching and data fetching layer: [React Query](https://tanstack.com/query/v4)
- UI components: [Material UI](https://mui.com/material-ui/getting-started/overview/)
- Bundler and local server: [Vite](https://vitejs.dev/)
- State management and local storage persistance: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- Data visualization: [D3](https://d3js.org/)
- Functional programming utilities: [Ramda](https://ramdajs.com/)
- Testing: [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/)

## App Features and Interactions

### Message Interface

- Shows a welcome message and any errors returned from the BE
- Prompts the user to enter a valid zip code until there is a 5 digit number in the nav bar input
- Enter the zip code "34384" to see the invalid zip code error message
- Shows loading indicator when data is being fetched from the backend

### Forecast Interface

- Design inspiration from the android weather app, intended for use on desktop or mobile devices
- Shows the current weather forecast in the top half of the page and the scrollable forecast on the bottom half with an area curve of the temperature trend. Horizontal scroll is usable on desktop but really intended for touch and drag on mobile.
  ![Desktop](https://lh3.googleusercontent.com/pw/AIL4fc9fT23IuuTgZ8d_lcp5oTknpL7OtXdQR88_waywcjc4jwD54mTMUhO4K-hvMJ94PYP-gpQaRFop13ibFu2i1dIqsyB2x805CCT-0wWtuSHpm3tzByWx0Tqw8nVuYHykcKNCRNfmP2zAUeE5HEip0nntYg=w3448-h1924-s-no?authuser=0)
  ![Mobile](https://lh3.googleusercontent.com/pw/AIL4fc8d1ZVnLZJUUk7sT_pzrEqgmnfRsMYfk0y72ouZgYAd4yBTNTWdOEoLaAkqRU2fGbeoq-aCJ6SxiEOSdyFhpaRvpihpF7_19RjSncr6jEvrMCh6Ra1hMOS_rLwv9-6avFwJSHVfSmUI4FSQjVA916eKgw=w400-h862-s-no?authuser=0)

### User Interactions

- On page load, the zip code is loaded from the url query string if it exists. If not, it is loaded from local storage if a value exists there.
- User types a zip code into the top right search. Once a 5 digit number has been entered, an API request will be made automatically. If it is a valid zip code:
  - The Forecast interface shows once the request has successfully resolved
  - The Message interface shows if there is an error response
  - The zip code is added to the query string in the url for sharing
  - The zip code is added to the user's recent searches and persisted to local storage
- The top left of the nav bar has a menu button that expands the side panel. In the side panel, the user can:
  - Choose between Celsius or Fahrenheit temperature units. This selection is persisted to local storage and populates on page load
  - See a list of their 10 most recent valid searches. Clicking on any value in the list will select that zip code for display in the main interface
  - Once a zip code has loaded, the response is cached for instant rendering when switching between cached values

## TODO: Code Improvement Ideas

- More test coverage including component testing with React Testing Library
- Refactor components into a reusable component library
- Refactor styling into a more systematic approach

## TODO: App Improvement Ideas

- Add to favorites feature
- Populate zipcode based on user's current location
- Search based on city as well as zip code
- Color palette variability based on time of day and current weather conditions
