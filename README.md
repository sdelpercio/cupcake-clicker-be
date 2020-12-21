# Back-End API for Cupcake Clicker
## Deployed at [Heroku](https://cupcake-clicker-be.herokuapp.com/)
A full-stack remake of the internet classic, [cookie clicker](https://orteil.dashnet.org/cookieclicker/). Try to bake as many cupcakes as possible! Click to bake cupcakes and when you have enough, buy upgrades to increase your effectiveness and efficiency!

Cupcake clicker will save your progress locally on your browser temporarily. But, if you'd like to save progress across visits, you can create an account which will store your stats for next time.

## Getting Started
If you'd like to add your own flare to cupcake clicker, please fork this repo and follow the steps below:

### Starting the server
1. Clone repo locally 'git clone ...'
2. Install needed dependencies 'npm i'
3. In terminal, start a development instance with 'npm run server'

### Starting the database
1. Create a '.env' file at the root of the back-end api folder
2. Insert these into the .env file, replacing 'username' and 'password' with your pgAdmin 4 account info
```
PORT=5500
DATABASE_URL=postgres://username:password@localhost/cc-be
DB_ENV=development
```
3. Start pgAdmin 4
4. Log into your account upon opening
5. Click on server at left, login again
6. Create new database under PostgreSQL 12
<img src="https://i.ibb.co/P64Fg3n/pgadmin1.png" alt="pgadmin database creation" border="0"/></br>
7. Name your database 'cc-be' and click 'save' at bottom right
8. Make sure your server is running, and try making a request using Postman!

To start the front-end site, follow the directions in the [front-end repository](https://github.com/sdelpercio/cupcake-clicker).
