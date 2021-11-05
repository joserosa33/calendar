export class StaffModel {
    public firstName: String;
    public lastName: String;

    constructor({firstName, lastName}: StaffModel) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}