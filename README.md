## mvp_dance-directory

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
