#Run this using npm run serve  
  
1- because this project already have planning[in onedrive], then it's more easy to know what to build first  
2- start with 'router.js', put all route that have been plan beforehand  
3- create folder 'pages', which is a truly page that will be display to user[eventhough their component is separated into other pages in 'components folder' later].  
4- create 'coaches' & 'requests' folder as we plan, that '2 Data' @ main-things needed in this app.  
5- create all components/pages file .vue for each folder, all based on route & planning.  
6- connect all those pages file to 'router.js component:'. 
7- create App.js.  
8- start to do code for all those pages.  


#whenever we want to use props, we create the template file in components folder, within 'template' we put any elements needed, and within 'script' we use props to ensure that data for that props will be passed later.  
#in any file that use the template, gonna send the props data using :props-name="".  


#For 'modules/store folder' that holds all 'vuex'@'state management' related files,  
  
- for mutations file, each function received 2 arguments (state, payload)  
- for actions file, each function received 2 arguments (context, data), (context, payload)  
- for getters file, each function received at least 1 arguments (state), (state, getters, rootState, rootGetters)  
  
#This project got 2 problems detected - with no solution yet  
1- user that - authenticated + is a coach - still can access /register page  
2- whenever user go to /coaches/userid/contact@contact page & refresh browser, the page will blank + in console a lot of errors  
  
The application helps you find a coach to teach you skills in your area of interest. You can also register as a coach (if you're one) and receive enquiries from potential students. All data is persistent (saved in a database).  
  
This app was built using VueJS, Vue Router, Vuex and Firebase.  
  
The live project is deployed at Firebase.  

.firebaserc {
  "projects": {
    "default": "vue-find-coach-app"
  }
}