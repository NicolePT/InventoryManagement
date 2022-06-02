import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ItemService} from "../services/item.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: any[]=[];
  action = 'Agregar';
  codeToDelete='';
  editCreateItemCard=false;
  editDeleteItemCard=false;
  edit=false;
  form: FormGroup;
  formDelete: FormGroup;
  id: number | undefined;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private _itemService: ItemService) {
    this.form= this.formBuilder.group({
      code:['',[Validators.required,Validators.maxLength(7), Validators.minLength(7)]],
      name:['',Validators.required],
      description:['',Validators.required],
      quantity:['',Validators.required],
    })
    this.formDelete= this.formBuilder.group({
      code:['',[Validators.required,Validators.maxLength(7), Validators.minLength(7)]]
    })
  }

  ngOnInit(): void {
    this.getItems();
  }
  getItems(){
    this._itemService.getAllItems().subscribe(data=>{
      this.items=data;
      console.log(this.items);
    })
  }
  createItem(){
    const item: any = {
      code: this.form.get('code')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      quantity: this.form.get('quantity')?.value,
    }
    if(this.id==undefined){
      this._itemService.createItem(item).subscribe(data => {
        this.toastr.success('El articulo fue creado satisfactoriamente','Articulo registrado');
        this.getItems();
        this.form.reset();
      })
    } else {
      item.id= this.id;
      this._itemService.updateItem(this.id,item).subscribe( data => {
        this.action='Modificar';
        this.toastr.info('El articulo fue actualizada con exito', 'Articulo actualizada')
        this.getItems();
        this.form.reset();
        this.id=undefined;
      })
    }
    this.cancelEditItem();
  }
  deleteItem(code:string){
    this._itemService.deleteItemByCode(code).subscribe( data => {
      this.toastr.error('El articulo fue eliminado con exito', 'Articulo eliminado');
      this.getItems();
      this.formDelete.reset();
    })
    this.cancelEditItem();
  }
  updateItem(item:any){
    this.action='Editar';
    this.showCreateCard();
    this.id=item.id;
    this.form.patchValue({
      code: item.code,
      name: item.name,
      description: item.description,
      quantity: item.quantity
    })
  }
  cancelEditItem(){
    this.edit=false;
    this.editCreateItemCard=false;
    this.editDeleteItemCard=false;
  }
  showCreateCard(){
    this.edit=true;
    this.editDeleteItemCard=false;
    this.editCreateItemCard=true;
  }
  showDeleteCard(code: string){
    this.codeToDelete=code;
    this.edit=true;
    this.editCreateItemCard=false;
    this.editDeleteItemCard=true;
  }
}
