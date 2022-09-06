import {MySQL} from "./MySQL";





let mysql = new MySQL('mysql-rfam-public.ebi.ac.uk:4497', 'rfamro', null, 'Rfam');



console.log('CHECK SIMPLE QUERY');
let res1 = mysql.query('SELECT * FROM `clan` LIMIT 5;');
console.log(res1?.fetchAllRows()??mysql.errorText);


return;

console.log('CHECK PREPARED QUERY');
let stmt = mysql.prepare('SELECT * FROM `clan` WHERE `comment` LIKE ?');
let res2 = stmt.execute([
    '%RNA%'
]);
console.log(stmt?.fetchAllRows()??mysql.errorText);

