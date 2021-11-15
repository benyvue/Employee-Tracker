# Employee-Tracker

  ## Table of Contents
  * [Description](#Description)
  * [Installation](#Installation-Instructions)
  * [Usage Instructions](#Usage-Instructions)
  
  * [Contributing Members](#Contributing-Members)
  * [Testing](#Testing)    
  * [Questions/Inquiries](#Questions/Inquiries)

  ## Built with
  JavaScript, HTML, CSS, Express.js, UUID, nodemon

  ## Description
  Note-Taker is an application for taking notes. You can add a title and then in the main body type away what you want to put in your note. Then you can save it and access it later. You can also delete notes as needed

  ## Installation Instructions 
  Clone the repository via github. Then you would need to install node.js if you don't already have it. Type in npm install into the command line to install your node modules. After doing so you also would need to download express.js via your command line by typing "npm i express". You would also need uuid so do another npm install by typing "npm i uuid". To deploy the application you would also need heroku, so head over to the heroku.com and download the heroku cli. Once that is done you need to push the code application to heroku. First create a heroku url by typing "heroku create" in the command line. Then you can push to heroku by typing "git push heroku main" to push the code toyour heroku deployed app. The active link that ends in "herokuapp.com/" will be the link that takes you to your app. Enjoy.

  ## Usage Instructions




  ## Contributing Members
  Ben Vue

  ## Testing 
   N/A

  ### GitHub Profile
  [GitHub Profile](http://github.com/benyvue)

  ### Email
  Please reach me at the provided email with any questions. bvue012@gmail.com
  
SELECT role.*, department.name AS department
    -> FROM role
    -> LEFT JOIN department ON role.department_id = department.id;