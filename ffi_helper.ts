import {CString, FFIType, toArrayBuffer} from "bun:ffi";

export function ffiTypeToByteLength(type) {
    switch (type) {
        case FFIType.u8:
        case FFIType.i8:
        case FFIType.char:
        case FFIType.bool:
            return 1;
        case FFIType.u16:
        case FFIType.i16:
            return 2;
        case FFIType.u32:
        case FFIType.i32:
        case FFIType.f32:
            return 4;
        default:
            return 8;
    }
}



export function ptrToStructFunctionCreator(fields) : Function {
    let funcBody = 'return {\n';
    let ind = 0;

    fields.forEach(field => {
        let len = ffiTypeToByteLength(field.type);
        if (field.type === FFIType.cstring) {
            funcBody += `${field.name}: (new CString(buff.getFloat64(${ind}, true))),\n`
        } else if (field.type === FFIType.ptr) {
            funcBody += `${field.name}: buff.getFloat64(${ind}, true),\n`
        } else if (field.type === FFIType.i8) {
            funcBody += `${field.name}: buff.getInt8(${ind}, true),\n`
        } else if (field.type === FFIType.u8) {
            funcBody += `${field.name}: buff.getUint8(${ind}, true),\n`
        } else if (field.type === FFIType.i16) {
            funcBody += `${field.name}: buff.getInt16(${ind}, true),\n`
        } else if (field.type === FFIType.u16) {
            funcBody += `${field.name}: buff.getUint16(${ind}, true),\n`
        } else if (field.type === FFIType.u64) {
            funcBody += `${field.name}: buff.getBigUint64(${ind}, true),\n`
        } else if (field.type === FFIType.i64) {
            funcBody += `${field.name}: buff.getBigInt64(${ind}, true),\n`
        } else if (field.type === FFIType.i32) {
            funcBody += `${field.name}: buff.getInt32(${ind}, true),\n`
        } else if (field.type === FFIType.u32) {
            funcBody += `${field.name}: buff.getUint32(${ind}, true),\n`
        } else if (field.type === FFIType.f64) {
            funcBody += `${field.name}: buff.getFloat64(${ind}, true),\n`
        } else if (field.type === FFIType.f32) {
            funcBody += `${field.name}: buff.getFloat32(${ind}, true),\n`
        } else if (field.type === FFIType.char) {
            funcBody += `${field.name}: String.fromCharCode(buff.getUint8(${ind})),\n`
        } else {
            funcBody += `${field.name}: null`
        }


        ind += len;
    })

    funcBody += '};'

    funcBody = `const buff = new DataView(toArrayBuffer(ptr, 0, ${ind}));\n\n`+funcBody;

    let fun = new Function('ptr', 'toArrayBuffer', 'CString', funcBody);
    return (ptr) => { return fun(ptr, toArrayBuffer, CString) };
}

export function ptrToStruct(ptr: number, fields: { name: string, type: FFIType }[]) {




    let obj = {};
    let totalLength = 0;
    fields.map(field => totalLength += ffiTypeToByteLength(field.type));
    let buff = new DataView(toArrayBuffer(ptr, 0, totalLength));

    let ind = 0;

    fields.forEach(field => {
        let len = ffiTypeToByteLength(field.type);
        if (field.type === FFIType.cstring) {
            let ptr = buff.getFloat64(ind, true);
            let cstring = new CString(ptr);
            obj[field.name] = cstring.toString();
        } else if (field.type === FFIType.ptr) {
            obj[field.name] = buff.getFloat64(ind, true);
        } else if (field.type === FFIType.i8) {
            obj[field.name] = buff.getInt8(ind);
        } else if (field.type === FFIType.u8) {
            obj[field.name] = buff.getUint8(ind);
        } else if (field.type === FFIType.i16) {
            obj[field.name] = buff.getInt16(ind, true);
        } else if (field.type === FFIType.u16) {
            obj[field.name] = buff.getUint16(ind, true);
        } else if (field.type === FFIType.u64) {
            let v = buff.getBigUint64(ind, true);
            obj[field.name] = (v <= BigInt(Number.MAX_SAFE_INTEGER) && v >= BigInt(Number.MIN_SAFE_INTEGER)) ? Number(v) : v;
        } else if (field.type === FFIType.i64) {
            let v = buff.getBigInt64(ind, true);
            obj[field.name] = (v <= BigInt(Number.MAX_SAFE_INTEGER) && v >= BigInt(Number.MIN_SAFE_INTEGER)) ? Number(v) : v;
        } else if (field.type === FFIType.i32) {
            obj[field.name] = buff.getInt32(ind, true)
        } else if (field.type === FFIType.u32) {
            obj[field.name] = buff.getUint32(ind, true)
        } else if (field.type === FFIType.f64) {
            obj[field.name] = buff.getFloat64(ind, true)
        } else if (field.type === FFIType.f32) {
            obj[field.name] = buff.getFloat32(ind, true)
        } else if (field.type === FFIType.char) {
            obj[field.name] = String.fromCharCode(buff.getUint8(ind))
        } else {
            obj[field.name] = null;
        }


        ind += len;
    })

    return obj;
}