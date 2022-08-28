import {MySQL} from "./MySQL";


let mysql = new MySQL('127.0.0.1:3306', 'ffitest', 'ffitest', 'ffitest');

console.log(mysql.isError, mysql.errorCode, mysql.errorText);
console.log(MySQL.getClientInfo())