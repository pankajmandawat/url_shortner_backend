export function handlerError(message, statusCode) {
    let error = {"error": {"message": message, "status": statusCode}}
    return error;
}

export function handlerSuccess(message, statusCode) {
    let success = {"success": {"message": message, "status": statusCode}}
    return success;
}

export const INVALID_INPUT_EXCEPTION = "Invalid Input Url.  Empty/Null values not allowed for this field";
export const INTERNAL_SERVER_ERROR = "Internal Servier Error";