import * as fs from "fs";



if(process.argv.length < 3) {
    console.error('no input file');
    process.exit(0);
}

const str = fs.readFileSync(process.argv[2], {
    encoding: "utf-8"
})

const regex = /^([a-zA-Z \_]*) ([\*])?STDCALL (\w+)\((.*?)\)/gms;


let m;
let ffiLoadObj = {};

const FFITypeMatcher = {
    "char*": 'FFIType.cstring',
    "const char*": 'FFIType.cstring',
    "void*": 'FFIType.ptr',
    "byte": "FFIType.i8",
    "word": "FFIType.i16",
    "int": "FFIType.i32",
    "long": "FFIType.i64",
    "unsigned byte": "FFIType.u8",
    "unsigned word": "FFIType.u16",
    "unsigned int": "FFIType.u32",
    "unsigned long": "FFIType.u64",
    "float": "FFIType.float",
    "double": "FFIType.double",
    "bool": "FFIType.bool",
    "char": "FFIType.char",



}

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    if(m[3].includes('nonblocking')) continue;
    if(!m[3].startsWith('mysql_')) continue;
    if(m[3].startsWith('mysql_binlog')) continue;

    let returnType = m[1] + (m[2]??'');


    let args = m[4].split(',').map(str => str.trim()).filter(str => str != 'void').map(typeStr => {
        let parts = typeStr.split(' ');

        let isPtr = (parts[parts.length - 1]).startsWith('*');
        parts.pop();
        typeStr = parts.join(' ') + (isPtr?'*':'');



        return FFITypeMatcher[typeStr] ?? 'FFIType.ptr';
    });




    ffiLoadObj[m[3]] = {
        returns: FFITypeMatcher[returnType] ?? 'FFIType.ptr',
        args
    };

}

let jsonTPL = JSON.stringify(ffiLoadObj, null, 2);
const regexUnwrap = /"(FFIType\..*?)"/gms;
jsonTPL = jsonTPL.replace(regexUnwrap, '$1');

console.log(`import { FFIType } from "bun:ffi";

export const mysqlSymboles = ${jsonTPL}`);