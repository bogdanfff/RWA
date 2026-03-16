import { Validators } from "@angular/forms";
import { Observable } from "rxjs";

type FieldType = 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'select';
type optionType = {id:number,val:string}
export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    validators?: any[];
    options?: { label: string; value: any }[]; // optional static options
    selectValue?: 'id'|'val',
    // fetchOptions?: () => Observable<{ label: string; value: any }[]>; // for async dropdown
    dropDown?: Observable<optionType[]>
}

interface FormSchema {
    [entity: string]: FormField[];
}

