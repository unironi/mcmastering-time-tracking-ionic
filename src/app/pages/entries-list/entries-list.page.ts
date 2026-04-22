import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFabButton, IonFab, IonItemOption, IonItemOptions, IonLabel, IonItem, IonItemSliding, IonList, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { Entry, SupabaseService } from '@app/services/supabase';
import { NewEntryModalComponent } from '@app/components/new-entry-modal/new-entry-modal.component';
import { addIcons } from 'ionicons';
import { add, trash, logOut } from 'ionicons/icons';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.page.html',
  styleUrls: ['./entries-list.page.scss'],
  standalone: true,
  imports: [AsyncPipe, IonFabButton, IonFab, IonItemOption, IonItemOptions, IonLabel, IonItem, IonItemSliding, IonList, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class EntriesListPage implements OnInit {

  entries$ = this.supabaseService.entries;
  
  constructor(private supabaseService: SupabaseService, private modalCtrl: ModalController) {
    addIcons({ add, trash, logOut });
   }

  ngOnInit() {}

  async createEntry() {
    const modal = await this.modalCtrl.create({
      component: NewEntryModalComponent
    });
    
    modal.present();
    
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
    }
  }

  delete(item: Entry) {
    this.supabaseService.removeEntry(item.id);
  }

  signOut() {
    this.supabaseService.signOut();
  }

}
