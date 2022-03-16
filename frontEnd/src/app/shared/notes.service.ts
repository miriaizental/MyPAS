import { Injectable } from "@angular/core";
import { Note } from "./note.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class NotesService {
  notes: Note[] = new Array<Note>();
  id:number = 1;

  constructor(private http: HttpClient) {
    this.getAll().subscribe(res =>{
      this.notes= new Array<Note>();
      for(const i in res){
        let note = new Note();
        note.body = res[i].body;
        note.title= res[i].title;
        note.id= res[i].id;
        this.notes.push(note);
      }
    });
  }
  

  getAll() : Observable<Object> {
    return this.http.get('http://localhost:4000/api/notes');
  }

  get(id: number) {
    for(const i in this.notes){
      if(this.notes[i].id.toString() == id.toString())
        return this.notes[i];
    }
    return new Note();
  }

  getId(note: Note) {
    return note.id;
  }

  add(note: Note) {
    note.id = this.id;
    this.id++;
    this.http.post('http://localhost:4000/api/addnote1', {note: note}).subscribe(res =>{
      console.log(res);
      this.notes.push(note);
    });
  }

  update(id: number, title: string, body: string) {
    debugger;
    const note = this.get(id);
    note.title = title;
    note.body = body;
    this.http.put('http://localhost:4000/api/editnote', {note: note}).subscribe(res =>{
      debugger;
      console.log(res);
      this.getAll();
    });
  }

  delete(noteId: number) {
    //this.notes.splice(id, 1);
    return this.http.delete(`http://localhost:4000/api/deleteNote/`+ noteId);
  }
}
