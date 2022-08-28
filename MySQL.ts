import {
    mysql_errno,
    mysql_error,
    mysql_init,
    mysql_real_connect,
    mysql_close,
    MySQLObject,
    mysql_get_client_info
} from "./mysqlFFI";
export class MySQL {
    static readonly DEFAULT_UDS : string = '/var/run/mysqld/mysqld.sock';
    static readonly DEFAULT_PORT : number = 3306;
    public readonly mysqlObj : MySQLObject;


    /**
     * Is true if last action was error
     */
    get isError() : boolean {
        return this.errorCode !== 0;
    }

    /**
     * Get the error code from last action
     */
    get errorCode() : number {
        return mysql_errno(this.mysqlObj);
    }

    /**
     * Get the error string from last action
     */
    get errorText() : string {
        return mysql_error(this.mysqlObj);
    }

    /**
     * Closes connection to the server
     */
    close() : void {
        mysql_close(this.mysqlObj);
    }

    static getClientInfo() : string {
        return mysql_get_client_info();
    }

    constructor(host: string, username: string, password: string, database: string, port: number = MySQL.DEFAULT_PORT) {
        this.mysqlObj = mysql_init();
        let uds = MySQL.DEFAULT_UDS;
        if(host.startsWith('unix://')) {
            uds = host.substring(7);
            host = 'localhost';
        }

        //find port
        const regex = /:([\d]+)$/gm;
        let match = regex.exec(host);
        if(match) {
            port = parseInt(match[1], 10);
            host = host.substring(0, host.length - (port+'').length - 1);
        }
        console.error(host, port)

        mysql_real_connect(
            this.mysqlObj,
            host,
            username,
            password,
            database,
            port,
            uds,
            0
        );

        if(this.isError) {
            throw new Error(`${this.errorCode}: ${this.errorText}`);
        }
    }
}