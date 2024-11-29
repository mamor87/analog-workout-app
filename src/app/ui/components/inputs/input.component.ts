import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

export const HIDE_COMMAND_ICON_BUTTON = 'SHOW_HIDE';

export interface InputIcon {
  name: string;
  isButton: boolean;
}

@Component({
  selector: 'ui-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `<!-- prettier-ignore -->
    <mat-form-field [id]="id + '_field'" [style.width]="'100%'">
    @if (label) {
      <mat-label [id]="id + '_label'">{{ label }}</mat-label>
    }
    <input
      #input
      matInput
      [id]="id + '_input'"
      [formControl]="formControl"
      (keyup)="refreshValue()"
      (change)="refreshValue()"
      [type]="hideInput ? 'password' : 'text'"
    />
    <span matPrefix>
      @if (iconsStart?.length) {
        @for (icon of iconsBefore; track icon.name) {
          @if (icon.isButton) {
            <button mat-icon-button (click)="clickOnIcon(icon)">
              <mat-icon [fontIcon]="icon.name"></mat-icon>
            </button>
          } @else {
            <mat-icon [fontIcon]="icon.name"></mat-icon>
          }
        }
      }
    </span>
    <span matSuffix>
      @if (iconsEnd?.length) {
        @for (icon of iconsAfter; track icon.name) {
          @if (icon.isButton) {
            <button mat-icon-button (click)="clickOnIcon(icon)">
              <mat-icon [fontIcon]="icon.name"></mat-icon>
            </button>
          } @else {
            <mat-icon [fontIcon]="icon.name"></mat-icon>
          }
        }
      }
    </span>
    @if (hint) {
      <mat-hint [id]="id + '_hint'">{{ hint }}</mat-hint>
    }
    @if (this.formControlErrors.length) {
      @for (error of this.formControlErrors; track error) {
        <mat-error>{{error}}</mat-error>
      }
    }
  </mat-form-field>`,
})
export class InputComponent implements OnInit, OnDestroy {
  private formControlChangeSubscription: Subscription | null = null;

  @Input() visibleIcon = 'visibility';
  @Input() invisibleIcon = 'visibility_off';
  @Input() id = crypto.randomUUID();
  @Input() label = '';
  @Input() hint = '';
  @Input() validator: ValidatorFn | null = null;
  @Input() value = '';
  @Input() hideInput = false;
  @Input() iconsStart: InputIcon[] = [];
  @Input() iconsEnd: InputIcon[] = [];

  @Output() valueChange = new EventEmitter<string>();
  @Output() iconClick = new EventEmitter<InputIcon>();

  @ViewChild('input') input: ElementRef | null = null;

  formControl = new FormControl(this.value);

  get iconsBefore(): InputIcon[] {
    return this.iconsStart.map(this.mapInternalCommands.bind(this));
  }

  get iconsAfter(): InputIcon[] {
    return this.iconsEnd.map(this.mapInternalCommands.bind(this));
  }

  get formControlErrors() {
    const result = new Array<string>();
    const errorKeys = Object.keys(this.formControl?.errors ?? {}) ?? [];
    for (const errorKey of errorKeys) {
      if (!this.formControl?.errors || !this.formControl?.errors[errorKey]) {
        continue;
      }
      result.push(this.formControl.errors[errorKey]);
    }
    return result;
  }

  ngOnInit(): void {
    this.formControlChangeSubscription =
      this.formControl.valueChanges.subscribe((v) =>
        this.valueChange.emit(v ?? '')
      );
  }

  ngOnDestroy(): void {
    this.formControlChangeSubscription?.unsubscribe();
  }

  refreshValue() {
    if (
      this.input?.nativeElement?.value &&
      this.input.nativeElement.value !== this.value
    ) {
      this.formControl.setValue(this.input.nativeElement.value);
      if (this.validator) {
        const errors = this.validator(this.formControl);
        if (errors) {
          this.formControl.setErrors(errors);
        }
      }
    }
  }

  clickOnIcon(icon: InputIcon) {
    switch (icon.name) {
      case this.visibleIcon:
        this.hideInput = true;
        this.changeVisibility(this.invisibleIcon);
        break;
      case this.invisibleIcon:
        this.hideInput = false;
        this.changeVisibility(this.visibleIcon);
        break;
    }
    this.iconClick.emit(icon);
  }

  private changeVisibility(targetVisibility: string) {
    const targetStartIndexes = this.iconsStart.reduce(
      this.iconsVisibilityToIndexReducer(targetVisibility).bind(this),
      []
    );
    const targetEndIndexes = this.iconsEnd.reduce(
      this.iconsVisibilityToIndexReducer(targetVisibility).bind(this),
      []
    );

    let res = [...this.iconsStart];
    for (const targetStartIndex of targetStartIndexes) {
      res = this.replaceIcon(res, targetStartIndex, targetVisibility);
    }
    this.iconsStart = [...res];

    res = [...this.iconsEnd];
    for (const targetEndIndex of targetEndIndexes) {
      res = this.replaceIcon(res, targetEndIndex, targetVisibility);
    }
    this.iconsEnd = [...res];
  }

  private iconsVisibilityToIndexReducer(
    targetVisibility: string
  ): (prev: number[], curr: InputIcon, index: number) => number[] {
    return (prev: number[], curr: InputIcon, index: number) => {
      if (
        curr.name ===
        (targetVisibility === this.visibleIcon
          ? this.invisibleIcon
          : this.visibleIcon)
      ) {
        prev.push(index);
      }
      return prev;
    };
  }

  private replaceIcon(
    target: InputIcon[],
    index: number,
    targetVisibility: string
  ) {
    const result = [...target];
    result[index] = {
      name: targetVisibility,
      isButton: true,
    };
    return result;
  }

  private mapInternalCommands(icon: InputIcon): InputIcon {
    if (icon.name !== HIDE_COMMAND_ICON_BUTTON) {
      return icon;
    }
    return {
      name: this.hideInput ? this.invisibleIcon : this.visibleIcon,
      isButton: true,
    };
  }
}
