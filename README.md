# covid19ShieldDispatcher
Open source project for producing and managing 3d printed shields for people in need

# Installation
This application relies on Angular for frontend, AWS Amplify for backend, Google Map Api and Facebook Auth.
You must install the latest version of nodejs, and type install the dependencies for development with :
'''npm i'''

Since the backend relies on AWS, you must either configure a free account to have a mock backend, a request the key for access to the development backend. (As of today, this development backend is not yet configured).


# Contributing
Development follows a git branch flow model : main branch Master is deployed automatically in production, main branch develop is the next release candidat from which all development must be forked. Pull request are reviewd by key developers.


Please refere to the following Todo list :
* Notify both email when changes
* Display demands associated with my profile first (based on email address)
* Create an admin page to manage the profils (based on email address)1
* Manage modification write from facebook auth
* Add geohash for faster request query
* Add a coordinator role with dispatch right
* Translate
* Add accessibility keywords
* Manage multiple types of demand (door opener, models of masks,...)
* Add share to social media buttons
* Add legal texts : User conditions, RGPS, cookies, ...
