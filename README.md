<p>Latest Activity</p>
<p>We moved Github to Codecommit</p>

<p>GET REQUEST</p>

# <p>List of All Posts</p>
<p>http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/posts/</p>
=========================================================================================

<p>GET REQUEST</p>

# Get a Single Post BY ID
<p>http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/posts/:id</p>
=========================================================================================

<p>POST REQUEST</p>

# Only Authenicate User Can Create Post 
<p>http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/posts</p>

<p>Data Required in JSON Format With Header Token </p>

{
	"title": 			"Drugs addiction in our youth",
	"community_categories": 	"Drug Addiction",
	"summary": 			"Lorem ipsum is a dummy text",
	"post_thumbnail": 		"1234.jpg",
	"tags": 			"drug addiction,youth,article"
}

=========================================================================================

GET REQUEST

# Get All Comments of Specific Post
http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/posts/:id/comments

# Data Required as paramater :id of Post id

=========================================================================================

POST REQUEST

# Post Comment of Specific Post With Authicate User 

http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/posts/:id/comments
w
# Data Required as paramater :id of Post id and Token in Authorization Header: Bearer Token 

{
    "message": "Good Post",
    "post_id": "15"
}

=========================================================================================

POST REQUEST

# Image Upload 
http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/upload

Data Required in form-data Format With key as a files
See Screenshots: https://ibb.co/cNncrQQ

=========================================================================================

# User Login - Token Generate
http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/auth/login

Data Required in JSON Format

{
	"email": 	"rubnawazqureshi@yahoo.com",
	"password": 	"Pak123@istan"
}

=========================================================================================

# User Register - Token Generate
http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/auth/register

Data Required in JSON Format

{
	"username": 			"rubnawazqureshi",
	"firstname": 			"Rubnawaz",
	"lastname": 			"Qureshi",
	"email": 			"rubnawazqureshi@yahoo.com",
	"gender": 			"Male",
	"birthdate": 			"01/03/2001",
	"password": 			"12345",
	"subscribe_newsletter": 	1,
	"avatar": 			"12345.jpg",
	"role": "user OR admin" // put any one
}

=========================================================================================
GET REQUEST

User Profile - Token Generate
http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/auth/profile/:id

Data Required in Paramater User ID to Fetch Exact User Profile Data

=========================================================================================

POST REQUEST

Push Notification 

http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//api/v1/push_notification

Data Required in JSON Format 

{
	"title": 	"Welcome to Google",
	"navigateUrl": 	"https://www.google.com",
	"message": 	"Search Engine",
	"imageUrl": 	"logo.jpg"
}

=========================================================================================

GET REQUEST

Sharing Post

http://fnmotivation-env.eba-6prrfkyq.us-east-1.elasticbeanstalk.com//redirect

Please docs for clientside: https://www.npmjs.com/package/social-share

NOTE1: It will be response success, true or false. once it response is success, push notification from frontend.  Use this script: https://pushjs.org/ to push notification.

NOTE2: Apple & Google is fronend, Use firebase as fronend, I have setup registration system, once your frontend developer auth from apple, and google. send data to register endpoint