import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { ColorEvent } from 'ngx-color';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

declare function startUploadNumber(data1,data2): any;

@Component({
  selector: 'app-manage_data',
  templateUrl: './manage_data.component.html',
  styleUrls: ['./manage_data.component.css']
})



export class Manage_dataComponent implements OnInit {
 

  constructor(private http:HttpClient,private route:ActivatedRoute,private todoServcie:TodoService, ) { 
    
  }
  public todoContactText:ContactgText[];
  id:any;
  sub:any;
  public colorPicker:any;
  public pupn_unixtime_image:any;
  public configArray0:uploadNumber[] =  [{ 
    limit_upload: 1,
    pathLoading :'http://dmbox.xyz/nubshare/assets/graphic/icon/loading/05.gif',
    height_icon_loading :32,
    width_icon_loading :32,
    bg_icon : 'http://dmbox.xyz/nubshare/assets/graphic/icon/take_photo_5-1.png',
    height_icon_show :50,
    width_icon_show :50,
    pathFile :'upload/file/',
   //pathMini :'upload/mini/',
    height_image_show :120,
    width_image_show :120,
    displayStatus :'block',
    showThumbnail :'file',
  }];
  ngOnInit() {
    //call service
    
    this.todoServcie.getSettingSite('1').subscribe(data=>{
      
      var objArray = JSON.parse(data.data['ws_code']);
      $("[name=color_site]").val(objArray.colorSite);
      $("[class=textSite]").html(objArray.nameSite);
      $("[name=NameSite]").val(objArray.nameSite);
      this.NameSite = objArray.nameSite;
      this.colorPicker = objArray.colorSite;
      $('.header_site').css("background",objArray.colorSite);
      this.todoServcie.getImage(objArray.image_unique_id).subscribe(data=>{
        if(data!=null&&data.success==true){
          this.adjust_page_image_name = data.data["pupn_image_filename"];
          this.adjust_page_image_type = data.data["pupn_image_type"];
        }
      });
      // this.adjust_page_image_name = objArray.adjust_page_image_name;
      // this.adjust_page_image_type = objArray.adjust_page_image_type;
      this.pupn_unixtime_image = objArray.image_unique_id;
      //debugger;
      $("[name=pupn_unixtime_image]").val(objArray.image_unique_id);
      startUploadNumber(".uploadImage",this.configArray0[0]);
    });
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
      
    });
  }

  rederContent(){
    alert();
  }

  handleChange($event: ColorEvent) {
    this.colorPicker = $event.color.hex;
    $("[name=color_site]").val(this.colorPicker);
    $('.header_site').css("background",this.colorPicker);
    console.log($event.color);
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  }

  // saveSetting(data,data_id) {
  //   var link_like = $(data.currentTarget).attr("id");
  //   this.todoServcie.getDataLike(link_like,data_id).subscribe(data2=>{
  //     var data_id = data2.data_id;
  //     var string_array_user_like = JSON.stringify(data2.data_user_like);
  //     this.todoServcie.saveSetting(data_id,string_array_user_like,'1').subscribe(data3=>{

  //     });
  //   });
  // }

  public type_site:any = '1';
  public NameSite:any;
  public color_site:any;
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  onSubmit(form: NgForm): void {
    form.value.code = JSON.stringify({colorSite:this.colorPicker,nameSite:form.value.NameSite});
    // this.onUpload().subscribe(res=>{
      // if($("image_array_name"))){
      //   this.adjust_page_image_name = res.name;
      // }
      // if(res.type!=null&&res.type!=''){
      //   this.adjust_page_image_type = res.type;
      // }
      form.value.code = JSON.stringify({colorSite:this.colorPicker,nameSite:form.value.NameSite,image_unique_id:$("[name=pupn_unixtime_image]").val()});
      // form.value.adjust_page_image_name = this.adjust_page_image_name;
      // form.value.adjust_page_image_type = this.adjust_page_image_type;
     // form.value.adjust_page_unique_id = $("[name=pupn_unixtime_image]").val();
      this.todoServcie.saveSetting(form.value,'1').subscribe(data3=>{
        window.location.reload();
      });
    // });
    
    
  }

  public text_site:any;
  previewSetting(){
    this.text_site = $("#NameSite").val();
    $('.Text-site').html(this.text_site);
    $(".header-area").css('background',this.colorPicker.hex)
  }
  public textNameSite:string;
  renderText(){
     this.textNameSite = $("[name=NameSite]").val().toString();
    $('.textSite').html(this.textNameSite);
   
  }

  
  selectedFile:File = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }
  private local__ = "http://dmbox.xyz/nubshare";
  onUpload(){
    
    const fd = new FormData();
    debugger;
    if(this.selectedFile!=null){
      fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('pathFile', '/upload/files/');
      return this.http.post<imageData>(this.local__+'/api/dataAdjustUpload.php',fd)
    }else{
      return this.http.post<imageData>(this.local__+'/api/dataAdjustUpload.php',fd)
    }
    
  }

}


interface imageData{
  name:string,
  type:string
}

interface ContactgText {
  contact_text_id :string;
  contact_text_title :string;
  contact_text_detail :string;
  contact_text_sort :string;
  contact_text_hide :string;
  contact_text_delete :string;
  contact_text_create_by :string;
  contact_text_update_by :string;
  contact_text_create_date :string;
  contact_text_update_date :string;
}

interface uploadNumber {
  limit_upload :number;
  pathLoading :string;
  height_icon_loading :number;
  width_icon_loading :number;
  bg_icon :string;
  height_icon_show :number;
  width_icon_show :number;
  pathFile :string;
 // pathMini:string;
  height_image_show :number;
  width_image_show :number;
  displayStatus :string;
  showThumbnail :string;
}
