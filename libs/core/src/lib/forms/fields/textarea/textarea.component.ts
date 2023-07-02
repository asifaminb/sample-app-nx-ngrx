import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Field } from '../../+state/forms.interfaces';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-textarea',
  standalone: true,
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}
