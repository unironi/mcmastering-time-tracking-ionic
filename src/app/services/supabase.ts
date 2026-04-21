import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  private _entries: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);

      if (event == 'SIGNED_IN') {
        this._currentUser.next(session?.user);
        this.loadEntries();
        this.handleEntriesChange();
      } else {
        this._currentUser.next(false);
      }
    })
  }

  async signUp(credentials: { email: any, password: any }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signUp(credentials); 
      if (error) reject(error);
      else resolve(data);
    })
  }

  async signIn(credentials: { email: any, password: any }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signInWithPassword(credentials); 
      if (error) reject(error);
      else resolve(data);
    })
  }

  async signOut() {
    await this.supabase.auth.signOut();

    this.supabase.removeAllChannels(); // remove's all of client's subscriptions

    this.router.navigateByUrl('/');
  }

  get entries() {
    return this._entries.asObservable();
  }

  async loadEntries() {
    const query = await this.supabase.from('entries').select('*');
    console.log(query.data);
    this._entries.next(query.data);
  }

  async addEntry(task: string) {
    const user_id = await this.supabase.auth.getUser();

    if (user_id.error) {
      console.log(user_id.error);
      return;
    }

    const newEntry = {
      user_id: user_id.data.user?.id,
      task
    }

    const result = await this.supabase.from('entries').insert(newEntry);
  }

  async removeEntry(id: any) {
    await this.supabase.from('entries').delete().match(id);
  }

  async updateEntry(id: any, hours: number) {
    await this.supabase.from('entries').update({ hours }).match(id);
  }
  
  handleEntriesChange() {

  }
  
}
