export class User {
    constructor (
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date
    ) {}
    
    // The token property is defined as a getter, which means it acts like a method but is accessed as a property. 
    // This allows for encapsulated logic to determine what value is returned when token is accessed.
    
    // The getter checks if _tokenExpirationDate exists and if the current date and time is before the _tokenExpirationDate. 
    // This logic ensures that the token is considered valid only for its defined lifetime.
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }

    // If _tokenExpirationDate is not set or the current time is past the expiration date, the getter returns null, indicating that there is no valid token.
    // If the current time is before the _tokenExpirationDate, the getter returns the value of _token, indicating that the token is currently valid.
}