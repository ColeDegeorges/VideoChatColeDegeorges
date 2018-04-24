Spring 2018
Version 1.0
Initial Release

# TutorChatter/VideoChat/TutorFinder
(What you guys think of the name?)



## Developers Quick Guide (Shortcut):
-	What the project is
-	What the features are
-	How to install it
-	The API info
-	Links to documentation for Node.js
-	Links to documentation for dependencies the project works with
-	Known issues (work needs to be done)



## Developers Quick Guide:

  ### - What the project is

      •	VideoChat is a software application project using Node.js where tutors are able to video chat with students
       using WebRTC and websockets. The purpose of the creation of VideoChat is allow students to be able obtain tutoring
       anytime they want without the worry of not being able to make it to their school’s scheduled tutoring sessions. The
       same goes for the tutors because of both of their busy schedules.

      •	Tutors will be able to stream in real time and communicate in a one on one session with the students aiding and
      guiding them through their coursework where they need assistance in. For each session a tutor has with their tutee,
      there is a fee. The price depends on the length of the tutoring time.

      •	The targeted audience of this application is towards college students, but it’s not only limited to them.



  ### -	What the features are

      #### •	Go Live Feature (For Tutors only)

          o	This feature is only available for tutors. When tutors click the Go Live page they are brought to page where
          their cameras/webcams are activated for live streaming. (Work needed how to save stream after session is done
          for later viewing purposes)

      #### •	Tutors Available Now List and Tutors profile

          o	This feature shows which tutors are currently available whom are currently in the Go Live page. It will be
          easier for students to find which tutors are currently available without needing to search. It will show the
          name of the tutor and subject they teach. Clicking on the tutor will bring you to the tutors profile page where
          it gives a more in depth information of the tutor. (Profile Page needs a lot of work)

      #### •	Main Page/Tutor Page and search tutor (Needs Work)

          o	Once logged in, clicking the main page and tutor page are the same it brings you to the tutor page. On this page,
          both students and tutors are able to search and look up tutors that fit their academic needs. (Searching needs work)

      #### •	History Page (Needs work)

          o	This feature will show whom the student had a tutoring session with and vice versa, with information about each
          session. (History needs work currently a dummy page)

      #### •	Notes

          o	This feature allows both the tutor and student to take notes while the session is live.

      #### •	Chatbox (Needs work)

          o	This feature allows both the tutor and student to communicate to one another by typing. It should be able to
          upload and download files (Currently a dummy needs work to implement)



  ### -	How to install it

      #### • Accessing the code base

          1.	A GitHub account it needed to access the code base

          2.	After obtaining an account, The project manager will invite the team for access in a private repository

      #### •	How to clone

          1.	Follow the steps on how to clone a repository here:

              https://help.github.com/articles/cloning-a-repository/

              There are directions for different platforms for Mac, Windows, and Linux. Follow the directions for your
              operating system.

      #### •	How to write to it

          1.	Once you clone the repository to your desktop, you can edit them in a text editor like Sublime Text,
          Notepad++, Atom, and many more. (Note: You should copy the code into a separate repository for testing and
            DO NOT REWRITE THE CODE!)

          2.	When you are done editing save your file, open command prompt for Windows or Terminal for Mac/Linux.
          ( you need to download git if you don’t have it here: https://git-scm.com/downloads)

          3.	To push your changes to the code back to Github repository you write:

              •	$ git add –all
              •	$ git commit –m “Initial commit”
              •	$ git push –u origin master

      #### •	How to test

          1.	To test the code you need to create a Heroku account here: https://www.heroku.com/

          2.	Name your project on Heroku and connect it to repository on GitHub

          3.	Click open app to start testing

          4.	To keep track of a database to see users and sessions create an account on mLab here: https://mlab.com/

          5.	Name your project on mLab and create a username and password for the project

          6.	Copy the MongoDB URI from mLab and replace it in the app.js where it says:
              m = mongoose.connect(‘replace here’,{  useMongoClient: true });
              (Make sure you put your username and password where it says <dbuser> and <dbpassword>)

          7.	Do the same on Heroku copy the MongoDB URI got to Settings and click Reveal Config Vars


          8.	Type MONGODB_URI where it says KEY and Put the MongoDB URI in value (Make sure you put your username
            and password where it says <dbuser> and <dbpassword>)

          9.	After all that is done test the app again and you should be able to see updates on mLab

      #### •	How to deploy (needs work)



  ### -	The API info

      #### •	WebRTC

          o	The video is done using WebRTC

          o	WebRTC is a free, open project that provides browsers and mobile applications with Real-Time Communication
          (RTC) capabilities via simple APIs. It’s low cost with high quality audio and video communication and data.

          o	WebRTC’s mission is to implement rich and high quality RTC applications for browsers, mobile, and IoT
          (Internet of Things) devices, allowing them to communicate via a common set of protocols.

          o	Many browsers and operating systems like Chrome, Firefox, Opera, Android, and iOS are supported.

          o	For more information about WebRTC visit:  https://webrtc.org/start/

      #### •	Stripe

          o	The payment method is done using Stripe

          o	Stripe is the best way to accept payments online and in mobile apps. It aims to expand internet commerce
          by making it easier to process transactions and manage an online business. They want to increase the GDP
          (Gross Domestic Product) of the internet.

          o	Currently Stripe processes billions of dollars every year for thousands of businesses from start-ups
          to Fortune 500 companies.

          o	Many web and mobile businesses using Stripe includes Twitter, Kickstarter, Shopify, Salesforce, Lyft,
          and many more.

          o	For more information about Stripe visit: https://stripe.com/docs



  ### -	Links to documentations for Node.js

      •	This application is coded using Node.js. (ver. 8.3.0) – version used in project

      •	Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine. Node.js uses an event-driven,
      non-blocking I/O model that makes it lightweight and efficient. Node.js package ecosystem, npm, is the largest
      ecosystem of open source libraries in the world.

      •	To download Node.js visit: https://nodejs.org/en/download/

      •	Link to documentations for Node.js: https://nodejs.org/en/docs/



  ### -	Links to documentation for dependencies the project works with

      #### •	body – parser (ver. 1.17.1) – version used in project
          o	https://www.npmjs.com/package/body-parser

      #### •	connect – mongo (ver. 1.3.2) – version used in project
          o	https://www.npmjs.com/package/connect-mongo

      #### •	cookie – parser (ver. 1.4.3) – version used in project
          o	https://www.npmjs.com/package/cookie-parser

      #### •	debug (ver. 2.6.3) – version used in project
          o	https://www.npmjs.com/package/debug

      #### •	express (ver. 4.15.5) – version used in project
          o	https://www.npmjs.com/package/express

      #### •	express – session (ver. 1.15.5) – version used in project
          o	https://www.npmjs.com/package/express-session

      #### •	less – middleware (ver. 2.2.0) – version used in project
          o	https://www.npmjs.com/package/less-middleware

      #### •	mongoose (ver. 4.11.12) – version used in project
          o	https://www.npmjs.com/package/mongoose

      #### •	passport (ver. 0.4.0) – version used in project
          o	https://www.npmjs.com/package/passport

      #### •	passport – local (ver. 1.0.0) – version used in project
          o	https://www.npmjs.com/package/passport-local

      #### •	passport – local mongoose (ver. 4.2.1) – version used in project
          o	https://www.npmjs.com/package/passport-local-mongoose

      #### •	pug (ver. 2.0.0 – beta11) – version used in project
          o	https://www.npmjs.com/package/pug

      #### •	serve – favicon (ver. 2.4.2) – version used in project
          o	https://www.npmjs.com/package/serve-favicon

      #### •	socket.io (ver. 2.0.3) – version used in project
          o	https://www.npmjs.com/package/socket.io

      #### •	stripe (ver. 5.2.0) – version used in project
          o	https://www.npmjs.com/package/stripe

      #### •	validator (ver. 8.2.0) – version used in project
          o	https://www.npmjs.com/package/validator



  ### -	Known issues (work needs to be done)

      •	Work needs to be done on Go Live page. The video stream need to be saved for later uses. The chat box is
      currently a dummy; work needs to be done to implement it. It should be able to upload and download files.

      •	On the Tutors/Main Page work needs to be done on the searching functions. The profile pages of the tutors
      and students pages also needs work done all repeating the same thing.

      •	The History page is currently a dummy page (needs work). The Billing and Dashboard page aren’t coded

      •	Setting page (currently being worked on)
