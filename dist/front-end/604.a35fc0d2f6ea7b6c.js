"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[604],{8604:(v,f,a)=>{a.r(f),a.d(f,{UsersRoutingModule:()=>et});var r=a(3476),g=a(9073),l=a(5226),m=a.n(l),t=a(1223),c=a(8386),d=a(9808),_=a(3195),A=a(8953);function Z(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"app-card-detail",5),t.NdJ("newStatus",function(i){return t.CHM(e),t.oxw().changeStatus(i)}),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("userActive",e.userActive)}}function x(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"app-form-general-info",6),t.NdJ("userInfo",function(i){return t.CHM(e),t.oxw().updateUserInfo(i)}),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("isNew",!1)("userActive",e.userActive)}}let U=(()=>{class n{constructor(e,o,i){this.activatedRoute=e,this.router=o,this.userService=i}ngOnInit(){this.activatedRoute.params.subscribe(({userId:e})=>this.findUser(+e))}findUser(e){this.userService.getUserByID(e).subscribe(o=>{if(404===o.status)return this.router.navigate(["/users"]);this.userActive=o.user})}updateUserInfo(e){this.userService.updateUser(this.userActive.id_user,e).subscribe(o=>null===o?m().fire("Ocurrio un error al actualizar los datos","","error"):(localStorage.removeItem("userTemp"),this.findUser(Number(this.userActive.id_user)),m().fire("Informaci\xf3n actualizada correctamente","","success")))}changeStatus(e){var o;const i=null===(o=this.userActive.id_user)||void 0===o?void 0:o.toString();this.userService.changeStatus(i,e).subscribe(()=>this.findUser(Number(this.userActive.id_user)))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(r.gz),t.Y36(r.F0),t.Y36(c.K))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-user-detail"]],decls:5,vars:2,consts:[[1,"row"],[1,"col-4"],[3,"userActive","newStatus",4,"ngIf"],[1,"col-8"],[3,"isNew","userActive","userInfo",4,"ngIf"],[3,"userActive","newStatus"],[3,"isNew","userActive","userInfo"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,Z,1,1,"app-card-detail",2),t.qZA(),t.TgZ(3,"div",3),t.YNc(4,x,1,2,"app-form-general-info",4),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("ngIf",o.userActive),t.xp6(2),t.Q6J("ngIf",o.userActive))},directives:[d.O5,_.h,A.d],encapsulation:2}),n})();var h=a(5242),u=a(3075),T=a(2749),b=a(1468);function w(n,s){1&n&&(t.TgZ(0,"span",30),t._uU(1,"campo requerido"),t.qZA())}function C(n,s){if(1&n&&(t.TgZ(0,"div",28),t.YNc(1,w,2,0,"span",29),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.validateAccountField("role","required"))}}function I(n,s){1&n&&(t.TgZ(0,"span",30),t._uU(1,"campo requerido"),t.qZA())}function F(n,s){1&n&&(t.TgZ(0,"span",30),t._uU(1,"ingrese un usuario correcto"),t.qZA())}function y(n,s){if(1&n&&(t.TgZ(0,"div",28),t.YNc(1,I,2,0,"span",29),t.YNc(2,F,2,0,"span",29),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.validateAccountField("username","required")),t.xp6(1),t.Q6J("ngIf",e.validateAccountField("username","pattern"))}}function q(n,s){1&n&&(t.TgZ(0,"span",30),t._uU(1,"campo requerido"),t.qZA())}function N(n,s){1&n&&(t.TgZ(0,"span",30),t._uU(1,"ingrese una contrase\xf1a correcta"),t.qZA())}function J(n,s){if(1&n&&(t.TgZ(0,"div",28),t.YNc(1,q,2,0,"span",29),t.YNc(2,N,2,0,"span",29),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.validateAccountField("password","required")),t.xp6(1),t.Q6J("ngIf",e.validateAccountField("password","pattern"))}}function P(n,s){1&n&&(t.TgZ(0,"span",30),t._uU(1,"Password debe ser igual"),t.qZA())}function S(n,s){if(1&n&&(t.TgZ(0,"div",28),t.YNc(1,P,2,0,"span",29),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.validateAccountField("password2","matching"))}}let Q=(()=>{class n{constructor(e){this.fb=e,this.showGeneralInfo=new t.vpe,this.accountInfo=new t.vpe,this.regexExpressions=T.k,this.bgColorImageUser="primary"}ngOnInit(){this.loadForm()}backToGeneralInfo(){this.showGeneralInfo.emit(!0),this.bgColorImageUser="primary"}createAccount(){this.accountForm.valid&&this.accountInfo.emit(this.accountForm.value)}loadForm(){this.accountForm=this.fb.group({role:["DENTIST",[u.kI.required]],username:["",[u.kI.required,u.kI.pattern(this.regexExpressions.USER_NAME)]],password:["",[u.kI.required,u.kI.pattern(this.regexExpressions.PASSWORD)]],password2:["",[u.kI.required]]},{validators:[b.Z.match("password","password2")]})}changeBgColorImage(e){this.bgColorImageUser="ADMIN"===e.target.value?"danger":"primary"}validateAccountForm(e){const o=this.accountForm.get(e);return(null==o?void 0:o.errors)&&((null==o?void 0:o.dirty)||(null==o?void 0:o.touched))}validateAccountField(e,o){var i;return null===(i=this.accountForm.get(e))||void 0===i?void 0:i.hasError(o)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.qu))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-form-account"]],inputs:{imageUserTemp:"imageUserTemp"},outputs:{showGeneralInfo:"showGeneralInfo",accountInfo:"accountInfo"},decls:44,vars:8,consts:[[1,"card","border-top","border-0","border-4","border-primary"],[1,"card-body","p-5"],[1,"card-title","d-flex","align-items-center","gap-2"],[1,"bx","bx-cog","me-1","font-30","text-primary"],[1,"mb-0","text-primary"],[1,"my-2"],[1,"row","g-3","my-1",3,"formGroup","submit"],[1,"col-12","my-2","d-flex","justify-content-between","align-center"],[1,"d-flex","flex-column",2,"width","50%"],[1,"col-12","my-2"],[1,"form-label"],["formControlName","role",1,"form-select",3,"change"],["value","DENTIST"],["value","ADMIN"],["class","message-error",4,"ngIf"],["for","inputUsername",1,"form-label"],["formControlName","username","type","text","id","inputUsername",1,"form-control"],["for","inputPassword",1,"form-label"],["formControlName","password","type","password","id","inputPassword",1,"form-control"],["for","inputConfirmPassword",1,"form-label"],["formControlName","password2","type","password","id","inputConfirmPassword",1,"form-control"],[1,"d-flex","justify-content-center","align-items-center",2,"width","50%"],["alt","Admin",1,"rounded-circle","p-1",2,"width","80%",3,"src","ngClass"],[1,"d-flex","justify-content-end","align-items-center","gap-2"],["type","button",1,"btn","btn-danger","radius-10",3,"click"],[1,"bx","bx-left-arrow-alt"],["type","submit",1,"btn","btn-primary","radius-10",3,"disabled"],[1,"bx","bx-save"],[1,"message-error"],["class","text-danger",4,"ngIf"],[1,"text-danger"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div"),t._UZ(4,"i",3),t.qZA(),t.TgZ(5,"h3",4),t._uU(6,"Configuraci\xf3n de Cuenta"),t.qZA()(),t._UZ(7,"hr",5),t.TgZ(8,"form",6),t.NdJ("submit",function(){return o.createAccount()}),t.TgZ(9,"div",7)(10,"div",8)(11,"div",9)(12,"label",10),t._uU(13,"Cargo"),t.qZA(),t.TgZ(14,"select",11),t.NdJ("change",function(p){return o.changeBgColorImage(p)}),t.TgZ(15,"option",12),t._uU(16,"Dentista"),t.qZA(),t.TgZ(17,"option",13),t._uU(18,"Administrador"),t.qZA()(),t.YNc(19,C,2,1,"div",14),t.qZA(),t.TgZ(20,"div",9)(21,"label",15),t._uU(22,"Usuario"),t.qZA(),t._UZ(23,"input",16),t.YNc(24,y,3,2,"div",14),t.qZA(),t.TgZ(25,"div",9)(26,"label",17),t._uU(27,"Password"),t.qZA(),t._UZ(28,"input",18),t.YNc(29,J,3,2,"div",14),t.qZA(),t.TgZ(30,"div",9)(31,"label",19),t._uU(32,"Confirmar Password"),t.qZA(),t._UZ(33,"input",20),t.YNc(34,S,2,1,"div",14),t.qZA()(),t.TgZ(35,"div",21),t._UZ(36,"img",22),t.qZA()(),t.TgZ(37,"div",23)(38,"button",24),t.NdJ("click",function(){return o.backToGeneralInfo()}),t._UZ(39,"i",25),t._uU(40,"Regresar "),t.qZA(),t.TgZ(41,"button",26),t._UZ(42,"i",27),t._uU(43,"Guardar "),t.qZA()()()()()),2&e&&(t.xp6(8),t.Q6J("formGroup",o.accountForm),t.xp6(11),t.Q6J("ngIf",o.validateAccountForm("role")),t.xp6(5),t.Q6J("ngIf",o.validateAccountForm("username")),t.xp6(5),t.Q6J("ngIf",o.validateAccountForm("password")),t.xp6(5),t.Q6J("ngIf",o.validateAccountForm("password2")),t.xp6(2),t.Q6J("src",o.imageUserTemp,t.LSH)("ngClass","bg-"+o.bgColorImageUser),t.xp6(5),t.Q6J("disabled",o.accountForm.invalid))},directives:[u._Y,u.JL,u.sg,u.EJ,u.JJ,u.u,u.YN,u.Kr,d.O5,u.Fj,d.mk],encapsulation:2}),n})();function D(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"app-form-general-info",4),t.NdJ("userInfo",function(i){return t.CHM(e),t.oxw().loadAccountForm(i)}),t.qZA()}2&n&&t.Q6J("isNew",!0)}function O(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"app-form-account",5),t.NdJ("showGeneralInfo",function(){return t.CHM(e),t.oxw().showGeneralInfo()})("accountInfo",function(i){return t.CHM(e),t.oxw().createAccount(i)}),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("imageUserTemp",e.imageUser)}}let Y=(()=>{class n{constructor(e){this.userService=e,this.showAccountForm=!1}ngOnInit(){}loadAccountForm(e){this.newUser=Object.assign({},e);const o=this.newUser.gender||"other";this.imageUser="female"===o?h.Y.FEMALE:"male"===o?h.Y.MALE:h.Y.OTHER,this.showAccountForm=!0}showGeneralInfo(){this.showAccountForm=!1}createAccount(e){this.newUser=Object.assign(Object.assign({},this.newUser),e),this.userService.createUser(this.newUser).subscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(c.K))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-user-form"]],decls:4,vars:2,consts:[[1,"row"],[1,"col-xl-6","mx-auto"],[3,"isNew","userInfo",4,"ngIf"],[3,"imageUserTemp","showGeneralInfo","accountInfo",4,"ngIf"],[3,"isNew","userInfo"],[3,"imageUserTemp","showGeneralInfo","accountInfo"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,D,1,1,"app-form-general-info",2),t.YNc(3,O,1,1,"app-form-account",3),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("ngIf",!o.showAccountForm),t.xp6(1),t.Q6J("ngIf",o.showAccountForm))},directives:[d.O5,A.d,Q],encapsulation:2}),n})();var E=a(9857),M=a(5760),B=a(3333),L=a(2775),j=a(8115);function G(n,s){if(1&n&&(t.TgZ(0,"div",19),t._UZ(1,"app-card-icon-right",20),t.qZA()),2&n){const e=s.$implicit;t.xp6(1),t.Q6J("data",e)}}function R(n,s){1&n&&(t.TgZ(0,"span",31),t._uU(1,"Dentista"),t.qZA())}function k(n,s){1&n&&(t.TgZ(0,"span",32),t._uU(1,"Administrador"),t.qZA())}function H(n,s){1&n&&(t.TgZ(0,"span",33),t._uU(1,"Activo"),t.qZA())}function K(n,s){1&n&&(t.TgZ(0,"span",34),t._uU(1,"Suspendido"),t.qZA())}function z(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"a",35),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit;return t.oxw().changeStatus(i.name+" "+i.last_name,i.id_user)}),t._UZ(1,"i",36),t.qZA()}}const X=function(n){return["/users/",n]};function $(n,s){if(1&n&&(t.TgZ(0,"tr")(1,"td",15),t._UZ(2,"img",21),t.qZA(),t.TgZ(3,"td",22),t._uU(4),t.qZA(),t.TgZ(5,"td",15),t.YNc(6,R,2,0,"span",23),t.YNc(7,k,2,0,"span",24),t.qZA(),t.TgZ(8,"td"),t._uU(9),t.qZA(),t.TgZ(10,"td"),t._uU(11),t.qZA(),t.TgZ(12,"td"),t._uU(13),t.qZA(),t.TgZ(14,"td",15),t.YNc(15,H,2,0,"span",25),t.YNc(16,K,2,0,"span",26),t.qZA(),t.TgZ(17,"td")(18,"div",27),t.YNc(19,z,2,0,"a",28),t.TgZ(20,"a",29),t._UZ(21,"i",30),t.qZA()()()()),2&n){const e=s.$implicit;t.xp6(2),t.Q6J("src",e.image,t.LSH),t.xp6(2),t.AsE(" ",e.name," ",e.last_name," "),t.xp6(2),t.Q6J("ngIf","DENTIST"===e.role),t.xp6(1),t.Q6J("ngIf","ADMIN"===e.role),t.xp6(2),t.hij(" ",e.username," "),t.xp6(2),t.hij(" ",e.phone_number," "),t.xp6(2),t.hij(" ",e.email," "),t.xp6(2),t.Q6J("ngIf",e.status),t.xp6(1),t.Q6J("ngIf",!e.status),t.xp6(3),t.Q6J("ngIf",e.status),t.xp6(1),t.Q6J("routerLink",t.VKq(12,X,e.id_user))}}function V(n,s){if(1&n){const e=t.EpF();t.TgZ(0,"app-pagination",37),t.NdJ("changedOffset",function(i){return t.CHM(e),t.oxw().changePage(i)}),t.qZA()}if(2&n){const e=t.oxw();t.Q6J("limit",e.limit)("total",e.totalUsers)}}const tt=[{path:"",canActivate:[g.u],component:(()=>{class n{constructor(e,o){this.userService=e,this.authService=o,this.cardsIconData=[{title:"Usuarios",quantity:0,icon:"bxs-group",color:"primary",bg:"scooter"},{title:"Administradores",quantity:0,icon:"bx-shield-quarter",color:"danger",bg:"bloody"},{title:"Dentistas",quantity:0,icon:"bxs-user",color:"success",bg:"ohhappiness"}],this.limit=5,this.offset=0,this.findUserByName="",this.totalUsers=0,this.showPagination=!0}ngOnInit(){this.getUsers()}getUsers(){this.userService.getUsers(!1,{limit:this.limit,offset:this.offset,fullname:this.findUserByName}).subscribe(({users:o,totalAdmin:i,totalUser:p})=>{this.showPagination=!(this.findUserByName.length>0),this.users=o,this.totalUsers=i+p,this.cardsIconData[0].quantity=this.totalUsers,this.cardsIconData[1].quantity=i,this.cardsIconData[2].quantity=p})}findByFullname(e){this.showPagination=!1,this.findUserByName=e,this.getUsers()}changeLimit(e){this.limit=e,this.offset=0,this.getUsers()}changePage(e){this.offset=e,this.getUsers()}changeStatus(e,o){o!==this.authService.userActive.id_user&&m().fire({title:`\xbfEst\xe1s seguro de suspender a '${e}'?`,text:"No podr\xe1s revertir este cambio",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Cancelar",confirmButtonText:"Si, suspender"}).then(i=>{i.isConfirmed&&this.userService.changeStatus(null==o?void 0:o.toString(),!1).subscribe({next:()=>{this.getUsers()},error:p=>{m().fire("Ocurri\xf3n un error","intentalo de nuevo","error")}})})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(c.K),t.Y36(E.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-users"]],decls:38,vars:4,consts:[[1,"row","row-cols-1","row-cols-md-2","row-cols-xl-3"],["class","col",4,"ngFor","ngForOf"],[1,"row"],[1,"col-lg-12"],[1,"card","radius-10"],[1,"card-body"],[1,"d-flex","align-items-center","justify-content-between","flex-wrap","w-100","mb-3"],[1,"mb-0"],["routerLink","/users/new","type","button",1,"btn","btn-outline-primary","px-3","radius-10"],[1,"bx","bx-plus","mr-1"],[1,"d-lg-flex","align-items-center","justify-content-between","mb-4"],[2,"width","32%",3,"findName","text"],[3,"limit"],[1,"table-responsive"],[1,"table","align-middle","table-hover"],[1,"text-center"],[1,"text-end"],[4,"ngFor","ngForOf"],[3,"limit","total","changedOffset",4,"ngIf"],[1,"col"],[3,"data"],["alt","user-avatar",1,"user-img",3,"src"],[1,"my-auto"],["class","badge rounded-pill text-primary bg-light-primary p-2 text-uppercase px-3",4,"ngIf"],["class","badge rounded-pill text-secondary bg-light-warning p-2 text-uppercase px-3",4,"ngIf"],["class","badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3",4,"ngIf"],["class","badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3",4,"ngIf"],[1,"d-flex","justify-content-end","order-actions"],["class","cursor text-danger bg-light-danger",3,"click",4,"ngIf"],[1,"ms-2","cursor","text-primary","bg-light-primary",3,"routerLink"],[1,"bx","bx-id-card"],[1,"badge","rounded-pill","text-primary","bg-light-primary","p-2","text-uppercase","px-3"],[1,"badge","rounded-pill","text-secondary","bg-light-warning","p-2","text-uppercase","px-3"],[1,"badge","rounded-pill","text-success","bg-light-success","p-2","text-uppercase","px-3"],[1,"badge","rounded-pill","text-danger","bg-light-danger","p-2","text-uppercase","px-3"],[1,"cursor","text-danger","bg-light-danger",3,"click"],[1,"bx","bx-block"],[3,"limit","total","changedOffset"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,G,2,1,"div",1),t.qZA(),t.TgZ(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"h2",7),t._uU(8," Usuarios "),t.qZA(),t.TgZ(9,"button",8),t._UZ(10,"i",9),t._uU(11,"Nuevo Usuario "),t.qZA()(),t.TgZ(12,"div",10)(13,"app-input-search",11),t.NdJ("text",function(p){return o.findByFullname(p)}),t.qZA(),t.TgZ(14,"app-dropdown-page-list",12),t.NdJ("limit",function(p){return o.changeLimit(p)}),t.qZA()(),t.TgZ(15,"div",13)(16,"table",14)(17,"thead")(18,"tr")(19,"th",15),t._uU(20,"Avatar"),t.qZA(),t.TgZ(21,"th"),t._uU(22,"Nombre"),t.qZA(),t.TgZ(23,"th",15),t._uU(24,"Cargo"),t.qZA(),t.TgZ(25,"th"),t._uU(26,"Usuario"),t.qZA(),t.TgZ(27,"th"),t._uU(28,"Tel\xe9fono"),t.qZA(),t.TgZ(29,"th"),t._uU(30,"Email"),t.qZA(),t.TgZ(31,"th",15),t._uU(32,"Estado"),t.qZA(),t.TgZ(33,"th",16),t._uU(34,"Acciones"),t.qZA()()(),t.TgZ(35,"tbody"),t.YNc(36,$,22,14,"tr",17),t.qZA()(),t.YNc(37,V,1,2,"app-pagination",18),t.qZA()()()()()),2&e&&(t.xp6(1),t.Q6J("ngForOf",o.cardsIconData),t.xp6(12),t.Q6J("findName","usuario"),t.xp6(23),t.Q6J("ngForOf",o.users),t.xp6(1),t.Q6J("ngIf",o.totalUsers>0&&o.showPagination))},directives:[d.sg,M.z,r.rH,B.V,L.n,d.O5,r.yS,j.Q],encapsulation:2}),n})()},{path:"new",canActivate:[g.u],component:Y},{path:":userId",canActivate:[g.u],component:U}];let et=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[r.Bz.forChild(tt)],r.Bz]}),n})()},2775:(v,f,a)=>{a.d(f,{n:()=>g});var r=a(1223);let g=(()=>{class l{constructor(){this.limit=new r.vpe}ngOnInit(){}changeLimit(t){const c=Number(t.target.value);this.limit.emit(Number(c))}}return l.\u0275fac=function(t){return new(t||l)},l.\u0275cmp=r.Xpm({type:l,selectors:[["app-dropdown-page-list"]],outputs:{limit:"limit"},decls:10,vars:0,consts:[[1,"d-flex","align-items-center","justify-content-between","gap-1"],[1,"form-select","radius-10",2,"width","auto",3,"change"],["value","5","selected",""],["valued","10"],["valued","15"]],template:function(t,c){1&t&&(r.TgZ(0,"div",0)(1,"span"),r._uU(2," Mostrar por p\xe1gina "),r.qZA(),r.TgZ(3,"select",1),r.NdJ("change",function(_){return c.changeLimit(_)}),r.TgZ(4,"option",2),r._uU(5,"5"),r.qZA(),r.TgZ(6,"option",3),r._uU(7,"10"),r.qZA(),r.TgZ(8,"option",4),r._uU(9,"15"),r.qZA()()())},encapsulation:2}),l})()},8115:(v,f,a)=>{a.d(f,{Q:()=>g});var r=a(1223);let g=(()=>{class l{constructor(){this.limit=0,this.total=0,this.changedOffset=new r.vpe,this.offset=0,this.pageActive=1,this.totalPages=0}ngOnChanges(t){this.limit=t.limit&&t.limit.currentValue||5,this.pageActive=1,this.getPages()}ngOnInit(){this.getPages()}getPages(){this.totalPages=this.getTotalPages}get getTotalPages(){return Math.ceil(this.total/this.limit)}changePage(t){this.pageActive+=t>0?1:-1,this.offset+=t,this.offset<0?(this.offset=0,this.pageActive=1):this.offset>=this.total&&(this.offset-=t,this.pageActive=this.getTotalPages),this.changedOffset.emit(this.offset)}}return l.\u0275fac=function(t){return new(t||l)},l.\u0275cmp=r.Xpm({type:l,selectors:[["app-pagination"]],inputs:{limit:"limit",total:"total"},outputs:{changedOffset:"changedOffset"},features:[r.TTD],decls:8,vars:4,consts:[[1,"d-flex","justify-content-between","align-items-center","gap-2"],["role","group","aria-label","Basic example",1,"btn-group","m-1"],["type","button",1,"btn","btn-outline-primary","radius-10",3,"disabled","click"]],template:function(t,c){1&t&&(r.TgZ(0,"div",0)(1,"span"),r._uU(2),r.qZA(),r.TgZ(3,"div",1)(4,"button",2),r.NdJ("click",function(){return c.changePage(-c.limit)}),r._uU(5," Anterior "),r.qZA(),r.TgZ(6,"button",2),r.NdJ("click",function(){return c.changePage(c.limit)}),r._uU(7," Siguiente "),r.qZA()()()),2&t&&(r.xp6(2),r.AsE(" Pagina ",c.pageActive," de ",c.totalPages," "),r.xp6(2),r.Q6J("disabled",1===c.pageActive),r.xp6(2),r.Q6J("disabled",c.pageActive===c.totalPages))},encapsulation:2}),l})()}}]);