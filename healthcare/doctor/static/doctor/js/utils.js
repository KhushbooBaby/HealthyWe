const LOADER=`<img src="${__URL}/images/loader.gif" class="img-fluid">`;

const LOADER_IMG = `<img src="${__URL}/images/loader.gif" class="img-fluid ajaxLoader" >`;

const expandClasses={close:'mdi-close',expand:'mdi-arrow-expand'};


const spinner='<i style="color:white;" class="fa fa-spinner fa-spin"></i>';




/**************/
$.fn.resetForm = function(){
		resetForm(this);
};


$.fn.hasScrollBar = function() {
		try{
			this.get(0).scrollHeight;
		}catch(err){
			return false;
		}
        return this.get(0).scrollHeight > this.height();
    }

const disableOnSubmit = ()=>{
	$(".disable_submit").click(function(){
		$(this).html(spinner).prop("disabled",true);
		$(this).closest('form').submit();
	});
}


// ajax post request function
var postReq= (url,d,rawData=false,origin=true)=>{
	var data;
	if(rawData){
		data= new FormData;
		for(var key in d){
			data.append(key,d[key]);
		}
	}else{
		data=d;
	}
	return new Promise((resolve,reject)=>{

		var settings={
        url: origin ? __URL+'/'+url : url,
       type: "POST",
		data:  data,
		contentType: false,
    	cache: false,
		processData:false,
        success: function(result)
        {
        	if($.isPlainObject(result)){
        		if(result.error)
        			reject(result);

        		resolve(result);
        	}
        },
        error: function(data)
        {

            throwError(data);
            reject(data);
        }
    };
 $.ajax(settings);

	});

}

var deleteReq= (url="",origin=true)=>{

	return new Promise((resolve,reject)=>{

		var settings={
        url: origin ? __URL+'/'+url : url,
        type: "DELETE",

        success: function(result)
        {
        	if($.isPlainObject(result)){
        		if(result.error)
        			reject(result);

        		resolve(result);
        	}
        },
        error: function(data)
        {

            throwError(data);
            reject(data);
        }
	};

	console.log(settings);
 $.ajax(settings);

	});

}

var getReq= (url="",origin=true)=>{

	return new Promise((resolve,reject)=>{

		var settings={
        url: origin ? __URL+'/'+url : url,
        type: "GET",

        success: function(result)
        {
        	if($.isPlainObject(result)){
        		if(result.error)
        			reject(result);

        		resolve(result);
        	}
        },
        error: function(data)
        {

            throwError(data);
            reject(data);
        }
	};

	console.log(settings);
 $.ajax(settings);

	});

}

function checkNumber(){
		var val=$(this).val();
		var btn=$(this).parents('form').find('button[type=submit]');
		$(this).siblings('p').remove();
				if(isNaN(val)){
					$(this).parent().append('<p class="error warning_text">Invalid Value</p>');
					if(btn.length)
						btn.prop('disabled',true);
				}else{
					if(btn.length)
						btn.prop('disabled',false);
				}
	}

	var numCheck = ()=>{
		$('.number').on('keyup',checkNumber);
			$('.number').on('keydown',checkNumber);
	}

	var throwError=(data)=>{
			const $defaultErrorMsg='An unknown error occured while processing your request';
			// console.log(data.responseJSON.errorMsg);
			if(data.status==401)
				return WARN('Please login first !');
			try{
				WARN(data.responseJSON.errorMsg || $defaultErrorMsg,'error');
			}catch(err){
				WARN($defaultErrorMsg,'error');
			}

	}



 var fillData=(data,parent)=>{
 	console.log(data);
 	for(var key in data){
 		console.log(key);
 		var ele=parent.find(`input[name=${key}]`);
 		if(ele.length)
 			ele.val(data[key]);
 	}
 }

 var ajaxLoader=(ele,center=false,visiblity=null)=>{
		if(!ele.siblings('.ajaxLoader').length)
			if(center)
				ele.parent().append(CENTER_LOADER_IMG);
			else
				ele.parent().append(LOADER_IMG);
		var _hide=()=>{
			ele.siblings('.ajaxLoader').hide();
			ele.fadeIn();
		}
		var _show=()=>{
			ele.hide();
			ele.siblings('.ajaxLoader').fadeIn();
		}

		if(visiblity!=null){
			if(visiblity)
				_show();
			else
				_hide();
			return null;
		}



		if(ele.css('display')=='none')
			_hide();  //hide loader
		else
			_show();//show loader
	}

	var renderErrors=(target,data)=>{
		 // target.find('.msgArea').html(`<p class="btn btn-outline-danger">${data.errorMsg}</p>`);
            // console.log(data);
            var errors;
            try{
                errors=data.responseJSON.errors;
            }catch(err){
                // return ;
                try{
            			errors=data.errors;
            	}catch(err){
            			return ;
            	}
            }

            // console.log(errors);
            // var errors=  data.responseJSON.errors;
            for(var key in errors){
                // console.log(`[name=${key}]`);
                // target.find(`[name=${key}]`).remove();
                target.find(`[name=${key}]`).parent().append(`<p class="error">${errors[key][0]}</p>`);
            }
	}


	var WARN=(title=null,icon='warning',text="")=>{
			if(title==null)
				title = 'Encountered an error!';
			Swal.fire({
			    title ,
			    // text,
			    icon
		});
	}

	var TOAST = (title="Hey !",icon="success")=>{
		let T = Swal.mixin({
		  toast: true,
		  position: 'top-end',
		  showConfirmButton: false,
		  timer: 5000,
		  timerProgressBar: true,
		  onOpen: (toast) => {
		    toast.addEventListener('mouseenter', Swal.stopTimer)
		    toast.addEventListener('mouseleave', Swal.resumeTimer)
		  }
		})

		T.fire({
		  icon,
		  title
		});

		return T;
	}

	var reqGet=(url,origin=true)=>{

	return new Promise((resolve,reject)=>{
		var settings={
        url: origin ? __URL+'/'+url : url,
       type: "GET",
		// data:  data,
		// contentType: false,
    	// cache: false,
		// processData:false,
        success: function(result)
        {
        	if($.isPlainObject(result)){
        		if(result.error)
        			reject(result);

        		resolve(result);
        	}else{
        		try{
        			resolve(JSON.parse(result));
        		}catch(err){
        			resolve(result);
        		}
        	}
        },
        error: function(data)
        {
            // throwError(data);
            reject(data);
        }
    };
 $.ajax(settings);

	});

	}


	var buildPagination=(data)=>{
		var repeatedFirst = true;
		var current_page=data.current_page;
		var _path=data.path;
		var last_page=data.last_page;
		var prev_page_url=data.prev_page_url;
		var next_page_url=data.next_page_url;
		var htm=`<div class="row"><div class="col-md-12"><span class="float-right"><ul class="pagination">`;
		if(current_page==1)
			htm+=` <li class="disabled"><span class="btn btn-secondary btn-sm">&laquo;</span></li>`;
		else
			htm+=`<li><a href="${prev_page_url}${QUERY}" class="btn btn-primary btn-sm" rel="prev">&laquo;</a></li>`;

		if(current_page==1){
			i=2;
			htm+=`<li class="active"><span class="btn btn-info btn-sm" >1</span></li>`;
		}
		else{
			htm+=`<li><a href="${_path}?page=1${QUERY}" class="btn btn-primary btn-sm" rel="prev">1</a></li>`;
			i=current_page;
			repeatedFirst=false;
		}
		var loop=0;
		while(i<last_page && loop<4){

			if(i==current_page)
				htm+=`<li class="active"><span class="btn btn-info btn-sm" >${i}</span></li>`;
			else
				htm+=`<li><a class="btn btn-primary btn-sm"  href="${_path}?page=${i}${QUERY}">${i}</a></li>`;

			i++;
			loop++;
		}

		if(current_page==last_page && last_page!=1 && repeatedFirst){
			htm+=`<li><a href="${_path}?page=${(last_page-1)}${QUERY}" class="btn btn-primary btn-sm" rel="prev">${(last_page-1)}</a></li>`;
			htm+=`<li class="active"><span class="btn btn-info btn-sm" >${last_page}</span></li>`;
		}
		else if(last_page!=1){
			if(last_page==current_page)
				htm+=`<li class="active"><span class="btn btn-info btn-sm" >${last_page}</span></li>`;
			 else
			   htm+=`<li><a href="${_path}?page=${last_page}${QUERY}" class="btn btn-primary btn-sm" rel="prev">${last_page}</a></li>`;

		}

		if(current_page<last_page)
			htm+=`<li><a href="${next_page_url}${QUERY}" class="btn btn-primary btn-sm"  rel="next">&raquo;</a></li>`;
		else
			htm+=`<li class="disabled"><span class="btn btn-secondary btn-sm">&raquo;</span></li>`;
		htm+=`</ul></span></div></div>`;
		// modal.body(htm);
		$("#mastersSearch").find('a').attr('data-path',_path);
	var temp=(M)=>{
		M.find('.pagination').find('a').click(function(){
			event.preventDefault();
			var ele=$(this);
			reqData(ele.attr('href'),LAST_ELE);
			// $.alert("hi");
		});
	}
	console.log(_path);
		return [htm,temp,_path];

	};

	////
	var renderDataToModal=(data,ele,target=MODAL)=>{

		data=data.data;
		var htm=rendering[LAST_ELE.attr('data-render')](data);
		if(!data.data.length)
			return target.body("<h4 class='text-center'>No Data To Show !!</h4>");
		// console.log(htm);
		var paginationLinks=buildPagination(data);
		target.body(paginationLinks[0]+htm);
		paginationLinks[1](target);
		// buildPagination(data);
	}
	///
// Alertify Common confirm panel

// for deleting row with animation
var removeRow=(row_id,parent=null,real_element=null)=>{
	var ele=$(`tr[row_id=${row_id}]`);
	if(parent)
		ele=parent.find(`tr[row_id=${row_id}]`);
	if(real_element)
		ele=real_element;
	ele.fadeOut("slow",()=>{
		ele.remove();
	});

}

var assignDefaultValues=(ele,val)=>{
	ele=$(ele);
	$.each(ele,(i,e)=>{
		e=$(e);
		console.log(e.val());
		if(e.val())
			return true;
		e.val(val);
	})
}

var expandableIconsAppender=()=>{
	var cards=$('.card');
	$.each(cards,(i,ele)=>{
		ele=$(ele);
		// console.log(expandIcon(ele));
		ele.find('.card-header').append(expandIcon(ele));
	});
	$('.expandable').click(expandable);
};


var expandIcon=(ele)=>{

	var icon;
	var body=ele.find('.card-body');
	if(!body.length){
		return ;
	}
	if(body.css('display')=='none' || body.prop('hidden'))
		icon=expandClasses.expand;
	else
		icon=expandClasses.close;

	return `<span class="float-right"><i class="mdi ${icon} clickable expandable"></i></span>`;
};


var expandable=(ele)=>{
	ele=$(ele.target);
	var body=ele.closest('.card-header').siblings('.card-body');
	if(ele.hasClass(expandClasses.close)){
		ele.removeClass(expandClasses.close);
		ele.addClass(expandClasses.expand);
		return body.slideUp();
	}
	if(ele.hasClass(expandClasses.expand)){
		ele.removeClass(expandClasses.expand);
		ele.addClass(expandClasses.close);
		return body.slideDown();
	}
};
//
var _remove=(ele)=>{
		ele=$(ele);
		var row=ele.closest('tr');
		var id=row.attr('row_id');
		confirmBox(()=>{
			//
			postReq(`delete/${LAST_CLASS}/${id}`).then((data)=>{
				$.alert(data.msg);
				removeRow(id);
			}).catch((err)=>{

			});
			//
		});
	}
//

var removeCurrentRow=(ele,rows=0)=>{
	ele=$(ele);
	var tr=ele.closest('tr');
	var trs=tr.siblings('tr');
	// console.log(trs.length);
	if(trs.length==rows)
		return ;
	tr.fadeOut('fast',()=>{
		var war=tr.next('tr');
		tr.remove();
		if(war.length){
			if(war.hasClass('warning'))
				war.remove();
		}
	});
}

var loadIframe=(url,title='Full Page')=>{
	var container=$("#otherModal");
	container.find('iframe').attr('src',url);
	container.find('.modal-title',title);
	container.modal('show');
}

var mastersSearch=(ele)=>{
	// console.log("hi");
	// alert("hi");
	ele=$(ele);
	var form=ele.closest("form");
	LAST_SEARCHED.data=makeObjectFromForm(form);
	var q=makeQueryFromObject(LAST_SEARCHED.data);
	QUERY=q;
	reqData(LAST_SEARCHED.url+'?'+q,LAST_ELE);
}

var cancelSearch=()=>{
	LAST_ELE.click();
	LAST_SEARCHED.data=null;
	// console.log("hi");
	// ele=$(ele);
	// var form=ele.closest("#mastersSearch");
	// var query=form.find('input').val('');
	// var _path=ele.attr('data-path');
	QUERY=``;
	// reqData(`${_path}${QUERY}`,LAST_ELE);
}

var confirmBox=(title="Are you sure ?",text="Once deleted, you will not be able to recover this !",icon="warning",dangerMode=true)=>{
	let swalWithBootstrapButtons = Swal.mixin({
		  // customClass: {
		  //   confirmButton: 'btn btn-success',
		  //   cancelButton: 'btn btn-danger'
		  // },
		  // buttonsStyling: false
		})

	return swalWithBootstrapButtons.fire({
	  title,
	  text,
	  icon,
	  showCancelButton: true,
	  confirmButtonText: 'Yes, ',
	  cancelButtonText: 'No, cancel!',
	  reverseButtons: true
	});
}



 var loadDataOnChange=()=>{
    $('.loadDataOnChange').change(function(){
            var ele=$(this);
			_loadDataOnChange(ele);
        });
};

var _loadDataOnChange=(ele)=>{

	 var val=ele.val();
            if(!val)
                return ;
           var target=ele.attr('target');
           target=$(target);
          if(target.prop('tagName')!='SELECT')
            target=target.find('select');
        // console.log(target.attr('url'));
        reqAndAppendOptions(target,val,ele);
}

var reqAndAppendOptions=(target,val,pre=null)=>{
	// alert(target.attr('previousValue'));
    var settings={
        url:  target.attr('url')+'/'+val,
        type: 'get',
        // data:  data,
        // contentType: false,
        // cache: false,
        // processData:false,
        success: function(result)
        {
        	// clearInterval(inter);
			ajaxLoader(target);
			if(pre){
				ajaxLoader(pre);
			}
            target.html(appendOptions(result.data,target.attr('previousValue')));
            manageChildren(target);
        },
        error: function(data)
        {	ajaxLoader(target);
			if(pre){
				ajaxLoader(pre);
			}
			// clearInterval(inter);
            target.empty();
            WARN("Error While loading data try again later");
        }
    };
	ajaxLoader(target);
	if(pre){
		ajaxLoader(pre);
	}
        // var inter=setInterval(()=>{
    //     target.find('option').append(' .');
    //     // console.log("hi");
    // },1000);
    $.ajax(settings);
   };

 var appendOptions=(data,val=null,name='data')=>{
       var htm=`<option value="" >Select</option>`;
        if(!data.length)
            return `<option value="" selected> No ${name} Found</option>`;

        $.each(data,(i,ele)=>{
			// console.log(ele,val==ele.id);
            if(val==ele.id)
                var t='selected';
            else
				var t='';
			// console.log(t);
            htm+=`<option ${t} value="${ele['id']}">${ele['name']}</option>`
        });
        // console.log(htm);
        return htm;
   };

  var manageChildren=(ele)=>{
        if(!ele.length)
            return ;
        var child=ele.attr('target');
        child=$(child);
        child.empty();
        if(child.attr('target') && child.hasClass('loadDataOnChange'))
            manageChildren($(child.attr('target')));

   };

   var fillFormData=(form,data)=>{
		// console.log(data);
		for(var key in data){
			// console.log(key);
			var ele=form.find(`[name=${key}]`);
			if(!ele.length)
				continue;
			var tagName=ele.prop('tagName');
			var TYPE=ele.attr('type');
			// console.log(tagName ,TYPE,TYPE=='checkbox');
			if(TYPE=='file')
				continue;
			if(key=='gifted'){
				if(TYPE=='checkbox' && data[key])
					form.find(`[name=${key}]`).prop('checked',true);
				form.find(`[name=${key}]`).val(data[key]);
			}
			if(TYPE=='radio' || TYPE=='checkbox')
				// console.log("hi");
				form.find(`[name=${key}][value=${data[key]}]`).prop('checked',true);
			else if(tagName=='INPUT')
				ele.val(data[key]);
			else if(tagName=='TEXTAREA')
				ele.html(data[key]);
			else if(tagName=='SELECT'){
				ele.find(`option[value=${data[key]}]`).prop('selected',true);
				ele.attr('previousValue',data[key]);
			}
		}
	}

// Fuctions for only add Gate Pass

// function for add gate Pass ends here

var loadPreviousAjaxData=()=>{
	var eles=$('[previousValue][target]');
		if(!eles.length)
			return false;
		$.each(eles,(i,ele)=>{
			_loadDataOnChange($(ele));
			// k.push($(ele));
		});
}


    var resetForm=(form)=>{
    	form.trigger('reset');
    	form.find('.error').remove();
    }



 var submitForm=(form,$success=()=>{},$failed=()=>{})=>{
        var data= new FormData(form);
        form=$(form);
        form.find('.error').remove();
        // var btn=form.find('button[type=submit]');
        var btn=form.find('button[type=submit]');
        var btnText=btn.text();
        btn.html(spinner).prop('disabled',true);
        var action =form.attr('action');
        postReq(action,data,false,false).then((data)=>{
            btn.html(btnText).prop('disabled',false);
            $success(data,form);
        }).catch((err)=>{
        	// console.log(err);
            renderErrors(form,err);
            // console.log(err);
            btn.html(btnText).prop('disabled',false);
            $failed(err);
        });

    }

    var submitFormV2=(form)=>{
        var data= new FormData(form);
        form=$(form);
        form.find('.error').remove();
        // var btn=form.find('button[type=submit]');
        var btn=form.find('button[type=submit]');
        var btnText=btn.text();
        btn.html(spinner).prop('disabled',true);
        var action =form.attr('action');
        return new Promise((resolve,reject)=>{
        	//start of Promise
        	postReq(action,data,false,false).then((data)=>{
	            btn.html(btnText).prop('disabled',false);
	            resolve(data);
	        }).catch((err)=>{
	        	// console.log(err);
	            renderErrors(form,err);
	            // console.log(err);
	            btn.html(btnText).prop('disabled',false);
	            reject(err);
	        });
        	//end of promise.
        });


    }

    var updateStaticHtml=(target,data)=>{
    	for(var key in data){
			// console.log(key);
			if(target.find(`[field_name=${key}]`).length)
					target.find(`[field_name=${key}]`).text(data[key]);
			else
			target.find(`[field-name=${key}]`).text(data[key]);
		}
    }



    var makeObjectFromRow=(row)=>{
    	var items=row.find('[field-name]');
    	var obj={};
    	$.each(items,(i,item)=>{
    		item=$(item);
    		obj[item.attr('field-name')]=item.text();
    	});

    	return obj;
    }

    var resetFormArea=(container)=>{
	    	container.find('input[type=text]').val('');
	    	container.find('input[type=checkbox]').prop('checked',false);
	    	container.find('textarea').html('');
    };


    var rendering={
    	news:(data)=>{
    		data = data.data || [];
    		// return console.log(data);
    		var htm=``;
    		$.each(data,(i,d)=>{
    			// return console.log(d);
    			htm+=`<div class="row" data-news-id="${d.id}"><div class="col-md-12"><h4>${d.title}</h4></div>`;
    			htm+=`<div class="col-md-12"><span class="float-right"><i class="mdi mdi-calendar-clock mr-2 text-success"></i> <small>${d.created_at}</small></span>`;

    			htm+=`<span class="float-left"><i class="mdi mdi-account-outline mr-2 text-success"></i> <small>${d.user.name} - ${d.user.unique_id}${d.user.shop_name? " - "+d.user.shop_name:''}</small></span></div>`;
    			htm+=`<div class="col-md-12" ><span class="float-right"><a href="javascript:void(0)" onclick="editNews(this)"> <i class="mdi mdi-grease-pencil"></i></a>&nbsp;<a href="javascript:void(0)" onclick="deleteNews(this)"> <i class="mdi mdi-delete"></i></a></span></div>`;
    			if(d.media)
    				htm+=`<div class="col-md-12 text-center"><img class="img-fluid img-thumbnail" src="${URL}/${d.media}"></img></div>`;

    			htm+=`<div class="col-md-12"><p>${d.content}</p></div>`;
    			htm+=`<div class="col-md-12"><br><hr></div></div>`;
    		});

    		return htm;
    	},
    rate_list:(data)=>{
    	data = data.data || [];
    		// return console.log(data);
    		var htm=`<div class="row"><div class="col-md-12 table-responsive"><table class="table table-striped table-bordered"><thead><tr class="bg-dark text-white"><td>Commodity</td><td>Rate</td></thead><tbody>`;
    		$.each(data,(i,d)=>{
    			htm+=`<tr><td>${d.name}</td><td>${d.min_price} - ${d.max_price}</td></tr>`;
    		})
    		htm+=`</tbody></table>`;
    		return htm;
     }

    }

    var makeObjectFromForm=(form)=>{
    	var items=form.find('input');
    	var obj={};
    	$.each(items,(i,item)=>{
    		item=$(item);
    		obj[item.attr('name')]=item.val();
    	});

    	return obj;
    }

    var makeQueryFromObject=(obj)=>{
    	var q=``;
    	for(var key in obj){
    		q+=`&${key}=${obj[key]}`;
    	}
    	return q;
    };









/********************Function for search /suggestion box***************************/

	var autoComplete=(e,ele)=>{
		// e.preventDefault();
		clearInterval(typingInterval);
		// 13//evnter

		ele=$(ele);
		var $VAL=ele.val();
		var $MODEL=ele.attr('data-class-name');
		// console.log($VAL);
		var $formGroup=ele.closest('div.form-group');
		if(!$formGroup.find('.suggestion_box').length)
		    $formGroup.append(`<div class="suggestion_box customscroll"><ul></ul></div>`);

		 var $suggestion_box=$formGroup.find('.suggestion_box');


	  //   if(!$VAL)
			// return $suggestion_box.hide();

		var $RESULT=$suggestion_box.find("ul");
		// console.log("requested",$VAL);

		if(e.keyCode==38 || e.keyCode==40 || e.keyCode==13){
			e.preventDefault();
			return navigateThroughOptions($RESULT,e.keyCode);
		}

		// if($VAL==lastSearchedValue)
		// 		return false;
		lastSearchedValue=$VAL;

		if(!isKeyCodeValid(e.keyCode) && e.keyCode!=8)
			return false;

		lastPosition=0;
		var _next=()=>{

				if(!ele.val())
					return $suggestion_box.fadeOut('fast');

				$RESULT.html(`<li class="loader"><span></span></li>`);
		        ajaxLoader($RESULT.find('li.loader'),true);
		         $suggestion_box.show();

				reqGet(`ajax/suggest/${$MODEL}/${ele.val()}`).then((data)=>{
					$RESULT.html(appendSuggestions(data.data));
					$RESULT.find('.fill_input').click(function(){
						ele.val($(this).attr('data-value'));
						$suggestion_box.fadeOut('fast');
					});

					}).catch((err)=>{
						$suggestion_box.fadeOut('fast');
					});
		}

		typingInterval=setTimeout(_next,300);

		// console.log("hi");
	}

	var appendSuggestions=(data)=>{
		var htm=``;
		if(!data.length){
			// addEventsForSearchBox(false);
			return `<li class="loader text-center">No Result Found !! </li><li data-button="true" data-value="xy" class="text-center"><a href="javascript:void(0)" onclick="addToSuggestion(this)" class="btn btn-dark btn-rounded btn-xs">Add this to Suggestions</a></li>`;
		}
		$.each(data,(i,d)=>{
			htm+=`<li  data-value="${d.name}" class="fill_input">${d.name}</li>`;
		});
		return htm;
	}

	var navigateThroughOptions=(target,code)=>{
			var all=target.find('li');
			if(code==13){
				var t=target.parent().find(`ul li[data-value]:nth-child(${lastPosition})`)
				if(t.attr('data-button'))
					return t.find('a').click();
				return t.click();
			}
			if((lastPosition==all.length && code==40) || (lastPosition==1 && code==38))
				return false;

         all.removeClass('active');
			if(code==40)
				lastPosition++;

			if(code==38)
				lastPosition--;

			var t=target.parent().find(`ul li[data-value]:nth-child(${lastPosition})`);
			t.addClass('active');
			var cont=t.closest('.suggestion_box');
			if(cont.hasScrollBar())
					cont.animate({scrollTop: cont.scrollTop() + (t.offset().top - cont.offset().top)},100);
			// lis.removeClass('.active');
			// console.log(lis.length);
	}

	var addToSuggestion=(ele)=>{
		clearInterval(lastAddedSuggestionInterval);
		ele=$(ele);
		var PARENT=ele.closest('.form-group');
		var INP=PARENT.find('input.suggestable');
		var $VAL=INP.val();
		var $MODEL=INP.attr('data-class-name');
		var BOX=PARENT.find('.suggestion_box');
		ajaxLoader(ele);
		postReq('ajax/add/suggestion/'+$MODEL+'/'+$VAL).then(data=>{
			BOX.hide();
			// alert("hi");
		}).catch((err)=>{
			ajaxLoader(ele);
			// console.log(	err);
		})
		// console.log("hi");
	}

	var addEventsForSearchBox=(t=true)=>{
		if(t)
			$(".suggestable").on('focusout',function(){
				ele=$(this);
				// console.log("hi");
				lastAddedSuggestionInterval=setTimeout(()=>{
						ele.closest('.form-group').find('.suggestion_box').hide();
				},200);

			});
		else{
			$(".suggestable").closest('.form-group').off('focusout');
		}

	}

	var isKeyCodeValid=(keycode)=>{
		 var valid =
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

        return valid;
	}
	var intiateSuggestions=()=>{
		$(".suggestable").off('keydown');
		$(".suggestable").on('keydown',function(){
				autoComplete(event,this);
		});
		addEventsForSearchBox();
	}
/***********************************************/


var getModalObject=(MODAL)=>{



		MODAL.returnBody=function(){
			return this.find('.modal-body').children();
		}

		MODAL.show=function(){
			this.modal('show');
			return this;

		}

		MODAL.hide=function(){
			this.modal('hide');
		}

		MODAL.body=function(htm){
			this.find('.modal-body').html(htm);
			// this.addEvents();
			return this;
		}

		MODAL.b=function(htm){
			this.find('.modal-body').html('<span></span>');
			return this.find('.modal-body').find('span');
			// this.addEvents();
		}

		MODAL.head=function(htm){
			this.find('.modal-header').html(htm);
			return this;
		}
		MODAL.title=function(txt){
			this.find('.modal-title').text(txt);
			return this;
		}
		MODAL.form=function(){
			return this.find('form');
		}
		MODAL.resetForm=function(){
			this.find('form').trigger('reset');
			this.find('.error').remove();
		}
		// MODAL.addEvents=function(){
		// 	this.find('.dateBox').datepicker({
		// 		format:'dd-mm-yyyy',
		// 		date: new Date(),
		// 	});

		// 	$('.timeBox').mdtimepicker();

		// 	this.find('.dateBox').focus(function(){
		// 		$('.datepicker-container').css('z-index',2000);
		// 	});
		// 	numCheck();
		// }

		MODAL.lg=function(){
			this.find('.modal-dialog').removeClass('modal-sm modal-md').addClass('modal-lg');
			return this;
		}
		MODAL.xs=function(){
			this.find('.modal-dialog').removeClass('modal-lg modal-md').addClass('modal-sm');
			return this;
		}
		MODAL.md=function(){
			this.find('.modal-dialog').removeClass('modal-lg modal-sm').addClass('modal-md');
			return this;
		}

		return MODAL.title(" ").body(" ");
	}


var checkBoxToggle = ()=>{
		$("input[type=checkbox][data-toggle-target]").click(function(){
			let ele = $(this);
			let target = $(ele.attr('data-toggle-target'));
			check(this,target);
		});

		let check = function(ele,target){
			if(ele.checked)
				target.fadeIn("fast");
			else
				target.fadeOut("fast");
		}

		let eles = $("input[type=checkbox][data-toggle-target]");
		$.each(eles,(i,e)=>{
			check(e,$($(e).attr('data-toggle-target')));
		});
	}
	const expandImage =()=>{
		$('img[expand-on-click]').click(function(){
			let ele  = $(this);
			Modal.body(`<img src="${ele.attr('src')}" class="img-fluid">`).head("").lg().show();
		});
	}

	const dataToExpand = ()=>{
		$('[data-to-expand]').click(function(){
			let ele = $(this);
			Modal.show().body(ele.find('template').html()).head(ele.attr('data-title')).lg();
		});
	}



	const trashUtil =(ele=null)=>{


		let askForPermission = (e)=>{
			confirmBox().then((d)=>{

				if(d.value)
					_trashItem(e);
				else
					TOAST("Cancelled",'info');

			})
		}

		let _trashItem = (ele)=>{
				ajaxLoader(ele);
				deleteReq(ele.attr('trash-url'),false).then((d)=>{
					_actionOnSuccess(ele);

					WARN(d.message,'success');
				}).catch((err)=>{
					ajaxLoader(ele);
				});
		}

		let _actionOnSuccess = (ele)=>{
			let temp = ele.closest(ele.attr('trash-item-to-remove'));
					temp.fadeOut('slow',(i)=>{
						// console.log(i);
						temp.remove();
					});
			if(ele.attr('trash-refresh-after'))
				setTimeout(()=>{location.reload()},ele.attr('trash-refresh-after'));
		}
		//For event listeners
		if(ele==null){
			$('a.trash').click(function(){
				let e = $(this);
				askForPermission(e);
			});
		}else{
			//for inline callbacks
			askForPermission($(ele));
		}
	}

const logout = ()=>{
	confirmBox("Logging Out ? ","See ya !",'info').then(d=>{
		// console.log(d);
		if(d.value)
			return window.location.href=`${__URL}/logout`;
	});
}