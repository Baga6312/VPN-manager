const db = require('mariadb')

const pool = db.createPool({ 
    host : 'localhost' , 
    user : 'root', 
    password : 'password' , 
    database : 'testing' , 
    connectionLimit : 5 
}) 

const getuser =  async () => { 
}
