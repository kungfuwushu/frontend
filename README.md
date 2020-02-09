# frontend
This project is created with the “TypeScript React Starter” (see  https://github.com/Microsoft/TypeScript-React-Starter).

It uses Typescript, ReactJS, Redux, Material UI, React-Intl (the complete dependency list is in the package.json file).

If you need to learn more about them, you can start here :
 
 •	Typescript : https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
 
 •	ReactJs : https://reactjs.org/docs/hello-world.html
 
 •	Redux : https://redux.js.org/basics/basic-tutorial
 
 •	Material UI : https://material-ui.com/getting-started/usage/
 
 •	React-intl : https://github.com/yahoo/react-intl/wiki

# Installation / Running
1.	git clone <repository-url> this repository
2.	Enter into the new directory
3.	Run the command “npm ci” to get the dependencies
4.	Run the command “npm start” to launch the app
5.	Visit the app at http://localhost:3005 (you can change the port 3005 in the file package.json)

# Internationalization
You have three scripts for translation:

 $ npm run trans:compile 
    
    ==> It compiles the tsx files to ES2015 in a temporary directory called extracted.

 $ npm run trans:extract
    
    ==> It extracts all the default strings into the src/translations/extracted directory.

 $ npm run trans:manage
    
    ==> It creates two .json files per language. One for the translations, and one for whitelisting messages that are causing invalid warnings.
