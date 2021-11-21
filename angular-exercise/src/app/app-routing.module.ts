import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component'
import { UploadHistoryComponent } from './upload-history/upload-history.component';
import { FileListComponent } from './file-list/file-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadFileComponent },
  { path: 'history', component: UploadHistoryComponent },
{ path: 'file-list', component: FileListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
