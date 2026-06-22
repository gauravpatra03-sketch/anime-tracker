import { Component } from '@angular/core';
import {
  Toast,
  ToastService
} from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl:
    './toast.component.html',
  styleUrls:
    ['./toast.component.css']
})
export class ToastComponent {

  toast:
    Toast | null = null;

  constructor(
    private toastService:
      ToastService
  ) {

    this.toastService.toast$
      .subscribe(
        toast => {

          this.toast =
            toast;
        }
      );
  }
}
