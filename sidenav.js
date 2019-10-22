function sideNavToggle(){
  console.log("Menu is toggled");
  let widthIsZero = getComputedStyle(stats).width === "0px";
  console.log(widthIsZero);
  if(widthIsZero){
    stats.classList.remove("sidenav-hide");

  }else{
    stats.classList.add("sidenav-hide");
  }
}
