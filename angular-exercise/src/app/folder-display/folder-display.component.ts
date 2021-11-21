import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-folder-display',
  templateUrl: './folder-display.component.html',
  styleUrls: ['./folder-display.component.scss']
})
export class FolderDisplayComponent implements OnInit {

  @Input() folderList: any;
  @Input() selectedFile: any;
  @Output() mySelectedFile = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.folderList);
  }

  onSelect(file: any): void {
    this.mySelectedFile.emit(file);
  }

  updateSelectedFile(file: any)
  {
    this.mySelectedFile.emit(file);
  }

  getSelected(path: any){
    if (!this.selectedFile)
      return "";
    if (path === this.selectedFile.path)
      return "selected";
    else
      return "";
  }

}
