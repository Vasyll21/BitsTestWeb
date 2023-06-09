import { DecimalPipe } from "@angular/common";

export interface EmployeeToSend {
    name: string;
    dateOfBirth: Date;
    married: boolean;
    phone: string;
    salary: DecimalPipe;
}
