import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { PaymentVoucher } from '../../models/payment-voucher.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../../../../shared/components/interfaces/form-component.interface';
import { CommonModule } from '@angular/common';
import { AgentSelectorComponent } from '../../../../shared/components/selectors/agent-selector/agent-selector.component';

@Component({
  selector: 'app-payment-voucher-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-voucher-modal.component.html',
  styleUrl: './payment-voucher-modal.component.scss',
})
export class PaymentVoucherModalComponent
  extends FormComponent
  implements OnInit
{
  // Overrides

  override get value() {
    return this.voucher;
  }

  form: FormGroup;

  modalRef = inject(MatDialogRef<PaymentVoucherModalComponent>);

  // Component
  @Input() voucher?: PaymentVoucher;

  @Input() title: string = 'Payment Voucher';

  cdr = inject(ChangeDetectorRef);

  constructor(fb: FormBuilder, private dialog: MatDialog) {
    super();
    this.form = fb.group({
      agent: [undefined, Validators.required],
      date: [undefined, Validators.required],
      paymentMethod: ['', Validators.required],
      description: [''],
      bankName: [''],
      chequeDueDate: [undefined],
      amount: [undefined, [Validators.required, Validators.min(0)]],
    });
  }

  selectAgent() {
    const ref = this.dialog.open(AgentSelectorComponent);
    ref.afterClosed().subscribe((val) => {
      if (val) {
        this.form.controls['agent'].setValue(val);
      }
    });
  }

  ngOnInit(): void {
    if (this.voucher) {
      this.form.patchValue({
        agent: this.voucher.agent,
        date: new Date(this.voucher.date),
        paymentMethod: this.voucher.paymentMethod,
        description: this.voucher.description,
        bankName: this.voucher.bankName,
        chequeDueDate: this.voucher.chequeDueDate
          ? new Date(this.voucher.chequeDueDate)
          : undefined,
        amount: this.voucher.amount,
      });
      this.cdr.detectChanges();
    }
  }

}
