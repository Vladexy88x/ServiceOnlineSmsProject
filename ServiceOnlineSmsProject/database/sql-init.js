const mysql = require('mysql2/promise');

//INSERT INTO `authTestDb` (`id`, `login`, `password`, `balance`) VALUES ('1224', 'vlad', '232343a', '200');
//SELECT * FROM `authTestDb` WHERE 1

//let resultCollection = [];
let resultCollection;

async function Initialize() {
    const connection = await mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    });
    const result = await connection.execute('SELECT * FROM authTestDb');
    console.log(result);
    await connection.end();
    return result;

    //connection.connect();
    // connection.query('SELECT * FROM authTestDb', (error, results, fields) => {
    //     if (error) throw error;
    //     console.log(fields);
    //     console.log(results);
    //     GetResultFromDatabase(results);
    // })   
    // connection.end();
}

async function AddUser(id, login, password) {
    if (login == "" || password == "") {
        return;
    }
    //INSERT INTO `authTestDb` (`id`, `login`, `password`) VALUES ('12', 'kek', 'test1243');
    const connection = await mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    })
    //Проверка , зарегистрирован ли этот логин
    let isExistLogin = false;
    const result = await connection.execute('SELECT * FROM authTestDb');
    for (let i = 0; i < result.length; i++) {
        if (result[0][i].login === login) {
            isExistLogin = true;
        }
    }
    if (!isExistLogin) {
        const sql = `INSERT INTO authTestDb(id, login, password) VALUES("${id}", "${login}", "${password}")`;
        //Использовать update он для того чтобы обновить(добавить) данные в таблице
        // const sql = `UPDATE authTestDb SET balance=100 WHERE id=2718`;
        // const sql = `INSERT INTO authTestDb(login) VALUES("${login}")`;
        connection.query(sql, (err, results) => {
            console.log(results);
            console.log(err);
        })
    }
    await connection.end();

}

async function PasswordСhange(id, newPassword) {
    const connection = await mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    })
    //const sql = `INSERT INTO authTestDb(id, login, password) VALUES("${id}", "${login}", "${password}")`;
    //Использовать update он для того чтобы обновить(добавить) данные в таблице
    const sql = `UPDATE authTestDb SET password='${newPassword}' WHERE id='${id}'`;
    // const sql = `INSERT INTO authTestDb(login) VALUES("${login}")`;
    connection.query(sql, (err, results) => {
        console.log('Password update');
        console.log(results);
        console.log(err);
    })

    await connection.end();
}

module.exports.Initialize = Initialize;
module.exports.AddUser = AddUser;
module.exports.PasswordСhange = PasswordСhange;
