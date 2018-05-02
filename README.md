Spring 2018
Version 1.1.0
Initial Release

# VideoChat/TutorFinder



## Developers Quick Guide (Shortcut):
-	What the project is
-	What the features are
-	How to install it
-	The API info
-	Links to documentation for Node.js
-	Links to documentation for dependencies the project works with
-	Known issues (work needs to be done)

## Users Quick Guide (Shortcut):
-	Register
-	Login
-	Go Live
-	Available Now
-	Tutors
-	Payment
-	Setting
-	History
-	Billing
-	Name

## MVC Guides (Shortcut):



## Developers Quick Guide:

  ### - What the project is

      • VideoChat is a software application project using Node.js where tutors are able to video chat with students
        using WebRTC and websockets. The purpose of the creation of VideoChat is allow students to be able obtain
        tutoring anytime they want without the worry of not being able to make it to their school’s scheduled
        tutoring sessions. The same goes for the tutors because of both of their busy schedules.

      • Tutors will be able to stream in real time and communicate in a one on one session with the students aiding
        and guiding them through their coursework where they need assistance in. For each session a tutor has with
        their tutee, there is a fee. The price depends on the length of the tutoring time.

      • The targeted audience of this application is towards college students, but it’s not only limited to them.



  ### -	What the features are

      • Go Live Feature (For Tutors only)

            o This feature is only available for tutors. When tutors click the Go Live page they are brought to page
              where their cameras/webcams are activated for live streaming. (Work needed how to save stream after
              session is done for later viewing purposes)

      • Tutors Available Now List and Tutors profile

            o This feature shows which tutors are currently available whom are currently in the Go Live page. It will
              be easier for students to find which tutors are currently available without needing to search. It will
              show the name of the tutor and subject they teach. Clicking on the tutor will bring you to the tutors
              profile page where it gives a more in depth information of the tutor. (Profile Page needs a lot of work)

      • Main Page/Tutor Page and search tutor (Needs Work)

            o Once logged in, clicking the main page and tutor page are the same it brings you to the tutor page. On
              this page, both students and tutors are able to search and look up tutors that fit their academic needs.
              (Searching needs work)

      • History Page (Needs work)

            o This feature will show whom the student had a tutoring session with and vice versa, with information
              about each session. (History needs work currently a dummy page)

      • Notes

            o This feature allows both the tutor and student to take notes while the session is live.

      • Chatbox (Needs work)

            o This feature allows both the tutor and student to communicate to one another by typing. It should be able
              to upload and download files (Currently a dummy needs work to implement)



  ### -	How to install it

      • Accessing the code base

            1. A GitHub account it needed to access the code base

            2. After obtaining an account, The project manager will invite the team for access in a private
                repository

            3. Here is a working site so far deployed on Heroku

      • How to clone

            1. Follow the steps on how to clone a repository here:

                https://help.github.com/articles/cloning-a-repository/

                There are directions for different platforms for Mac, Windows, and Linux. Follow the directions for
                your operating system.

      • How to write to it

            1. Once you clone the repository to your desktop, you can edit them in a text editor like Sublime Text,
                Notepad++, Atom, and many more. (Note: You should copy the code into a separate repository for testing
                and DO NOT REWRITE THE CODE!)

            2. When you are done editing save your file, open command prompt for Windows or Terminal for Mac/Linux.
                ( you need to download git if you don’t have it here: https://git-scm.com/downloads)

            3. To push your changes to the code back to Github repository you write:

                •	$ git add –all
                •	$ git commit –m “Initial commit”
                •	$ git push –u origin master

      • How to test

            1. To test the code you need to create a Heroku account here: https://www.heroku.com/

            2. Name your project on Heroku and connect it to repository on GitHub

            3. Click open app to start testing

            4. To keep track of a database to see users and sessions create an account on mLab here:
                https://mlab.com/

            5. Name your project on mLab and create a username and password for the project

            6. Copy the MongoDB URI from mLab and replace it in the app.js where it says:
                m = mongoose.connect(‘replace here’,{  useMongoClient: true });
                (Make sure you put your username and password where it says <dbuser> and <dbpassword>)

            7. Do the same on Heroku copy the MongoDB URI got to Settings and click Reveal Config Vars

            8. Type MONGODB_URI where it says KEY and Put the MongoDB URI in value (Make sure you put your
                username and password where it says <dbuser> and <dbpassword>)

            9. After all that is done test the app again and you should be able to see updates on mLab

            10. Use a dummy credit card when testing for payment 4111 1111 1111 1111 CVC 165 Expiration date 1/2020

      • How to deploy on AWS (Amazon Web Services)

            1.	Getting started with EC2. First create an account with AWS. Make sure to choose the basic free option.
            Once registered click “Sign In to the Console.” Click EC2 dashboard. Create an EC2 Key Pair. Amazon requires
            a key pair for each EC2 instance.

            2. Navigate the menu and pick the option “Key Pairs” and the click “Create Key Pair”. Then name you key pain
            in the pop-up window that appears. Then click create. A .pem file with same name you named the key pair will
            download to your system. DO NOT LOSE THIS FILE! It will only generate once and it’ll be need to access your
            EC2 instance.


            3. Head back to the main AWS console and go to the AWS Marketplace. Search for “MEAN Powered by Bitnami”.
            Click the continue button. You can keep the region set to US East (N. Virginia). Next you’ll see a number of
            options, the only thing needed to be change is the EC2 Instance Type. In order to avoid charges, select
            t2.micro. Then click “Accept Terms & Launch with 1-Click”. You will then receive notification telling you
            that your EC2 instance is being deployed.

            4. After navigate bate to Amazon Web Service Console and open the EC2 dashboard again. You will see an update
            Amazon EC2 resources. Click on “1 Running Instance” and you’ll be taken to your newly created server with
            Bitnami MEAN image. Wait a while for the instance to complete with its initialization.

            5. In this next step, being part of the Bitnami MEAN installation your instance comes with a pre-configured
            initial MongoDB admin username and password. The initial username is root. To obtained your password,
            right-click on the row of your EC2 instance and navigate to Instance Setting > Get System Log. Scroll through
            to the very end of the log, you will see Setting Bitnami application password to, followed by the password,
            which the MongoDb admin password. Copy the password down and keep is somewhere safe also because you’ll be
            shown this password only once.

            6. Next thing to do is connecting to our EC2 instance via SSH. Download PuTTY if you don’t have an SSH client.
            Navigate back to AWS Console and to your running EC2 instance. Note the Public DNS, you’ll be needing the URL
            to connect. https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

            7. Convert you .pem file into .pkk file so that PuTTY can recognize it. You will need to download PuTTYgen,
            download it from the link above. Load your .pem file into PuTTYgen. Switch the file types to all “All File”.
            After it’s loaded click “Save Private Key” and resave your file as PuTTY Private Key (.ppk) file.

            8. Open PuTTY and enter the Public DNS you noted earlier as the Host Name. Set the Port for 22. Then look
            through to category menu for SSH > Auth page. Where it says “Private Key for Authentication” upload the .ppk
            file we just generated before. Click “Open “and a terminal will pop-up. It will say “login as”, enter bitnami
            and it will welcome you to the system. Connection is successful.


            9. Now to start deploying your code. First step is to clone you git repository onto the server. Use ls to
            check if cloning was successful. It won’t run if you try to running it using node server.js. You need to
            change security access. Navigate back to the EC2 Dashboard. Open Security Groups panel on the left. Click the
            row associated with your MEAN application. On the bottom there are a set of Inbound and Outbound rules
            specifying which ports are accessible.

            10. Under the Inbound rules click “Add Rule” and set type to Custom TCP Rule”, “Protocol to TCP, Port Range
            to 8080 and source 0.0.0.0/0 anywhere. Do the same for another new rule and set Port Range 27017, which will
            be used by MongoDB. Click “Save”. Refresh the security group at the top right. Close out the Putty connection
            previously and reconnect the same way.

            11. Try running again now, there should be no errors. To test to see if actually works, use a URL, it going
            to be the complete DNS Hostname followed by the port. Test it on a browser and should be able to see the app.
            If you close your PuTTY the app dies with it. You need to use node package forever.js, it a tool to allow it
            to run forever. To install stop your existing application with ctrl+c then write sudo npm install forever –g
            and followed by forever start server.js. Finally you should have a live deployment of your app.

            12. For a full tutorial of how to deploy on AWS click:
            https://scotch.io/tutorials/deploying-a-mean-app-to-amazon-ec2-part-1#introduction  

            13. For part 2 click: https://scotch.io/tutorials/deploying-a-mean-app-to-amazon-ec2-part-2




  ### -	The API info

      • WebRTC

            o The video is done using WebRTC

            o WebRTC is a free, open project that provides browsers and mobile applications with Real-Time
              Communication (RTC) capabilities via simple APIs. It’s low cost with high quality audio and video
              communication and data.

            o WebRTC’s mission is to implement rich and high quality RTC applications for browsers, mobile, and IoT
              (Internet of Things) devices, allowing them to communicate via a common set of protocols.

            o Many browsers and operating systems like Chrome, Firefox, Opera, Android, and iOS are supported.

            o For more information about WebRTC visit:  https://webrtc.org/start/

      • Stripe

            o The payment method is done using Stripe

            o Stripe is the best way to accept payments online and in mobile apps. It aims to expand internet
              commerce by making it easier to process transactions and manage an online business. They want to
              increase the GDP (Gross Domestic Product) of the internet.

            o Currently Stripe processes billions of dollars every year for thousands of businesses from start-ups
              to Fortune 500 companies.

            o Many web and mobile businesses using Stripe includes Twitter, Kickstarter, Shopify, Salesforce, Lyft,
              and many more.

          o For more information about Stripe visit: https://stripe.com/docs



  ### -	Links to documentations for Node.js

      • This application is coded using Node.js. (ver. 8.3.0) – version used in project

      • Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine. Node.js uses an event-driven,
        non-blocking I/O model that makes it lightweight and efficient. Node.js package ecosystem, npm, is the
        largest ecosystem of open source libraries in the world.

      • To download Node.js visit: https://nodejs.org/en/download/

      • Link to documentations for Node.js: https://nodejs.org/en/docs/



  ### -	Links to documentation for dependencies the project works with

      • body – parser (ver. 1.17.1) – version used in project
              o	https://www.npmjs.com/package/body-parser

      • connect – mongo (ver. 1.3.2) – version used in project
              o	https://www.npmjs.com/package/connect-mongo

      • cookie – parser (ver. 1.4.3) – version used in project
              o	https://www.npmjs.com/package/cookie-parser

      • debug (ver. 2.6.3) – version used in project
              o	https://www.npmjs.com/package/debug

      • express (ver. 4.15.5) – version used in project
              o	https://www.npmjs.com/package/express

      • express – session (ver. 1.15.5) – version used in project
              o	https://www.npmjs.com/package/express-session

      • less – middleware (ver. 2.2.0) – version used in project
              o	https://www.npmjs.com/package/less-middleware

      • mongoose (ver. 4.11.12) – version used in project
              o	https://www.npmjs.com/package/mongoose

      • passport (ver. 0.4.0) – version used in project
              o	https://www.npmjs.com/package/passport

      • passport – local (ver. 1.0.0) – version used in project
              o	https://www.npmjs.com/package/passport-local

      • passport – local mongoose (ver. 4.2.1) – version used in project
              o	https://www.npmjs.com/package/passport-local-mongoose

      • pug (ver. 2.0.0 – beta11) – version used in project
              o	https://www.npmjs.com/package/pug

      • serve – favicon (ver. 2.4.2) – version used in project
              o	https://www.npmjs.com/package/serve-favicon

      • socket.io (ver. 2.0.3) – version used in project
              o	https://www.npmjs.com/package/socket.io

      • stripe (ver. 5.2.0) – version used in project
              o	https://www.npmjs.com/package/stripe

      • validator (ver. 8.2.0) – version used in project
              o	https://www.npmjs.com/package/validator



  ### -	Known issues (work needs to be done)

      • Work needs to be done on Go Live page. The video stream need to be saved for later uses. The chat box is
        currently a dummy; work needs to be done to implement it. It should be able to upload and download files.

      • On the Tutors/Main Page work needs to be done on the searching functions. The profile pages of the tutors
        and students pages also needs work done all repeating the same thing.

      • The History page is currently a dummy page (needs work). The Billing and Dashboard page aren’t coded

      • Setting page (currently being worked on)



## Users Quick Guide:

  ### - Register

      1. To register enter your first and last name

      2. Then enter your email address and a password

      • For Students

            o After click Register

      • For Tutors

            o Click Tutor and a list of subjects will show up choose the subject or subjects you will tutor and then
            Click Register when you are done

### -	Login

      • To login enter your email address and password and the click login

### -	Go Live

      • This feature is only available for tutors

      • Once you are logged in click Go Live on top right

      • Doing so will allow you to be shown as available for a tutoring session

### -	Available Now

      • This feature is both accessible to both tutors and students

      • Available Now shows all the tutors whom are currently in the Go Live page signaling they are available for
      tutoring

      • It also shows the subjects that each tutor is available to tutor in

      • Clicking their name will bring you to their profile page

      • In the profile page it shows how much a session of tutoring is where you can click and pay

### -	Tutors

      • On this page you will see all the tutors whom has registered as a tutor

      • Clicking on them brings you to their profile

      • Also on the profile page you can see information about the tutor and if they are online or offline

### -	Payment

      • When you click start a session on a tutor whom is available you be brought to a payment page telling how
      much it cost for the duration of the session

          1. Click Pay with Card

          2. A pop-up window Math Tutor payment will appear

          3. Enter your email address

          4. Followed by your credit card or debit card number

          5. Enter the month and year your card expires and CVC number on the back of your card

          6. If you want us to remember your payment information click Remember me

          7. Finally click Pay

### -	Setting(Work in progress)

      • Setting is a place where you can change your password and etc.

### -	History (needs work)

      • History is a place where you can see all your past sessions who tutored and the amount it cost

### -	Billing(needs work)

      • Billing is where your billing information is saved

      • If you chose to click Remember me when paying for a session your credit/debit card information is
      saved here

### -	Name(need work)

      • Clicking your name on the top right brings you to your profile page where you can edit your information
      for others to see
