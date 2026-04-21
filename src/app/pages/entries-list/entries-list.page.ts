import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from '@app/services/supabase';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.page.html',
  styleUrls: ['./entries-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EntriesListPage implements OnInit {

  entries = this.supabaseService.entries;
  
  constructor(private supabaseService: SupabaseService) { }

  ngOnInit() {
  }

}
