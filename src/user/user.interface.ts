import {Role} from './user.enum'
 export interface User {
	name: string;
	email: string;
	firstName: string;
	lastName:string;
    phonenumber:string;
	username: string;
	password:string;
    role:Role;
    address:string


}