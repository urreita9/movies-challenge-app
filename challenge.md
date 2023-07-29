My movies app

Please create a mobile app with React Native that will have de screens described below:

1. Splash Screen: Just a screen with a quick animation (using lottie)
2. Login screen: The first screen would be a Login screen with the app logo, an email and password field. In order to allow the user to continue to the Home screen, you need to authenticate the email and password by making a post request to the following api:
   POST https://reqres.in/api/login
   {
   “email”: “eve.holt@reqres.in”,
   “password”: “cityslicka”
   }
   If the email and password are correct, you will get a 200 response with a token:
   {
   “token”: “QpwL5tke4Pnpja&X4”
   }
   Save the token into the local storage of the phone and if you close the app and open it again, if the token was saved, then the login screen should not be shown, instead you need to go directly to the Home Screen.
3. Home Screen: Once the user is authenticated, the next screen would be the Home Screen. This screen will have a top bar with a search textbox and button/icon.
   Then in the main body, you will need to show a list of Current Popular Movies with the following information:
   • Title
   • Poster
   • Release date
   • Overview
   • The average vote/rate
4. Details Screen: If the user taps on any of the movies, it will show a screen with the Details of the Movie and at the bottom of the screen, you should show all the Suggested/Related movies that you can get from the api based on the current movie and if you tap on one of these suggested/related movies, you should go to the Details screen of that movie.
5. Search Screen: Now, about the top search Textbox and button/icon, the user will enter a search query for a movie name, for example: Avengers and tap the button/icon (or click Enter/Go in the keyboard). Then you should open a new screen and do a lookup in the api for all movies (not just popular movies) that have that query string in their name and show the list of movies the same way you show the Popular movies in the Home Screen. Just remember to add a label at the top that will show whats the current search string for the results shown. Additionally, you should be able to go back to the Home Screen. (Note: if the user taps on a movie, it should also show the Details screen)

- Create a React Native Expo project using typescript
- For the Home, Details and Search screen, you will need to use the free api “the moviedb”. You can create a free dev account and read the api documentation to get the information you need in oreder to complete the exercise. The wesbite is: https://developer.themoviedb.org/reference/intro/getting-started
- Add an icon to the application and add a loading animation (using lottie) when making data requests
- Please make the necessary validations in every screen taking into consideration all the possible scenarios that you can have
- Also upload your project to your Github repository, add anu necessary instruction in the README file, save the progress of your project by making commits for every milestone necessary to track your progress and once you are done, share the link with us.
