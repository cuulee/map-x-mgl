webpackJsonp([34],{149:function(e,i){e.exports=function(e){var i="",t=mx.helpers,a=e;if(a)for(var s,l=-1,n=a.length-1;l<n;){s=a[l+=1];var d=t.checkLanguage({obj:s,path:"data.title"});i+='<li id="'+s.id+'" data-view_id="'+s.id+'" class="mx-view-item mx-view-item-'+s.type+' mx-sort-li-item noselect mx-draggable"> <input data-view_action_key="btn_toggle_view" data-view_action_target="'+s.id+'" id="check_view_enable_'+s.id+'" class="mx-view-tgl-input" type="checkbox"/> <label class="mx-view-tgl-content" for="check_view_enable_'+s.id+'"> <div class="mx-view-tgl-btn-container"> <div class="mx-view-tgl-btn-content"> <div class="mx-view-tgl-btn"></div> </div> </div> <span class="mx-view-tgl-title mx-drag-handle"> ',s.data.title&&(i+=" "+s.data.title[d]+" "),i+=' </span> <span class="mx-view-item-classes">'+s.data.classes+","+s.type+'</span> <span class="mx-view-item-index">'+mx.helpers.getDistinctIndexWords(s)+'</span> </label> <div class="mx-view-tgl-more-container"> <div class="mx-view-tgl-more" data-view_options_for="'+s.id+'"></div> </div></li>'}return i}}});