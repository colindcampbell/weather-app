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
  ![Mobile](https://lh3.googleusercontent.com/pw/AIL4fc_sVx_wvmi2Hy2mcV0M73r23LB6x0QN3auYUTKdlG6uYq18bSN56M5MZE3guUlJgZb7il3tDZirj6AMxsKC89vMCLykVnAir39GHZ1hZA3z4EuK1154EgRuX4oNg1Wp3N0DpsS55hIRHXCnkaIKnl9bnbeX70M3imHTw54EB0_0nYKGGYToE_pJa1-iiNQ952mysT05gOlwKlbV8cfpboCHzddMwxVbfofxWiqLyMaoF_wTw9i6boJ3Mr5dQ3W-RCfJV8WXCZG625pWuGXTJG_HI3KBS6xSHdt1lTGzln8rhShQnooauLXq3f9r7Vy1NNkcb5hZhKtY9VcKGBJfzqeKK9SYaTjxK52KjwCn4HfzNeX-QfQguU4Ov0Ol-spDsxdfn4QnPLXZxPDDgz9lyooostWo1vqzuLTXpha2vY6rEND9cQbCIohCExFFsykOo0UMAmkFp87dYZiDWuIFgP63d_okmlSocgIhvWaXHCBA-3Uvm4Ubo15WyrJMHE1ctDsbGyaxlDlUR7PBm9lnlbEC7JN6LsqOtjuEq2zFs_bpIfpJIdWTmAFXY0IHUH40fX3Bz_bu4yeINGAdPx-jqTpE27uex_Ndc6AugK7kUVoOVxuFx_5mblMeq9W9mUiDeOspqy0c7xyfs7BZQFcKb4tsZH05NTyWZd7563FU1FelspAR7Vd7TKdCe5Xz-qiOzhGfn_Bu6EubFebUKuG6q5MEmLSfgDbWiSXUoWfB7q-GlYJPbWLqiQRsWtsw3Rm2XxxmgHeNrtaV6U8Lj8JRMPaRl99m0eDzUdZgubUhd6yTzelD0BMfR6d92iRQaAMqrO3g0Po6o2cmR4bsKAX1jH0nhbYNGH0LwCryzYen5RN9ZLld1Vb34vAmjNtYcuYoDyfL1cPOYoc9y6pHfF2V8MuF0fWOs8dd7uMJ87vFrqJVQIAO0lVj6ddD-Fk-uf0=w341-h740-s-no?authuser=1)

### User Interactions

- On page load, the zip code is loaded from the url query string if it exists. If not, it is loaded from local storage if a value exists there.
- User types a zip code into the top right search. Once a 5 digit number has been entered, an API request will be made automatically. If it is a valid zip code:
  -- The Forecast interface shows once the request has successfully resolved
  -- The Message interface shows if there is an error response
  -- The zip code is added to the query string in the url for sharing
  -- The zip code is added to the user's recent searches and persisted to local storage
- The top left of the nav bar has a menu button that expands the side panel. In the side panel, the user can:
  -- Choose between Celcius or Fahrenheit temperature units. This selection is persisted to local storage and populates on page load
  -- See a list of their 10 most recent valid searches. Clicking on any value in the list will select that zip code for display in the main interface
  -- Once a zip code has loaded, the response is cached for instant rendering when switching between cached values

## TODO: Code Improvement Ideas

- More test coverage including component testing with React Testing Library
- Refactor components into a reusable component library
- Refactor styling into a more systematic approach

## TODO: App Improvement Ideas

- Add to favorites feature
- Populate zipcode based on user's current location
- Search based on city as well as zip code
- Color palette variability based on time of day and current weather conditions
