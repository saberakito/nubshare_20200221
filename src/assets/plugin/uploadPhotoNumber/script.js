/* <div class="uploadSpecial1" attr_table='ชื่อ table' attr_field='ชื่อ field'  attr_img='ชื่อรูปภาพ' attr_url='ที่อยู่ของรูปภาพ'></div> */
var imageArray;
var $image_id;
var attr_field = "pupn_image_filename";
var table_name  ="plugin_uploadphotonumber";
	$.fn.upload_number = function (objArray,callback){
		/* ==================== Config in javascript ==================== */
		formIdUpload 			= objArray.form_id;
		divIdListElement		= objArray.div_id;
		pathPhotoLoading 		= objArray.pathLoading;
		height_icon_loading 	= objArray.height_icon_loading;
		width_icon_loading 		= objArray.width_icon_loading;
		bg_icon 				= objArray.bg_icon;
		limit_upload 			= objArray.limit_upload;
		pathFile				= objArray.pathFile
		pathTn					= objArray.pathTn;
		pathEx					= objArray.pathEx;
		pathMini				= objArray.pathMini;
		height_image_show 		= objArray.height_image_show;
		width_image_show 		= objArray.width_image_show;
		height_resize_tn 		= objArray.height_resize_tn;
		width_resize_tn 		= objArray.width_resize_tn;
		type_resize_tn			= objArray.type_resize_tn;
		height_resize_ex 		= objArray.height_resize_ex;
		width_resize_ex 		= objArray.width_resize_ex;
		type_resize_ex			= objArray.type_resize_ex;
		height_resize_mini		= objArray.height_resize_mini;
		width_resize_mini		= objArray.width_resize_mini;
		type_resize_mini		= objArray.type_resize_mini;
		marginObject 			= objArray.marginObject;
		showThumbnail			= objArray.showThumbnail;
		input_name				= objArray.input_name;
		input_type				= objArray.input_type;
		if(objArray.image_name!=null){
			image_name 				= JSON.parse(objArray.image_name); 
		}
		if(objArray.image_field!=null){
			image_field 			= JSON.parse(objArray.image_field);
		}
		image_table 			= objArray.image_table;
		if(objArray.displayStatus!=null){
			displayStatus = objArray.displayStatus;
		}else{
			displayStatus = "block";
		}
		if(objArray.urlImage!=null&&objArray.urlImage!=""){
			bg_icon = JSON.parse(objArray.urlImage);
			//bg_icon = objArray.urlImage;
		}
		var divId = $($(this)[0]).attr("class");
		$("."+divId).replaceWith(
			'<form style="height:'+(height_image_show+10)+'px;display:'+displayStatus+';" attr="'+divId+'" id="'+divId+'_Form" enctype="multipart/form-data">'+
				'<div id="'+divId+'_List">'+
				'</div>'+
				'<br>'+
				'<input type="button" id="submit_'+divId+'" value="Upload" name="submit" style="display:none;"/>'+
			'</form>'
		);
		
		var size_close = objArray.height_image_show;
		for(var i=0;i<limit_upload;i++){
			var closeElement = "";
			if(objArray.urlImage!=null)
			{
				closeElement = '<div attr_table="'+image_table+'" attr_field="'+image_field[i]+'" path_mini="'+pathMini+'" path_ex="'+pathEx+'" path_tn="'+pathTn+'" path_file="'+pathFile+'" attr_image="'+image_name[i]+'" attr_close="close_' + divId+i + '" class="event_close_image close_img_number close_'+size_close+'" attr="' + divId+i + '"></div>';
			}
			$("#"+divId+"_List").append( // id div for output elements
				'<div style="position:relative;float:left;margin:'+marginObject+'px">'+
					'<input input_name="'+input_name+'" input_type="'+input_type+'" attr="'+divId+'" type="file" name="files[]" id="fileToUpload_'+divId+i+'" for="newImage_'+divId+i+'" forloading="photoLoading_'+divId+i+'" loadingimg="loadingImage'+i+'" class="inputfile" />'+
					'<div id="photoLoading_'+divId+i+'" class="tranW" style="width:'+width_image_show+'px;height:'+height_image_show+'px;position:absolute; text-align:center; z-index:50; display:none;">'+
						'<div id="photoLoadingIcon" style="width:100%;margin-top:35%;margin-left:0px;">'+
							'<img id="loadingImage'+i+'" src="'+pathPhotoLoading+'" height="'+height_icon_loading+'" width="'+width_icon_loading+'">'+
						'</div>'+
					'</div>'+
					'<label style="cursor:pointer;margin:0px;" for="fileToUpload_'+divId+i+'">'+
						'<img attr="'+divId+'" attr_id="'+i+'" id="newImage_'+divId+i+'" src="'+bg_icon+'" width="'+width_image_show+'" height="'+height_image_show+'">'+
					'</label>'+
					 closeElement +
				'</div>'
			);
			/* $("[attr_close='close_"+divId+i+"']").attr('onclick', "delete_image('" + pathImageFadeOut + "','" + pathTnImageFadeOut + "','" + pathExImageFadeOut + "','" + pathMiniImageFadeOut + "','fileToUpload_" + nameFadeOut + "','" + image_id + "','" + nameFadeOut + "');"); */
			// start for drag and dorp picture
			$("#newImage_"+divId+i).on('dragenter', function (e){
				e.preventDefault();
				$(this).css('background', '#BBD5B8');
			});
			
			$("#newImage_"+divId+i).on('dragleave', function (e){
				e.preventDefault();
				$(this).css('background', '#D8F9D3');
			});
			$("#newImage_"+divId+i).on('dragover', function (e){
				e.preventDefault();
			});
			
			$("#newImage_"+divId+i).on('drop', function (e){
				$(this).css('background', '#D8F9D3');
				e.preventDefault();
				imageArray = e.originalEvent.dataTransfer.files;
				$image_id = $(e.target).attr("attr_id");
				
				//$("[name*=files][attr='"+$(this).attr("attr")+"']")[$image_id].files = imageArray;
				var formAttr = $(this).attr("attr");
				$('#submit_'+formAttr).click();
			});
			// end for drag and dorp picture
		}
		
		$("#"+divId+"_List").on('click', '.event_close_image', function(e){
			e.stopImmediatePropagation();
			var table_name = $(e.target).attr('attr_table');
			var image_name = $(e.target).attr('attr_image');
			var attr_field = $(e.target).attr('attr_field');
			var path_file = $(e.target).attr('path_file');
			var path_tn = $(e.target).attr('path_tn');
			var path_ex = $(e.target).attr('path_ex');
			var path_mini = $(e.target).attr('path_mini');
			if(confirm('คุณต้องการลบหรือไหม')) {
				/* $($(e.target).parent()[0]).find("[id*=photoLoading]").css("display","block"); */
				$.post( DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php", { ac:'deleteImage', image_name: image_name, field_name: attr_field, table_name:table_name, path_file:path_file, path_tn:path_tn, path_ex:path_ex, path_mini:path_mini })
				.done(function( data ) {
					if(data.trim()==1){
						/* $($($(e.target).parent()[0]).find("label")[0]).find("img").fadeOut(500,function(){
							
							$($($(e.target).parent()[0]).find("label")[0]).find("img").fadeIn(500);
						});
						 */
						/* $($(e.target).parent()[0]).find("[id*=photoLoading]").fadeOut(500, function() {
							$($(e.target).parent()[0]).find("[id*=photoLoading]").css("display","none");
						}); */
						$($($(e.target).parent()[0]).find("label")[0]).find("img").attr("src",DM+'/nubshare/assets/graphic/icon/take_photo_5-1.png');
						$($(e.target).parent()[0]).find(".close_img_number").remove();
						
					}else{
						alert("ไม่สามารถลบรูปภาพนี้ได้");
					}
				});
				
			}
			
		});
		
		var pathFileInput = $("<input>").attr("type", "hidden").attr("name", "pathFile").val(pathFile);
		$('#'+divId+"_Form").append($(pathFileInput));
		
		var pathTnInput = $("<input>").attr("type", "hidden").attr("name", "pathTn").val(pathTn);
		$('#'+divId+"_Form").append($(pathTnInput));
		
		var pathExInput = $("<input>").attr("type", "hidden").attr("name", "pathEx").val(pathEx);
		$('#'+divId+"_Form").append($(pathExInput));
		
		var pathMiniInput = $("<input>").attr("type", "hidden").attr("name", "pathMini").val(pathMini);
		$('#'+divId+"_Form").append($(pathMiniInput));
		
		var resizeW = $("<input>").attr("type", "hidden").attr("name", "resizeW").val(width_resize_tn);
		$('#'+divId+"_Form").append($(resizeW));
		
		var resizeH = $("<input>").attr("type", "hidden").attr("name", "resizeH").val(height_resize_tn);
		$('#'+divId+"_Form").append($(resizeH));
		
		var typeTn = $("<input>").attr("type", "hidden").attr("name", "typeTn").val(type_resize_tn);
		$('#'+divId+"_Form").append($(typeTn));
		
		var exPhotoSizeH = $("<input>").attr("type", "hidden").attr("name", "exPhotoSizeH").val(height_resize_ex);
		$('#'+divId+"_Form").append($(exPhotoSizeH));
		
		var exPhotoSizeW = $("<input>").attr("type", "hidden").attr("name", "exPhotoSizeW").val(width_resize_ex);
		$('#'+divId+"_Form").append($(exPhotoSizeW));
		
		var typeEx = $("<input>").attr("type", "hidden").attr("name", "typeEx").val(type_resize_ex);
		$('#'+divId+"_Form").append($(typeEx));
		
		var miniH = $("<input>").attr("type", "hidden").attr("name", "miniH").val(height_resize_mini);
		$('#'+divId+"_Form").append($(miniH));
		
		var miniW = $("<input>").attr("type", "hidden").attr("name", "miniW").val(width_resize_mini);
		$('#'+divId+"_Form").append($(miniW));
		
		var typeMini = $("<input>").attr("type", "hidden").attr("name", "typeMini").val(type_resize_mini);
		$('#'+divId+"_Form").append($(typeMini));
		
		// for EDIT
		//debugger;
		if($("[name=pupn_unixtime_image]").val()!=""&&$("[name=pupn_unixtime_image]").val()!=null){
			var url_getImage = DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php?ac=getImage&show="+showThumbnail;
			$.ajax({
				type: "POST",
				url: url_getImage, 
				data: 	{
							unique_id:$("[name=pupn_unixtime_image]").val(),
							pathFile:pathFile,
							pathTn:pathTn,
							pathEx:pathEx,
							pathMini:pathMini
						},
				async:true,
				success: function(data){
					if(data!=null&&data!=""&&data!="null"){
						var objArray_image = JSON.parse(data);
						for(var j =0;j<objArray_image.length;j++){
							var unix_image 		= objArray_image[j].pupn_unixtime_image;
							var url_photo_url 	= objArray_image[j].url_photo_url;
							var url_photo_files = objArray_image[j].url_photo_files;
							var url_photo_tn 	= objArray_image[j].url_photo_tn;
							var url_photo_mini 	= objArray_image[j].url_photo_mini;
							var url_photo_ex 	= objArray_image[j].url_photo_ex;
							var image_id 		= objArray_image[j].pupn_id;
							var widthPhoto		= objArray_image[j].height_photo;
							var heightPhoto		= objArray_image[j].width_photo;
							var img = new Image();
						//	debugger;
							$("[for=newImage_uploadImage0]").attr("image_id",image_id);
							$("#"+divId+"_List").find("img[id='newImage_uploadImage"+j+"']").attr('src',url_photo_url);
							$("[id='newImage_uploadImage"+j+"'").parent().append('<div path_mini="'+objArray_image[j].path_mini+'" path_ex="'+objArray_image[j].path_ex+'" path_tn="'+objArray_image[j].path_tn+'" path_file="'+objArray_image[j].pathFile+'" attr_image="'+objArray_image[j].pupn_image_filename+'.'+objArray_image[j].pupn_image_type+'" attr_close="close_' + unix_image + '" class="event_close close_img_number close_'+size_close+'" attr="'+ unix_image +'"></div>');
							
							//event ปุ่มลบ ของรูปภาพ
							$($("[id='newImage_uploadImage"+j+"'").parent().find(".event_close")[0]).click(function(e){
								e.stopImmediatePropagation();
								if(confirm('คุณต้องการลบหรือไหม')) {
									var image_name = $(e.target).attr('attr_image');
									var path_file = $(e.target).attr('path_file');
									var path_tn = $(e.target).attr('path_tn');
									var path_ex = $(e.target).attr('path_ex');
									var path_mini = $(e.target).attr('path_mini');
									$.post( DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php", { ac:'deleteImageOnly', image_name: image_name, path_file:path_file, path_tn:path_tn, path_ex:path_ex, path_mini:path_mini })
									.done(function( data ) {
										if(data.trim()==1){
											$.post( DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php", { ac:'deleteImage', image_name: image_name, field_name: attr_field, table_name:table_name, path_file:path_file, path_tn:path_tn, path_ex:path_ex, path_mini:path_mini })
											.done(function( data ) {
												//debugger;
												//$("[name=pupn_unixtime_image]").val(null);
											});
											var indexOfInput = $(e.target).parent().find("img").attr("attr_id");
											$("[no_id='"+indexOfInput+"']").remove();
											$(e.target).parent().parent().find('[type="file"]').val('');
											$(e.target).parent().find("img").attr("src",DM+'/nubshare/assets/graphic/icon/take_photo_5-1.png');
											$($(e.target).parent()[0]).find(".close_img_number").remove();

										}else{
											alert("ไม่สามารถลบรูปภาพนี้ได้");
										}
									});
								}
								return false;
							});
							/* $("#"+divId+"_List").append(
								
								'<li attr_id="'+image_id+'" for="fileToUpload_'+unix_image+j+'" class="liset ui-state-default" style="'+
									'width: '+height_image_show+'px !important;margin:'+margin_picture+'px !important;'+
									'height: '+width_image_show+'px !important;">'+
									'<div style="position:relative;float:left;cursor:move;margin:'+margin_picture+'px;" >'+
									'<div id="photoLoading_'+unix_image+'" class="tranW" style="width:'+width_image_show+'px;height:'+height_image_show+'px;position:absolute; text-align:center; z-index:50; display:none;">'+
										'<div id="photoLoadingIcon" style="width:70%;margin-top:30%;">'+
											'<img style="position:absolute;" id="loadingImage'+unix_image+'" src="'+pathPhotoLoading+'" width="'+width_icon_loading+'" height="'+height_icon_loading+'">'+
										'</div>'+
									'</div>'+
									'<div attr_close="close_'+unix_image+j+'" class="close_img" attr="'+unix_image+j+'"></div>'+
									'<a  href="'+url_photo_files+'" data-gallery><img id="newImage_multi_'+unix_image+'" src="'+url_photo_url+'" width="'+width_image_show+'" height="'+height_image_show+'" data-original-src-width="'+widthPhoto+'" data-original-src-height="'+heightPhoto+'"></a>'+
								'</div></li>'
							);
							
							
							$("[attr_close='close_"+unix_image+j+"']").css({left:jQuery('#newImage_multi_'+unix_image).width()-35});
							
							$(".close_img[attr='"+unix_image+j+"']").css('display', "block");
							$(".close_img[attr='"+unix_image+j+"']").attr('onclick', "delete_image('"+url_photo_files+"','"+url_photo_tn+"','"+url_photo_mini+"','"+url_photo_ex+"','fileToUpload_"+unix_image+j+"','"+image_id+"');");
							
							
							var name_pic = $("<input>").attr("type", "hidden").attr("name", "id_pic").val(image_id).attr("attr_id_set", image_id);
							$('#'+divId+"_Form").append($(name_pic));
							var order_pic = $("<input>").attr("type", "hidden").attr("name", "order_pic").val(j).attr("attr_order", image_id);
							$('#'+divId+"_Form").append($(order_pic));
							var name_pic = $("<input>").attr("type", "hidden").attr("name", "name_pic").val(unix_image).attr("attr_name", image_id);
							$('#'+divId+"_Form").append($(name_pic));
							
							
							$("#photoLoading_"+unix_image).attr('src', pathPhotoLoading); */
							//$("#photoLoading_"+objArray_image[j].ci_unixitime_image).fadeIn(500);
						}
						
						//sortOrder(divId);
						
					}
				}
			});
		}
		// end for EDIT
		
		
		
		/* ======================================== */
		if($("[name=pupn_unixtime_image]").val()==""||$("[name=pupn_unixtime_image]").val()==null){
			pms_unixtime_image = new Date().getTime();
		}else{
			pms_unixtime_image = $("[name=pupn_unixtime_image]").val();
		}
		
		$('#'+divId+"_Form").click(function(e){
			e.stopImmediatePropagation();
			var inputFileId;
			var newImageId;
			var photoLoading;
			var loadinImage;
			var i_image;
			formUpload = new FormData(this);
			if($image_id!=null&&$image_id!=""){
				var $form = $('#'+divId+"_Form");
				var $input    = $form.find('input[type="file"]');
				if (imageArray) {
					$.each( imageArray, function(i, file) {
						formUpload.append( "files["+$image_id+"]", file );
					});
				}
				inputFileId = $($("[name*=files][attr='"+$(this).attr("attr")+"']")[$image_id]).attr("id");
				newImageId = $($("[name*=files][attr='"+$(this).attr("attr")+"']")[$image_id]).attr("for");
				photoLoading = $($("[name*=files][attr='"+$(this).attr("attr")+"']")[$image_id]).attr("forloading");
				loadinImage = $($("[name*=files][attr='"+$(this).attr("attr")+"']")[$image_id]).attr("forloading");
				i_image = $image_id;
			}else{
				var files =  $("[name*=files][attr='"+$(this).attr("attr")+"']");
				for (var i = 0; i < files.length; i++){
					if($(files[i])[0].files[0]!=null){
						inputFileId = $($(files[i])[0]).attr("id");
						newImageId = $($(files[i])[0]).attr("for");
						photoLoading = $($(files[i])[0]).attr("forloading");
						loadinImage = $($(files[i])[0]).attr("forloading");
						i_image = i;
						var file_up = $("<input>").attr("type", "text").attr("name", "file_up[]").val(i_image);
					}
				}
			}
			$image_id="";
			$("#"+loadinImage).attr('src', pathPhotoLoading);
			//$("#"+photoLoading).fadeIn(500);
			$("#"+photoLoading).css("display","block").promise().done(function(){
				var url_image_id = "";
				if($("[for=newImage_uploadImage0]").attr("image_id")!=null){
					url_image_id = "&image_id="+$("[for=newImage_uploadImage0]").attr("image_id");
				}
				
				var url = DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php?show="+showThumbnail+"&unique_id="+pms_unixtime_image+"&ac=add"+url_image_id;
				setTimeout(function(){
					$.ajax({
						url: url,
						type: 'POST',
						data: formUpload,
						contentType: false,
						cache: false,
						processData: false,
						async:true,
						success: function(data){
							objArray = JSON.parse(data);
							if(objArray.status!="error"){
								$("#"+newImageId).attr('src', objArray.url_image);
								$("[for="+newImageId+"]").attr('image_id',objArray.image_id);
								$("#"+newImageId).attr('pahtFile',objArray.pathName);
								$("#"+newImageId).attr('pathTn',objArray.pathTn);
								$("#"+newImageId).attr('pathEx',objArray.pathEx);
								$("#"+newImageId).attr('pathMini',objArray.pathMini);
								$("#"+inputFileId).val('');
								
								$("#"+newImageId).parent().append('<div path_mini="'+objArray.path_mini+'" path_ex="'+objArray.path_ex+'" path_tn="'+objArray.path_tn+'" path_file="'+objArray.path_file+'" attr_image="'+objArray.filename+'" attr_close="close_' + inputFileId + '" class="event_close close_img_number close_'+size_close+'" attr="'+ inputFileId +'"></div>');
								//event ปุ่มลบ ของรูปภาพ
								$("#"+newImageId).parent().on('click', '.event_close', function(e){
									e.stopImmediatePropagation();
									if(confirm('คุณต้องการลบหรือไหม')) {
										var image_name = $(e.target).attr('attr_image');
										var path_file = $(e.target).attr('path_file');
										var path_tn = $(e.target).attr('path_tn');
										var path_ex = $(e.target).attr('path_ex');
										var path_mini = $(e.target).attr('path_mini');
										$.post( DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php", { ac:'deleteImageOnly', image_name: image_name, path_file:path_file, path_tn:path_tn, path_ex:path_ex, path_mini:path_mini })
										.done(function( data ) {
											if(data.trim()==1){
												$.post( DM+"/assets/plugin/uploadPhotoNumber/uploadPhotoAjaxCheck.php", { ac:'deleteImage', image_name: image_name, field_name: attr_field, table_name:table_name, path_file:path_file, path_tn:path_tn, path_ex:path_ex, path_mini:path_mini })
												.done(function( data ) {
													//debugger;
													//$("[name=pupn_unixtime_image]").val(null);
												});
												var indexOfInput = $(e.target).parent().find("img").attr("attr_id");
												$("[no_id='"+indexOfInput+"']").remove();
												$(e.target).parent().parent().find('[type="file"]').val('');
												$(e.target).parent().find("img").attr("src",DM+'/assets/graphic/icon/take_photo_5-1.png');
												$($(e.target).parent()[0]).find(".close_img_number").remove();

											}else{
												alert("ไม่สามารถลบรูปภาพนี้ได้");
											}
										});
									}
									return false;
								});
								if($("[name=pupn_unixtime_image]").val()==""){
									$("[name=pupn_unixtime_image]").val(pms_unixtime_image);
								}
								
								callback({"status":true,"data":objArray.filename,"type":objArray["type_image"],"no_id":objArray["no_id"],divElement:divId,photoLoading:photoLoading});
								
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) { 
							callback("Status: " + textStatus);
						} 
					});
				},500);
			});	
		});
		$('#'+divId+"_Form").change(function() {
			var formAttr = $(this).attr("attr");
			$('#submit_'+formAttr).click();
		});
	}
	function startUploadNumber(divElement,configArray,formRandom){
		// ===================== Config ======================== //
		//form id,loading url,value for input file
		var formIdUpload 		= 'uploadFile'; // ไอดี ฟอร์มสำหรับ upload ไฟล์
		var divIdListElement 	= 'listUpload'; // ไอดี ฟอร์มสำหรับ upload ไฟล์
		// ===================================================== //
		if(configArray!=null){
			if(configArray.pathLoading==null){
				pathLoading = DM+'/nubshare/assets/graphic/loading/05.gif';
			}else{
				pathLoading = configArray.pathLoading;
			}
		}else{
			pathLoading = DM+'/nubshare/assets/graphic/loading/05.gif';
		}
		
		if(configArray!=null){
			if(configArray.height_icon_loading==null){
				height_icon_loading = 50;
			}else{
				height_icon_loading = configArray.height_icon_loading;
			}
		}else{
			height_icon_loading = 50;
		}
		
		if(configArray!=null){
			if(configArray.width_icon_loading==null){
				width_icon_loading = 50;
			}else{
				width_icon_loading = configArray.width_icon_loading;
			}
		}else{
			width_icon_loading = 50;
		}
		
		if(configArray!=null){
			if(configArray.pathAddIcon==null){
				pathAddIcon	= DM+'/nubshare/assets/graphic/icon/add_H50_1.png';
			}else{
				pathAddIcon = DM+'/nubshare/assets/graphic/icon/add_H50_1.png';
			}
		}else{
			pathAddIcon	= DM+'/nubshare/assets/graphic/icon/add_H50_1.png';
		}
		
		if(configArray!=null){
			if(configArray.height_icon_show==null){
				height_icon_show = 50;
			}else{
				height_icon_show = configArray.height_icon_show;
			}
		}else{
			height_icon_show = 50;
		}
		
		if(configArray!=null){
			if(configArray.width_icon_show==null){
				width_icon_show	= 50;
			}else{
				width_icon_show = configArray.width_icon_show;
			}
		}else{
			width_icon_show	= 50;
		}
		if(configArray!=null){
			if(configArray.limit_upload==null){
				limit_upload	= 1;
			}else{
				limit_upload = configArray.limit_upload;
			}
		}else{
			limit_upload	= 1;
		}
		
		if(configArray!=null){
			if(configArray.bg_icon==null){
				bg_icon = DM+'/nubshare/assets/graphic/icon/take_photo_5-1.png';
			}else{
				bg_icon = configArray.bg_icon
			}
		}else{
			bg_icon = DM+'/nubshare/assets/graphic/icon/take_photo_5-1.png';
		}
		
		if(configArray!=null){
			if(configArray.pathFile==null||configArray.pathFile==""){
				pathFile = '';
			}else{
				pathFile = configArray.pathFile;
			}
		}else{
			pathFile = '/upload/uploadmulti/file/';
		}
		
		if(configArray!=null){
			if(configArray.pathTn==null||configArray.pathTn==""){
				pathTn = '';
			}else{
				pathTn = configArray.pathTn;
			}
		}else{
			pathTn = '/upload/uploadmulti/tn/';
		}
		
		if(configArray!=null){
			if(configArray.pathEx==null||configArray.pathEx==""){
				pathEx = '';
			}else{
				pathEx = configArray.pathEx;
			}
		}else{
			pathEx = '/upload/uploadmulti/ex/';
		}
		
		if(configArray!=null){
			if(configArray.pathMini==null||configArray.pathMini==""){
				pathMini = '';
			}else{
				pathMini = configArray.pathMini;
			}
		}else{
			pathMini = '/upload/uploadmulti/mini/';
		}
		
		if(configArray!=null){
			if(configArray.height_image_show==null){
				height_image_show = 100;
			}else{
				height_image_show = configArray.height_image_show;
			}
		}else{
			height_image_show = 100;
		}
		
		if(configArray!=null){
			if(configArray.width_image_show==null){
				width_image_show = 100;
			}else{
				width_image_show = configArray.width_image_show;
			}
		}else{
			width_image_show = 100;
		}
		
		if(configArray!=null){
			if(configArray.height_resize_tn==null){
				height_resize_tn = 1000;
			}else{
				height_resize_tn = configArray.height_resize_tn;
			}
		}else{
			height_resize_tn = 1000;
		}
		
		if(configArray!=null){
			if(configArray.width_resize_tn==null){
				width_resize_tn = 1000;
			}else{
				width_resize_tn = configArray.width_resize_tn;
			}
		}else{
			width_resize_tn = 1000;
		}
		
		if(configArray!=null){
			if(configArray.type_resize_tn==null){
				type_resize_tn = 1000;
			}else{
				type_resize_tn = configArray.type_resize_tn;
			}
		}else{
			type_resize_tn = "crop";
		}
		
		if(configArray!=null){
			if(configArray.height_resize_ex==null){
				height_resize_ex = 600;
			}else{
				height_resize_ex = configArray.height_resize_ex;
			}
		}else{
			height_resize_ex = 600;
		}
		
		if(configArray!=null){
			if(configArray.width_resize_ex==null){
				width_resize_ex = 600;
			}else{
				width_resize_ex = configArray.width_resize_ex;
			}
		}else{
			width_resize_ex = 600;
		}
		
		if(configArray!=null){
			if(configArray.type_resize_ex==null){
				type_resize_ex = 1000;
			}else{
				type_resize_ex = configArray.type_resize_ex;
			}
		}else{
			type_resize_ex = "crop";
		}
		
		if(configArray!=null){
			if(configArray.height_resize_mini==null){
				height_resize_mini = 100;
			}else{
				height_resize_mini = configArray.height_resize_mini;
			}
		}else{
			height_resize_mini = 100;
		}
		
		if(configArray!=null){
			if(configArray.width_resize_mini==null){
				width_resize_mini = 100;
			}else{
				width_resize_mini = configArray.width_resize_mini;
			}
		}else{
			width_resize_mini = 100;
		}
		
		if(configArray!=null){
			if(configArray.type_resize_mini==null){
				type_resize_mini = 1000;
			}else{
				type_resize_mini = configArray.type_resize_mini;
			}
		}else{
			type_resize_mini = "crop";
		}
		
		if(configArray!=null){
			if(configArray.margin_picture==null){
				margin_picture = 2;
			}else{
				margin_picture = configArray.margin_picture;
			}
		}else{
			margin_picture = 2;
		}
		
		if(configArray!=null){
			if(configArray.showThumbnail==null){
				showThumbnail = "mini";
			}else{
				showThumbnail = configArray.showThumbnail;
			}
		}else{
			showThumbnail = "mini";
		}
		
		if(configArray!=null){
			if(configArray.displayStatus==null){
				displayStatus = "block";
			}else{
				displayStatus = configArray.displayStatus;
			}
		}else{
			displayStatus = "block";
		}
		
		if(configArray!=null){
			if(configArray.form_upload==null){
				form_upload = "formupload";
			}else{
				form_upload = configArray.form_upload;
			}
		}else{
			form_upload = "formupload";
		}
		
		if(configArray!=null){
			if(configArray.input_name==null){
				input_name = "image_array_name";
				input_type = "image_array_type";
			}else{
				input_name = configArray.input_name;
				input_type = input_name+"_type";
			}
		}else{
			input_name = "image_array_name";
			input_type = "image_array_type";
		}
		
		$(divElement).upload_number({
			"form_id"				:formIdUpload,
			"div_id"				:divIdListElement,
			"pathLoading"			:pathLoading,
			"height_icon_loading"	:height_icon_loading,
			"width_icon_loading"	:width_icon_loading,
			"bg_icon"				:bg_icon,
			"limit_upload"			:limit_upload,
			"pathFile"				:pathFile,
			"pathTn"				:pathTn,
			"pathEx"				:pathEx,
			"pathMini"				:pathMini,
			"height_image_show"		:height_image_show,
			"width_image_show"		:width_image_show,
			"height_resize_tn"		:height_resize_tn,
			"width_resize_tn"		:width_resize_tn,
			"type_resize_tn"		:type_resize_tn,
			"height_resize_ex"		:height_resize_ex,
			"width_resize_ex"		:width_resize_ex,
			"type_resize_ex"		:type_resize_ex,
			"height_resize_mini"	:height_resize_mini,
			"width_resize_mini"		:width_resize_mini,
			"type_resize_mini"		:type_resize_mini,
			"marginObject"			:margin_picture,
			"displayStatus"			:displayStatus,
			"showThumbnail"			:showThumbnail,
			"urlImage"				:$(divElement).attr("attr_url"),
			"image_name"			:$(divElement).attr("attr_img"),
			"image_field"			:$(divElement).attr("attr_field"),
			"image_table"			:$(divElement).attr("attr_table"),
			"input_name"			:input_name, // for use multi plugin in single content
			"input_type"			:input_type // for use multi plugin in single content
		},function (data){ //callback function
			if(data.data!=null){
				var data_image = data.data.split(".");
				limit_upload = $("[id="+data.divElement+"_Form]").children().find("input[attr='"+data.divElement+"']").length;
				var input_name = $("[id="+data.divElement+"_Form]").children().find("input[attr='"+data.divElement+"']").attr('input_name');
				var input_type = $("[id="+data.divElement+"_Form]").children().find("input[attr='"+data.divElement+"']").attr('input_type');
				if(limit_upload>1){
					var image_array_name = $("<input>").attr("type", "hidden").attr("name", input_name+"[]").val(data_image[0]+"*"+data.no_id).attr("text_attr_name",data.text_attr).attr("no_id",data.no_id);
				}else{
					var image_array_name = $("<input>").attr("type", "hidden").attr("name", input_name+"[]").val(data_image[0]).attr("text_attr_name",data.text_attr).attr("no_id",data.no_id);
				}
				
				/* if(formRandom!=null){
					form_upload = form_upload+formRandom;
				} */
				$("#"+form_upload).append($(image_array_name));
				$("#"+data.photoLoading).fadeOut(500, function() {
					
				});
				// convert jpeg to jpg
				if(data_image[1]=="jpeg"){
					data_image[1] = "jpg";
				}
				
				var image_array_type = $("<input>").attr("type", "hidden").attr("text", input_type+"[]").val(data_image[1]).attr("text_attr_type",data.text_attr).attr("no_id",data.no_id);
				$("#"+form_upload).append($(image_array_type));
				/* $("[name=pms_image_filename]").val(data_image[0]);
				$("[name=pms_image_type]").val(data_image[1]); */
			}
		});
	}
	