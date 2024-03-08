<img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Postman_%28software%29.png" alt="Postman Logo" style="max-width:100%;">


# Swagger Note

This project involves API testing on [Swagger Note API](https://practice.expandtesting.com/notes/api/api-docs/) using `Postman`. I've handled dynamic token through the help of assertions. This includes a variety of checks such as verifying the `status code`, `assessing the response time`, `validating the format of the response body (ensuring it is in JSON format)`, `checking if the response message contains specific keywords`, and `confirming that the response header content type is application/json`. These comprehensive assertions enhance the robustness and reliability of the system.

## Requirements

- [Git](https://git-scm.com/downloads),
- [Postman](https://www.postman.com/downloads/),
- [npm, nodejs](https://nodejs.org/en/download), 
- [Newman Report Generator](https://www.npmjs.com/package/newman-reporter-htmlextra)

## How to Download and Setup the project?

- Clone the project repository using the command `git clone <URL-name>`. Replace `<URL-name>` with the actual URL of the repository. Alternatively, you can download the project as a ZIP file. Look for the 'Download ZIP' option, usually found under the 'Code' dropdown on the repository page.
- After downloading and extracting the project files, launch Postman. 
- Create a new Workspace in Postman. You can do this by clicking on the 'New Workspace' button, usually found at the top left corner of the Postman interface. Assign it a name of your choice.
- Import the collection file into your newly created workspace. To do this, click on 'Import', which is located just below the 'API Network' button. A dialog box will open up.
- In the dialog box, you have the option to upload files in several ways. You can click 'Upload Files' to browse and navigate to the location of the collection file on your computer. Alternatively, you can drag and drop the file into the designated area in the dialog box. The file you need to import is named `Swagger Note API.postman_collection.json`.
- Next, navigate to the 'Environment' section, which is located on the left-hand side (LHS) below the collection.
- Import the environment variable file in the same manner as you did for the collection file. The file you need to import is named `Swagger Note Variables.postman_environment.json`.
- Now, you're all set to start testing the API with the correct environment variables in place.
