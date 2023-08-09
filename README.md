# Silk Findings

## Running Locally

Backend: See README in root folder.

Frontend:

- CD to the "frontend" folder. Run nvm use or install node v16.16.0

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
  ![Desktop](https://lh3.googleusercontent.com/pw/AIL4fc9fT23IuuTgZ8d_lcp5oTknpL7OtXdQR88_waywcjc4jwD54mTMUhO4K-hvMJ94PYP-gpQaRFop13ibFu2i1dIqsyB2x805CCT-0wWtuSHpm3tzByWx0Tqw8nVuYHykcKNCRNfmP2zAUeE5HEip0nntYg=w3448-h1924-s-no?authuser=0)
  ![Mobile](https://lh3.googleusercontent.com/pw/AIL4fc8JQ3cUHW1n5dQavudQbINaUaelOEBujoHRH5QTuypsPkdjobF5BXLTwj_1A9r-UUCc9W-9quSRwqTIGUh9jXcnq-69-wNdLr0CCUcAx4QK_2duSGR-395BpYBx0udAjKDXUc6rED7pEUhjdFizgPL9J4AQzEil5yTvVMaxW4T9bcAl4P5wYjun1IgOe1xMhZ_xE6nOhM1m_xTp1rfikwxlYXcN9H70AJ72uZg6XBSyDwyoWXk4BDHZuHOt4Om2BBxwqZPfL-VUlbn0XSh6L1vsLDxVarSyQqAMvulEParhqDcL9VCYhzlZv99GhdmF5bDWSng-JoG5hQ7cnbSx1Ig-TXXsfkuZrldooRc15baAhd-iJzfW0hYxEyHtjR32din7Onj4l03nYusjHYtdY1KUPLupMtxulPg_LrP4Mk8tZ1SBKl_TTFt9SwwpaeSuGhrpxX5TzQsM7Chp8doZymVoSpQIsUIQJRmE4V44OfY9vXkCqOlhuiY7ivAc60nsz92wzmLzw5EE_rCcMDtxD6YnQ7qGeHQiTo2PIogL6ST8JJBHCqOxaxYXa4xNU3OSrcUJdexxV6uAoDxaYcFudCQBrSfc7cgCmO8aZBCs_4J9K_qVJ8OFwl4uLwgxVJ0_Hx-5vA5f1BH_cMERRAcalHtuMq9rXG268uOM0DcghVt9MlUxar-Adzm5lns5M6Lb39OZRjgUYay0DjpeNw05FaDcZL2P0cRPNTk-SxYzzjXr1W98KSxhVFcSNRWMWxOni_gIe_87fePnUhw6rIxtTD1wzifmO5toDnncD7POnylCVOVDgPG9RFzlIOl91_mQpmFbjaNn7rT1nPOAdN1nqudjcTLXNs23BmRk99v1N5mSdoR4rmxLD6B76I4iGXQY8eYkkIEzsJFhpFVsx8oWA7i--VhP2GjCxWyfbcqN31k-VeiO6W7iDlFq8Akhgok=w806-h1738-s-no?authuser=1)
- Shows the current weather forecast in the top half of the page and the scrollable forecast on the bottom half with an area curve of the temperature trend

## TODO: Code Improvements

- More test coverage including component testing with React Testing Library
- Refactor components into a reusable component library
- Refactor styling into a more systematic approach

## TODO: App Improvements

- Add to favorites feature
- Populate zipcode based on user's current location
- Search based on city as well as zip
- Color palette variability based on time of day and current weather conditions
-
