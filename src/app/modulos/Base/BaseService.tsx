document.addEventListener("DOMContentLoaded", function (event) {

    const showNavbar = (toggleId:any, navId:any, bodyId:any, headerId:any) => {
        const toggle = document.getElementsByClassName(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle[0].addEventListener('click', () => { // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle[0].classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
            toggle[1].addEventListener('click', () => { // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle[1].classList.toggle('bx-expand')
                toggle[1].classList.toggle('bx-collapse')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    } 
    
    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink(e:any) {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            e.currentTarget.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))
    linkColor[linkColor.length - 2].removeEventListener('click', colorLink);
    linkColor[linkColor.length - 1].removeEventListener('click', colorLink);

    // Your code to run since DOM is loaded and ready
    const clapseGrande:any = document.getElementById('menuColapseGrande')

    clapseGrande.click();
});

export {}
