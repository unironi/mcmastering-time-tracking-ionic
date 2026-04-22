import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonFooter,
  ModalController
} from '@ionic/angular/standalone';
import { SupabaseService } from '@app/services/supabase';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-new-entry-modal',
  templateUrl: 'new-entry-modal.component.html',
  imports: [IonFooter, IonSelect, IonSelectOption, AsyncPipe, FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, IonLabel],
  standalone: true
})
export class NewEntryModalComponent implements OnInit{
  categories$ = this.supabaseService.categories;
  roles$ = this.supabaseService.roles;


  category!: string; // once i'm able to properly grab categories and roles, i can initialize these to the first item in the arrays
  role!: string;
  hours: number = 0;


  constructor(private modalCtrl: ModalController, private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.supabaseService.loadCategories();
    this.supabaseService.loadRoles();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss([this.category, this.role, this.hours], 'confirm');
  }
}