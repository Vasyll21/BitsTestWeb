import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent {
  file: File | undefined = undefined;

  constructor(private employeeService: EmployeeService) { }

  handleSelectFile(event: Event) {
    const component: any = event.target;

    if (!component?.files?.length) {
      return;
    }

    this.file = component.files[0];
  }

  handleUploadFile() {
    if (!this.file) {
      alert(`You must choose a file first!`);
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file, this.file.name);

    this.employeeService.uploadFile(formData)
    .subscribe(
      error => console.log(error)
    )

    console.log(typeof this.file);
  }
}
