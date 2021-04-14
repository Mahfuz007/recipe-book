export class User{
    constructor(
        public email:string, 
        public userId:string,
        private _token: string,
        private _tokenExpiration: Date
    ){}

    getToken(){
        if(!this._token || new Date() > this._tokenExpiration){
            return null;
        }
        return this._token;
    }
}