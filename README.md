# **Traveler's Diary**

## Table of contents

- [Introduction](#Introduction)
- [Traveler's Diary](#Traveler's-Diary)
- [Goals of this project](#Goals-of-this-project)
- [Technologies used](#Technologies-used)
- [Demo](#Demo)
- [Server repository](#Server-repository)

## **Introduction**

Hi, I am Andre, and this is my portfolio project, a web application App called Traveler's Diary. This is a MVP and not the final version. It is fully functional but missing some features that will be implemented in the future.

## [**Traveler's Diary**](https://travelersdiary.netlify.app)

The idea behind this project is to give user's a platform to write their experiences while traveling by starting a trip and then make posts on that trip in a blog like style. Once the trip is over, the user can end the trip and all of the posts created during his/her trip will always remain grouped up. Once a user visits a trip, they will be able to read all the posts of that trip as well as check where the posts where made from, creating a sort of timeline of the trip.
When a new accounts are created, users will have to verified it with the link sent to their email.
You can find a deployed version of Traveler's Diary [HERE](https://travelersdiary.netlify.app).

## **Goals of this project**

The main goal of this project is to gain experience developing a full-stack app. I also put a little extra emphasis on exploring new technologies and see how well and how fast I would be able to adapt to something new while also consolidating the knowledge of the technologies learned during the academy. For that purpose, I decided to use typescript in the front-end while keeping it simple in the back-end with technologies I was already familiar with. I used a Chakra-UI for the UI design which was also new to me. </br> I tried to commit with clear messages and when merging, I tried to give a bullet point list of what was done while being a bit more descriptive on more intrecate merges.</br> In short:

- Practice full-stack development;
- Practice the use of external API's
- Learn new technologies
- Implement a developer's approach by creating and following User stories and wireframes which can be found here:
  - [Kanban with user stories](https://github.com/Andre2610/travelersdiary-front-end/projects/1)
  - [Database Models](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/Database_Models.png?raw=true)
  - [Log in & Sign up](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/Login_signup.png?raw=true)
  - [Home and UserHomepage](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/Wireframe_Homepage_UserHome.png?raw=true)
  - [Trip and Post details pages](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/Wireframe_Homepage_UserHome.png?raw=true)
- Practice with version control. A few examples of pull requests:

  - [Feat-user-login/signup](https://github.com/Andre2610/travelersdiary-front-end/pull/8)
  - [Feat-start-newtrip](https://github.com/Andre2610/travelersdiary-front-end/pull/10)
  - [Styling](https://github.com/Andre2610/travelersdiary-front-end/pull/12)
  - [Feat-appState](https://github.com/Andre2610/travelersdiary-front-end/pull/13)

## **Technologies used**

**Back end**

- Express
- REST
- Sequelize
- Postgres
- NodeJS
- Nodemailer

**Front end**

- Typescript
- React
- Redux
- Axios
- Chakra-UI
- Geocode-Geolocation
- React-google-maps

**External API's**

- [Googlemaps API](https://cloud.google.com/maps-platform/?hl=en)
- [OpenCage](https://opencagedata.com/api)
- [Cloudinary](https://cloudinary.com/)

## **Demo**

![General-use](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/generalview.gif?raw=true)
![Login-singup](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/signup_signin.gif?raw=true)
![Create-post](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/createpost.gif?raw=true)
![End-trip](https://github.com/Andre2610/travelersdiary-front-end/blob/Development/Project_Info/generalview.gif?raw=true)

## **Server repository**

The back-end was built in express and it is a REST a API. The database is built using Postgres and Sequelize. You can find the back-end's repository [HERE](https://github.com/Andre2610/travelersdiary-back-end)

## **Setup**

- **Server setup**

  - clone the repository;
  - cd into the project directory
  - on first run, run the script `npm run initialize`, this will run `npm i && npm run resetDB && npm run start`;
  - afterwards simply run `npm run start` which will run the script `npx nodemon index.js` or `node index.js`
  - server runs on port 5000 by default

- **Client setup**
  - clone the repository;
  - cd into the project directory;
  - on first run, run the script `npm run initialize`, this will run `npm install && react-scripts start`;
  - afterwards first run just run the script `npm run start` to start development;
  - client runs on localhost:3000 by default;

:exclamation: You will need to create your own google API key and place it on /config/constants.tsx `export const googleAPIkey = YOUR_API_KEY`, in order for the app to your in your local host.</br>
:exclamation: Repeat the same process for the OpenCage API and Cloudinary
