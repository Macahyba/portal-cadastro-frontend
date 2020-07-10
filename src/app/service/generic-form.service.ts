import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

export class GenericFormService {

  constructor(
    protected _fb: FormBuilder,
    protected _service,
    protected _router: Router
  ){ }

  operacao: string = "inserir";
  bar: boolean;
  barFetch: boolean;
  error: string;
  warningMessage: string;
  path: string;

  selectControl = this._fb.control('');

  success: boolean = false;
  failure: boolean = false;
  warning: boolean = false;

  isInserir(): boolean { return this.operacao === 'inserir' }
  isAtualizar(): boolean { return this.operacao === 'atualizar' }

  isSuccess(): boolean { return this.success }
  isFailure(): boolean { return this.failure }
  isWarning(): boolean { return this.warning }

  showSuccess() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

  showFailure(error) {
    this.error = error;
    this.failure = true;
    setTimeout(() => {
      this.failure = false;
    }, 3000);
  }

  showWarning(warning) {
    this.warningMessage = warning
    this.warning = true;
    setTimeout(() => {
      this.warning = false;
    }, 3000);
  }

  radioSelect(form){
    if (this.isInserir()){
      form.reset();
      this.selectControl.setValue("")
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }
  }

  redirectTo(uri:string){
    setTimeout(() => {
      this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this._router.navigate([uri]));
    }, 3000)
  }


  patchForm(form) {

    this.bar = true;

    this._service.patch(form)
    .pipe( finalize(() => this.bar = false ))
    .subscribe(
      ((message) => {
        if(message.warning) this.showWarning(message.warning);
        this.showSuccess();
        this.redirectTo(this.path);
      }),
      ((error) => {
        console.error(error);
        this.showFailure(error);
        this.bar = false;
      })
    )
  }

  postForm(form){

    this.bar = true;

    this._service.post(form)
    .pipe( finalize(() => this.bar = false ))
    .subscribe(
      ((message) => {
        if(message.warning) this.showWarning(message.warning);
        this.showSuccess();
        this.redirectTo(this.path);
      }),
      ((error) => {
        console.error(error);
        this.showFailure(error);
        this.bar = false;
      })
    )
  }

}
