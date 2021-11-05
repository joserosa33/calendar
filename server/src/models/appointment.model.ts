export class AppointmentModel {
    public name: String;
    public start: Date;
    public end: Date;
    public client: String;
    public staff: String;
    public notes: String;

    constructor({name, start, end, client, staff, notes}: AppointmentModel) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.client = client;
        this.staff = staff;
        this.notes = notes;
    }
}