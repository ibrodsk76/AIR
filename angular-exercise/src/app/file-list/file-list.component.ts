import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  folderList: any = {folder:'', subfolders: [], files: []};
  // {
  //   folder: "root",
  //   subfolders: [
  //   {
  //     folder: "dir1",
  //     subfolders: [
  //      {folder: "dirx",
  //       subfolders: [],
  //       files: [         
  //         {file:"file.ext",
  //           path: "root/dir1/dirx/file.ext"}, 
  //         {file:"file1.ext",
  //         path: "root/dir1/dirx/file1.ext"}
  //       ]}],
  //     files: [
  //       {file: "file2.ext",
  //       path: "root/dir1/file2.ext"}
  //     ]
  //   },
  //   {
  //     folder: "dir2",
  //     subfolders: [
  //       {
  //         folder: "diry",
  //         subfolders: [],
  //         files: [{file: "file3.exe",
  //                   path: "root/dir2/diry/file3.ext"}]
  //       },
  //       {
  //         folder: "dirz",
  //         subfolders: [],
  //         files: [
  //           {
  //             file: "file4.exe",
  //             path: "root/dir2/dirz/file4.ext"
  //           }
  //         ]
  //       },
  //       {
  //         folder: "dirempty",
  //         subfolders: [],
  //         files: []
  //       }
  //     ],
  //     files:[]
  //   },
  //   ],
  //   files: [
  //     {
  //       file: "file10.ext",
  //       path: "root/file10.ext"
  //     }
  //   ]
  // };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FileListComponent>) { 
      console.log(data);
  }

  ngOnInit(): void {
    this.buildTree()
  }

  buildTree()
  {
    if (!this.data)
      return;
    for (var i=0; i < this.data.fileList.length; i++)
    {
      this.folderList = this.buildNode(this.data.fileList[i].path, this.folderList, this.data.fileList[i].path);      
    }
  }

  buildNode(file: any, currentNode: any, fullpath: string) : any
  {
    var ind = file.indexOf('/');
    if (ind !== -1)
    {
      var foldername = file.substring(0, ind);
      if (foldername === currentNode.folder) {        
        var ind1 = file.substring(ind+1).indexOf('/');
        if (ind1 !== -1)
        {
          var subfoldername = file.substring(ind+1,ind+1+ind1);
          var subfolders = currentNode.subfolders.filter(function(f: any) { return f.folder === subfoldername; });
          if (subfolders.length == 0)
          {
            var subfolder = {folder: '',subfolders:[] as any,files:[] as any};
            currentNode.subfolders.push(this.buildNode(file.substring(ind+1), subfolder,fullpath));
          }
          else{
            this.buildNode(file.substring(ind+1), subfolders[0], fullpath);
          }
        }
        else
        {
          if (file.substring(ind+1) !== "")
            currentNode.files.push({file: file.substring(ind+1), path: fullpath});
          return currentNode;
        }
      }
      else
      {
        currentNode.folder = foldername;
 
        if (file.substring(ind+1).indexOf('/') !== -1)
        {
          var newNode = {folder:'', subfolders: [], files: []}
          currentNode.subfolders.push(this.buildNode(file.substring(ind+1), newNode, fullpath));
        }  
        else{
          if (file.substring(ind+1) !== "")
            currentNode.files.push({file: file.substring(ind+1), path: fullpath});
          return currentNode;
        }
      }
    }
    else
    {
      currentNode.files.push({file: file, path: fullpath});
      return currentNode;
    }
    return currentNode;
  }

  selectedFile: any;
  updateSelectedFile(file: any)
  {
    this.selectedFile = file;
  }

  submit() {
    this.dialogRef.close(this.selectedFile);
  }
  cancel()
  {
    console.log("Cancel");
    this.dialogRef.close();
  }
}