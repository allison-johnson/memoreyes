function sideNavToggle(nav){
  console.log(nav);
  console.log("Menu is toggled");
  console.log(getComputedStyle(nav).width);
  let widthIsZero = getComputedStyle(nav).width === "0px";
  console.log(widthIsZero);
  if(widthIsZero){
    nav.classList.remove("sidenav-hide");

  }else{
    nav.classList.add("sidenav-hide");
  }
}
