## mvp_dance-directory

This projects is a work in progress and forms part of the CodeOp Full Stack Development bootcamp curriculum. It constitutes the first of three projects and the goal is to produce an MVP of the student's choice.

The aim of this project is to create a centralised directory of dance classes for a certain location. Dance classes are organised by different teachers and schools and usually all communication happens via various Facebook groups. This can quickly get overwhelming for students as they need to spend a long time searching Facebook for suitable classes. Once they have identified them, they will need to join multiple groups and follow their communication threads in order to not to miss a change of location or a cancellation, for example. Furthermore - and this is especially true for the more classical dance styles like Ballroom dancing -  a lot of participants tend to be older and don't usually use Facebook so it is easy for them to miss out on updates or special events orgaised on social media. 
So this project hopes to address this problem by creating a directory off of Facebook that everyone with a computer or phone can accesss. Students can use filter options to quickly find what they're looking for and dance teachers only need to publish their classes in one place.

# Create Database

  let sql = "DROP TABLE if exists classes; CREATE TABLE classes (id INT NOT NULL AUTO_INCREMENT, date DATE NOT NULL, time TIME NOT NULL, address varchar(255) NOT NULL, price double NOT NULL, partner BOOLEAN NOT NULL,style tinyint NOT NULL, instructor tinyint NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation 'classes' was successful!");
    console.log("Closing...");
  });

  sql="DROP TABLE if exists dance_styles; CREATE TABLE dance_styles (id INT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, video_url varchar(255) NOT NULL, description TEXT NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation 'dance_styles' was successful!");
    console.log("Closing...");
  });

  sql="DROP TABLE if exists instructors; CREATE TABLE instructors (id INT NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, introduction TEXT NOT NULL, email varchar(255) NOT NULL, PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation 'instructors' was successful!");
    console.log("Closing...");
  });


  Sample Data for Dance Styles: 
  { "name": "Bachata", "description" : "Bachata description", "video_url" : "https://www.youtube.com/embed/sBhWxgOLRwo"}
{ "name": "Ballet", "description" : "Ballet description", "video_url" : "https://www.youtube.com/embed/3TLSrI_hXEw"}
{ "name": "Ballroom", "description" : "Ballroom description", "video_url" : "https://www.youtube.com/embed/Ti_YU-vsG34"}
{ "name": "Salsa", "description" : "Salsa description", "video_url" : "https://www.youtube.com/embed/tBEc9Kni6I0"}
{ "name": "Tango", "description" : "Tango description", "video_url" : "https://www.youtube.com/embed/7uA3mwfadAM"}
