## Run application

npm i & npm run dev

http://localhost:5173/

## Router
[src/components/Router] 
![img.png](img.png)

there is PublicLayout and AdminLayout, which are holding the components <br/>
-in the PublicLayout `src/components/PublicLayout/PublicLayout.jsx` there is the `src/components/Header/Header.jsx` and the <br/>
`src/components/Footer/Footer.jsx` components <br/>
-in the `src/components/Admin/Layout/Layout.jsx` there is the sidebar and top bar for logged in users panel<br/>
the admin layout is surrounded by `<AlertProvider>` - responsible for snackbar alers and  `<DialogProvider>` - responsible for all dialog/modal windows <br/>

For the logged in users routes there is guard `src/guards/AuthGuard.jsx`<br/>
Also there is fallback page `src/components/GenericNotFound/GenericNotFound.jsx` for not found urls, or when user is trying to open guarded route<br/>


## Pages

-public <br/>
 / - `src/components/Home/Home.jsx` - holding all other components of the home page <br/>
/properties - `src/components/ListOfProperties/ListOfProperties.jsx` paginated list of properties who are published = 1 also there is filter by type <br/>
/contacts - `src/components/Contacts/Contacts.jsx` static page <br/>
/property/:id - `src/components/SingleProperty/SingleProperty.jsx` - public page for detailed view of property <br/>
/login - `src/components/Login/Login.jsx` - login form with valdiation for log in 
/register - `src/components/Register/Register.jsx` - register form with validation

-private <br/>
/dashboard - `src/components/Admin/Dashboard/Dashboard.jsx` - first page after login, here users can see list of properties as a paginated table <br/>
users with role 'user' will see list of properties which are published = 1 with action VIEW plus the one which he is created with actions edit and delete<br/>
users with role 'admin' will see list of ALL properties in the DB with actions to create, view, edit and delete property <br/>
/users - `src/components/Admin/Users/Users.jsx` - only for admin users, see paginated table of all users, with actions to view, edit and delete users. <br/>
/my-profile - `src/components/Profile/Profile.jsx` - every logged in users, can access this page, where can edit his profile information or delete profile (if so after deletion redirect to home) <br/>

## Styles

Public part is using free template - https://templatemo.com/live/templatemo_591_villa_agency
Both public and private parts are using - https://mui.com/

## Services
`src/services/properties.jsx` - responsible for all interactions with the BE regarding properties <br/>
`src/services/user.jsx` - responsible for all interactions with the BE regarding properties <br/>

## Utils
`src/utils` - holding different util helper functions for properties, requests users and other.

## Contexts
`src/contexts` - holding Alert context, Dialog context and User context used across the application

## BE API 
The api used for the project is on LARAVEL and this is the repo => https://github.com/cvexa/react-app-be <br/>
in the project root folder there is Postman collection `BE_API.postman_collection` containing all requests to the BE

------------------------------------------------------------------------------------
React.js Project Assignment

Your task is to design and implement a web application (Single Page Application) using React.js. Use a service like Kinvey or Firebase for your back-end or create your own with Node.js and MongoDB or a framework in another language (ASP.NET, Spring, Symfony). It can be a discussion forum, blog system, e-commerce site, online gaming site, social network, or any other web application of your choice.

## 1. Application Structure

The application should have:

• Public Part (Accessible without authentication)

• Private Part (Available for Registered Users)

1.1 Public Part

The public part of your projects should be visible without authentication. This public part could be the application start page, the user login, and user registration forms, as well as the public data of the users, e.g., the blog posts in a blog system, the public offers in a bid system, the products in an e-commerce system, etc.

1.2 Private Part (User Area)

Registered users should have a personal area in the web application accessible after successful login. This area could hold for example the user's profiles management functionality, the user's offers in a bid system, the user's posts in a blog system, the user's photos in a photo-sharing system, the user's contacts in a social network, etc.

## 2. General Requirements

Your Web application should use the following technologies, frameworks, and development techniques:

· At least 3 different dynamic pages (pages like about, contacts, etc. do not count towards that figure)

· Must have specific views:

o Catalog – list of all created records

o Details – information about a specific record

· At least one collection, different from the User collection, with all CRUD operations (create, read, update, delete)

o Logged in users – create records and request to the REST API, interaction with the records (via Likes, Dislikes, Comments, etc.)

o Logged in (author) – to be able to Edit / Delete their records

o A Guest should have access to basic website information (catalog, details), but not to the functional activities

· Use React.js for the client-side

· Communicate to a remote service (via REST, sockets, GraphQL, or a similar client-server technique)

· Implement authentication

· Implement client-side routing

· Demonstrate use of programming concepts, specific to the React library: stateless and state full components, bound forms, synthetic events, Component Styling, etc.

· Use a source control system, like GitHub

· It is required to have committed in GitHub for at least 3 days

## 3. Other requirements

· Apply error handling and data validation to avoid crashes when invalid data is entered

· The application should be divided into components with separate CSS files.

· Brief documentation on the project and project architecture (as .md file)

· Demonstrate use of programming concepts - React Hooks, Context API

## 4. Public Project Defense

Each student will have to deliver a public defense of their work in front of the other students, trainers, and assistants. Students will have only 20 minutes for the following:

· Demonstrate how the application works (very shortly)

· Show the source code and explain how it works

· Answer questions

Please be strict in the timing! In the 20th minute, you will be interrupted! It is a good idea to leave the last 5 minutes for questions.

Be well prepared to present the maximum of your work for the minimum amount of time. Open the project assets beforehand to save time.

## 5. Bonuses

· Use a state management solution (React Redux) instead of Context API

· Write Unit Tests for your code

· Good UI and UX

· Use a file storage cloud API, e.g., Dropbox, Google Drive, or other for storing the files

· Connect to an external API, like Google Maps, AccuWeather, etc.

· Deploy the application in a cloud (Heroku, Firebase)

· Bonuses depend on the complexity of the implementation

· Anything that is not described in the assignment is a bonus if it has some practical use

## 6. Assessment Criteria

General Requirements – 50 %

Implementing all the general requirements will grant you a place on the defense schedule. All projects that do not have the general requirements will not be accepted for defense.

Other Requirements – 20 %

Functionality Presentation – 10 %

Adequately demonstrate the requested functionality. Know your way around the application and quickly demonstrate the code.

Answering Questions – 20 %

Answer questions about potential functionality outside the scope of the project.

Bonuses – up to 10 %

Additional functionality or libraries outside the general requirements, with motivated usage.

## 7. Submission Deadline

You must submit your project before 23:59 on 17 Nov using a survey that will show up on 13 Nov. A presentation schedule will be available on 7 Dec and will include only the projects that were submitted beforehand. Keep in mind that after submitting your project you are allowed to work on it until the date of the project defense. Non-submitted projects will NOT be evaluated.

## 8. Restrictions

You can use parts (some components, routing configurations, form validation, etc...) of the course workshop, but you are NOT allowed to use the whole workshop as your project assignment. You are NOT allowed to use HTML & CSS structures from JS Back-End and JS Applications Courses.