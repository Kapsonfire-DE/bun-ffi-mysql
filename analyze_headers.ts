import {exec} from 'bun-utilities/spawn'


if (process.argv.length < 3) {
    console.error('no input file');
    process.exit(0);
}


let ast = exec(['clang', '-cc1', '-ast-dump=json', process.argv[process.argv.length - 1]]);
let json = JSON.parse(ast.stdout);


let m;
let ffiLoadObj = {};

const FFITypeMatcher = {
    "char *": 'FFIType.cstring',
    "const char *": 'FFIType.cstring',
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

json.inner.forEach(defC => {
    if (defC.kind !== 'FunctionDecl') return;


    let signature = defC.type.qualType;
    let funcName = defC.name;


    let splitInd = signature.indexOf('(');
    m = [
        signature.substring(0, splitInd),
        signature.substring(splitInd + 1, signature.length - 1)
    ];


    let [returnType, args] = m;
    returnType = returnType.trim();
    args = args.split(',').map(a => a.trim()).filter(str => str != 'void').map(typeStr => {
        return FFITypeMatcher[typeStr] ?? 'FFIType.ptr';
    });

    ffiLoadObj[funcName] = {
        returns: FFITypeMatcher[returnType] ?? 'FFIType.ptr',
        args
    };





})


let jsonTPL = JSON.stringify(ffiLoadObj, null, 2);
const regexUnwrap = /"(FFIType\..*?)"/gms;
jsonTPL = jsonTPL.replace(regexUnwrap, '$1');

console.log(`import { FFIType } from "bun:ffi";

export default ${jsonTPL}`);