import { DecimalPipe } from "@angular/common";

export interface Employee {
    id: string;
    name: string;
    dateOfBirth: Date;
    married: boolean;
    phone: string;
    salary: DecimalPipe;
}
