class ErrorHandler extends Error{
    public statusCode :number;

    constructor(message: string, statusCode:number){
        super(message) //This passes the message to the native Error class
        this.statusCode = statusCode; // This manually attaches the 404 or 400

        // This ensures the error stack trace points to the right line of code
        if((Error as any).captureStackTrace){
            (Error as any).captureStackTrace(this, this.constructor);
        }
        // Set the prototype explicitly (Important when extending built-in classes in TS)
        Object.setPrototypeOf(this, ErrorHandler.prototype);
    }
}

export default ErrorHandler;