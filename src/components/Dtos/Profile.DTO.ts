export class ProfileUpdateDTO {
    name: string;
    email: string;
    photoURL: string;
    updatedAt: Date;
    constructor(name: string, email: string, photoURL: string, updatedAt: Date) {
        this.name = name;
        this.email = email;
        this.photoURL = photoURL;
        this.updatedAt = updatedAt;
    }
}