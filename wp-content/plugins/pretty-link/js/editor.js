!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=38)}([function(t,e){!function(){t.exports=this.wp.element}()},function(t,e){!function(){t.exports=this.wp.i18n}()},function(t,e){!function(){t.exports=this.wp.url}()},function(t,e){!function(){t.exports=this.wp.richText}()},function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},function(t,e){!function(){t.exports=this.wp.components}()},function(t,e){!function(){t.exports=this.wp.keycodes}()},function(t,e){!function(){t.exports=this.wp.blockEditor}()},function(t,e,n){var o=n(35);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}},function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},function(t,e,n){var o=n(36),r=n(4);t.exports=function(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?r(t):e}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}t.exports=function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){!function(){t.exports=this.lodash}()},function(t,e,n){"use strict";n.r(e);var o=n(12),r=n.n(o),i=n(11),s=n.n(i),a=n(10),c=n.n(a),l=n(9),u=n.n(l),f=n(4),p=n.n(f),d=n(8),h=n.n(d),v=n(21),b=n.n(v),g=n(26),m=n.n(g),y=n(0),w=n(13),k=n(15),O=n.n(k),j=n(25),L=n.n(j),S=n(1),x=n(6),E=n(5),_=n(17),C=n(24),T=n(19),R=n.n(T),N=n(2),P=n(20),A=function(t){return t.stopPropagation()},F=function(){var t=m()(b.a.mark(function t(e){var n;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,R()({url:Object(N.addQueryArgs)(ajaxurl,{action:"prli_search_for_links",term:e})});case 2:return n=t.sent,t.abrupt("return",Object(w.map)(n,function(t){return{url:t.pretty_url,title:Object(P.decodeEntities)(t.value)+" ("+Object(P.decodeEntities)(t.slug)+")"||Object(S.__)("(no title)")}}));case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),I=function(t){function e(t){var n,o=t.autocompleteRef;return r()(this,e),(n=c()(this,u()(e).apply(this,arguments))).onChange=n.onChange.bind(p()(n)),n.onKeyDown=n.onKeyDown.bind(p()(n)),n.autocompleteRef=o||Object(y.createRef)(),n.inputRef=Object(y.createRef)(),n.updateSuggestions=Object(w.throttle)(n.updateSuggestions.bind(p()(n)),200),n.suggestionNodes=[],n.state={suggestions:[],showSuggestions:!1,selectedSuggestion:null},n}return h()(e,t),s()(e,[{key:"componentDidUpdate",value:function(){var t=this,e=this.state,n=e.showSuggestions,o=e.selectedSuggestion;n&&null!==o&&!this.scrollingIntoView&&(this.scrollingIntoView=!0,L()(this.suggestionNodes[o],this.autocompleteRef.current,{onlyScrollIfNeeded:!0}),this.props.setTimeout(function(){t.scrollingIntoView=!1},100))}},{key:"componentWillUnmount",value:function(){delete this.suggestionsRequest}},{key:"bindSuggestionNode",value:function(t){var e=this;return function(n){e.suggestionNodes[t]=n}}},{key:"updateSuggestions",value:function(t){var e=this;if(t.length<2||/^https?:/.test(t))this.setState({showSuggestions:!1,selectedSuggestion:null,loading:!1});else{this.setState({showSuggestions:!0,selectedSuggestion:null,loading:!0});var n=F(t);n.then(function(t){e.suggestionsRequest===n&&(e.setState({suggestions:t,loading:!1}),t.length?e.props.debouncedSpeak(Object(S.sprintf)(Object(S._n)("%d result found, use up and down arrow keys to navigate.","%d results found, use up and down arrow keys to navigate.",t.length),t.length),"assertive"):e.props.debouncedSpeak(Object(S.__)("No results."),"assertive"))}).catch(function(){e.suggestionsRequest===n&&e.setState({loading:!1})}),this.suggestionsRequest=n}}},{key:"onChange",value:function(t){var e=t.target.value;this.props.onChange(e),this.updateSuggestions(e)}},{key:"onKeyDown",value:function(t){var e=this.state,n=e.showSuggestions,o=e.selectedSuggestion,r=e.suggestions,i=e.loading;if(n&&r.length&&!i){var s=this.state.suggestions[this.state.selectedSuggestion];switch(t.keyCode){case x.UP:t.stopPropagation(),t.preventDefault();var a=o?o-1:r.length-1;this.setState({selectedSuggestion:a});break;case x.DOWN:t.stopPropagation(),t.preventDefault();var c=null===o||o===r.length-1?0:o+1;this.setState({selectedSuggestion:c});break;case x.TAB:null!==this.state.selectedSuggestion&&(this.selectLink(s),this.props.speak(Object(S.__)("Link selected.")));break;case x.ENTER:null!==this.state.selectedSuggestion&&(t.stopPropagation(),this.selectLink(s))}}else switch(t.keyCode){case x.UP:0!==t.target.selectionStart&&(t.stopPropagation(),t.preventDefault(),t.target.setSelectionRange(0,0));break;case x.DOWN:this.props.value.length!==t.target.selectionStart&&(t.stopPropagation(),t.preventDefault(),t.target.setSelectionRange(this.props.value.length,this.props.value.length))}}},{key:"selectLink",value:function(t){this.props.onChange(t.url,t),this.setState({selectedSuggestion:null,showSuggestions:!1})}},{key:"handleOnClick",value:function(t){this.selectLink(t),this.inputRef.current.focus()}},{key:"render",value:function(){var t=this,e=this.props,n=e.value,o=void 0===n?"":n,r=e.autoFocus,i=void 0===r||r,s=e.instanceId,a=e.className,c=this.state,l=c.showSuggestions,u=c.suggestions,f=c.selectedSuggestion,p=c.loading,d="block-editor-url-input-suggestions-".concat(s),h="block-editor-url-input-suggestion-".concat(s);return Object(y.createElement)("div",{className:O()("editor-url-input block-editor-url-input",a)},Object(y.createElement)("input",{autoFocus:i,type:"text","aria-label":Object(S.__)("URL"),required:!0,value:o,onChange:this.onChange,onInput:A,placeholder:Object(S.__)("Paste or type to search for your Pretty Link"),onKeyDown:this.onKeyDown,role:"combobox","aria-expanded":l,"aria-autocomplete":"list","aria-owns":d,"aria-activedescendant":null!==f?"".concat(h,"-").concat(f):void 0,ref:this.inputRef}),p&&Object(y.createElement)(E.Spinner,null),l&&!!u.length&&Object(y.createElement)(E.Popover,{position:"bottom",noArrow:!0,focusOnMount:!1},Object(y.createElement)("div",{className:"editor-url-input__suggestions block-editor-url-input__suggestions",id:d,ref:this.autocompleteRef,role:"listbox"},u.map(function(e,n){return Object(y.createElement)("button",{key:e.id,role:"option",tabIndex:"-1",id:"".concat(h,"-").concat(n),ref:t.bindSuggestionNode(n),className:O()("editor-url-input__suggestion block-editor-url-input__suggestion",{"is-selected":n===f}),onClick:function(){return t.handleOnClick(e)},"aria-selected":n===f},e.title)}))))}}]),e}(y.Component);e.default=Object(_.compose)(_.withSafeTimeout,E.withSpokenMessages,_.withInstanceId,Object(C.withSelect)(function(t){return{fetchLinkSuggestions:(0,t("core/block-editor").getSettings)().__experimentalFetchLinkSuggestions}}))(I)},function(t,e,n){var o;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var i=typeof o;if("string"===i||"number"===i)t.push(o);else if(Array.isArray(o)&&o.length){var s=r.apply(null,o);s&&t.push(s)}else if("object"===i)for(var a in o)n.call(o,a)&&o[a]&&t.push(a)}}return t.join(" ")}void 0!==t&&t.exports?(r.default=r,t.exports=r):void 0===(o=function(){return r}.apply(e,[]))||(t.exports=o)}()},function(t,e,n){var o=n(32);t.exports=function(t,e){if(null==t)return{};var n,r,i=o(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)n=s[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(i[n]=t[n])}return i}},function(t,e){!function(){t.exports=this.wp.compose}()},function(t,e,n){"use strict";n.r(e);var o=n(12),r=n.n(o),i=n(11),s=n.n(i),a=n(10),c=n.n(a),l=n(9),u=n.n(l),f=n(4),p=n.n(f),d=n(8),h=n.n(d),v=n(23),b=n.n(v),g=n(16),m=n.n(g),y=n(0),w=n(15),k=n.n(w),O=n(1),j=n(5),L=n(6),S=n(22),x=n(2),E=n(3),_=n(7),C=(n(19),n(14)),T=(n(31),n(13));function R(t){if(!t)return!1;var e=t.trim();if(!e)return!1;if(/^\S+:/.test(e)){var n=Object(x.getProtocol)(e);if(!Object(x.isValidProtocol)(n))return!1;if(Object(T.startsWith)(n,"http")&&!/^https?:\/\/[^\/\s]/i.test(e))return!1;var o=Object(x.getAuthority)(e);if(!Object(x.isValidAuthority)(o))return!1;var r=Object(x.getPath)(e);if(r&&!Object(x.isValidPath)(r))return!1;var i=Object(x.getQueryString)(e);if(i&&!Object(x.isValidQueryString)(i))return!1;var s=Object(x.getFragment)(e);if(s&&!Object(x.isValidFragment)(s))return!1}return!(Object(T.startsWith)(e,"#")&&!Object(x.isValidFragment)(e))}function N(t){var e=t.url,n=t.opensInNewWindow,o=t.text,r=t.noFollow,i={type:"core/link",attributes:{url:e}};if(i.attributes.rel="",r&&(i.attributes.rel+="nofollow "),n){var s=Object(O.sprintf)(Object(O.__)("%s (opens in a new tab)"),o);i.attributes.target="_blank",i.attributes.rel+="noreferrer noopener",i.attributes["aria-label"]=s}return""===i.attributes.rel&&delete i.attributes.rel,i}var P=function(t){return t.stopPropagation()};function A(t,e){return t.addingLink||e.editLink}var F=function(t){var e=t.value,n=t.onChangeInputValue,o=t.onKeyDown,r=t.submitLink,i=t.autocompleteRef;return Object(y.createElement)("form",{className:"editor-format-toolbar__link-container-content block-editor-format-toolbar__link-container-content",onKeyPress:P,onKeyDown:o,onSubmit:r},Object(y.createElement)(C.default,{value:e,onChange:n,autocompleteRef:i}),Object(y.createElement)(j.IconButton,{icon:"editor-break",label:Object(O.__)("Insert Pretty Link"),type:"submit"}))},I=function(t){var e=t.url,n=Object(x.prependHTTP)(e),o=k()("editor-format-toolbar__link-container-value block-editor-format-toolbar__link-container-value",{"has-invalid-link":!R(n)});return e?Object(y.createElement)(j.ExternalLink,{className:o,href:e},Object(x.filterURLForDisplay)(Object(x.safeDecodeURI)(e))):Object(y.createElement)("span",{className:o})},U=function(t){var e=t.isActive,n=t.addingLink,o=t.value,r=m()(t,["isActive","addingLink","value"]),i=Object(y.useMemo)(function(){var t=window.getSelection(),e=t.rangeCount>0?t.getRangeAt(0):null;if(e){if(n)return Object(S.getRectangleFromRange)(e);var o=e.startContainer;for(o=o.nextElementSibling||o;o.nodeType!==window.Node.ELEMENT_NODE;)o=o.parentNode;var r=o.closest("a");return r?r.getBoundingClientRect():void 0}},[e,n,o.start,o.end]);return i?Object(y.createElement)(_.URLPopover,b()({anchorRect:i},r)):null},W=function(t){var e=t.url,n=t.editLink;return Object(y.createElement)("div",{className:"editor-format-toolbar__link-container-content block-editor-format-toolbar__link-container-content",onKeyPress:P},Object(y.createElement)(I,{url:e}),Object(y.createElement)(j.IconButton,{icon:"edit",label:Object(O.__)("Edit"),onClick:n}))},D=function(t){function e(){var t;return r()(this,e),(t=c()(this,u()(e).apply(this,arguments))).editLink=t.editLink.bind(p()(t)),t.submitLink=t.submitLink.bind(p()(t)),t.onKeyDown=t.onKeyDown.bind(p()(t)),t.onChangeInputValue=t.onChangeInputValue.bind(p()(t)),t.setNoFollow=t.setNoFollow.bind(p()(t)),t.setLinkTarget=t.setLinkTarget.bind(p()(t)),t.onClickOutside=t.onClickOutside.bind(p()(t)),t.resetState=t.resetState.bind(p()(t)),t.autocompleteRef=Object(y.createRef)(),t.state={noFollow:!1,opensInNewWindow:!1,inputValue:"",newLinkUrl:"",newLinkSlug:"",creatingLink:!1,createdLink:!1,createdLinkError:!1},t}return h()(e,t),s()(e,[{key:"onKeyDown",value:function(t){[L.LEFT,L.DOWN,L.RIGHT,L.UP,L.BACKSPACE,L.ENTER].indexOf(t.keyCode)>-1&&t.stopPropagation()}},{key:"onChangeInputValue",value:function(t){this.setState({inputValue:t})}},{key:"setLinkTarget",value:function(t){var e=this.props,n=e.activeAttributes.url,o=void 0===n?"":n,r=e.value,i=e.onChange;if(this.setState({opensInNewWindow:t}),!A(this.props,this.state)){var s=Object(E.getTextContent)(Object(E.slice)(r));i(Object(E.applyFormat)(r,N({url:o,opensInNewWindow:t,text:s})))}}},{key:"setNoFollow",value:function(t){var e=this.props,n=e.activeAttributes.url,o=void 0===n?"":n,r=e.value,i=e.onChange;if(this.setState({noFollow:t}),!A(this.props,this.state)){var s=Object(E.getTextContent)(Object(E.slice)(r));i(Object(E.applyFormat)(r,N({url:o,opensInNewWindow:opensInNewWindow,text:s,noFollow:t})))}}},{key:"editLink",value:function(t){this.setState({editLink:!0}),t.preventDefault()}},{key:"submitLink",value:function(t){var e=this.props,n=e.isActive,o=e.value,r=e.onChange,i=e.speak,s=this.state,a=s.inputValue,c=s.opensInNewWindow,l=s.noFollow,u=Object(x.prependHTTP)(a),f=N({url:u,opensInNewWindow:c,text:Object(E.getTextContent)(Object(E.slice)(o)),noFollow:l});if(t.preventDefault(),Object(E.isCollapsed)(o)&&!n){var p=Object(E.applyFormat)(Object(E.create)({text:u}),f,0,u.length);r(Object(E.insert)(o,p))}else r(Object(E.applyFormat)(o,f));this.resetState(),R(u)?i(n?Object(O.__)("Link edited."):Object(O.__)("Link inserted."),"assertive"):i(Object(O.__)("Warning: the link has been inserted but may have errors. Please test it."),"assertive")}},{key:"onClickOutside",value:function(t){var e=this.autocompleteRef.current;e&&e.contains(t.target)||this.resetState()}},{key:"resetState",value:function(){this.props.stopAddingLink(),this.setState({editLink:!1})}},{key:"render",value:function(){var t=this,e=this.props,n=e.isActive,o=e.activeAttributes.url,r=e.addingLink,i=e.value;if(!n&&!r)return null;var s=this.state,a=s.inputValue,c=s.noFollow,l=s.opensInNewWindow,u=s.newLinkUrl,f=s.newLinkSlug,p=s.creatingLink,d=s.createdLink,h=s.createdLinkError,v=A(this.props,this.state);return Object(y.createElement)(U,{className:"pretty-link-inserter",value:i,isActive:n,addingLink:r,onClickOutside:this.onClickOutside,onClose:this.resetState,focusOnMount:!!v&&"firstElement",renderSettings:function(){return Object(y.createElement)(y.Fragment,null,Object(y.createElement)("div",null,Object(y.createElement)(j.ToggleControl,{label:Object(O.__)("Open in New Tab"),checked:l,onChange:t.setLinkTarget}),Object(y.createElement)(j.ToggleControl,{label:Object(O.__)("Nofollow"),checked:c,onChange:t.setNoFollow})),Object(y.createElement)("div",{className:"pretty-link-inserter-form-container"},d&&Object(y.createElement)(j.Notice,{status:"success",onRemove:function(){return t.setState({createdLink:!1})}},Object(y.createElement)("p",null,Object(O.__)("Pretty Link created successfully.","memberpress"))),h&&Object(y.createElement)(j.Notice,{status:"error",onRemove:function(){return t.setState({createdLink:!1,createdLinkError:!1})}},Object(y.createElement)("p",null,Object(O.__)("Pretty Link could not be created. Please try a slug that is not already used.","memberpress"))),Object(y.createElement)("strong",null,Object(O.__)("New Pretty Link","pretty-link")),Object(y.createElement)("form",{onSubmit:function(e){e.preventDefault(),t.setState({creatingLink:!0,createdLinkError:!1}),function(t,e){return new Promise(function(n,o){jQuery.post(ajaxurl,{action:"prli_create_pretty_link",target:t,slug:e,redirect:"",nofollow:1,tracking:1},function(t,e,r){"true"===t?n(t):o(t)}).fail(function(t){o(t)})})}(u,f).then(function(e){t.setState({createdLink:!0,creatingLink:!1,inputValue:plEditor.homeUrl+f,newLinkUrl:"",newLinkSlug:""})}).catch(function(e){t.setState({createdLink:!1,creatingLink:!1,createdLinkError:!0})})}},Object(y.createElement)("p",null,Object(y.createElement)(j.TextControl,{placeholder:"URL",className:"pretty-link-new-link-url",value:u,onChange:function(e){t.setState({newLinkUrl:e})}})),Object(y.createElement)("p",null,Object(y.createElement)(j.TextControl,{placeholder:"Slug",className:"pretty-link-new-link-slug",value:f,onChange:function(e){t.setState({newLinkSlug:e})}})),Object(y.createElement)("p",null,Object(y.createElement)("button",{className:"pretty-link-submit-new-link components-button is-button is-primary",onClick:function(){console.log("Creating new Pretty Link...")}},Object(O.__)("Create New Pretty Link","pretty-link")),p&&Object(y.createElement)(j.Spinner,null)))))}},v?Object(y.createElement)(F,{value:a,onChangeInputValue:this.onChangeInputValue,onKeyDown:this.onKeyDown,submitLink:this.submitLink,autocompleteRef:this.autocompleteRef}):Object(y.createElement)(W,{url:o,editLink:this.editLink}))}}],[{key:"getDerivedStateFromProps",value:function(t,e){var n=t.activeAttributes,o=n.url,r="_blank"===n.target;if(!A(t,e)){if(o!==e.inputValue)return{inputValue:o};if(r!==e.opensInNewWindow)return{opensInNewWindow:r}}return null}}]),e}(y.Component);e.default=Object(j.withSpokenMessages)(D)},function(t,e){!function(){t.exports=this.wp.apiFetch}()},function(t,e){!function(){t.exports=this.wp.htmlEntities}()},function(t,e){!function(){t.exports=this.regeneratorRuntime}()},function(t,e){!function(){t.exports=this.wp.dom}()},function(t,e){function n(){return t.exports=n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},n.apply(this,arguments)}t.exports=n},function(t,e){!function(){t.exports=this.wp.data}()},function(t,e,n){"use strict";t.exports=n(34)},function(t,e){function n(t,e,n,o,r,i,s){try{var a=t[i](s),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(o,r)}t.exports=function(t){return function(){var e=this,o=arguments;return new Promise(function(r,i){var s=t.apply(e,o);function a(t){n(s,r,i,a,c,"next",t)}function c(t){n(s,r,i,a,c,"throw",t)}a(void 0)})}}},function(t,e,n){"use strict";n.r(e),n.d(e,"prettyLink",function(){return x});var o=n(16),r=n.n(o),i=n(12),s=n.n(i),a=n(11),c=n.n(a),l=n(10),u=n.n(l),f=n(9),p=n.n(f),d=n(4),h=n.n(d),v=n(8),b=n.n(v),g=n(0),m=n(1),y=n(5),w=n(3),k=n(2),O=n(7),j=n(18),L="pretty-link/pretty-link",S=Object(m.__)("Pretty Link"),x={name:L,title:S,tagName:"a",className:"pretty-link",attributes:{url:"href",target:"target"},edit:Object(y.withSpokenMessages)(function(t){function e(){var t;return s()(this,e),(t=u()(this,p()(e).apply(this,arguments))).addLink=t.addLink.bind(h()(t)),t.stopAddingLink=t.stopAddingLink.bind(h()(t)),t.onRemoveFormat=t.onRemoveFormat.bind(h()(t)),t.state={addingLink:!1},t}return b()(e,t),c()(e,[{key:"addLink",value:function(){var t=this.props,e=t.value,n=t.onChange,o=Object(w.getTextContent)(Object(w.slice)(e));o&&Object(k.isURL)(o)?n(Object(w.applyFormat)(e,{type:L,attributes:{url:o}})):this.setState({addingLink:!0})}},{key:"stopAddingLink",value:function(){this.setState({addingLink:!1})}},{key:"onRemoveFormat",value:function(){var t=this.props,e=t.value,n=t.onChange,o=t.speak;n(Object(w.removeFormat)(e,L)),o(Object(m.__)("Link removed."),"assertive")}},{key:"render",value:function(){var t=this.props,e=t.isActive,n=t.activeAttributes,o=t.value,r=t.onChange;return Object(g.createElement)(g.Fragment,null,Object(g.createElement)(O.RichTextShortcut,{type:"primary",character:"p",onUse:this.addLink}),Object(g.createElement)(O.RichTextShortcut,{type:"primaryShift",character:"p",onUse:this.onRemoveFormat}),e&&Object(g.createElement)(O.RichTextToolbarButton,{icon:"star-filled",title:Object(m.__)("Unlink"),onClick:this.onRemoveFormat,isActive:e,shortcutType:"primaryShift",shortcutCharacter:"p"}),!e&&Object(g.createElement)(O.RichTextToolbarButton,{icon:"star-filled",title:S,onClick:this.addLink,isActive:e,shortcutType:"primary",shortcutCharacter:"p"}),Object(g.createElement)(j.default,{addingLink:this.state.addingLink,stopAddingLink:this.stopAddingLink,isActive:e,activeAttributes:n,value:o,onChange:r}))}}]),e}(g.Component))};[x].forEach(function(t){var e=t.name,n=r()(t,["name"]);return Object(w.registerFormatType)(e,n)})},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(t,e,n){var o={},r=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),i=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var o=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}e[t]=o}return e[t]}}(),s=null,a=0,c=[],l=n(28);function u(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=o[r.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](r.parts[s]);for(;s<r.parts.length;s++)i.parts.push(b(r.parts[s],e))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(b(r.parts[s],e));o[r.id]={id:r.id,refs:1,parts:a}}}}function f(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],s=e.base?i[0]+e.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};o[s]?o[s].parts.push(a):n.push(o[s]={id:s,parts:[a]})}return n}function p(t,e){var n=i(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=c[c.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),c.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=i(t.insertAt.before,n);n.insertBefore(e,r)}}function d(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=c.indexOf(t);e>=0&&c.splice(e,1)}function h(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var o=function(){0;return n.nc}();o&&(t.attrs.nonce=o)}return v(e,t.attrs),p(t,e),e}function v(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function b(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=i}if(e.singleton){var c=a++;n=s||(s=h(e)),o=m.bind(null,n,c,!1),r=m.bind(null,n,c,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(e,t.attrs),p(t,e),e}(e),o=function(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=l(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([o],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,e),r=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=h(e),o=function(t,e){var n=e.css,o=e.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){d(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=r()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=f(t,e);return u(n,e),function(t){for(var r=[],i=0;i<n.length;i++){var s=n[i];(a=o[s.id]).refs--,r.push(a)}t&&u(f(t,e),e);for(i=0;i<r.length;i++){var a;if(0===(a=r[i]).refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete o[a.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function m(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var i=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}},function(t,e){t.exports=".pretty-link-inserter .block-editor-url-popover__settings {\n  display: block; }\n\n.pretty-link-inserter .pretty-link-inserter-form-container {\n  margin-top: 30px; }\n"},function(t,e,n){var o=n(30);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(29)(o,r);o.locals&&(t.exports=o.locals)},function(t,e){t.exports=function(t,e){if(null==t)return{};var n,o,r={},i=Object.keys(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}},function(t,e,n){"use strict";var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function i(t,e){var n=t["page"+(e?"Y":"X")+"Offset"],o="scroll"+(e?"Top":"Left");if("number"!=typeof n){var r=t.document;"number"!=typeof(n=r.documentElement[o])&&(n=r.body[o])}return n}function s(t){return i(t)}function a(t){return i(t,!0)}function c(t){var e=function(t){var e,n=void 0,o=void 0,r=t.ownerDocument,i=r.body,s=r&&r.documentElement;return n=(e=t.getBoundingClientRect()).left,o=e.top,{left:n-=s.clientLeft||i.clientLeft||0,top:o-=s.clientTop||i.clientTop||0}}(t),n=t.ownerDocument,o=n.defaultView||n.parentWindow;return e.left+=s(o),e.top+=a(o),e}var l=new RegExp("^("+/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source+")(?!px)[a-z%]+$","i"),u=/^(top|right|bottom|left)$/,f="currentStyle",p="runtimeStyle",d="left",h="px";var v=void 0;function b(t,e){for(var n=0;n<t.length;n++)e(t[n])}function g(t){return"border-box"===v(t,"boxSizing")}"undefined"!=typeof window&&(v=window.getComputedStyle?function(t,e,n){var o="",r=t.ownerDocument,i=n||r.defaultView.getComputedStyle(t,null);return i&&(o=i.getPropertyValue(e)||i[e]),o}:function(t,e){var n=t[f]&&t[f][e];if(l.test(n)&&!u.test(e)){var o=t.style,r=o[d],i=t[p][d];t[p][d]=t[f][d],o[d]="fontSize"===e?"1em":n||0,n=o.pixelLeft+h,o[d]=r,t[p][d]=i}return""===n?"auto":n});var m=["margin","border","padding"],y=-1,w=2,k=1;function O(t,e,n){var o=0,r=void 0,i=void 0,s=void 0;for(i=0;i<e.length;i++)if(r=e[i])for(s=0;s<n.length;s++){var a=void 0;a="border"===r?r+n[s]+"Width":r+n[s],o+=parseFloat(v(t,a))||0}return o}function j(t){return null!=t&&t==t.window}var L={};function S(t,e,n){if(j(t))return"width"===e?L.viewportWidth(t):L.viewportHeight(t);if(9===t.nodeType)return"width"===e?L.docWidth(t):L.docHeight(t);var o="width"===e?["Left","Right"]:["Top","Bottom"],r="width"===e?t.offsetWidth:t.offsetHeight,i=(v(t),g(t)),s=0;(null==r||r<=0)&&(r=void 0,(null==(s=v(t,e))||Number(s)<0)&&(s=t.style[e]||0),s=parseFloat(s)||0),void 0===n&&(n=i?k:y);var a=void 0!==r||i,c=r||s;if(n===y)return a?c-O(t,["border","padding"],o):s;if(a){var l=n===w?-O(t,["border"],o):O(t,["margin"],o);return c+(n===k?0:l)}return s+O(t,m.slice(n),o)}b(["Width","Height"],function(t){L["doc"+t]=function(e){var n=e.document;return Math.max(n.documentElement["scroll"+t],n.body["scroll"+t],L["viewport"+t](n))},L["viewport"+t]=function(e){var n="client"+t,o=e.document,r=o.body,i=o.documentElement[n];return"CSS1Compat"===o.compatMode&&i||r&&r[n]||i}});var x={position:"absolute",visibility:"hidden",display:"block"};function E(t){var e=void 0,n=arguments;return 0!==t.offsetWidth?e=S.apply(void 0,n):function(t,e,n){var o={},r=t.style,i=void 0;for(i in e)e.hasOwnProperty(i)&&(o[i]=r[i],r[i]=e[i]);for(i in n.call(t),e)e.hasOwnProperty(i)&&(r[i]=o[i])}(t,x,function(){e=S.apply(void 0,n)}),e}function _(t,e,n){var o=n;if("object"!==(void 0===e?"undefined":r(e)))return void 0!==o?("number"==typeof o&&(o+="px"),void(t.style[e]=o)):v(t,e);for(var i in e)e.hasOwnProperty(i)&&_(t,i,e[i])}b(["width","height"],function(t){var e=t.charAt(0).toUpperCase()+t.slice(1);L["outer"+e]=function(e,n){return e&&E(e,t,n?0:k)};var n="width"===t?["Left","Right"]:["Top","Bottom"];L[t]=function(e,o){if(void 0===o)return e&&E(e,t,y);if(e){v(e);return g(e)&&(o+=O(e,["padding","border"],n)),_(e,t,o)}}}),t.exports=o({getWindow:function(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow},offset:function(t,e){if(void 0===e)return c(t);!function(t,e){"static"===_(t,"position")&&(t.style.position="relative");var n=c(t),o={},r=void 0,i=void 0;for(i in e)e.hasOwnProperty(i)&&(r=parseFloat(_(t,i))||0,o[i]=r+e[i]-n[i]);_(t,o)}(t,e)},isWindow:j,each:b,css:_,clone:function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);if(t.overflow)for(var n in t)t.hasOwnProperty(n)&&(e.overflow[n]=t.overflow[n]);return e},scrollLeft:function(t,e){if(j(t)){if(void 0===e)return s(t);window.scrollTo(e,a(t))}else{if(void 0===e)return t.scrollLeft;t.scrollLeft=e}},scrollTop:function(t,e){if(j(t)){if(void 0===e)return a(t);window.scrollTo(s(t),e)}else{if(void 0===e)return t.scrollTop;t.scrollTop=e}},viewportWidth:0,viewportHeight:0},L)},function(t,e,n){"use strict";var o=n(33);t.exports=function(t,e,n){n=n||{},9===e.nodeType&&(e=o.getWindow(e));var r=n.allowHorizontalScroll,i=n.onlyScrollIfNeeded,s=n.alignWithTop,a=n.alignWithLeft,c=n.offsetTop||0,l=n.offsetLeft||0,u=n.offsetBottom||0,f=n.offsetRight||0;r=void 0===r||r;var p=o.isWindow(e),d=o.offset(t),h=o.outerHeight(t),v=o.outerWidth(t),b=void 0,g=void 0,m=void 0,y=void 0,w=void 0,k=void 0,O=void 0,j=void 0,L=void 0,S=void 0;p?(O=e,S=o.height(O),L=o.width(O),j={left:o.scrollLeft(O),top:o.scrollTop(O)},w={left:d.left-j.left-l,top:d.top-j.top-c},k={left:d.left+v-(j.left+L)+f,top:d.top+h-(j.top+S)+u},y=j):(b=o.offset(e),g=e.clientHeight,m=e.clientWidth,y={left:e.scrollLeft,top:e.scrollTop},w={left:d.left-(b.left+(parseFloat(o.css(e,"borderLeftWidth"))||0))-l,top:d.top-(b.top+(parseFloat(o.css(e,"borderTopWidth"))||0))-c},k={left:d.left+v-(b.left+m+(parseFloat(o.css(e,"borderRightWidth"))||0))+f,top:d.top+h-(b.top+g+(parseFloat(o.css(e,"borderBottomWidth"))||0))+u}),w.top<0||k.top>0?!0===s?o.scrollTop(e,y.top+w.top):!1===s?o.scrollTop(e,y.top+k.top):w.top<0?o.scrollTop(e,y.top+w.top):o.scrollTop(e,y.top+k.top):i||((s=void 0===s||!!s)?o.scrollTop(e,y.top+w.top):o.scrollTop(e,y.top+k.top)),r&&(w.left<0||k.left>0?!0===a?o.scrollLeft(e,y.left+w.left):!1===a?o.scrollLeft(e,y.left+k.left):w.left<0?o.scrollLeft(e,y.left+w.left):o.scrollLeft(e,y.left+k.left):i||((a=void 0===a||!!a)?o.scrollLeft(e,y.left+w.left):o.scrollLeft(e,y.left+k.left)))}},function(t,e){function n(e,o){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,o)}t.exports=n},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(e){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?t.exports=o=function(t){return n(t)}:t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},o(e)}t.exports=o},function(t,e,n){"use strict";n.r(e);var o=n(14);n.d(e,"URLInput",function(){return o.default})},function(t,e,n){n(37),n(18),n(14),t.exports=n(27)}]);