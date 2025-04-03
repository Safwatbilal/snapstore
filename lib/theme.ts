const theme=localStorage.getItem('theme')||'light'
if(theme==='dark'){
    document.body.classList.add('dark')
    document.body.classList.remove('light')
}else {
    document.body.classList.add('light')
    document.body.classList.remove('dark')
}
export const changeTheme=(theme:string)=>{
    localStorage.setItem('theme',theme)
    switch (theme) {
        case "dark":
            document.body.classList.add('dark')
            document.body.classList.remove('light')
          break;
        default:
            document.body.classList.add('light')
            document.body.classList.remove('dark')
      }
}