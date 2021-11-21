import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FileListComponent } from '../file-list/file-list.component';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  fileList: any = [];
  fileInputField = null;
  fileListDialogRef: MatDialogRef<FileListComponent>;
  selectedFile: any = {file:'', path:''};
  isUploading: boolean = false;
  uploadComplete:boolean = false;

  handleFileInput(target: any): void {
    //this.fileToUpload = target.files.item(0);
    this.fileInputField = target;
  }
  constructor(public dialog: MatDialog, private httpClient: HttpClient) { }

  getFileList(){
    return this.httpClient.get('assets/filelist.json');
  }

  openDialog() {
    this.uploadComplete = false;
    this.fileListDialogRef = this.dialog.open(FileListComponent, {   
      data: this.fileList
    });

    this.fileListDialogRef.afterClosed().pipe().subscribe(file => {
      if (file)
        this.selectedFile = file;
    })
  }

  ngOnInit(): void {
    this.getFileList().subscribe((files) => {
    //  console.log(files);
      this.fileList = files;
      
    });
  }

  upload(): void {
    this.isUploading = true;
    setTimeout(() => {
      this.isUploading = false;
      this.uploadComplete = true;
      this.selectedFile = {file:'', path:''};
    }, 5000);
  }
}
