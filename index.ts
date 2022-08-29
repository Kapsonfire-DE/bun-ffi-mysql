import {MySQL} from "./MySQL";


let mysql = new MySQL('mysql-rfam-public.ebi.ac.uk:4497', 'rfamro', null, 'Rfam');




let stmt = mysql.query('SELECT * FROM `clan` LIMIT 5;');


console.log(stmt?.fetchAllRows()??mysql.errorText);

