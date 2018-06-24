# Pokemon-Guessing-Game
A hangman style game with a "Who's that Pokémon?" theme.

## Project History
This project was a homework assignment for the Columbia Full Stack Web Development Coding Bootcamp, meant to be our first foray into utilizing JavaScript. The project specs were to make a hangman-style game of a specific theme. After choosing Pokémon as my theme, I knew I wanted to the do the "Who's that Pokémon?" thing from the anime, in which only the Pokémon's silhouette was visible. This was surprisingly easy to replicate in CSS.

The most time-consuming part of this project was generating the array of Pokémon names and, more importantly, the URL of the images I wanted to use for them. The images saved onto [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) have a somewhat unpredictable URL. Not wanting to gather 807 names and image URLs one by one, I fiddled around with Cheerio until I was eventually able to scrape Bulbapedia of those two small data points for all 807 Pokémon. The code I wrote for that is included as a comment above the array in the pokemon_list.js file.

If you found your way here, I hope you have fun playing around with this little game! If you have any ideas for improvement, don't be shy about letting me know or forking the project for yourself to play around with. Check out my [github.io](https://evansimonross.github.io/) page for more info about me and my other projects.