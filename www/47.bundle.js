webpackJsonp([47],{175:function(t,e){var i,n,o=t.exports={};function r(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function l(t){if(i===setTimeout)return setTimeout(t,0);if((i===r||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}!function(){try{i="function"===typeof setTimeout?setTimeout:r}catch(t){i=r}try{n="function"===typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var a,c=[],d=!1,h=-1;function u(){d&&a&&(d=!1,a.length?c=a.concat(c):h=-1,c.length&&f())}function f(){if(!d){var t=l(u);d=!0;for(var e=c.length;e;){for(a=c,c=[];++h<e;)a&&a[h].run();h=-1,e=c.length}a=null,d=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];c.push(new m(t,e)),1!==c.length||d||l(f)},m.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=p,o.addListener=p,o.once=p,o.off=p,o.removeListener=p,o.removeAllListeners=p,o.emit=p,o.prependListener=p,o.prependOnceListener=p,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},420:function(t,e,i){(function(n){var o;!function(r,s){"use strict";"object"===typeof t&&n&&n.versions&&n.versions.electron||"object"!==typeof t?void 0===(o=function(){return s}.call(e,i,e,t))||(t.exports=o):t.exports=s}(0,function(){"use strict";function t(t,e,i){if(void 0!==t.getSelection&&e){var n=t.createRange(),o=t.getSelection();i?n.setStartBefore(e):n.setStartAfter(e),n.collapse(!0),o.removeAllRanges(),o.addRange(n)}}function e(t,e){var i=!(!t||!t.tagName)&&t.tagName.toLowerCase();if(!i)return!1;for(;i&&"body"!==i;){if(i===e)return t;i=!(!(t=t.parentNode)||!t.tagName)&&t.tagName.toLowerCase()}}function i(t,e,i,n){return this.init(t,e,i,n)}function n(t){return this.init(t)}function o(t){return this.init(t)}i.prototype={init:function(t,e,i,n){return this._root=t,this._callback=e,this.rows=i,this.columns=n,this._render()},setCurrentCell:function(t){this._currentCell=t},markCells:function(){[].forEach.call(this._cellsElements,function(t){var e=parseInt(t.dataset.column,10),i=parseInt(t.dataset.row,10);!0===(this._currentCell&&i<=this._currentCell.row&&e<=this._currentCell.column)?t.classList.add("active"):t.classList.remove("active")}.bind(this))},_generateCells:function(){var t=-1;this._cells=[];for(var e=0;e<this.rows*this.columns;e++){var i=e%this.columns;0===i&&t++,this._cells.push({column:i,row:t,active:!1})}},_html:function(){var t='<div class="medium-editor-table-builder-grid clearfix" style="width:'+(this.columns*r+2*s)+"px;height:"+(this.rows*r+2*s)+'px;">';return t+=this._cellsHTML(),t+="</div>"},_cellsHTML:function(){var t="";return this._generateCells(),this._cells.map(function(e){t+='<a href="#" class="medium-editor-table-builder-cell'+(!0===e.active?" active":"")+'" data-row="'+e.row+'" data-column="'+e.column+'">',t+="</a>"}),t},_render:function(){this._root.innerHTML=this._html(),this._cellsElements=this._root.querySelectorAll("a"),this._bindEvents()},_bindEvents:function(){[].forEach.call(this._cellsElements,function(t){this._onMouseEnter(t),this._onClick(t)}.bind(this))},_onMouseEnter:function(t){var e,i=this;t.addEventListener("mouseenter",function(){clearTimeout(e);var t=this.dataset;e=setTimeout(function(){i._currentCell={column:parseInt(t.column,10),row:parseInt(t.row,10)},i.markCells()},50)})},_onClick:function(t){var e=this;t.addEventListener("click",function(t){t.preventDefault(),e._callback(this.dataset.row,this.dataset.column)})}},n.prototype={init:function(t){this.options=t,this._doc=t.ownerDocument||document,this._root=this._doc.createElement("div"),this._root.className="medium-editor-table-builder",this.grid=new i(this._root,this.options.onClick,this.options.rows,this.options.columns),this._range=null,this._toolbar=this._doc.createElement("div"),this._toolbar.className="medium-editor-table-builder-toolbar";var e=this._doc.createElement("span");e.innerHTML="Row:",this._toolbar.appendChild(e);var n=this._doc.createElement("button");n.title="Add row before",n.innerHTML='<i class="fa fa-long-arrow-up"></i>',n.onclick=this.addRow.bind(this,!0),this._toolbar.appendChild(n);var o=this._doc.createElement("button");o.title="Add row after",o.innerHTML='<i class="fa fa-long-arrow-down"></i>',o.onclick=this.addRow.bind(this,!1),this._toolbar.appendChild(o);var r=this._doc.createElement("button");r.title="Remove row",r.innerHTML='<i class="fa fa-close"></i>',r.onclick=this.removeRow.bind(this),this._toolbar.appendChild(r);var s=this._doc.createElement("span");s.innerHTML="Column:",this._toolbar.appendChild(s);var l=this._doc.createElement("button");l.title="Add column before",l.innerHTML='<i class="fa fa-long-arrow-left"></i>',l.onclick=this.addColumn.bind(this,!0),this._toolbar.appendChild(l);var a=this._doc.createElement("button");a.title="Add column after",a.innerHTML='<i class="fa fa-long-arrow-right"></i>',a.onclick=this.addColumn.bind(this,!1),this._toolbar.appendChild(a);var c=this._doc.createElement("button");c.title="Remove column",c.innerHTML='<i class="fa fa-close"></i>',c.onclick=this.removeColumn.bind(this),this._toolbar.appendChild(c);var d=this._doc.createElement("button");d.title="Remove table",d.innerHTML='<i class="fa fa-trash-o"></i>',d.onclick=this.removeTable.bind(this),this._toolbar.appendChild(d);var h=this._root.childNodes[0];this._root.insertBefore(this._toolbar,h)},getElement:function(){return this._root},hide:function(){this._root.style.display="",this.grid.setCurrentCell({column:-1,row:-1}),this.grid.markCells()},show:function(t){this._root.style.display="block",this._root.style.left=t+"px"},setEditor:function(t,e){(this._range=t,this._toolbar.style.display="block",e)&&(this._doc.getElementsByClassName("medium-editor-table-builder-grid")[0].style.display="none")},setBuilder:function(){this._range=null,this._toolbar.style.display="none";var t=this._doc.getElementsByClassName("medium-editor-table-builder-grid");t[0].style.display="block";for(var e=0;e<t.length;e++)t[e].style.height=r*this.rows+2*s+"px",t[e].style.width=r*this.columns+2*s+"px"},getParentType:function(t,e){var i=!(!t||!t.nodeName)&&t.nodeName.toLowerCase();if(!i)return!1;for(;i&&"body"!==i;){if(i===e)return t;i=!(!(t=t.parentNode)||!t.nodeName)&&t.nodeName.toLowerCase()}},addRow:function(t,e){e.preventDefault(),e.stopPropagation();for(var i,n=this.getParentType(this._range,"tbody"),o=this.getParentType(this._range,"tr"),r=this._doc.createElement("tr"),s=0;s<o.childNodes.length;s++)(i=this._doc.createElement("td")).appendChild(this._doc.createElement("br")),r.appendChild(i);!0!==t&&o.nextSibling?n.insertBefore(r,o.nextSibling):!0===t?n.insertBefore(r,o):n.appendChild(r),this.options.onClick(0,0)},removeRow:function(t){t.preventDefault(),t.stopPropagation();var e=this.getParentType(this._range,"tbody"),i=this.getParentType(this._range,"tr");e.removeChild(i),this.options.onClick(0,0)},addColumn:function(t,e){e.preventDefault(),e.stopPropagation();for(var i,n=this.getParentType(this._range,"tr"),o=this.getParentType(this._range,"td"),r=Array.prototype.indexOf.call(n.childNodes,o),s=this.getParentType(this._range,"tbody"),l=0;l<s.childNodes.length;l++)(i=this._doc.createElement("td")).appendChild(this._doc.createElement("br")),!0===t?s.childNodes[l].insertBefore(i,s.childNodes[l].childNodes[r]):s.childNodes[l].childNodes[r].nextSibling?s.childNodes[l].insertBefore(i,s.childNodes[l].childNodes[r].nextSibling):s.childNodes[l].appendChild(i);this.options.onClick(0,0)},removeColumn:function(t){t.preventDefault(),t.stopPropagation();for(var e=this.getParentType(this._range,"tr"),i=this.getParentType(this._range,"td"),n=Array.prototype.indexOf.call(e.childNodes,i),o=this.getParentType(this._range,"tbody"),r=o.childNodes.length,s=0;s<r;s++)o.childNodes[s].removeChild(o.childNodes[s].childNodes[n]);this.options.onClick(0,0)},removeTable:function(t){t.preventDefault(),t.stopPropagation();var e=this.getParentType(this._range,"tr"),i=this.getParentType(this._range,"td"),n=(Array.prototype.indexOf.call(e.childNodes,i),this.getParentType(this._range,"table"));n.parentNode.removeChild(n),this.options.onClick(0,0)}};o.prototype={init:function(t){this._editor=t,this._doc=this._editor.options.ownerDocument,this._bindTabBehavior()},insert:function(e,i){var n=this._html(e,i);this._editor.pasteHTML('<table class="medium-editor-table" id="medium-editor-table" width="100%"><tbody id="medium-editor-table-tbody">'+n+"</tbody></table>",{cleanAttrs:[],cleanTags:[]});var o=this._doc.getElementById("medium-editor-table"),r=this._doc.getElementById("medium-editor-table-tbody");0===$(o).find("#medium-editor-table-tbody").length&&$(r).detach().appendTo(o),r.removeAttribute("id"),o.removeAttribute("id"),t(this._doc,o.querySelector("td"),!0),this._editor.checkSelection()},_html:function(t,e){var i,n,o,r="",s=(o=this._doc).getSelection?o.getSelection().toString():o.selection&&"Control"!==o.selection.type?o.selection.createRange().text:"";for(i=0;i<=t;i++){for(r+="<tr>",n=0;n<=e;n++)r+="<td>"+(0===i&&0===n?s:"<br />")+"</td>";r+="</tr>"}return r},_bindTabBehavior:function(){var t=this;[].forEach.call(this._editor.elements,function(e){e.addEventListener("keydown",function(e){t._onKeyDown(e)})})},_onKeyDown:function(i){var n,o,r,s=(o=this._doc,(r=o.getSelection().anchorNode)&&3===r.nodeType?r.parentNode:r);9===i.which&&function(t,e){if(!t)return!1;for(var i=t.parentNode,n=i.tagName.toLowerCase();"body"!==n;){if(n===e)return!0;if(!(i=i.parentNode)||!i.tagName)return!1;n=i.tagName.toLowerCase()}return!1}(s,"table")&&(i.preventDefault(),i.stopPropagation(),n=this._getTableElements(s),i.shiftKey?this._tabBackwards(s.previousSibling,n.row):(this._isLastCell(s,n.row,n.root)&&this._insertRow(e(s,"tbody"),n.row.cells.length),t(this._doc,s)))},_getTableElements:function(t){return{cell:e(t,"td"),row:e(t,"tr"),root:e(t,"table")}},_tabBackwards:function(e,i){e=e||this._getPreviousRowLastCell(i),t(this._doc,e,!0)},_insertRow:function(t,e){var i,n=document.createElement("tr"),o="";for(i=0;i<e;i+=1)o+="<td><br /></td>";n.innerHTML=o,t.appendChild(n)},_isLastCell:function(t,e,i){return e.cells.length-1===t.cellIndex&&i.rows.length-1===e.rowIndex},_getPreviousRowLastCell:function(t){if(t=t.previousSibling)return t.cells[t.cells.length-1]}};var r=16,s=1;return MediumEditor.extensions.form.extend({name:"table",aria:"create table",action:"table",contentDefault:"TBL",contentFA:'<i class="fa fa-table"></i>',handleClick:function(t){t.preventDefault(),t.stopPropagation(),this[!0===this.isActive()?"hide":"show"]()},hide:function(){this.setInactive(),this.builder.hide()},show:function(){this.setActive();var t=MediumEditor.selection.getSelectionRange(this.document);"td"===t.startContainer.nodeName.toLowerCase()||"td"===t.endContainer.nodeName.toLowerCase()||MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(t),"td")?this.builder.setEditor(MediumEditor.selection.getSelectedParentElement(t),this.restrictNestedTable):this.builder.setBuilder(),this.builder.show(this.button.offsetLeft)},getForm:function(){return this.builder||(this.builder=new n({onClick:function(t,e){(t>0||e>0)&&this.table.insert(t,e),this.hide()}.bind(this),ownerDocument:this.document,rows:this.rows||10,columns:this.columns||10}),this.table=new o(this.base)),this.builder.getElement()}})}())}).call(e,i(175))}});