interface Data {
    name: any,
    type: string
}

function validateType (value: any, param: Data): boolean {
    // validate string
    if (param.type === 'string') { 
        return typeof(value) === 'string'
    }
    // validate number
    if (param.type === 'number') { 
        return typeof(value) === 'number'
    }
    // validate object basic
    if (param.type === 'object') {
        return typeof(value) === 'object' && value !== null
    }
    // others
    return false;
}

// Validation of parameter existence and type (basic)
function validation (values: Object, params: Data[], abort: (error: Object) => void, next: () => void) {
    for (let param of params) {
        if (!values.hasOwnProperty(param.name)) {
            return abort({
                success: false, 
                message: 'Request invalid, missing '+param.name
            });
        }
        if (!validateType(Object(values)[param.name], param)) {
            return abort({
                success: false, 
                message: 'Request invalid, type of '+param.name+' is incorrect'
            });
        }
    }
    next();
}




export default { validation }