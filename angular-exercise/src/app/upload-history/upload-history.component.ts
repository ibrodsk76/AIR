import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-history',
  templateUrl: './upload-history.component.html',
  styleUrls: ['./upload-history.component.scss']
})
export class UploadHistoryComponent implements OnInit {
  uploadHistory: any = [];

  constructor() { }

  ngOnInit(): void {
    const value = localStorage.getItem('uploadHistory');
    if (value)
      this.uploadHistory = JSON.parse(value);
  }

  clear() {
    localStorage.removeItem('uploadHistory');
    this.uploadHistory = [];
  }

}
